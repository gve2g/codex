import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import CTABand from "@/components/ui/CTABand";
import StepsComponent from "@/components/ui/StepsComponent";
import ModuleCard from "@/components/modules/ModuleCard";
import ScenarioBriefCarousel from "@/components/ui/ScenarioBriefCarousel";

export default function Home() {
  return (
    <main>
      {/* ───────────────────── 1. Hero ───────────────────── */}
      <section className="py-24 md:py-32" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                Case-based learning for the AI era
              </p>
              <hr className="mb-6 w-16 border-t border-accent" />
              <h1 id="hero-heading" className="max-w-3xl text-balance font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                Ready-to-deliver AI policy case studies for universities and schools
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted">
                Students take roles, review evidence, debate, and work toward
                a recommendation on real questions about AI, work, and public
                policy.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/book-pilot" variant="primary" size="lg">
                  Book a Pilot Workshop
                </Button>
                <Button href="/sample" variant="secondary" size="lg">
                  Download a Sample Scenario
                </Button>
              </div>
            </div>
            <ScenarioBriefCarousel />
          </div>
        </div>
      </section>

      {/* ───────────────────── 2. UBC Credibility Strip ───────────────────── */}
      <section className="border-t border-b border-accent/20 bg-accent/5 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground">
                Developed through AI policy workshops facilitated at the University of British Columbia
              </p>
            </div>
            <div className="hidden h-8 w-px bg-accent/20 md:block" />
            <p className="text-sm font-medium text-foreground">
              Led by UBC alumni facilitators
            </p>
            <div className="hidden h-8 w-px bg-accent/20 md:block" />
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.75 3.75 0 0 0 12.75 10.5h-1.5A3.75 3.75 0 0 0 7.5 14.25v4.5m9-4.5V9a3.75 3.75 0 0 0-3.75-3.75h-1.5A3.75 3.75 0 0 0 7.5 9v.75" />
              </svg>
              <p className="text-sm font-medium text-foreground">
                Recipient of UBC Alumni Builder Award
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 3. How It Works (3 steps) ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="How it works" />
          <div className="mt-10">
            <StepsComponent
              steps={[
                {
                  number: 1,
                  title: "Choose a module or pilot",
                  description:
                    "Pick from two ready-to-run modules — Frontier Technologies or Public Policy and The Future of Work. Start with a single pilot workshop to evaluate fit, or license a module for your program.",
                },
                {
                  number: 2,
                  title: "Receive the digital teaching package",
                  description:
                    "Every module includes facilitator guides, student briefing packs, role assignments, evidence documents, slide decks, assessment rubrics, and reflection worksheets. Ready to deliver on day one.",
                },
                {
                  number: 3,
                  title: "Deliver with support",
                  description:
                    "Run workshops yourself with our facilitator guide, complete a certification workshop for deeper preparation, or book our team to deliver directly.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── 4. Audience Cards ───────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="Who it's for" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-8">
              <h3 className="font-serif text-xl font-semibold">For Universities</h3>
              <p className="mt-3 text-sm text-muted">
                Integrate structured debate into political science, public policy, law, business, and more. Ready-to-deliver teaching packages with facilitator guides, student briefs, and assessment tools.
              </p>
              <Link href="/for-universities" className="mt-5 inline-block text-sm font-medium text-accent hover:underline">
                Learn more &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-8">
              <h3 className="font-serif text-xl font-semibold">For Schools</h3>
              <p className="mt-3 text-sm text-muted">
                Case-based AI policy workshops for Grades 10–12. Age-appropriate scenarios that fit a standard timetable, with grade-specific content and scaffolded materials.
              </p>
              <Link href="/for-schools" className="mt-5 inline-block text-sm font-medium text-accent hover:underline">
                Learn more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 5. Modules ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Modules"
            title="Two ready-to-run modules with 10+ scenarios"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ModuleCard
              title="Frontier Technologies"
              description="Predictive policing, facial recognition, algorithmic hiring, AI diagnostics: students take on the roles of policymakers, regulators, executives, and advocates to work through real technology dilemmas."
              audiences={["Universities", "Schools"]}
              scenarios={[
                "Predictive policing",
                "Facial recognition",
                "Algorithmic hiring",
                "AI diagnostics",
                "Data sovereignty",
                "and more",
              ]}
              href="/modules"
            />
            <ModuleCard
              title="Public Policy and The Future of Work"
              description="Automation, gig economy regulation, universal basic income, workforce retraining: students represent CEOs, union leaders, government ministers, and affected workers to debate the path forward."
              audiences={["Universities", "Schools"]}
              scenarios={[
                "Workforce automation",
                "Gig economy regulation",
                "Universal basic income",
                "AI curriculum redesign",
                "Union negotiation",
                "and more",
              ]}
              href="/modules"
            />
          </div>
          <p className="mt-6 text-sm text-muted">
            <Link href="/for-schools" className="text-accent hover:underline">
              See scenarios by grade level &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ───────────────────── 6. What's in the package (visual) ───────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="What you receive"
            title="A complete digital teaching package"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold">Scenario Brief</h3>
              <p className="mt-2 text-sm text-muted">
                The full case scenario with context, background facts, key tensions, and the decision students must reach.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold">Role Assignment Sheets</h3>
              <p className="mt-2 text-sm text-muted">
                Individual role briefs with position, evidence, objectives, and talking points for each stakeholder.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-serif text-base font-semibold">Facilitator Guide</h3>
              <p className="mt-2 text-sm text-muted">
                Minute-by-minute session plan with timings, discussion prompts, debrief questions, and assessment rubrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 7. Testimonials ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="From the classroom"
            title="What faculty and students say"
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <blockquote className="flex flex-col justify-between rounded-xl border border-border bg-surface p-8">
              <p className="font-serif text-lg leading-relaxed">
                &ldquo;Our students could not receive better preparation for being
                well positioned for AI in the workplace.&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted">
                <strong className="text-foreground">Richard Price</strong>
                <br />
                Professor and Director of Graduate Studies, UBC
              </footer>
            </blockquote>
            <blockquote className="flex flex-col justify-between rounded-xl border border-border bg-surface p-8">
              <p className="font-serif text-lg leading-relaxed">
                &ldquo;Easily my most interactive and rewarding class of the year.
                Learning felt both grounded and future-focused.&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted">
                <strong className="text-foreground">Makali M.</strong>
                <br />
                University student, Political Science, UBC
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────────────────── 8. Institutional readiness ───────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Built for institutions"
            title="Designed to fit how schools and universities work"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-serif text-sm font-semibold">Curriculum-aligned outcomes</h3>
              <p className="mt-1.5 text-xs text-muted">
                Every module maps to critical thinking, communication, and
                collaboration standards. Documentation included.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-serif text-sm font-semibold">Measurable impact</h3>
              <p className="mt-1.5 text-xs text-muted">
                Built-in pre/post assessments generate real outcome data
                for reporting and accreditation.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-serif text-sm font-semibold">Proven since 2021</h3>
              <p className="mt-1.5 text-xs text-muted">
                Developed through AI policy workshops facilitated at UBC.
                Consistently strong evaluations across multiple cohorts.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-5">
              <h3 className="font-serif text-sm font-semibold">Procurement-friendly</h3>
              <p className="mt-1.5 text-xs text-muted">
                Invoice and purchase-order billing. Vendor registration
                docs on request. Academic-year billing cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 9. Final CTA ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <CTABand
            title="See what a workshop looks like"
            primaryLabel="Book a Pilot Workshop"
            primaryHref="/book-pilot"
            secondaryLabel="Download a sample scenario"
            secondaryHref="/sample"
          />
        </div>
      </section>
    </main>
  );
}
