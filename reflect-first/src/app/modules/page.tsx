import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Modules | Reflect First",
  description:
    "Structured debate modules on AI Governance and the Future of Work. Built for live classroom delivery across universities, schools, and organizations.",
};

const aiGovernance = {
  title: "AI Governance",
  positioning:
    "Who should control the rules for artificial intelligence? This module places students inside real regulatory dilemmas, from algorithmic bias in hiring to cross-border data sovereignty disputes. Participants must weigh competing interests, propose frameworks, and defend positions under pressure.",
  audiences: ["University", "School", "Organization"],
  formats: ["Full session (2.5 hrs)", "Condensed (75 min)", "Workshop"],
  scenarios: [
    "A government weighs mandatory algorithmic impact assessments for public-sector AI",
    "A multinational faces conflicting data protection regulations across three jurisdictions",
    "An AI hiring tool shows statistically significant disparities across demographic groups",
    "A city council debates the deployment of predictive policing software",
    "A hospital system must decide whether to adopt an AI diagnostic tool without full explainability",
  ],
  included: [
    "Facilitator guide with session timings and discussion prompts",
    "Student briefing packs with role assignments and evidence documents",
    "Pre-session reading list and preparation questions",
    "Assessment rubric aligned to critical thinking and argumentation standards",
    "Post-session reflection worksheet",
    "Slide deck for instructor-led delivery",
  ],
};

const futureOfWork = {
  title: "Future of Work",
  positioning:
    "How should societies respond when technology reshapes employment? This module confronts students with workforce policy decisions that have no clean answers, from automation-driven displacement to the gig economy, universal basic income, and the role of retraining at scale.",
  audiences: ["University", "School", "Organization"],
  formats: ["Full session (2.5 hrs)", "Condensed (75 min)", "Workshop"],
  scenarios: [
    "A national government debates a universal basic income pilot in response to automation",
    "A logistics company must decide whether to automate 40 percent of its warehouse workforce",
    "A trade union negotiates transition terms for workers displaced by AI-driven processes",
    "A city with a declining manufacturing base evaluates competing economic development proposals",
    "A university redesigns its curriculum to prepare graduates for a labor market reshaped by generative AI",
  ],
  included: [
    "Facilitator guide with session timings and discussion prompts",
    "Student briefing packs with role assignments and evidence documents",
    "Pre-session reading list and preparation questions",
    "Assessment rubric aligned to critical thinking and argumentation standards",
    "Post-session reflection worksheet",
    "Slide deck for instructor-led delivery",
  ],
};

function ModuleSection({
  module,
}: {
  module: typeof aiGovernance;
}) {
  return (
    <div className="rounded border border-border bg-white p-8 md:p-10">
      <div className="mb-4 flex flex-wrap gap-2">
        {module.audiences.map((a) => (
          <span
            key={a}
            className="rounded bg-surface px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-muted"
          >
            {a}
          </span>
        ))}
        {module.formats.map((f) => (
          <span
            key={f}
            className="rounded border border-border px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-muted"
          >
            {f}
          </span>
        ))}
      </div>

      <h3 className="mb-3 font-serif text-2xl">{module.title}</h3>
      <p className="mb-6 max-w-3xl text-muted">{module.positioning}</p>

      <div className="mb-6">
        <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
          What students confront
        </h4>
        <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
          {module.scenarios.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
          What is included
        </h4>
        <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
          {module.included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <Button variant="primary" href="/book-pilot">
        Book a pilot session
      </Button>
    </div>
  );
}

export default function ModulesPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Modules"
            title="Modules built for live debate and real-world judgment"
            description="Each module is a self-contained teaching package. It includes everything an instructor or facilitator needs to run a structured, evidence-based debate session. Modules are designed to be delivered in a single session or adapted across multiple class meetings."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <ModuleSection module={aiGovernance} />
          <ModuleSection module={futureOfWork} />
        </div>
      </section>

      <section className="py-20 md:py-24 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Flexible licensing"
            title="License one module or build a broader program"
            centered
          />
          <p className="mx-auto mt-6 max-w-3xl text-center text-muted">
            Reflect First is a modular platform. Institutions can license a
            single module to test the format, then expand to additional topics as
            the program grows. Each module works independently, but they share a
            common pedagogical framework, assessment structure, and facilitation
            methodology. This means students develop transferable skills across
            modules, and instructors benefit from a consistent delivery
            experience.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button variant="primary" href="/pricing">
              View licensing options
            </Button>
            <Button variant="secondary" href="/contact">
              Get in touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
