import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import StepsComponent from "@/components/ui/StepsComponent";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Facilitator Training | Case & Signal",
  description:
    "Train your facilitators to deliver Case & Signal sessions, or hire our team to deliver directly. Two paths to get Case & Signal into your classroom.",
};

const trainingSteps = [
  {
    number: 1,
    title: "Choose your path",
    description:
      "Decide whether to train your own facilitator or book our team to deliver. Many institutions start with a delivered session, then train their own people for ongoing use.",
  },
  {
    number: 2,
    title: "Attend the training workshop",
    description:
      "Your facilitator joins a half-day workshop led by the Case & Signal team. They learn the methodology, practice managing debate dynamics, and receive session-specific delivery guidance.",
  },
  {
    number: 3,
    title: "Deliver with confidence",
    description:
      "Trained facilitators receive full access to session materials and ongoing support. Run sessions independently, adapt to your schedule, and reach out to our team whenever you need guidance.",
  },
];

export default function CertificationPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Facilitator training"
            title="Two ways to bring Case & Signal to your classroom"
            description="Every Case &amp; Signal session needs a skilled facilitator. You can train your own people to deliver, let our team handle it, or combine both."
            centered
          />
          <p className="mx-auto mt-6 max-w-3xl text-center text-muted">
            Training workshops can be delivered in person or online. A typical workshop runs 3-4 hours and accommodates up to 12 facilitators.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          <div>
            <h3 className="mb-4 font-serif text-2xl">
              Train your facilitator
            </h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                Your instructor, professor, or in-house trainer attends a
                half-day training workshop led by the Case & Signal team
              </li>
              <li>
                They learn the methodology, practice managing structured debate,
                and receive detailed delivery guidance
              </li>
              <li>
                One-time training fee, then ongoing access to materials under
                your license
              </li>
              <li>
                Ideal for institutions running multiple sessions per term
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">Hire us to deliver</h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>
                A Case & Signal team member delivers the session directly to
                your students or team
              </li>
              <li>
                We can also co-deliver alongside your instructor, a good option
                for the first session before they take over independently
              </li>
              <li>Priced per session, no training required</li>
              <li>
                Ideal for pilot sessions, one-off events, or conferences
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">
              What facilitator training covers
            </h3>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>The Case & Signal methodology and session structure</li>
              <li>Managing structured debate and group dynamics</li>
              <li>Running effective debrief conversations</li>
              <li>Using the assessment framework and reflection tools</li>
              <li>Handling difficult moments and sensitive topics</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">
              Why we require facilitator training
            </h3>
            <p className="max-w-3xl text-muted">
              Case & Signal sessions are not lectures or panel discussions. They
              require active facilitation: managing debate dynamics, drawing out
              quieter voices, pressing students to engage with evidence they'd
              rather ignore. The training workshop ensures your facilitator is
              prepared for what makes these sessions work.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">How it works</h3>
            <StepsComponent steps={trainingSteps} />
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to get started?"
        primaryLabel="Book a training workshop"
        primaryHref="/contact"
        secondaryLabel="Hire us to deliver"
        secondaryHref="/book-pilot"
      />
    </main>
  );
}
