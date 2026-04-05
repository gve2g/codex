import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Modules | Case & Signal",
  description:
    "Ready-to-run debate modules on Frontier Technologies and Public Policy and The Future of Work. Complete digital teaching packages for universities and schools.",
};

const frontierTechnologies = {
  title: "Frontier Technologies",
  positioning:
    "Who should control the rules for artificial intelligence? This module places students inside real regulatory dilemmas, from algorithmic bias in hiring to cross-border data sovereignty disputes. Participants must weigh competing interests, propose frameworks, and defend positions under pressure.",
  audiences: ["University", "School"],
  formats: ["75-minute", "Half-day", "Full-day", "Multi-day"],
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
  learningOutcomes: [
    "Analyze competing stakeholder interests in AI deployment decisions",
    "Evaluate trade-offs between innovation, public safety, and civil liberties",
    "Construct evidence-based policy recommendations under uncertainty",
    "Negotiate across institutional roles with conflicting mandates",
    "Apply ethical frameworks to real-world algorithmic governance dilemmas",
  ],
};

const publicPolicyFutureOfWork = {
  title: "Public Policy and The Future of Work",
  positioning:
    "How should societies respond when technology reshapes employment? This module confronts students with workforce policy decisions that have no clean answers, from automation-driven displacement to the gig economy, universal basic income, and the role of retraining at scale.",
  audiences: ["University", "School"],
  formats: ["75-minute", "Half-day", "Full-day", "Multi-day"],
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
  learningOutcomes: [
    "Assess the distributional impacts of automation across workforce segments",
    "Design transition policies that balance economic efficiency with worker protection",
    "Evaluate corporate, governmental, and labour perspectives on workforce disruption",
    "Build consensus across parties with asymmetric information and power",
    "Articulate policy positions grounded in economic and social evidence",
  ],
};

function ModuleSection({
  module,
}: {
  module: typeof frontierTechnologies;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-8 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {module.audiences.map((a) => (
              <span
                key={a}
                className="rounded-full bg-accent/10 px-3 py-0.5 font-mono text-xs uppercase tracking-wide text-accent"
              >
                {a}
              </span>
            ))}
            {module.formats.map((f) => (
              <span
                key={f}
                className="rounded-full border border-border px-3 py-0.5 font-mono text-xs uppercase tracking-wide text-muted"
              >
                {f}
              </span>
            ))}
          </div>

          <h3 className="mb-3 font-serif text-2xl">{module.title}</h3>
          <p className="mb-6 max-w-2xl text-muted">{module.positioning}</p>

          <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
            What students debate
          </h4>
          <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
            {module.scenarios.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
              What&apos;s included
            </h4>
            <ul className="space-y-2 text-sm text-foreground">
              {module.included.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">&mdash;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
              Learning outcomes
            </h4>
            <ol className="list-inside list-decimal space-y-1.5 text-sm text-foreground">
              {module.learningOutcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ol>
          </div>

          <Button variant="primary" href="/book-pilot">
            Book a pilot workshop
          </Button>
        </div>
      </div>
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
            title="Ready-to-run modules built for live debate"
            description="Each module is a complete digital teaching package with a growing library of scenarios. Every scenario includes facilitator guides, student briefs, and assessment tools."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-10 px-6">
          <ModuleSection module={frontierTechnologies} />
          <ModuleSection module={publicPolicyFutureOfWork} />
        </div>
      </section>

      <CTABand
        title="License one module or both"
        primaryLabel="View licensing options"
        primaryHref="/pricing"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
      />
    </main>
  );
}
