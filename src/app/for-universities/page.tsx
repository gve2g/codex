import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";
import UniversityScenarioCarousel from "@/components/ui/UniversityScenarioCarousel";

export const metadata: Metadata = {
  title: "Case & Signal for Universities",
  description:
    "Structured debate modules designed for university courses. Ready-to-deliver teaching packages for political science, public policy, law, business, and more.",
};

const departments = [
  {
    title: "Political Science",
    description:
      "Policy analysis, governance structures, and the politics of regulation. Modules align directly with courses on public policy, comparative politics, and political theory.",
  },
  {
    title: "Public Policy",
    description:
      "Evidence-based policy design, stakeholder analysis, and the trade-offs inherent in real-world governance decisions.",
  },
  {
    title: "Law",
    description:
      "Regulatory frameworks, rights-based argumentation, and the intersection of technology and legal systems.",
  },
  {
    title: "Business and MBA",
    description:
      "Corporate strategy under uncertainty, ethical decision-making, workforce planning, and the business implications of emerging regulation.",
  },
  {
    title: "Economics",
    description:
      "Labor market dynamics, automation and productivity, welfare economics, and the distributional consequences of technological change.",
  },
  {
    title: "Sociology",
    description:
      "Social inequality, the future of work, digital divides, and the societal impacts of algorithmic decision-making.",
  },
  {
    title: "Career and Experiential Learning",
    description:
      "Professional skills development, structured argumentation, teamwork under pressure, and preparation for complex workplace decisions.",
  },
];

const useCases = [
  "Full session embedded in a semester-long course",
  "Seminar-style delivery as a standalone class meeting",
  "Guest lecture format with facilitated debate",
  "Workshop for student societies or co-curricular programs",
  "Executive education and professional development",
  "Interdisciplinary capstone or cross-departmental event",
];

export default function ForUniversitiesPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionIntro
                eyebrow="For universities"
                title="The session students rate highest on evaluations"
                description="Case & Signal modules integrate into your existing courses and give students the one thing lectures and essays cannot: the experience of defending a position under challenge, in real time, with someone who disagrees. Students leave with sharper judgment, stronger communication skills, and the kind of engagement that shows up in course evaluations."
              />
            </div>
            <UniversityScenarioCarousel />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Why faculty keep using it
          </h3>
          <p className="mb-6 max-w-3xl text-muted">
            You assign a 200-page reading and five students do it. You run a
            Case &amp; Signal session and everyone shows up prepared, because they
            know they are about to argue in front of their peers with evidence
            they had 15 minutes to absorb. The format creates real stakes
            where essays cannot. Students articulate positions, respond to
            challenges in real time, and engage with perspectives they disagree
            with. This is closer to the demands of professional life than any
            written assignment.
          </p>
          <p className="max-w-3xl text-muted">
            Modules are designed by educators and policy professionals and
            include everything needed for delivery: facilitator guides, student
            briefing packs, assessment rubrics, and supporting materials. You
            can deliver a session with zero prep from scratch.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-8 font-serif text-2xl">Best-fit departments</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <Card
                key={dept.title}
                title={dept.title}
                description={dept.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">Delivery models</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded border border-border bg-surface p-6 md:p-8">
              <h4 className="mb-2 font-serif text-lg">Instructor-led</h4>
              <p className="text-sm text-muted">
                Your own faculty deliver sessions using the Case & Signal
                facilitator guide and materials. Facilitator training available
                for deeper preparation.
              </p>
            </div>
            <div className="rounded border border-border bg-surface p-6 md:p-8">
              <h4 className="mb-2 font-serif text-lg">Facilitator-led</h4>
              <p className="text-sm text-muted">
                Book a Case & Signal facilitator to deliver the
                session on campus. Ideal for pilot sessions, guest lectures, or
                high-profile events.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            What institutions receive
          </h3>
          <ul className="list-inside list-disc space-y-2 text-muted">
            <li>Complete module package with all teaching materials</li>
            <li>Digital access for instructors and students</li>
            <li>Assessment rubrics aligned to learning outcomes</li>
            <li>Pre- and post-session assessment tools</li>
            <li>Onboarding support and facilitator briefing</li>
            <li>Quarterly updates and new scenario releases</li>
            <li>Option to add facilitator training</li>
          </ul>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">Use cases</h3>
          <ul className="list-inside list-disc space-y-2 text-muted">
            {useCases.map((uc) => (
              <li key={uc}>{uc}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-8 font-serif text-2xl">From the classroom</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <blockquote className="flex flex-col justify-between rounded-lg border border-border bg-background p-8">
              <p className="font-serif text-lg leading-relaxed">
                &ldquo;Our students could not receive better preparation for being
                well positioned for AI in the workplace.&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted">
                <strong className="text-foreground">Richard Price</strong>
                <br />
                Professor and Director of Graduate Studies, Top 30 Global Research University
              </footer>
            </blockquote>
            <blockquote className="flex flex-col justify-between rounded-lg border border-border bg-background p-8">
              <p className="font-serif text-lg leading-relaxed">
                &ldquo;This was easily my most interactive and rewarding class of
                the year! Learning felt both grounded and future-focused.&rdquo;
              </p>
              <footer className="mt-6 text-sm text-muted">
                <strong className="text-foreground">Makali M.</strong>
                <br />
                University student, Political Science
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Procurement and licensing
          </h3>
          <p className="max-w-3xl text-muted">
            Case & Signal is designed to work within institutional procurement
            processes. We support invoice and purchase order workflows, provide
            vendor registration documentation on request, and offer
            institution-friendly onboarding. Licenses are available on an annual
            basis with options for single-module or multi-module access.
          </p>
          <div className="mt-6">
            <Button variant="secondary" href="/pricing">
              View pricing and licensing
            </Button>
          </div>
        </div>
      </section>

      <CTABand
        title="Try it with your students: book a pilot session"
        primaryLabel="Book a pilot session"
        primaryHref="/book-pilot"
        secondaryLabel="Download a sample scenario"
        secondaryHref="/sample"
      />
    </main>
  );
}
