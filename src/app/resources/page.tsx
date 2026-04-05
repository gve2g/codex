import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import ResourceCard from "@/components/resources/ResourceCard";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Resources | Case & Signal",
  description:
    "Download sample scenarios, read articles on structured debate pedagogy, and explore resources for integrating Case & Signal into your teaching.",
};

const resources = [
  {
    title: "Sample Scenario: Frontier Technologies",
    type: "Download",
    description:
      "A complete sample scenario from the Frontier Technologies module. Includes the scenario brief, role assignment sheets, and facilitator notes so you can see exactly what a Case & Signal workshop looks like.",
    href: "/sample",
  },
  {
    title: "The Case for Case Studies in Political Science and the Humanities",
    type: "Article",
    description:
      "Case-based teaching built law and business schools into engines of professional judgment. The same method belongs in political science, public policy, and the humanities, from university lecture halls to high school classrooms.",
    href: "/resources/case-for-case-studies",
  },
  {
    title: "How to Teach AI Ethics Without Losing the Room",
    type: "Article",
    description:
      "AI ethics can feel abstract. This article explores how structured debate transforms passive learning into active engagement, giving students real stakes and real roles instead of lecture slides.",
    href: "/resources/how-to-teach-ai-ethics",
  },
  {
    title: "Why AI Governance Belongs in Every Curriculum",
    type: "Article",
    description:
      "AI is reshaping policy, labour, and society. This article makes the case for embedding AI governance across disciplines, not just in computer science departments.",
    href: "/resources/why-ai-governance",
  },
  {
    title: "Learning Outcomes and Assessment Framework",
    type: "Guide",
    description:
      "An overview of the learning outcomes mapped to each module, the assessment rubrics included in every teaching package, and how to use pre/post data for reporting and accreditation.",
    href: "/contact",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Resources"
            title="Sample materials and reading"
            description="Preview what a Case & Signal teaching package looks like. Download a sample scenario, explore articles on the pedagogy, or review the assessment framework."
            centered
          />
        </div>
      </section>

      {/* What's in the teaching package */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-6 font-serif text-2xl">What&apos;s in the teaching package</h3>
          <p className="mb-8 max-w-3xl text-muted">
            Every module includes these three core assets, plus slide decks, assessment rubrics, and reflection worksheets.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
              <div className="border-b border-border bg-accent/5 px-5 py-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">Scenario Brief</span>
              </div>
              <div className="space-y-2 p-5">
                <div className="h-3 w-3/4 rounded bg-border/60" />
                <div className="h-3 w-full rounded bg-border/40" />
                <div className="h-3 w-5/6 rounded bg-border/40" />
                <div className="mt-4 h-3 w-2/3 rounded bg-border/60" />
                <div className="h-3 w-full rounded bg-border/40" />
                <div className="h-3 w-4/5 rounded bg-border/40" />
                <div className="h-3 w-3/4 rounded bg-border/40" />
              </div>
              <p className="border-t border-border px-5 py-3 text-xs text-muted">
                Full case context, background facts, key tensions, and the decision students must reach.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
              <div className="border-b border-border bg-accent/5 px-5 py-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">Role Assignment</span>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-accent/20" />
                  <div className="h-3 w-1/2 rounded bg-border/60" />
                </div>
                <div className="h-3 w-full rounded bg-border/40" />
                <div className="h-3 w-4/5 rounded bg-border/40" />
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-accent/20" />
                  <div className="h-3 w-2/5 rounded bg-border/60" />
                </div>
                <div className="h-3 w-full rounded bg-border/40" />
                <div className="h-3 w-3/4 rounded bg-border/40" />
              </div>
              <p className="border-t border-border px-5 py-3 text-xs text-muted">
                Individual role briefs with position, evidence, objectives, and talking points.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
              <div className="border-b border-border bg-accent/5 px-5 py-3">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">Facilitator Guide</span>
              </div>
              <div className="space-y-2 p-5">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 rounded bg-accent/30" />
                  <div className="h-3 w-full rounded bg-border/40" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 rounded bg-accent/30" />
                  <div className="h-3 w-5/6 rounded bg-border/40" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 rounded bg-accent/30" />
                  <div className="h-3 w-full rounded bg-border/40" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 rounded bg-accent/30" />
                  <div className="h-3 w-4/5 rounded bg-border/40" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-12 rounded bg-accent/30" />
                  <div className="h-3 w-3/4 rounded bg-border/40" />
                </div>
              </div>
              <p className="border-t border-border px-5 py-3 text-xs text-muted">
                Minute-by-minute plan with timings, prompts, debrief questions, and rubrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.title}
                title={resource.title}
                type={resource.type}
                description={resource.description}
                href={resource.href}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to see Case & Signal in your classroom?"
        primaryLabel="Book a Pilot Workshop"
        primaryHref="/book-pilot"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
      />
    </main>
  );
}
