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
                The class they actually talk about after
              </h1>
              <p className="mt-6 text-xl font-medium text-foreground">
                Case &amp; Signal puts students in the middle of real policy decisions.
              </p>
              <p className="mt-3 max-w-2xl text-lg text-muted">
                They take on roles, review evidence, debate, and
                work toward a recommendation together. No perfect answer.
                Real stakes. Built for universities and high schools.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/book-pilot" variant="primary" size="lg">
                  Book a Pilot Session
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

      {/* ───────────────────── 2. How It Works (short) ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="How it works" />
          <div className="mt-10">
            <StepsComponent
              steps={[
                {
                  number: 1,
                  title: "Choose a module and format",
                  description:
                    "Pick a module, session length, and delivery format. Available as half-day, full-day, or multi-session programs.",
                },
                {
                  number: 2,
                  title: "Book a pilot or license the package",
                  description:
                    "Start with a single pilot session to evaluate fit, or license a module for repeated use across your program.",
                },
                {
                  number: 3,
                  title: "Deliver with confidence",
                  description:
                    "Run sessions yourself with our facilitator guide, attend a half-day training workshop, or book our team to deliver directly.",
                },
                {
                  number: 4,
                  title: "Measure outcomes",
                  description:
                    "Use built-in pre/post assessments and student feedback tools to demonstrate impact and refine delivery.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── 3. Institutional proof strip ───────────────────── */}
      <section className="border-t border-border bg-surface py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center md:justify-start">
              <div>
                <p className="font-serif text-2xl font-semibold text-foreground">2021</p>
                <p className="text-xs text-muted">Running since</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-foreground">Top 30</p>
                <p className="text-xs text-muted">Global research university</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-foreground">10+ Scenarios</p>
                <p className="text-xs text-muted">AI governance + Future of work</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-semibold text-foreground">Gr 10–12 + University</p>
                <p className="text-xs text-muted">Both tracks available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 4. Session preview with timeline ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
                What a session looks like
              </p>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                Students take roles. They review evidence. They decide.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-muted">
                A city council is deciding whether to adopt predictive policing
                software. Your students are the mayor, the police chief, the civil
                liberties lawyer, and the community leader. Each has different
                briefing materials. Each has a legitimate case to make. They have
                15 minutes to prepare, then they work through it together. By the
                end, the group has to reach a recommendation. Not everyone will
                agree, and that is the point.
              </p>
            </div>
          </div>

          {/* Session timeline */}
          <div className="mt-12">
            <div className="flex flex-col gap-0 md:flex-row md:gap-0">
              {[
                { label: "Briefing", duration: "10 min", width: "w-[13%]" },
                { label: "Role Prep", duration: "15 min", width: "w-[20%]" },
                { label: "Debate", duration: "30 min", width: "w-[40%]" },
                { label: "Debrief", duration: "15 min", width: "w-[20%]" },
                { label: "Reflect", duration: "5 min", width: "w-[7%]" },
              ].map((stage, i) => (
                <div
                  key={stage.label}
                  className={`relative flex flex-col items-center justify-center border border-border px-3 py-4 md:${stage.width} ${
                    i === 0
                      ? "rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                      : i === 4
                        ? "rounded-b-lg md:rounded-r-lg md:rounded-bl-none"
                        : ""
                  } ${i === 2 ? "bg-accent/10" : "bg-surface"}`}
                >
                  <span className="font-mono text-xs font-semibold text-accent">{stage.duration}</span>
                  <span className="mt-1 text-xs text-muted">{stage.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 5. Modules ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Modules"
            title="Start with one module or build a broader program"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ModuleCard
              title="Frontier Technologies"
              description="Predictive policing, facial recognition, algorithmic hiring, AI diagnostics: students take on the roles of policymakers, regulators, executives, and advocates to work through real technology dilemmas."
              audiences={["Universities", "Schools", "Organizations"]}
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
              audiences={["Universities", "Schools", "Organizations"]}
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

      {/* ───────────────────── 6. Who it's for ───────────────────── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="Who it's for" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-serif text-lg font-semibold">For Universities</h3>
              <p className="mt-2 text-sm text-muted">
                Integrate structured debate into political science, public policy, law, business, and more. Ready-to-deliver packages with facilitator guides and assessments.
              </p>
              <Link href="/for-universities" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                Learn more &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-serif text-lg font-semibold">For Schools</h3>
              <p className="mt-2 text-sm text-muted">
                Age-appropriate scenarios for Grades 10–12 that fit a standard timetable. Grade-specific content with scaffolded materials.
              </p>
              <Link href="/for-schools" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                Learn more &rarr;
              </Link>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-serif text-lg font-semibold">For Organizations</h3>
              <p className="mt-2 text-sm text-muted">
                Professional development and executive education. Build policy literacy and structured decision-making skills in your team.
              </p>
              <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 7. Why it works ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="Why it works" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Card
              title="Students step into real roles"
              description="They are the mayor, the CEO, the laid-off worker. Every role has defensible evidence and real stakes. That is why the learning sticks."
            />
            <Card
              title="Ready to run on day one"
              description="Every module ships with a minute-by-minute facilitator guide, ready-to-print student briefs, slide decks, and debrief prompts. No prep from scratch."
            />
            <Card
              title="Updated every quarter"
              description="Scenarios reflect the latest AI and technology policy developments. Students are debating issues that are in the news right now."
            />
            <Card
              title="Skills employers hire for"
              description="Building a position under challenge, weighing competing evidence, making a decision with no right answer, and explaining it clearly to someone who disagrees."
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── 8. Delivery and licensing summary ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            title="Delivery and licensing"
            description="Flexible options for institutions of all sizes. Invoice and purchase-order billing supported."
          />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:gap-0 md:divide-x md:divide-border">
            {[
              { title: "Pilot session", description: "We deliver a full session with your students. No license required, no prep needed on your side. Includes debrief and feedback report." },
              { title: "Module license", description: "Annual access to one or both modules for your department. Includes all materials, assessments, and quarterly updates." },
              { title: "Facilitator training", description: "Half-day workshop to prepare your instructors for independent delivery. Available in person or online." },
              { title: "Direct delivery", description: "Book a Case & Signal facilitator for any session. Ideal for guest lectures, events, or co-delivery alongside your instructor." },
            ].map((a) => (
              <div key={a.title} className="md:flex-1 md:px-8 first:md:pl-0 last:md:pr-0">
                <h3 className="font-serif text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <Button href="/pricing" variant="secondary">
              View pricing details
            </Button>
          </div>
        </div>
      </section>

      {/* ───────────────────── 9. Testimonials ───────────────────── */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="From the classroom"
            title="What students and faculty say"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <blockquote className="flex flex-col justify-between rounded-xl border border-border bg-background p-6">
              <p className="font-serif text-base leading-relaxed">
                &ldquo;Our students could not receive better preparation for being
                well positioned for AI in the workplace.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">
                <strong className="text-foreground">Richard Price</strong>
                <br />
                Professor and Director of Graduate Studies, Top 30 Global Research University
              </footer>
            </blockquote>
            <blockquote className="flex flex-col justify-between rounded-xl border border-border bg-background p-6">
              <p className="font-serif text-base leading-relaxed">
                &ldquo;Easily my most interactive and rewarding class of the year.
                Learning felt both grounded and future-focused.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">
                <strong className="text-foreground">Makali M.</strong>
                <br />
                University student, Political Science
              </footer>
            </blockquote>
            <blockquote className="flex flex-col justify-between rounded-xl border border-border bg-background p-6">
              <p className="font-serif text-base leading-relaxed">
                &ldquo;I took this class in its first iteration in 2021 and learned
                so many practical skills. Great to see it still running.&rdquo;
              </p>
              <footer className="mt-4 text-sm text-muted">
                <strong className="text-foreground">Sophie R.</strong>
                <br />
                Alumni, Political Science
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────────────────── 10. Institutional readiness ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Built for institutions"
            title="Designed to fit how schools and universities work"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-serif text-sm font-semibold">Curriculum-aligned outcomes</h3>
              <p className="mt-1.5 text-xs text-muted">
                Every module maps to critical thinking, communication, and
                collaboration standards. Documentation included.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-serif text-sm font-semibold">Measurable impact</h3>
              <p className="mt-1.5 text-xs text-muted">
                Built-in pre/post assessments generate real outcome data
                for reporting and accreditation.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-serif text-sm font-semibold">Proven since 2021</h3>
              <p className="mt-1.5 text-xs text-muted">
                Developed in partnership with faculty at a Top 30 global
                research university. Consistently strong evaluations.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-serif text-sm font-semibold">Procurement-friendly</h3>
              <p className="mt-1.5 text-xs text-muted">
                Invoice and purchase-order billing. Vendor registration
                docs on request. Academic-year billing cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 11. Final CTA ───────────────────── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <CTABand
            title="See what a session looks like"
            primaryLabel="Book a pilot session"
            primaryHref="/book-pilot"
            secondaryLabel="Download a sample scenario"
            secondaryHref="/sample"
          />
        </div>
      </section>
    </main>
  );
}
