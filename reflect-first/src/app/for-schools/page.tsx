import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Reflect First for Schools",
  description:
    "Structured debate modules adapted for secondary school students. Age-appropriate, curriculum-aligned, and designed to build critical thinking and career readiness.",
};

export default function ForSchoolsPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="For schools"
            title="Structured debate that works for schools"
            description="Reflect First modules are adapted for secondary school students. They are designed to be age-appropriate, curriculum-aligned, and deliverable within a standard timetable. Students engage with real policy questions and develop skills they will use long after they leave school."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl space-y-16 px-6">
          <div>
            <h3 className="mb-4 font-serif text-2xl">
              Why this works for schools
            </h3>
            <p className="max-w-3xl text-muted">
              Schools are under increasing pressure to develop critical thinking,
              communication, and collaboration skills alongside subject
              knowledge. Reflect First provides a structured way to do this.
              Students take on roles, engage with evidence, and participate in
              facilitated debate on issues that matter. The format builds
              confidence, teaches structured argumentation, and gives students
              practice making decisions under genuine uncertainty.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">The 75-minute format</h3>
            <p className="mb-4 max-w-3xl text-muted">
              The school version of each module is designed to fit within a
              75-minute session, the equivalent of a double lesson in most
              timetable structures. The session is tightly paced and includes:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>Briefing and role assignment (10 minutes)</li>
              <li>Evidence review and preparation (15 minutes)</li>
              <li>Structured debate rounds (30 minutes)</li>
              <li>Debrief and reflection (15 minutes)</li>
              <li>Optional written reflection (5 minutes)</li>
            </ul>
            <p className="mt-4 max-w-3xl text-muted">
              For schools with shorter lesson periods, the module can be split
              across two sessions with a natural break point after the
              preparation phase.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">
              Age-appropriate adaptation
            </h3>
            <p className="max-w-3xl text-muted">
              School modules use the same real-world scenarios as the university
              version, but with adapted briefing materials, simplified evidence
              documents, and additional scaffolding. Role descriptions are
              clearer, discussion prompts are more structured, and the
              facilitator guide includes specific guidance for managing debate
              with younger participants. The goal is to maintain intellectual
              rigor while ensuring accessibility.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">Career relevance</h3>
            <p className="max-w-3xl text-muted">
              Every module connects to real career paths and professional
              contexts. Students see how the skills they are developing, such as
              argumentation, evidence evaluation, stakeholder analysis, and
              decision-making under uncertainty, are directly relevant to careers
              in policy, law, business, technology, and public service. This
              makes the sessions valuable not only for subject learning but for
              careers education and personal development.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-2xl">Teacher support</h3>
            <p className="mb-4 max-w-3xl text-muted">
              Teachers receive a complete package with everything needed to
              deliver the session:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted">
              <li>Step-by-step facilitator guide with timings and prompts</li>
              <li>
                Student briefing packs ready to print or distribute digitally
              </li>
              <li>
                Slide deck for introduction and debrief
              </li>
              <li>
                Assessment rubric aligned to critical thinking and communication
                standards
              </li>
              <li>Post-session reflection worksheet for students</li>
              <li>
                Optional facilitator certification for teachers who want deeper
                preparation
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CTABand
        title="Bring structured debate to your school"
        primaryLabel="Book a pilot session"
        primaryHref="/book-pilot"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
      />
    </main>
  );
}
