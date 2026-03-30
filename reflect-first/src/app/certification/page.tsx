import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import StepsComponent from "@/components/ui/StepsComponent";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Facilitator Certification | Reflect First",
  description:
    "Become a certified Reflect First facilitator. Learn the methodology, practice delivery, and earn certification to lead structured debate sessions.",
};

const certificationSteps = [
  {
    number: 1,
    title: "Apply",
    description:
      "Submit an application with your background, teaching experience, and interest in facilitation. Applications are reviewed on a rolling basis.",
  },
  {
    number: 2,
    title: "Review materials",
    description:
      "Receive access to the full module package and facilitator guide. Complete the self-directed preparation, including reading, scenario analysis, and session planning.",
  },
  {
    number: 3,
    title: "Complete training",
    description:
      "Attend a live training session covering the Reflect First methodology, facilitation techniques, assessment practices, and common challenges.",
  },
  {
    number: 4,
    title: "Mock session",
    description:
      "Deliver a practice session observed by a senior facilitator. Receive structured feedback on pacing, questioning, and participant management.",
  },
  {
    number: 5,
    title: "Receive certification",
    description:
      "Upon successful completion, receive your Reflect First Facilitator Certification. You are now authorized to deliver sessions independently.",
  },
  {
    number: 6,
    title: "Renew annually",
    description:
      "Certification is valid for twelve months. Renewal involves a brief refresher, review of updated materials, and confirmation of ongoing facilitation activity.",
  },
];

export default function CertificationPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Certification"
            title="Facilitator Certification"
            description="Reflect First sessions depend on skilled facilitation. Our certification program ensures that every facilitator understands the methodology, can manage structured debate effectively, and maintains a consistent standard of delivery."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          <div>
            <h3 className="mb-4 font-serif text-2xl">
              Why certification exists
            </h3>
            <p className="max-w-3xl text-muted">
              Structured debate is not a standard lecture. It requires active
              facilitation: managing group dynamics, guiding argumentation
              without directing conclusions, and ensuring that all participants
              engage meaningfully with the material. Certification ensures that
              facilitators are prepared for these demands and that institutions
              can trust the quality of delivery.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">Who it is for</h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                University lecturers and teaching assistants who want to deliver
                Reflect First modules within their own courses
              </li>
              <li>
                Secondary school teachers integrating structured debate into
                their curriculum
              </li>
              <li>
                Independent facilitators who want to offer Reflect First sessions
                to organizations and institutions
              </li>
              <li>
                Corporate trainers and learning and development professionals
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">What it covers</h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                The Reflect First pedagogical framework and its theoretical
                foundations
              </li>
              <li>Session structure, timing, and pacing</li>
              <li>Facilitation techniques for structured debate</li>
              <li>Managing challenging dynamics and disagreements</li>
              <li>Assessment and feedback practices</li>
              <li>Adapting delivery for different audiences and formats</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">The process</h3>
            <StepsComponent steps={certificationSteps} />
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">Renewal</h3>
            <p className="max-w-3xl text-muted">
              Certification is valid for twelve months from the date of issue.
              Renewal requires completion of a brief refresher session, review of
              any updated module materials, and confirmation that the facilitator
              has delivered at least two sessions during the certification
              period. This ensures that certified facilitators remain current and
              actively engaged with the methodology.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">Quality assurance</h3>
            <p className="max-w-3xl text-muted">
              Reflect First maintains a quality assurance process for all
              certified facilitators. This includes optional session
              observations, participant feedback review, and access to ongoing
              professional development. Our goal is to ensure that every session
              delivered under the Reflect First name meets a consistent standard,
              regardless of who facilitates it.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Interested in becoming a certified facilitator?"
        primaryLabel="Apply now"
        primaryHref="/contact"
        secondaryLabel="Learn more about modules"
        secondaryHref="/modules"
      />
    </main>
  );
}
