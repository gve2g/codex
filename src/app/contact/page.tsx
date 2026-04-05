"use client";

import { useState, type FormEvent } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";

const labelClasses = "block mb-1.5 text-sm font-medium text-foreground";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
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
        "form-name": "contact",
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
            Your message has been received. We will be in touch shortly.
          </p>
          <p className="mt-3 text-sm text-muted">
            We'll follow up within two business days to learn more about your needs.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <SectionIntro
          title="Get in touch"
          description="Whether you are exploring a license, interested in a pilot session, or have a general question, we are happy to help. Complete the form below and we will respond within two working days."
          centered
        />

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
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
              Institution / Organization
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
            <label htmlFor="message" className={labelClasses}>
              Message <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={inputClasses}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Sending..." : "Send message"}
          </Button>
          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}
          <p className="text-xs text-muted">We only use your information to respond to your inquiry. No spam. See our <a href="/privacy" className="text-accent hover:underline">privacy policy</a>.</p>
        </form>
      </div>
    </main>
  );
}
