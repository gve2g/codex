"use client";

import { useState, type FormEvent } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";

const labelClasses = "block mb-1.5 text-sm font-medium text-foreground";

export default function SamplePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    institution: "",
    audience: "",
    module: "",
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
        "form-name": "sample-download",
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
          <p className="mb-6 text-muted">
            Your sample scenario is ready to download. It includes a complete
            briefing pack, role assignments, and facilitator notes.
          </p>
          <Button variant="primary" href="/sample/case-and-signal-sample-scenario.pdf">
            Download sample scenario (PDF)
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <SectionIntro
          title="Download a sample scenario"
          description="See what a Case & Signal session looks like. The sample includes a complete scenario briefing pack, role assignments, evidence documents, and facilitator notes from the Frontier Technologies module."
          centered
        />

        <form
          name="sample-download"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          <input type="hidden" name="form-name" value="sample-download" />
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
            <label htmlFor="institution" className={labelClasses}>
              Institution
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              className={inputClasses}
              value={form.institution}
              onChange={(e) => update("institution", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="audience" className={labelClasses}>
              Audience type <span className="font-normal text-muted">(optional)</span>
            </label>
            <select
              id="audience"
              name="audience"
              className={inputClasses}
              value={form.audience}
              onChange={(e) => update("audience", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="university">University</option>
              <option value="school">School</option>
              <option value="organization">Organization</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="module" className={labelClasses}>
              Module of interest <span className="font-normal text-muted">(optional)</span>
            </label>
            <select
              id="module"
              name="module"
              className={inputClasses}
              value={form.module}
              onChange={(e) => update("module", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="frontier-technologies">Frontier Technologies</option>
              <option value="public-policy-future-of-work">Public Policy and The Future of Work</option>
              <option value="both">Both</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Get the sample"}
          </Button>
          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}
          <p className="text-xs text-muted">We only use your information to send you the sample and discuss our offerings. No spam. See our <a href="/privacy" className="text-accent hover:underline">privacy policy</a>.</p>
        </form>
      </div>
    </main>
  );
}
