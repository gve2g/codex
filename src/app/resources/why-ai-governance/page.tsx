import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Why AI Governance Belongs in Every Curriculum | Case & Signal",
  description:
    "The case for making technology policy a core part of education, not an elective afterthought. From the EU AI Act to UNESCO frameworks, the world is demanding AI-literate graduates.",
};

export default function WhyAIGovernancePage() {
  return (
    <main>
      <article className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            Article
          </p>
          <h1 className="font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
            Why AI Governance Belongs in Every Curriculum
          </h1>
          <p className="mt-4 text-lg text-muted">
            The case for making technology policy a core part of education, not
            an elective afterthought.
          </p>
          <hr className="my-10 border-border" />

          <div className="prose-rf space-y-8 text-foreground">
            <h2 className="font-serif text-2xl">The rules have changed</h2>
            <p className="text-muted">
              In August 2024, the European Union&rsquo;s AI Act entered into
              force. By August 2026, its provisions will be fully applicable
              across all member states. The Act classifies AI applications in
              education (including admissions systems, grading tools, and
              student performance analytics) as high-risk, subjecting them
              to strict compliance requirements around transparency, human
              oversight, and risk management.
            </p>
            <p className="text-muted">
              Article 4 of the Act introduces a mandatory AI literacy obligation:
              organisations that deploy AI systems must make sure their staff have
              sufficient understanding of AI to make informed decisions about
              its use. This is not a recommendation. It is a legal requirement
              that took effect in February 2025.
            </p>
            <p className="text-muted">
              The EU is not alone. UNESCO&rsquo;s 2025 AI Competency Frameworks
              outline twelve competencies for students across four
              dimensions, grounded in a vision of students as &ldquo;AI
              co-creators and responsible citizens.&rdquo; The frameworks
              emphasise critical judgment of AI solutions, awareness of
              citizenship responsibilities, and inclusive design. These are capacities
              that cannot be developed through technical training alone.
            </p>
            <p className="text-muted">
              Students will learn about AI governance one way or another.
              The question facing educators now is whether they learn it
              in a classroom, with structure and guidance, or on the job,
              without either.
            </p>

            <h2 className="font-serif text-2xl">
              AI governance is not just for policy students
            </h2>
            <p className="text-muted">
              There is a persistent assumption that AI governance is a niche
              topic, something for political science majors, law students,
              or the occasional interdisciplinary seminar. This assumption is
              increasingly disconnected from reality.
            </p>
            <p className="text-muted">
              Consider the range of professionals who now make AI governance
              decisions as part of their daily work. A hospital administrator
              deciding whether to adopt an AI diagnostic tool. A human resources
              director evaluating an automated hiring system. A city manager
              weighing a predictive policing proposal. A school principal
              choosing which AI tools students can use in the classroom. A
              journalist deciding how to report on algorithmic decision-making.
            </p>
            <p className="text-muted">
              None of these people holds the title of &ldquo;AI
              ethicist.&rdquo; All of them make decisions that shape how AI
              affects communities. If they graduated without ever grappling with
              these questions in a structured way, they are making
              consequential choices without preparation.
            </p>
            <p className="text-muted">
              This is why AI governance belongs across the curriculum, not
              confined to a single department, but embedded in the disciplines
              where students will eventually encounter it: business,
              healthcare, law, education, public administration, journalism,
              computer science, and beyond.
            </p>

            <h2 className="font-serif text-2xl">
              The skills deficit is already visible
            </h2>
            <p className="text-muted">
              A 2025 survey by EDUCAUSE found that only 39 percent of higher
              education institutions had AI-related acceptable use policies in
              place, up from 23 percent the previous year. Progress is real but
              uneven: 61 percent of institutions still lack formal policy
              guidance on AI use. The gap is not a technology problem. It is a
              capacity problem. Institutions do not have enough people who can
              reason carefully about AI trade-offs: when to prioritise innovation over
              caution, efficiency over equity, speed over
              transparency.
            </p>
            <p className="text-muted">
              The same deficit appears in industry. Organisations adopting AI
              systems are discovering that compliance with frameworks like the
              EU AI Act requires more than legal review. It requires people at
              every level who can identify where AI is being used, understand
              what risks it introduces, and make informed decisions about
              how to proceed. This is governance literacy, and it
              is in short supply.
            </p>
            <p className="text-muted">
              By the end of 2026, AI literacy is projected to be treated as a
              baseline competency across degree programs, treated as fundamental as
              digital literacy was a decade ago. Institutions that wait to
              build this capacity will find themselves behind a curve that is
              moving faster than curriculum committees typically operate.
            </p>

            <h2 className="font-serif text-2xl">
              What AI governance education actually looks like
            </h2>
            <p className="text-muted">
              Effective AI governance education is not a lecture series on
              ethical principles. It is structured practice in the kind of
              judgment that governance demands.
            </p>
            <p className="text-muted">
              That means putting students in scenarios where they must weigh
              competing evidence, represent stakeholders with conflicting
              interests, and make decisions under real uncertainty. It means
              using real regulatory frameworks: the EU AI Act, national AI
              strategies, institutional AI policies. These should be the backdrop for
              case-based exercises, not as abstract reading assignments.
            </p>
            <p className="text-muted">
              It means moving beyond the format of &ldquo;discuss the ethical
              implications&rdquo; and into the format of &ldquo;you are the
              decision-maker, the stakeholders are in the room, and you have
              ninety minutes to reach a recommendation.&rdquo; This is the
              difference between understanding governance in theory and
              practising it under the conditions that make it hard.
            </p>
            <p className="text-muted">
              The pedagogical evidence supports this approach. Decades of
              research on Structured Academic Controversy and deliberative
              pedagogy show that students who engage with complex issues
              through role-based deliberation develop stronger critical
              thinking, greater capacity for perspective-taking, and more
              durable understanding than those who encounter the same material
              through lectures or traditional discussion.
            </p>

            <h2 className="font-serif text-2xl">
              Five reasons to act now
            </h2>
            <p className="text-muted">
              <strong className="text-foreground">1. Regulation is arriving faster than curricula can adapt.</strong>{" "}
              The EU AI Act&rsquo;s high-risk provisions apply from August
              2026. Graduates entering the workforce that year will be expected
              to understand AI governance from day one. The window to prepare
              them is closing.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">2. Employers are hiring for judgment, not just technical skill.</strong>{" "}
              The ability to evaluate AI trade-offs, communicate risks to
              non-technical stakeholders, and make defensible recommendations
              under uncertainty is becoming a core professional competency
              across sectors.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">3. Students are already encountering AI governance decisions.</strong>{" "}
              From AI-assisted grading to automated proctoring to generative
              AI in coursework, students are living inside AI governance
              questions right now. Education that helps them reason about these
              systems is not abstract. It is immediately relevant to their
              own experience.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">4. The interdisciplinary opportunity is unique.</strong>{" "}
              AI governance sits at the intersection of technology, law,
              ethics, economics, and public policy. Few topics offer the same
              potential for cross-disciplinary teaching that connects to real
              institutions and real decisions. This is a chance to break down
              silos in a way that students and faculty alike find compelling.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">5. Starting small works.</strong>{" "}
              AI governance does not require a new degree program or a
              department-wide overhaul. A single case-based session (one
              scenario, one facilitator, ninety minutes) is enough to
              demonstrate the value and build momentum. The most successful
              implementations start with a pilot and expand based on results.
            </p>

            <h2 className="font-serif text-2xl">The cost of waiting</h2>
            <p className="text-muted">
              Every semester that passes without structured AI governance
              education is a cohort of graduates entering a workforce that
              increasingly demands this capacity. They will make decisions
              about AI adoption, AI policy, and AI oversight, whether or
              not their education prepared them for it.
            </p>
            <p className="text-muted">
              The institutions that move first will produce graduates who can
              handle the regulatory, ethical, and strategic dimensions of AI. The institutions that wait will produce graduates
              who learned about AI governance the way most professionals do
              today: on the job, under pressure, without preparation.
            </p>
            <p className="text-muted">
              The materials exist, the approaches are proven, and both
              regulators and employers are asking for graduates who can do
              this work. What remains is a decision that every institution
              will eventually make. The only variable is timing.
            </p>
          </div>

          <hr className="my-10 border-border" />

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/book-pilot" variant="primary">
              Book a Pilot Session
            </Button>
            <Button href="/modules" variant="secondary">
              Explore Modules
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
