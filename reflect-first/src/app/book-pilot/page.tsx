"use client";

import { useState, type FormEvent } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";

const labelClasses = "block mb-1.5 text-sm font-medium text-foreground";

export default function BookPilotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
    try {
      const res = await fetch("/api/book-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      }
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
          description="A pilot session is the best way to experience Reflect First before committing to a license. A certified facilitator delivers a full session with your students or team, followed by a debrief and feedback report. No preparation is required from your side."
          centered
        />

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              id="name"
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
              required
              className={inputClasses}
              value={form.audience}
              onChange={(e) => update("audience", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="university-undergraduate">
                University -- Undergraduate
              </option>
              <option value="university-postgraduate">
                University -- Postgraduate
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
              required
              className={inputClasses}
              value={form.module}
              onChange={(e) => update("module", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="ai-governance">AI Governance</option>
              <option value="future-of-work">Future of Work</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          <div>
            <label htmlFor="groupSize" className={labelClasses}>
              Estimated group size
            </label>
            <input
              id="groupSize"
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
              rows={4}
              className={inputClasses}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Request a pilot session"}
          </Button>
        </form>
      </div>
    </main>
  );
}
