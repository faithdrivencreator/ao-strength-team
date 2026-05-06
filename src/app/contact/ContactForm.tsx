'use client';

import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Could not send message. Please try again.');
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Network error. Please try again.');
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
          // MESSAGE SENT
        </p>
        <p className="font-sans text-[20px] font-700 mb-4">
          Thank you for reaching out.
        </p>
        <p className="font-sans text-[15px] font-300 text-white/60">
          We will get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">
          // NAME
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="contact-email" className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">
          // EMAIL
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">
          // SUBJECT
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          defaultValue=""
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 focus:border-white/50 focus:outline-none transition-colors appearance-none"
        >
          <option value="" disabled className="text-white/30">
            Select a subject
          </option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Order Support">Order Support</option>
          <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
          <option value="Wholesale">Wholesale</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className="block font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">
          // MESSAGE
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder="Your message"
          className="w-full bg-black border border-white/20 text-white font-mono text-[13px] px-4 py-3 placeholder:text-white/30 focus:border-white/50 focus:outline-none transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="font-mono text-[11px] uppercase tracking-widest text-red-400">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto bg-white text-black font-mono text-[12px] uppercase tracking-widest px-10 py-4 hover:bg-white/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
}
