import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import StepsComponent from "@/components/ui/StepsComponent";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "How It Works | Case & Signal",
  description:
    "From choosing a format to measuring outcomes, here is how Case & Signal works for universities, schools, and organizations.",
};

const steps = [
  {
    number: 1,
    title: "Choose your format",
    description:
      "Case & Signal adapts to your institution and audience. Select the delivery model that fits your context.",
    items: [
      "University integration — embed modules into existing courses or run standalone sessions",
      "School program — age-appropriate, curriculum-aligned sessions designed for secondary students",
      "Pilot session — a single facilitated session to evaluate the format before committing to a license",
      "Facilitator-led delivery — book a Case & Signal facilitator to run the session directly",
    ],
  },
  {
    number: 2,
    title: "Receive the teaching package",
    description:
      "Every module ships as a complete, ready-to-deliver package. There is no need to build materials from scratch.",
    items: [
      "Facilitator guide with detailed session timings and prompts",
      "Student briefing packs with role assignments and evidence documents",
      "Pre-session reading list and preparation questions",
      "Slide deck for instructor-led delivery",
      "Assessment rubric aligned to critical thinking standards",
      "Post-session reflection worksheet",
      "Digital access to all materials via the Case & Signal platform",
    ],
  },
  {
    number: 3,
    title: "Deliver with confidence",
    description:
      "You control how sessions are delivered. We provide the structure and support.",
    items: [
      "Run sessions yourself using the facilitator guide and materials provided",
      "Complete the facilitator training workshop for deeper preparation",
      "Book a Case & Signal facilitator to deliver on your behalf",
      "Access onboarding support and pre-session briefings",
    ],
  },
  {
    number: 4,
    title: "Measure and improve",
    description:
      "Every module includes built-in assessment tools so you can demonstrate impact and refine delivery over time.",
    items: [
      "Pre- and post-session assessments to measure shifts in reasoning and argumentation",
      "Student self-reflection surveys",
      "Facilitator observation rubrics",
      "Evidence of learning outcomes for accreditation and reporting",
      "Session feedback collection for continuous improvement",
    ],
  },
  {
    number: 5,
    title: "Stay current",
    description:
      "Policy debates move quickly. Case & Signal materials are maintained and updated so your sessions remain relevant.",
    items: [
      "Quarterly content reviews and scenario updates",
      "Versioned materials with clear changelogs",
      "New modules released on a regular cadence",
      "Notification of updates for all licensed institutions",
      "Access to the latest version always included in your license",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="How it works"
            title="From setup to delivery in five steps"
            description="Case & Signal is designed to be straightforward for institutions to adopt and for instructors to deliver. Here is the process from start to finish."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <StepsComponent steps={steps} layout="vertical" />
        </div>
      </section>

      <CTABand
        title="Ready to see Case & Signal in action?"
        primaryLabel="Book a pilot session"
        primaryHref="/book-pilot"
        secondaryLabel="View modules"
        secondaryHref="/modules"
      />
    </main>
  );
}
