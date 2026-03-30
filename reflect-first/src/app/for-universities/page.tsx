import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Reflect First for Universities",
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
          <SectionIntro
            eyebrow="For universities"
            title="Structured debate that fits university teaching"
            description="Reflect First modules are designed for higher education. They integrate into existing courses, align with learning outcomes, and give students practice making decisions under conditions of genuine complexity."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Why this fits university teaching
          </h3>
          <p className="mb-6 max-w-3xl text-muted">
            University students are expected to think critically, but most
            courses assess this through essays and exams. Reflect First provides
            a structured environment where students must articulate positions,
            respond to challenges in real time, and engage with perspectives they
            may disagree with. This is closer to the demands of professional
            life than any written assignment.
          </p>
          <p className="max-w-3xl text-muted">
            Modules are designed by educators and policy professionals. They
            include everything needed for delivery: facilitator guides, student
            briefing packs, assessment rubrics, and supporting materials. No
            preparation from scratch is required.
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
            <div className="rounded border border-border bg-white p-6 md:p-8">
              <h4 className="mb-2 font-serif text-lg">Instructor-led</h4>
              <p className="text-sm text-muted">
                Your own faculty deliver sessions using the Reflect First
                facilitator guide and materials. Optional certification
                available for deeper preparation.
              </p>
            </div>
            <div className="rounded border border-border bg-white p-6 md:p-8">
              <h4 className="mb-2 font-serif text-lg">Facilitator-led</h4>
              <p className="text-sm text-muted">
                Book a certified Reflect First facilitator to deliver the
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
            <li>Option to add facilitator certification</li>
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

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Procurement and licensing
          </h3>
          <p className="max-w-3xl text-muted">
            Reflect First is designed to work within institutional procurement
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
        title="Bring structured debate to your university"
        primaryLabel="Book a pilot session"
        primaryHref="/book-pilot"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
      />
    </main>
  );
}
