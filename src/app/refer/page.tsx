'use client';

import { Suspense, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

const NOTE_MAX = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ReferForm() {
  const search = useSearchParams();
  const refParam = search.get('ref')?.trim() ?? '';

  const [referrerEmail, setReferrerEmail] = useState(refParam);
  const [friendEmail, setFriendEmail] = useState('');
  const [friendFirstName, setFriendFirstName] = useState('');
  const [personalNote, setPersonalNote] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const refEmail = referrerEmail.trim().toLowerCase();
    const fEmail = friendEmail.trim().toLowerCase();

    if (!EMAIL_RE.test(refEmail)) {
      setError('Enter a valid email for the sender.');
      return;
    }
    if (!EMAIL_RE.test(fEmail)) {
      setError('Enter a valid friend email.');
      return;
    }
    if (refEmail === fEmail) {
      setError("You can't refer yourself.");
      return;
    }
    if (personalNote.length > NOTE_MAX) {
      setError(`Note must be ${NOTE_MAX} characters or less.`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/refer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referrerEmail: refEmail,
          friendEmail: fEmail,
          friendFirstName: friendFirstName.trim() || undefined,
          personalNote: personalNote.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Could not send the invite. Try again.');
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Network error. Try again.');
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-16">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-6">
          // 02  INVITATION SENT
        </p>
        <p className="font-sans text-[22px] md:text-[26px] font-700 leading-[1.3] mb-4">
          Your invite is on the way to {friendEmail}.
        </p>
        <p className="font-sans text-[15px] font-300 text-white/60 leading-[1.7]">
          If they wear it, they&apos;re on the team.
        </p>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">
            // A NOTE FOR YOUR FRIEND
          </p>
          <p className="font-sans text-[14px] font-300 text-white/60 leading-[1.7]">
            If they don&apos;t see our invitation in their inbox, ask them to
            check their spam or promotions folder. New sending domains
            sometimes land there until the recipient marks them as
            &ldquo;Not spam.&rdquo;
          </p>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-widest text-white/30 mt-12">
          — AΩ
        </p>
      </div>
    );
  }

  const showReferrerField = !refParam;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showReferrerField && (
        <div>
          <label
            htmlFor="referrer-email"
            className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2"
          >
            // WHO&apos;S SENDING THIS
          </label>
          <input
            id="referrer-email"
            type="email"
            value={referrerEmail}
            onChange={(e) => setReferrerEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors"
            style={{ borderRadius: 0 }}
          />
        </div>
      )}

      <div>
        <label
          htmlFor="friend-email"
          className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2"
        >
          // FRIEND&apos;S EMAIL
        </label>
        <input
          id="friend-email"
          type="email"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          required
          placeholder="their@email.com"
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors"
          style={{ borderRadius: 0 }}
        />
      </div>

      <div>
        <label
          htmlFor="friend-first-name"
          className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2"
        >
          // FRIEND&apos;S FIRST NAME — OPTIONAL
        </label>
        <input
          id="friend-first-name"
          type="text"
          value={friendFirstName}
          onChange={(e) => setFriendFirstName(e.target.value)}
          placeholder="Their first name"
          maxLength={60}
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors"
          style={{ borderRadius: 0 }}
        />
      </div>

      <div>
        <label
          htmlFor="personal-note"
          className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2"
        >
          // A SHORT NOTE — OPTIONAL
        </label>
        <textarea
          id="personal-note"
          value={personalNote}
          onChange={(e) => setPersonalNote(e.target.value.slice(0, NOTE_MAX))}
          rows={4}
          maxLength={NOTE_MAX}
          placeholder="Why you think they&apos;d wear it."
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors resize-none"
          style={{ borderRadius: 0 }}
        />
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-2 text-right">
          {personalNote.length} / {NOTE_MAX}
        </p>
      </div>

      {error && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto bg-white text-black font-mono text-[12px] uppercase tracking-widest px-10 py-4 hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ borderRadius: 0 }}
      >
        {submitting ? 'SENDING...' : 'SEND THE INVITE'}
      </button>
    </form>
  );
}

export default function ReferPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-[600px]">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-6">
            // 01  THE TEAM GROWS BY INVITATION
          </p>

          <h1 className="font-sans text-[40px] md:text-[56px] font-900 leading-[1.1] tracking-tight uppercase mb-6">
            Refer a friend
          </h1>

          <div className="mb-10 space-y-3">
            <p className="font-sans text-[15px] font-300 text-white/70 leading-[1.7]">
              Know someone who&apos;d train next to you?
            </p>
            <p className="font-sans text-[15px] font-300 text-white/70 leading-[1.7]">
              Enter their email. We send them a 15% off code and tell them
              you sent it. No spam. No follow-ups unless they buy.
            </p>
          </div>

          <Suspense
            fallback={
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                // LOADING
              </p>
            }
          >
            <ReferForm />
          </Suspense>

          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-16 pt-10 border-t border-white/10">
            // SINGLE-USE CODE · VALID 60 DAYS · ONE PER FRIEND EMAIL
          </p>
        </div>
      </div>
    </section>
  );
}
