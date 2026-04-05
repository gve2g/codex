"use client";

import { useState, useEffect, useCallback } from "react";

interface Role {
  initial: string;
  name: string;
  description: string;
}

interface Brief {
  title: string;
  summary: string;
  module: string;
  duration: string;
  roleCount: string;
  roles: Role[];
}

const briefs: Brief[] = [
  {
    title: "Your School Banned AI. The School Across Town Teaches With It.",
    summary:
      "Your school board votes to ban all AI tools from assignments. The school across town has embedded AI into every course. Both say they are preparing students for the future. In five years, these students compete for the same university spots.",
    module: "Future of Work",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "S",
        name: "School Board Chair",
        description:
          "Defends the ban as protecting academic integrity",
      },
      {
        initial: "A",
        name: "Student at the AI-friendly school",
        description:
          "Uses AI daily and sees it as normal preparation for the future",
      },
      {
        initial: "P",
        name: "Parent worried about fairness",
        description:
          "Wants a level playing field for all students across districts",
      },
      {
        initial: "T",
        name: "Teacher who designed the AI curriculum",
        description:
          "Built lessons around AI tools and sees measurable improvement",
      },
    ],
  },
  {
    title: "The Teacher Who Uses AI Gets Better Results",
    summary:
      "Two history teachers at the same school teach the same course. One prepares everything by hand. The other uses AI to generate tailored lessons and instant feedback. The second teacher's students score higher and report more engagement.",
    module: "Future of Work",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "P",
        name: "Principal deciding policy",
        description:
          "Needs to set a school-wide standard without alienating staff",
      },
      {
        initial: "T",
        name: "The traditional teacher",
        description:
          "Has taught effectively for 20 years and resents the implication that AI is better",
      },
      {
        initial: "A",
        name: "The AI-using teacher",
        description:
          "Uses AI to personalise learning and argues the results speak for themselves",
      },
      {
        initial: "S",
        name: "A student caught in the middle",
        description:
          "Notices the difference between the two classes and wants consistency",
      },
    ],
  },
  {
    title: "An Algorithm Decides Who Gets Into University",
    summary:
      "A university introduces AI screening for applications. It is fast and consistent, but it favours applicants from well-funded schools with polished essays. An applicant from a rural school with strong potential gets filtered out before any human reads their file.",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "D",
        name: "Admissions Dean",
        description:
          "Approved the tool to handle rising application volumes",
      },
      {
        initial: "R",
        name: "Rural applicant",
        description:
          "Strong student whose application was screened out by the algorithm",
      },
      {
        initial: "S",
        name: "Data scientist who built the tool",
        description:
          "Defends the model's accuracy but acknowledges the training data gap",
      },
      {
        initial: "E",
        name: "Equity advocate on the board",
        description:
          "Argues the tool reproduces existing inequality at scale",
      },
    ],
  },
  {
    title: "AI Wrote Your Resume. AI Rejected It.",
    summary:
      "A graduate uses AI to tailor 200 job applications. Every company uses AI to screen them. Neither human has read the other's words. The graduate is rejected everywhere, not because they are unqualified, but because two machines could not find each other.",
    module: "Future of Work",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "G",
        name: "The graduate",
        description:
          "Did everything right and still cannot get past the first filter",
      },
      {
        initial: "H",
        name: "HR Director at a hiring company",
        description:
          "Relies on the screening tool to manage thousands of applications",
      },
      {
        initial: "V",
        name: "AI vendor who sells the screening tool",
        description:
          "Markets the product as objective and efficient",
      },
      {
        initial: "L",
        name: "Labour policy researcher",
        description:
          "Studies how automated hiring creates invisible barriers",
      },
    ],
  },
  {
    title: "Should a Store Use Facial Recognition to Stop Theft?",
    summary:
      "A local retailer installs facial recognition cameras after a rise in shoplifting. Theft drops, but the system flags innocent customers and trust in the neighbourhood erodes. The store owner says it works. The community says it discriminates.",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "M",
        name: "Store Manager",
        description:
          "Invested in the system and points to measurable theft reduction",
      },
      {
        initial: "C",
        name: "Regular customer flagged by the system",
        description:
          "Was stopped and questioned despite doing nothing wrong",
      },
      {
        initial: "P",
        name: "Privacy advocate",
        description:
          "Argues the technology normalises surveillance in public spaces",
      },
      {
        initial: "L",
        name: "Police liaison",
        description:
          "Works with the store and sees both the benefits and the complaints",
      },
    ],
  },
];

export default function SchoolScenarioCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const brief = briefs[index];

  const next = useCallback(
    () => setIndex((i) => (i === briefs.length - 1 ? 0 : i + 1)),
    []
  );
  const prev = () => setIndex((i) => (i === 0 ? briefs.length - 1 : i - 1));

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {/* Main document card */}
        <div className="rounded-lg border border-border bg-background p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Scenario Brief
            </div>
            <span className="font-mono text-xs text-muted">
              {index + 1} / {briefs.length}
            </span>
          </div>

          <h3 className="mt-4 font-serif text-xl font-semibold">
            {brief.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{brief.summary}</p>

          <div className="mt-6 space-y-3">
            {brief.roles.map((role) => (
              <div key={role.initial + role.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-accent">
                  {role.initial}
                </span>
                <div>
                  <p className="text-xs font-semibold">{role.name}</p>
                  <p className="text-xs text-muted">{role.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              <span className="rounded bg-surface px-2 py-0.5 text-xs text-muted">
                {brief.duration}
              </span>
              <span className="rounded bg-surface px-2 py-0.5 text-xs text-muted">
                {brief.roleCount}
              </span>
              <span className="rounded bg-surface px-2 py-0.5 text-xs text-muted">
                {brief.module}
              </span>
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-1">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous scenario"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next scenario"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Offset decorative card behind */}
        <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-lg border border-border bg-surface" />
      </div>
    </div>
  );
}
