"use client";

import { useState } from "react";

/**
 * Contact form, spec 2.3.
 *
 * PROGRESSIVE ENHANCEMENT, NOT JAVASCRIPT-DEPENDENT.
 *
 * This is a real form with an action and a method, so with JavaScript disabled
 * the browser posts it natively and the route handler answers with a redirect
 * carrying the outcome in the query string. Nothing here is a dead button: the
 * previous version had `type="button"` with no handler at all, so pressing it
 * did nothing under any circumstances.
 *
 * With JavaScript, the submit is intercepted so the result appears inline
 * without a page navigation. The visible email address and WhatsApp link beside
 * the form are the third path, and they work regardless.
 */
export default function EnquiryForm({
  initialStatus,
  initialError,
}: {
  initialStatus?: "sent" | null;
  initialError?: string | null;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    initialStatus === "sent" ? "sent" : initialError ? "error" : "idle",
  );
  const [error, setError] = useState<string | null>(initialError ?? null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok || !body.ok) {
        setError(body.error ?? "The message could not be sent. Please email hello@pivotprime.ae.");
        setState("error");
        return;
      }
      form.reset();
      setState("sent");
    } catch {
      setError("The message could not be sent. Please email hello@pivotprime.ae.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-mid/20 bg-mid/5 p-8 text-center"
      >
        <h3 className="mb-2 text-xl font-bold text-forest">Message sent</h3>
        <p className="text-neutral-600">
          We have it, and a confirmation is on its way to your inbox. Someone will reply within one
          working day.
        </p>
      </div>
    );
  }

  return (
    <form
      action="/api/enquiry"
      method="post"
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-neutral-100 bg-neutral-50 p-8"
    >
      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold text-neutral-700">
          Full name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all focus:border-transparent focus:ring-2 focus:ring-mid focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-neutral-700">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all focus:border-transparent focus:ring-2 focus:ring-mid focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-bold text-neutral-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-all focus:border-transparent focus:ring-2 focus:ring-mid focus:outline-none"
        />
      </div>

      {/* Honeypot. Hidden from people, filled by bots. Not display:none, which
          some bots skip, and taken out of the tab order and the accessibility
          tree so it never reaches a real visitor. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-xl bg-primary px-8 py-4 font-bold tracking-wider text-white uppercase shadow-lg transition-all hover:bg-mid/90 focus-visible:ring-2 focus-visible:ring-mid focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-70"
      >
        {state === "sending" ? "Sending" : "Send message"}
      </button>
    </form>
  );
}
