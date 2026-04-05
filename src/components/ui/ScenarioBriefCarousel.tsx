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
    title: "Predictive Policing",
    summary:
      "A mid-sized city is evaluating a proposal to deploy predictive policing software across three districts...",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "3–5 roles",
    roles: [
      {
        initial: "M",
        name: "Mayor Chen",
        description:
          "Facing re-election, balancing public safety and civil liberties",
      },
      {
        initial: "P",
        name: "Police Chief Okafor",
        description:
          "Advocates for data-driven policing, managing department morale",
      },
      {
        initial: "A",
        name: "Civil Liberties Director",
        description:
          "Concerned about algorithmic bias and community trust",
      },
    ],
  },
  {
    title: "The Automated Warehouse",
    summary:
      "A major logistics company plans to automate 40% of its warehouse workforce within 18 months. 2,300 jobs are at stake...",
    module: "Public Policy and The Future of Work",
    duration: "Flexible format",
    roleCount: "3–5 roles",
    roles: [
      {
        initial: "C",
        name: "CEO Park",
        description:
          "Under board pressure to cut costs and match competitor automation",
      },
      {
        initial: "U",
        name: "Union Leader Mendes",
        description:
          "Representing workers with families, mortgages, and no retraining options",
      },
      {
        initial: "G",
        name: "Labour Minister Osei",
        description:
          "Drafting emergency policy with an election 14 months away",
      },
    ],
  },
  {
    title: "Facial Recognition Moratorium",
    summary:
      "After a wrongful arrest linked to facial recognition, the city council must decide whether to ban the technology entirely...",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "3–5 roles",
    roles: [
      {
        initial: "C",
        name: "Council Chair Vasquez",
        description:
          "Balancing public outrage with law enforcement demands",
      },
      {
        initial: "D",
        name: "Detective Sgt. Lam",
        description:
          "Relies on the tool for active investigations, fears losing leads",
      },
      {
        initial: "R",
        name: "Researcher Dr. Abara",
        description:
          "Published the bias audit that triggered the crisis",
      },
    ],
  },
  {
    title: "The Hiring Algorithm Audit",
    summary:
      "A government discovers its automated hiring system has been systematically filtering out qualified candidates from certain zip codes...",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "3–5 roles",
    roles: [
      {
        initial: "D",
        name: "Deputy Minister Tremblay",
        description:
          "Must decide whether to pause all hiring or quietly fix the system",
      },
      {
        initial: "V",
        name: "Vendor CTO Singh",
        description:
          "Built the algorithm, insists the training data was provided by government",
      },
      {
        initial: "J",
        name: "Journalist Nakamura",
        description:
          "Broke the story and is pressing for full transparency",
      },
    ],
  },
  {
    title: "Gig Economy Regulation",
    summary:
      "A ride-sharing platform threatens to leave the market if new worker classification legislation passes. 45,000 drivers face an uncertain future...",
    module: "Public Policy and The Future of Work",
    duration: "Flexible format",
    roleCount: "3–5 roles",
    roles: [
      {
        initial: "P",
        name: "Platform VP Li",
        description:
          "Argues reclassification will destroy the flexibility drivers want",
      },
      {
        initial: "D",
        name: "Driver Organizer Dube",
        description:
          "Wants benefits and stability without losing schedule control",
      },
      {
        initial: "M",
        name: "Minister of Innovation Roy",
        description:
          "Caught between tech-sector growth targets and labour protection",
      },
    ],
  },
];

export default function ScenarioBriefCarousel() {
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
