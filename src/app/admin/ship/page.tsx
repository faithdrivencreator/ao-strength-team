"use client";

import { useState, useEffect, useCallback } from "react";
import type { CarrierName } from "@/lib/shipping-email";

interface StripeAddress {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
}

interface PendingOrder {
  sessionId: string;
  orderRef: string;
  paymentIntent: string | null;
  customerEmail: string;
  customerName: string | null;
  customerFirstName: string | null;
  amountTotal: number;
  currency: string;
  shippingAddress: StripeAddress | null;
  itemsSummary: string;
  createdAt: string;
  ageDays: number;
}

const CARRIERS: CarrierName[] = ["USPS", "UPS", "FedEx", "DHL", "Other"];
const STORAGE_KEY = "ao-admin-pw";

export default function AdminShipPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState<CarrierName>("USPS");
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<
    | { type: "success" | "error" | "info"; msg: string }
    | null
  >(null);

  const fetchPending = useCallback(async (pw: string) => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/pending-orders", {
        headers: { Authorization: `Bearer ${pw}` },
      });
      if (res.status === 401) {
        setStatus({ type: "error", msg: "Wrong password." });
        setAuthed(false);
        return;
      }
      const data = (await res.json()) as { orders?: PendingOrder[] };
      setAuthed(true);
      setPendingOrders(data.orders ?? []);
      if (data.orders?.length === 1) {
        setSelectedSessionId(data.orders[0].sessionId);
      } else if (!data.orders?.length) {
        setStatus({
          type: "info",
          msg: "No pending orders waiting to ship.",
        });
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, pw);
      }
    } catch (err) {
      setStatus({ type: "error", msg: String(err) });
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-attempt with cached password on mount
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (stored) {
      setPassword(stored);
      fetchPending(stored);
    }
  }, [fetchPending]);

  const selectedOrder =
    pendingOrders.find((o) => o.sessionId === selectedSessionId) ?? null;

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    await fetchPending(password);
  }

  async function sendShipping(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedOrder) return;
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admin/send-shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          customerEmail: selectedOrder.customerEmail,
          firstName: selectedOrder.customerFirstName ?? undefined,
          orderRef: selectedOrder.orderRef,
          paymentIntentId: selectedOrder.paymentIntent ?? undefined,
          trackingNumber: trackingNumber.trim(),
          carrier,
          expectedDelivery: expectedDelivery.trim() || undefined,
          customNote: customNote.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        emailId?: string;
        error?: string;
      };

      if (res.ok) {
        setStatus({
          type: "success",
          msg: `Shipping email sent to ${selectedOrder.customerEmail}. Resend ID: ${data.emailId ?? "n/a"}`,
        });
        setTrackingNumber("");
        setExpectedDelivery("");
        setCustomNote("");
        await fetchPending(password);
      } else {
        setStatus({ type: "error", msg: data.error || "Send failed" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: String(err) });
    } finally {
      setSubmitting(false);
    }
  }

  function formatAddress(a: StripeAddress | null): string {
    if (!a) return "On file with Stripe";
    return [a.line1, a.line2, `${a.city ?? ""}, ${a.state ?? ""} ${a.postal_code ?? ""}`.trim()]
      .filter(Boolean)
      .join(", ");
  }

  const inputClass =
    "w-full border border-white/20 bg-black px-4 py-3 font-mono text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none rounded-none";
  const labelClass =
    "mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.10em] text-[#737373]";

  return (
    <section>
      <header className="mb-10">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.10em] text-[#737373]">
          // 01 SHIP AN ORDER
        </p>
        <h1 className="font-inter text-3xl font-black uppercase leading-tight tracking-tight text-white">
          Daily Ship Queue
        </h1>
        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/60">
          Pick a pending order. Drop the tracking number. Pick the carrier. Hit
          send. Customer email, address, and order reference fill from Stripe.
        </p>
      </header>

      {!authed && (
        <form onSubmit={submitPassword} className="mb-10 max-w-md space-y-5">
          <div>
            <label className={labelClass}>Admin password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="..............."
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-white bg-white px-6 py-3 font-inter text-sm font-bold uppercase tracking-[0.06em] text-black transition hover:bg-black hover:text-white disabled:opacity-50"
          >
            {loading ? "Loading..." : "Unlock"}
          </button>
        </form>
      )}

      {authed && (
        <>
          <div className="mb-6 flex items-baseline justify-between border-b border-white/15 pb-4">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.10em] text-[#737373]">
              // 02 PENDING ·{" "}
              <span className="text-white">{pendingOrders.length}</span>
            </p>
            <button
              type="button"
              onClick={() => fetchPending(password)}
              disabled={loading}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.10em] text-white/70 transition hover:text-white"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {pendingOrders.length > 1 && (
            <div className="mb-8 space-y-2">
              {pendingOrders.map((o) => {
                const selected = o.sessionId === selectedSessionId;
                return (
                  <button
                    type="button"
                    key={o.sessionId}
                    onClick={() => setSelectedSessionId(o.sessionId)}
                    className={`block w-full border p-4 text-left transition rounded-none ${
                      selected
                        ? "border-white bg-white/5"
                        : "border-white/15 bg-black hover:border-white/40"
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-inter text-base font-bold uppercase tracking-tight text-white">
                        {o.customerName ?? o.customerEmail}
                      </span>
                      <span className="font-mono text-sm text-white">
                        ${o.amountTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
                      #{o.orderRef} · {o.ageDays}D AGO ·{" "}
                      {formatAddress(o.shippingAddress)}
                    </div>
                    {o.itemsSummary && (
                      <div className="mt-1 truncate font-mono text-[10px] text-white/40">
                        {o.itemsSummary}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {selectedOrder && (
            <form onSubmit={sendShipping} className="space-y-8">
              <div className="border border-white/20 p-5">
                <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.10em] text-[#737373]">
                  // SHIPPING THIS ORDER
                </p>
                <p className="font-inter text-lg font-black uppercase tracking-tight text-white">
                  {selectedOrder.customerName ?? selectedOrder.customerEmail}
                </p>
                <p className="mt-1 font-mono text-xs text-white/60">
                  {selectedOrder.customerEmail}
                </p>
                <p className="mt-3 font-mono text-xs text-white/70">
                  ORDER{" "}
                  <span className="text-white">
                    #{selectedOrder.orderRef}
                  </span>{" "}
                  · $
                  <span className="text-white">
                    {selectedOrder.amountTotal.toFixed(2)}
                  </span>
                </p>
                <p className="mt-2 text-xs font-light leading-relaxed text-white/60">
                  To: {formatAddress(selectedOrder.shippingAddress)}
                </p>
                {selectedOrder.itemsSummary && (
                  <p className="mt-2 font-mono text-[11px] text-white/50">
                    {selectedOrder.itemsSummary}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Tracking number *</label>
                  <input
                    type="text"
                    required
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className={inputClass}
                    placeholder="9400 1111 2222 3333 4444 55"
                    autoFocus
                  />
                </div>
                <div>
                  <label className={labelClass}>Carrier *</label>
                  <select
                    value={carrier}
                    onChange={(e) =>
                      setCarrier(e.target.value as CarrierName)
                    }
                    className={inputClass}
                  >
                    {CARRIERS.map((c) => (
                      <option key={c} value={c} className="bg-black">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <details className="text-sm text-white/60">
                <summary className="cursor-pointer font-mono text-[11px] font-medium uppercase tracking-[0.10em] text-white/70 transition hover:text-white">
                  Optional fields
                </summary>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>Expected delivery</label>
                    <input
                      type="text"
                      value={expectedDelivery}
                      onChange={(e) => setExpectedDelivery(e.target.value)}
                      className={inputClass}
                      placeholder="Tuesday, May 20  (or  2-4 business days)"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Custom note</label>
                    <textarea
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      rows={3}
                      className={`${inputClass} resize-y`}
                      placeholder="Folded with care. Built to outlast the cycle."
                    />
                  </div>
                </div>
              </details>

              <button
                type="submit"
                disabled={submitting || !trackingNumber.trim()}
                className="w-full border border-white bg-white px-6 py-4 font-inter text-sm font-bold uppercase tracking-[0.06em] text-black transition hover:bg-black hover:text-white disabled:opacity-50"
              >
                {submitting
                  ? "Sending..."
                  : `Send Shipping Email to ${selectedOrder.customerFirstName ?? selectedOrder.customerEmail}`}
              </button>
            </form>
          )}

          {!selectedOrder && pendingOrders.length > 0 && (
            <p className="text-sm text-white/60">Pick an order above to ship.</p>
          )}
        </>
      )}

      {status && (
        <div
          className={`mt-8 border p-4 font-mono text-xs leading-relaxed ${
            status.type === "success"
              ? "border-white bg-white/5 text-white"
              : status.type === "info"
                ? "border-white/20 bg-black text-white/70"
                : "border-white/40 bg-white/5 text-white"
          }`}
        >
          {status.msg}
        </div>
      )}
    </section>
  );
}
