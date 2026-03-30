"use client";

import { useState, type FormEvent } from "react";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";

const inputClasses =
  "w-full rounded border border-border bg-white px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent";

const labelClasses = "block mb-1.5 text-sm font-medium text-foreground";

export default function SamplePage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    audience: "",
    module: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/sample", {
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
          <p className="mb-6 text-muted">
            Your sample scenario is ready to download. It includes a complete
            briefing pack, role assignments, and facilitator notes.
          </p>
          <Button variant="primary" href="/sample/reflect-first-sample-scenario.pdf">
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
          description="See what a Reflect First session looks like. The sample includes a complete scenario briefing pack, role assignments, evidence documents, and facilitator notes from the AI Governance module."
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
            <label htmlFor="institution" className={labelClasses}>
              Institution
            </label>
            <input
              id="institution"
              type="text"
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
            <label htmlFor="audience" className={labelClasses}>
              Audience type
            </label>
            <select
              id="audience"
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
              Module of interest
            </label>
            <select
              id="module"
              className={inputClasses}
              value={form.module}
              onChange={(e) => update("module", e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="ai-governance">AI Governance</option>
              <option value="future-of-work">Future of Work</option>
              <option value="both">Both</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Get the sample"}
          </Button>
        </form>
      </div>
    </main>
  );
}
