"use client";

import { useState, type FormEvent } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";

const labelClasses = "block mb-1.5 text-sm font-medium text-foreground";

export default function BookPilotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    institution: "",
    role: "",
    email: "",
    audience: "",
    module: "",
    groupSize: "",
    timing: "",
    notes: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const body = new URLSearchParams({
        "form-name": "book-pilot",
        ...form,
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="mb-4 font-serif text-3xl">Thank you</h1>
          <p className="text-muted">
            Your pilot session request has been received. We will be in touch
            within two working days to confirm details and next steps.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <SectionIntro
          title="Book a pilot session"
          description="A pilot session is the best way to experience Case & Signal before committing to a license. A Case & Signal facilitator delivers a full session with your students or team, followed by a debrief and feedback report. No preparation is required from your side."
          centered
        />

        <form
          name="book-pilot"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          <input type="hidden" name="form-name" value="book-pilot" />
          <p className="hidden">
            <label>
              Don&apos;t fill this out: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputClasses}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="institution" className={labelClasses}>
              Institution
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              required
              className={inputClasses}
              value={form.institution}
              onChange={(e) => update("institution", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="role" className={labelClasses}>
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              className={inputClasses}
              value={form.role}
              onChange={(e) => update("role", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClasses}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="audience" className={labelClasses}>
              Audience level
            </label>
            <select
              id="audience"
              name="audience"
              required
              className={inputClasses}
              value={form.audience}
              onChange={(e) => update("audience", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="university-undergraduate">
                University — Undergraduate
              </option>
              <option value="university-postgraduate">
                University — Postgraduate
              </option>
              <option value="school">School (secondary)</option>
              <option value="organization">Organization / corporate</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="module" className={labelClasses}>
              Desired module
            </label>
            <select
              id="module"
              name="module"
              required
              className={inputClasses}
              value={form.module}
              onChange={(e) => update("module", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="frontier-technologies">Frontier Technologies</option>
              <option value="public-policy-future-of-work">Public Policy and The Future of Work</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          <div>
            <label htmlFor="groupSize" className={labelClasses}>
              Estimated group size
            </label>
            <input
              id="groupSize"
              name="groupSize"
              type="text"
              className={inputClasses}
              placeholder="e.g. 25 students"
              value={form.groupSize}
              onChange={(e) => update("groupSize", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="timing" className={labelClasses}>
              Preferred timing
            </label>
            <input
              id="timing"
              name="timing"
              type="text"
              className={inputClasses}
              placeholder="e.g. Spring 2026, flexible"
              value={form.timing}
              onChange={(e) => update("timing", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="notes" className={labelClasses}>
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className={inputClasses}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Request a pilot session"}
          </Button>
          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}
          <p className="text-xs text-muted">We only use your information to arrange your pilot session and follow up. No spam. See our <a href="/privacy" className="text-accent hover:underline">privacy policy</a>.</p>
        </form>
      </div>
    </main>
  );
}
