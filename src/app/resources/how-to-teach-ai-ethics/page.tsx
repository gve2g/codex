import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "How to Teach AI Ethics Without Oversimplifying | Case & Signal",
  description:
    "A practical guide for educators moving beyond trolley problems and into the messy reality of technology policy debates. Case-based approaches that build real judgment.",
};

export default function HowToTeachAIEthicsPage() {
  return (
    <main>
      <article className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            Article
          </p>
          <h1 className="font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
            How to Teach AI Ethics Without Oversimplifying
          </h1>
          <p className="mt-4 text-lg text-muted">
            A practical guide to moving beyond trolley problems and into the
            messy reality of technology policy debates.
          </p>
          <hr className="my-10 border-border" />

          <div className="prose-rf space-y-8 text-foreground">
            <h2 className="font-serif text-2xl">The trolley problem is not a curriculum</h2>
            <p className="text-muted">
              If you have taught any course that touches artificial intelligence
              and ethics, you have almost certainly encountered the trolley
              problem. A runaway vehicle, two possible paths, lives on each
              track. Students pick a side. A discussion follows. Everyone leaves
              feeling like they have &ldquo;done ethics.&rdquo;
            </p>
            <p className="text-muted">
              The problem with this approach is not that the trolley problem is
              uninteresting. It is that it bears almost no resemblance to the
              ethical decisions that people actually face when building,
              deploying, or regulating AI systems. As the Alan Turing Institute
              has argued, the basic simplicity that makes the problem so
              popular (a binary, binding choice with known outcomes) is
              precisely what makes it misleading as a tool for reasoning about
              AI. Real decisions involve incomplete information, competing
              institutional pressures, uncertain consequences, and stakeholders
              who will live with the results long after the decision is made.
            </p>
            <p className="text-muted">
              When Philippa Foot introduced the thought experiment in 1967, her
              point was that real-life decisions are always constrained by
              context. The trolley problem was designed to strip context away in
              order to isolate a single moral intuition. That is useful for
              moral philosophy. It is a poor foundation for preparing students
              to handle the actual governance of artificial intelligence.
            </p>

            <h2 className="font-serif text-2xl">Why oversimplification is dangerous</h2>
            <p className="text-muted">
              Oversimplified ethics teaching creates three specific problems in
              the classroom.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">It frames ethics as a binary choice.</strong>{" "}
              Real AI governance decisions are rarely between two options. A city
              council evaluating predictive policing software does not choose
              between &ldquo;deploy&rdquo; and &ldquo;don&rsquo;t deploy.&rdquo; They
              choose between deploying with restrictions, piloting in one
              district, mandating an independent audit, imposing a moratorium
              pending further study, or a dozen other configurations, each
              with different consequences for different communities.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">It removes the people.</strong>{" "}
              In a trolley problem, the people on the tracks are abstractions.
              In a real policy debate, they are a police chief who needs the
              tool to close cases, a civil liberties director who has seen the
              bias data, a mayor facing re-election, and a vendor whose company
              depends on the contract. Each has legitimate interests. None is
              simply &ldquo;right&rdquo; or &ldquo;wrong.&rdquo;
            </p>
            <p className="text-muted">
              <strong className="text-foreground">It lets students off the hook.</strong>{" "}
              The trolley problem asks what you would do in theory. It does not
              ask you to defend that choice to someone who disagrees, revise
              your position when new evidence emerges, or accept that your
              decision will have consequences you cannot fully predict. These
              are the capacities that matter in professional life, and they
              are precisely what trolley-style exercises fail to develop.
            </p>

            <h2 className="font-serif text-2xl">What works instead: case-based deliberation</h2>
            <p className="text-muted">
              The most effective approaches to AI ethics education share a common
              structure: they put students inside actual decisions, with specific
              stakeholders, competing evidence, and consequences that stick.
            </p>
            <p className="text-muted">
              This is not a new idea. Structured Academic Controversy, a
              cooperative learning strategy developed for teaching complex
              issues, has decades of research behind it. Unlike traditional
              debate, which rewards winning, SAC-style exercises ask students to
              understand multiple perspectives, engage with evidence that
              challenges their position, and work toward reasoned judgment
              rather than rhetorical victory. Research shows this approach
              develops critical thinking, perspective-taking, and the ability
              to reason under real uncertainty.
            </p>
            <p className="text-muted">
              Applied to AI governance, this means exercises where students take
              on specific roles: a regulator, an industry executive, a
              community advocate, a technical researcher. They must work through
              a policy decision with the constraints and information that role
              would actually have. The scenario is not hypothetical. It is
              grounded in real events, real regulatory frameworks, and real
              institutional pressures.
            </p>

            <h2 className="font-serif text-2xl">Five principles for teaching AI ethics well</h2>

            <p className="text-muted">
              <strong className="text-foreground">1. Use scenarios with real tension, not clear villains.</strong>{" "}
              The best teaching cases are ones where every stakeholder has a
              defensible position. If students can immediately identify who is
              &ldquo;wrong,&rdquo; the scenario is too simple. A hospital deciding
              whether to adopt an AI diagnostic tool that improves accuracy but
              cannot explain its reasoning: that has real tension. Every
              role can make a reasonable case.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">2. Give students different evidence, not the same brief.</strong>{" "}
              In real policy debates, decision-makers do not share the same
              information. A police chief sees the crime reduction data. A civil
              liberties advocate sees the false positive rates broken down by
              district. When students receive role-specific briefing
              materials, they experience what it means to weigh evidence they
              did not choose, and to encounter evidence they would rather
              ignore.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">3. End with a decision, not a discussion.</strong>{" "}
              Too many ethics sessions end with an open-ended discussion that trails off when time runs out. Require
              students to reach a decision, even an imperfect one. This is
              where the real learning happens: in the act of committing to a
              position, accepting trade-offs, and being accountable for the
              consequences.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">4. Keep scenarios current.</strong>{" "}
              AI governance is moving fast. The EU AI Act, which becomes fully
              applicable in August 2026, classifies educational AI applications
              as high-risk and introduces mandatory AI literacy obligations.
              UNESCO&rsquo;s 2025 AI Competency Frameworks for students and
              teachers outline twelve competencies grounded in critical
              judgment and ethical reasoning. Your teaching materials should
              reflect the world students are about to enter, not the one that
              existed when the syllabus was written.
            </p>
            <p className="text-muted">
              <strong className="text-foreground">5. Invest in facilitation, not just content.</strong>{" "}
              A great scenario with a poor facilitator falls flat. Managing debate dynamics, drawing out quieter
              voices, pressing students to engage with evidence they would
              rather dismiss. These are skills that require preparation.
              The best content in the world falls flat without someone who
              knows how to run the room.
            </p>

            <h2 className="font-serif text-2xl">The gap between knowing and doing</h2>
            <p className="text-muted">
              Most students who complete an AI ethics course can describe the
              major ethical frameworks. They can define consequentialism,
              deontology, and virtue ethics. They can list the principles in
              any number of AI ethics guidelines.
            </p>
            <p className="text-muted">
              Far fewer can do what those frameworks are supposed to enable:
              make a difficult judgment call under uncertainty, defend it to
              someone who disagrees, and revise it when the evidence shifts.
              That is the gap between knowing about ethics and being able to
              act ethically in a professional context. Closing that gap
              requires practice, not lectures.
            </p>
            <p className="text-muted">
              The trolley problem is a starting point, not a destination. The
              destination is a classroom where students experience the weight
              of real decisions and develop the judgment to handle them.
            </p>
          </div>

          <hr className="my-10 border-border" />

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/sample" variant="primary">
              Download a Sample Scenario
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
