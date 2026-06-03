"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, ReactNode } from "react";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const CREAM = "#E8DCC8";
const MILITARY = "#4A5D3A";

const STARTER_PROMPTS = [
  "Help me pick a shirt",
  "What do the collections mean?",
  "Where does the 10% go?",
  "I could use some encouragement",
];

// Turn [text](href) markdown links into anchors, styled in AO cream.
function renderMarkdownLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const raw = match[2];
    const href = raw.startsWith("http") ? raw : raw.startsWith("/") ? raw : `/${raw}`;
    const external = href.startsWith("http");
    parts.push(
      <a
        key={match.index}
        href={href}
        className="underline underline-offset-2 transition-opacity hover:opacity-70"
        style={{ color: CREAM }}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to the latest message.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Nudge first-time visitors with a small help bubble a few seconds in.
  // Shows once per browser session so it never nags.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("ao-caleb-bubble-seen")) return;
    const t = setTimeout(() => setShowBubble(true), 3500);
    return () => clearTimeout(t);
  }, []);

  function dismissBubble() {
    setShowBubble(false);
    try {
      sessionStorage.setItem("ao-caleb-bubble-seen", "1");
    } catch {
      /* sessionStorage unavailable (private mode) - non-fatal */
    }
  }

  function openChat() {
    setOpen(true);
    dismissBubble();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  function sendStarter(prompt: string) {
    if (isLoading) return;
    sendMessage({ text: prompt });
    setInput("");
  }

  return (
    <>
      {/* Help bubble - a one-time nudge in AO's voice, above the launcher */}
      {!open && showBubble && (
        <div className="ao-bubble-in fixed bottom-[84px] right-5 sm:bottom-[88px] sm:right-6 z-[60] w-[238px]">
          <button
            onClick={openChat}
            className="block w-full rounded-lg bg-ink px-4 py-3 text-left shadow-lg shadow-black/40 transition-colors hover:bg-ink-soft"
            style={{ border: `1px solid ${MILITARY}` }}
          >
            <span
              className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: CREAM }}
            >
              // AO Strength Guide
            </span>
            <span className="block font-sans text-[13px] leading-snug text-white/85">
              Strength and peace. Need a hand with the gear, the tithe, or a word
              of encouragement?
            </span>
          </button>
          <button
            onClick={dismissBubble}
            aria-label="Dismiss"
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-ink text-white/60 transition-colors hover:text-white"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {/* tail pointing down to the launcher */}
          <span
            aria-hidden="true"
            className="absolute -bottom-[6px] right-9 h-3 w-3 rotate-45 bg-ink"
            style={{ borderRight: `1px solid ${MILITARY}`, borderBottom: `1px solid ${MILITARY}` }}
          />
        </div>
      )}

      {/* Launcher */}
      {!open && (
        <button
          onClick={openChat}
          aria-label="Open chat with Caleb, the AO Strength guide"
          className="ao-caleb-glow fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] flex items-center gap-2 rounded-full bg-military px-4 py-3 transition-transform hover:scale-105 active:scale-95"
          style={{ border: `1px solid ${CREAM}33` }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={CREAM}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.15em]"
            style={{ color: CREAM }}
          >
            Ask Caleb
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="ao-caleb-window-glow fixed bottom-4 left-4 right-4 z-[70] flex h-[72dvh] max-h-[560px] flex-col overflow-hidden rounded-lg bg-ink-deep sm:bottom-6 sm:left-auto sm:right-6 sm:h-[560px] sm:w-[390px]"
          style={{ border: `1px solid ${MILITARY}` }}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between border-b border-white/10 px-4 py-3"
            style={{ backgroundColor: "var(--color-military-deep)" }}
          >
            <div>
              <h3 className="font-sans text-base font-black uppercase tracking-[0.06em] text-white">
                Caleb
              </h3>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: CREAM }}
              >
                AO Strength Guide
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-center gap-5 px-1">
                <p className="font-sans text-sm leading-relaxed text-white/70">
                  Strength and peace. I am Caleb, your guide here. Ask me about the
                  gear, the collections, where the 10% goes, or anything you need
                  encouragement on.
                </p>
                <div className="flex flex-col gap-2">
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendStarter(prompt)}
                      className="self-start rounded-full border border-white/15 bg-ink-soft px-3 py-1.5 text-left font-mono text-[11px] uppercase tracking-[0.08em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#E8DCC8]/15 text-white"
                        : "bg-ink-soft text-white/80"
                    }`}
                  >
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <span key={i} className="whitespace-pre-wrap">
                          {isUser ? part.text : renderMarkdownLinks(part.text)}
                        </span>
                      ) : null
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-lg bg-ink-soft px-3.5 py-3">
                  <span
                    className="ao-typing-dot h-2 w-2 rounded-full"
                    style={{ backgroundColor: CREAM, animationDelay: "0s" }}
                  />
                  <span
                    className="ao-typing-dot h-2 w-2 rounded-full"
                    style={{ backgroundColor: CREAM, animationDelay: "0.15s" }}
                  />
                  <span
                    className="ao-typing-dot h-2 w-2 rounded-full"
                    style={{ backgroundColor: CREAM, animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="px-1 py-2 font-sans text-xs text-white/50">
                Something went wrong. Give it another try.
              </div>
            )}
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-ink px-3 py-3 sm:rounded-b-lg"
          >
            <div className="relative">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Caleb anything"
                disabled={isLoading}
                aria-label="Message Caleb"
                className="w-full border border-white/15 bg-ink-soft py-2.5 pl-3 pr-12 font-sans text-base text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30 disabled:opacity-50 sm:text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-70 disabled:opacity-30"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={CREAM}
                  stroke="none"
                  aria-hidden="true"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
