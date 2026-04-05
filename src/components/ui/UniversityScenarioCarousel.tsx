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
    title: "The Government Promised Efficiency. Now 12,000 Public Servants Might Lose Their Jobs.",
    summary:
      "A national government proposes replacing routine casework with AI. Wait times drop from weeks to hours. Taxpayers save billions. But 12,000 public servants face displacement, mostly in smaller cities where government is the largest employer.",
    module: "Future of Work",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "M",
        name: "Minister responsible for digital transformation",
        description:
          "Championed the AI rollout and must defend the human cost",
      },
      {
        initial: "P",
        name: "Public servant with 20 years of service",
        description:
          "Faces displacement with no clear path to equivalent work",
      },
      {
        initial: "T",
        name: "Taxpayer advocacy group director",
        description:
          "Argues the savings are too significant to ignore",
      },
      {
        initial: "C",
        name: "Mayor of an affected small city",
        description:
          "Warns that mass layoffs will devastate the local economy",
      },
    ],
  },
  {
    title: "The Curriculum Was Planned in 2022. Students Graduate in 2028.",
    summary:
      "A national education ministry spent three years building a new curriculum. By launch, generative AI has made half of it obsolete. The curriculum still prioritizes essay writing and foundational coding. Teachers are asking whether they are training students to compete with machines.",
    module: "Future of Work",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "E",
        name: "Education Minister",
        description:
          "Invested political capital in the curriculum and cannot easily reverse course",
      },
      {
        initial: "C",
        name: "Curriculum designer who built the program",
        description:
          "Defends the fundamentals but acknowledges the gap",
      },
      {
        initial: "T",
        name: "High school teacher about to deliver it",
        description:
          "Sees students already using AI and questions the relevance of the material",
      },
      {
        initial: "A",
        name: "University admissions officer receiving these graduates",
        description:
          "Notices incoming students are less prepared for an AI-integrated world",
      },
    ],
  },
  {
    title: "A Hospital Adopts an AI That Doctors Cannot Explain",
    summary:
      "An AI diagnostic tool detects a specific cancer more accurately than radiologists, but it cannot explain its reasoning. Patient outcomes improve. Doctors say they are being asked to trust a black box with people's lives.",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "H",
        name: "Hospital CEO",
        description:
          "Approved the tool based on outcome data and cost savings",
      },
      {
        initial: "R",
        name: "Senior radiologist",
        description:
          "Uncomfortable overriding their own judgment based on a system they cannot interpret",
      },
      {
        initial: "P",
        name: "Patient advocate",
        description:
          "Wants better outcomes but insists patients deserve an explanation",
      },
      {
        initial: "M",
        name: "Medical regulator",
        description:
          "Must decide whether to certify a tool that works but cannot be audited",
      },
    ],
  },
  {
    title: "The Company Knows You Better Than You Know Yourself",
    summary:
      "A large employer rolls out an AI talent platform that tracks every employee's communications, meetings, and contributions. It generates personalized development plans. Workers who follow the AI's recommendations get promoted 40% faster. Others say it is surveillance dressed as support.",
    module: "Future of Work",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "C",
        name: "Chief People Officer",
        description:
          "Rolled out the platform and points to measurable promotion gains",
      },
      {
        initial: "E",
        name: "Employee whose performance improved",
        description:
          "Credits the AI recommendations for a recent promotion",
      },
      {
        initial: "S",
        name: "Employee who feels surveilled",
        description:
          "Says the constant tracking has changed how everyone communicates",
      },
      {
        initial: "D",
        name: "Data protection officer",
        description:
          "Warns that the data collected far exceeds what was disclosed to staff",
      },
    ],
  },
  {
    title: "Three Countries, Three Sets of Data Rules",
    summary:
      "A multinational company operates in countries with conflicting data protection laws. What one country requires is illegal in another. The compliance officer cannot satisfy everyone. There is no option that works across all jurisdictions.",
    module: "Frontier Technologies",
    duration: "Flexible format",
    roleCount: "4 roles",
    roles: [
      {
        initial: "C",
        name: "Company compliance officer",
        description:
          "Responsible for meeting all legal requirements simultaneously",
      },
      {
        initial: "E",
        name: "EU regulator",
        description:
          "Enforces strict data protection standards and will not compromise",
      },
      {
        initial: "T",
        name: "Southeast Asian trade official",
        description:
          "Prioritises data flow for economic growth and sees EU rules as protectionist",
      },
      {
        initial: "D",
        name: "Consumer rights group director",
        description:
          "Argues that users deserve the same protections regardless of jurisdiction",
      },
    ],
  },
];

export default function UniversityScenarioCarousel() {
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
