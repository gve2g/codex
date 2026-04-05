import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import StepsComponent from "@/components/ui/StepsComponent";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "How It Works | Case & Signal",
  description:
    "From choosing a module to delivering workshops, here is how Case & Signal works for universities and schools.",
};

const steps = [
  {
    number: 1,
    title: "Choose a module or pilot",
    description:
      "Select the module and delivery model that fits your context.",
    items: [
      "University integration — embed modules into existing courses or run standalone workshops",
      "School program — age-appropriate, curriculum-aligned workshops designed for secondary students",
      "Pilot workshop — a single facilitated workshop to evaluate the format before committing to a license",
      "Facilitator-led delivery — book a Case & Signal facilitator to run the workshop directly",
    ],
  },
  {
    number: 2,
    title: "Receive the digital teaching package",
    description:
      "Every module is delivered as a complete, ready-to-run teaching package. No need to build materials from scratch.",
    items: [
      "Facilitator guide with detailed session timings and prompts",
      "Student briefing packs with role assignments and evidence documents",
      "Pre-session reading list and preparation questions",
      "Slide deck for instructor-led delivery",
      "Assessment rubric aligned to critical thinking standards",
      "Post-session reflection worksheet",
    ],
  },
  {
    number: 3,
    title: "Deliver with support",
    description:
      "You control how workshops are delivered. We provide the structure and support.",
    items: [
      "Run workshops yourself using the facilitator guide and materials provided",
      "Complete the facilitator certification workshop for deeper preparation",
      "Book a Case & Signal facilitator to deliver on your behalf",
      "Access onboarding support and pre-session briefings",
      "Built-in pre/post assessments to measure impact and refine delivery",
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
            title="From setup to delivery in three steps"
            description="Case & Signal is designed to be straightforward for institutions to adopt and for instructors to deliver."
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
        primaryLabel="Book a Pilot Workshop"
        primaryHref="/book-pilot"
        secondaryLabel="View modules"
        secondaryHref="/modules"
      />
    </main>
  );
}
