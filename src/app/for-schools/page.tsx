import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import CTABand from "@/components/ui/CTABand";
import SchoolScenarioCarousel from "@/components/ui/SchoolScenarioCarousel";

export const metadata: Metadata = {
  title: "Case & Signal for Schools | Grades 10-12",
  description:
    "Structured debate modules for high school students in grades 10, 11, and 12. Age-appropriate scenarios on AI, automation, and technology policy that build real-world judgment.",
};

const sessionTimings = [
  "Briefing and role assignment (10 minutes)",
  "Evidence review and preparation (15 minutes)",
  "Structured debate rounds (30 minutes)",
  "Debrief and reflection (15 minutes)",
  "Optional written reflection (5 minutes)",
];

const teacherPackage = [
  "Step-by-step facilitator guide with timings and prompts",
  "Student briefing packs ready to print or distribute digitally",
  "Slide deck for introduction and debrief",
  "Assessment rubric aligned to critical thinking and communication standards",
  "Post-session reflection worksheet for students",
  "Facilitator training workshop available for teachers who want to deliver independently",
];

export default function ForSchoolsPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionIntro
                eyebrow="For schools: Grades 10, 11 &amp; 12"
                title="Case-based AI policy workshops for Grades 10–12"
                description="Case &amp; Signal puts high school students in the middle of real AI and technology decisions, as the policymaker, the business leader, the community advocate. Every scenario is age-appropriate, fits a standard timetable, and comes with a complete digital teaching package. Students research, debate, and work toward a recommendation together on real policy questions."
              />
            </div>
            <SchoolScenarioCarousel />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Why teachers keep coming back to this
          </h3>
          <p className="mb-4 max-w-3xl text-muted">
            You already know your students can think critically. The challenge
            is getting them to do it out loud, under pressure, with someone
            pushing back. Case &amp; Signal gives them a reason to. Every student
            has a role, evidence to work with, and a decision to defend. The
            format builds real confidence: not &ldquo;I wrote a good
            essay&rdquo; confidence, but &ldquo;I held my ground in a room full
            of people who disagreed with me&rdquo; confidence.
          </p>
          <p className="max-w-3xl text-muted">
            Teachers tell us these sessions are the highlight of the term:
            the day students come in with energy and leave still arguing in
            the hallway.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            What students debate, by grade
          </h3>
          <p className="mb-10 max-w-3xl text-muted">
            Every scenario is grounded in something students already encounter
            or will soon. The topics scale in complexity across grades, but the
            format stays the same: take a role, review the evidence, make an
            argument, reach a decision.
          </p>

          <div className="space-y-10">
            {/* Grade 10 */}
            <div className="rounded border border-border bg-surface p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-accent px-3 py-1 font-mono text-sm font-semibold text-white">
                  Grade 10
                </span>
                <span className="text-sm text-muted">
                  Everyday technology decisions with local stakes
                </span>
              </div>
              <p className="mb-4 text-muted">
                Grade 10 scenarios connect to students&apos; direct experience.
                The technology is familiar, the stakes are concrete, and the
                roles are people students can picture in their own community.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Should your school use AI to flag cheating?
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A school board is considering AI-powered plagiarism detection
                    for all assignments. Students play the principal, a teacher,
                    a student accused of cheating, and a parent. The tool catches
                    cheaters but also flags innocent students. Who decides what
                    counts as proof?
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    An algorithm picks who gets a summer job
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A city uses an automated system to rank applicants for summer
                    employment programs. Students represent the program director,
                    a rejected applicant, a city councillor, and the software
                    vendor. The system is faster, but it scores applicants from
                    certain areas lower. Is that a bug or a pattern?
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Should a store use facial recognition to prevent theft?
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A local retailer installs facial recognition cameras after a
                    rise in shoplifting. Students play the store manager, a
                    regular customer flagged by the system, a privacy advocate,
                    and a police liaison. Theft drops, but so does trust.
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Your feed is curated. Should it be?
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A social media company adjusts its algorithm to reduce
                    harmful content, but users say they are seeing less of what
                    they care about. Students represent the company, a teen
                    user, a mental health researcher, and a free-speech advocate.
                    Who should decide what you see?
                  </p>
                </div>
              </div>
            </div>

            {/* Grade 11 */}
            <div className="rounded border border-border bg-surface p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-accent px-3 py-1 font-mono text-sm font-semibold text-white">
                  Grade 11
                </span>
                <span className="text-sm text-muted">
                  Institutional decisions with competing interests
                </span>
              </div>
              <p className="mb-4 text-muted">
                Grade 11 scenarios put students in the middle of decisions made
                by institutions: hospitals, universities, employers, city
                governments. The stakeholders have conflicting priorities, and
                the right answer depends on whose interests you weigh most.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    A hospital adopts an AI that doctors can&apos;t explain
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    An AI diagnostic tool is more accurate than doctors for
                    detecting a specific cancer, but it cannot explain its
                    reasoning. Students play the hospital CEO, a radiologist, a
                    patient advocate, and a medical regulator. Do you trust a
                    tool you cannot understand?
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    A company replaces 200 warehouse workers with robots
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A logistics company announces that automation will eliminate
                    200 positions in a small community. Students represent the
                    company&apos;s operations VP, a warehouse worker with 15
                    years on the job, the mayor, and a retraining program
                    director. The company says it has to stay competitive. The
                    workers say the community cannot survive the layoffs.
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    A university uses AI to screen applicants
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A university&apos;s admissions office introduces an AI tool
                    to handle the first round of application screening. The tool
                    is fast but tends to favour applicants from well-funded
                    schools. Students play the admissions dean, an applicant
                    from a rural school, a data scientist who built the tool,
                    and a trustee focused on diversity.
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Gig workers want benefits. The platform says no.
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A ride-sharing platform classifies its drivers as
                    independent contractors. Drivers are organising for employee
                    status to get benefits. Students represent a platform
                    executive, a full-time driver, a government labour official,
                    and a rider who depends on low fares. Everyone has something
                    to lose.
                  </p>
                </div>
              </div>
            </div>

            {/* Grade 12 */}
            <div className="rounded border border-border bg-surface p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded bg-accent px-3 py-1 font-mono text-sm font-semibold text-white">
                  Grade 12
                </span>
                <span className="text-sm text-muted">
                  Policy-level decisions with national or global consequences
                </span>
              </div>
              <p className="mb-4 text-muted">
                Grade 12 scenarios deal with the questions that governments,
                regulators, and international bodies are grappling with right
                now. The stakes are bigger, the evidence is more ambiguous, and
                the trade-offs are harder to resolve. These sessions prepare
                students for the kind of reasoning expected in university and
                professional life.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Should the government mandate AI impact assessments?
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A government proposes requiring algorithmic impact
                    assessments before any public-sector AI system goes live.
                    Students play the minister responsible, a tech industry
                    lobbyist, a civil rights organisation director, and a senior
                    civil servant who has to implement whatever gets decided.
                    The assessments add time and cost. Skipping them risks harm.
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    A city votes on predictive policing
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    After a spike in crime, a city council considers deploying
                    predictive policing software. Students represent the mayor,
                    a police chief, a civil liberties advocate, and a
                    community association president from the area most
                    likely to be targeted. Crime data says it works. Community
                    data says it discriminates.
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Three countries, three sets of data rules
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    A multinational company operates in countries with
                    conflicting data protection laws. Students represent the
                    company&apos;s compliance officer, regulators from two
                    different jurisdictions, and a consumer rights group. What
                    the company is required to do in one country is illegal in
                    another. There is no option that satisfies everyone.
                  </p>
                </div>
                <div className="rounded border border-border bg-background p-5">
                  <h4 className="font-serif text-sm font-semibold">
                    Should the country pilot universal basic income?
                  </h4>
                  <p className="mt-1.5 text-xs text-muted">
                    Automation is displacing workers faster than retraining
                    programs can absorb them. A government weighs a UBI pilot.
                    Students play the finance minister, an economist who
                    supports UBI, a business leader who opposes it, and a
                    displaced worker who is running out of options. The question
                    is not whether automation is coming. It is who pays for the
                    transition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-8 font-serif text-2xl">What makes the format work</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <Card
              title="Flexible session formats"
              description="Modules adapt to your timetable, from a single 75-minute double lesson to a full-day or multi-day program. A typical 75-minute session is tightly paced and includes:"
            >
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
                {sessionTimings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                For longer formats, sessions expand to include deeper evidence review, extended debate rounds, and written policy recommendations. For shorter lesson periods, the module can be split across two sessions with a natural break after the preparation phase.
              </p>
            </Card>
            <Card
              title="Age-appropriate adaptation"
              description="School modules use the same real-world scenarios as the university version, but with adapted briefing materials, simplified evidence documents, and additional scaffolding. Role descriptions are clearer, discussion prompts are more structured, and the facilitator guide includes specific guidance for managing debate with younger participants. The goal is to maintain intellectual rigor while ensuring accessibility."
            />
            <Card
              title="Career relevance"
              description="Every module connects to real career paths and professional contexts. Students see how the skills they are developing, such as argumentation, evidence evaluation, stakeholder analysis, and decision-making under uncertainty, are directly relevant to careers in policy, law, business, technology, and public service. This makes the sessions valuable not only for subject learning but for careers education and personal development."
            />
            <Card
              title="Teacher support"
              description="Teachers receive a complete package with everything needed to deliver the session:"
            >
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
                {teacherPackage.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">Built for how schools work</h3>
          <p className="mb-6 max-w-3xl text-muted">
            We designed these modules to work within real institutional
            constraints: standard timetables, curriculum standards, and
            the need for measurable outcomes.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded border border-border bg-surface p-5">
              <h4 className="font-serif text-sm font-semibold">
                Try it first with a pilot session
              </h4>
              <p className="mt-1.5 text-xs text-muted">
                We deliver the first session ourselves. No license required,
                no facilitator training, no upfront commitment. See how your
                students respond before deciding on anything further.
              </p>
            </div>
            <div className="rounded border border-border bg-surface p-5">
              <h4 className="font-serif text-sm font-semibold">
                Learning outcomes included
              </h4>
              <p className="mt-1.5 text-xs text-muted">
                Every module comes with mapped learning outcomes aligned to
                critical thinking and communication standards, ready
                to include in program documentation.
              </p>
            </div>
            <div className="rounded border border-border bg-surface p-5">
              <h4 className="font-serif text-sm font-semibold">
                Built-in assessment tools
              </h4>
              <p className="mt-1.5 text-xs text-muted">
                Pre/post assessments and student reflection tools generate
                measurable outcome data for reporting and continuous
                improvement.
              </p>
            </div>
            <div className="rounded border border-border bg-surface p-5">
              <h4 className="font-serif text-sm font-semibold">
                Developed at UBC
              </h4>
              <p className="mt-1.5 text-xs text-muted">
                The format was developed through AI policy workshops
                facilitated at UBC since 2021, then adapted for high
                school with the same rigor and professional-quality materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="See it in action: book a pilot session for your class"
        primaryLabel="Book a Pilot Workshop"
        primaryHref="/book-pilot"
        secondaryLabel="Download a sample scenario"
        secondaryHref="/sample"
      />
    </main>
  );
}
