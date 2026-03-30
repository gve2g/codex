import Button from "@/components/ui/Button";
import SectionIntro from "@/components/ui/SectionIntro";
import Card from "@/components/ui/Card";
import CTABand from "@/components/ui/CTABand";
import StepsComponent from "@/components/ui/StepsComponent";
import ModuleCard from "@/components/modules/ModuleCard";
import PricingBlock from "@/components/ui/PricingBlock";
import ResourceCard from "@/components/resources/ResourceCard";

export default function Home() {
  return (
    <main>
      {/* ───────────────────── Section 1: Hero ───────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            Interactive case studies for technology policy education
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Teach the hardest technology-policy debates like they matter
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Reflect First is a modular platform for interactive case-based
            learning on AI governance, the future of work, and other live policy
            dilemmas. Built for universities, schools, and organizations.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button href="/sample" variant="primary" size="lg">
              Download a Sample Scenario
            </Button>
            <Button href="/book-pilot" variant="secondary" size="lg">
              Book a Pilot Session
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
            <li>University track</li>
            <li>School track</li>
            <li>Facilitator certification</li>
            <li>Quarterly updates</li>
          </ul>
        </div>
      </section>

      {/* ───────────────────── Section 2: What Reflect First Is ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="The platform"
            title="A better way to teach live issues"
            centered={false}
          />
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <p className="text-lg text-muted">
              Reflect First helps educators move beyond generic discussion
              prompts and static slide decks. Each module is built around
              decision-maker scenarios, structured debate, facilitator guidance,
              and assessment tools designed for serious classroom use.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded border border-border bg-surface p-5">
                <h3 className="font-serif text-sm font-semibold">
                  Scenario Briefs
                </h3>
              </div>
              <div className="rounded border border-border bg-surface p-5">
                <h3 className="font-serif text-sm font-semibold">
                  Facilitator Guidance
                </h3>
              </div>
              <div className="rounded border border-border bg-surface p-5">
                <h3 className="font-serif text-sm font-semibold">
                  Structured Debate
                </h3>
              </div>
              <div className="rounded border border-border bg-surface p-5">
                <h3 className="font-serif text-sm font-semibold">
                  Assessment Tools
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 3: Why It Works ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="Why it works" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              title="Real decision-maker scenarios"
              description="Students step into the shoes of actual policymakers, executives, and regulators facing live dilemmas with real stakes."
            />
            <Card
              title="Ready-to-run facilitator support"
              description="Every module ships with a detailed facilitator guide so instructors can lead sessions confidently on day one."
            />
            <Card
              title="Current subject matter with quarterly updates"
              description="Modules are refreshed every quarter to reflect the latest developments in technology policy."
            />
            <Card
              title="Outcomes-oriented with rubrics and assessments"
              description="Built-in rubrics and pre/post assessments help educators measure learning outcomes, not just participation."
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 4: Modules Preview ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Modules"
            title="Start with one module or build a broader program"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ModuleCard
              title="AI Governance"
              description="Should a city adopt predictive policing software? Students take the roles of mayor, police chief, civil liberties advocate, and vendor CEO to navigate a live AI governance dilemma."
              audiences={["Universities", "Schools", "Organizations"]}
              formats={["90-minute session", "Multi-day unit"]}
              scenarios={[
                "Predictive policing adoption",
                "Facial recognition moratorium",
                "Automated hiring audit",
              ]}
              href="/modules/ai-governance"
            />
            <ModuleCard
              title="Future of Work"
              description="A major employer plans to automate 40% of its workforce. Students represent the CEO, union leader, government minister, and affected workers to debate the path forward."
              audiences={["Universities", "Organizations"]}
              formats={["90-minute session", "Half-day workshop"]}
              scenarios={[
                "Workforce automation transition",
                "Gig economy regulation",
                "Remote work policy",
              ]}
              href="/modules/future-of-work"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 5: What's Included ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="What institutions receive" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Scenario briefs"
              description="Role-specific briefing documents that immerse students in the decision-maker's perspective."
            />
            <Card
              title="Facilitator guide"
              description="Step-by-step session plan with timing, discussion prompts, and debrief guidance."
            />
            <Card
              title="Slide deck"
              description="Presentation-ready slides covering context, key tensions, and session structure."
            />
            <Card
              title="Evaluation rubric"
              description="Criteria-based rubric for assessing argumentation, evidence use, and collaboration."
            />
            <Card
              title="Pre/post assessments"
              description="Measure shifts in student understanding, reasoning quality, and perspective-taking."
            />
            <Card
              title="Student feedback tools"
              description="Structured reflection forms that help students articulate what they learned and why."
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 6: Who It's For ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="Built for serious educational settings" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card
              title="Universities"
              description="For policy, law, ethics, computer science, and interdisciplinary programs."
            />
            <Card
              title="Schools"
              description="Adapted formats for advanced secondary and sixth-form students."
            />
            <Card
              title="Organizations"
              description="Professional development and executive education on technology policy."
            />
            <Card
              title="Facilitators"
              description="Independent educators and consultants delivering policy workshops."
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 7: How It Works ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="How Reflect First works" />
          <div className="mt-12">
            <StepsComponent
              steps={[
                {
                  number: 1,
                  title: "Choose a module and format",
                  description:
                    "Select from available modules and pick the session length and delivery format that fits your program.",
                },
                {
                  number: 2,
                  title: "License the package or book a pilot",
                  description:
                    "Institutional licensing gives your team ongoing access. Or start with a single pilot session to evaluate fit.",
                },
                {
                  number: 3,
                  title: "Prepare your facilitator or pursue certification",
                  description:
                    "Use the built-in facilitator guide or enroll in the Reflect First certification program for deeper preparation.",
                },
                {
                  number: 4,
                  title: "Run the session and measure outcomes",
                  description:
                    "Deliver the session with confidence, then use built-in assessments and feedback tools to measure impact.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 8: Certification ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl">
              Facilitator certification for consistent delivery
            </h2>
            <p className="mt-4 text-lg text-muted">
              The Reflect First certification program prepares facilitators to
              lead sessions with confidence and consistency. Certified
              facilitators gain access to advanced materials, peer community, and
              priority support.
            </p>
            <div className="mt-6">
              <Button href="/certification" variant="secondary">
                Learn about certification
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 9: Pricing Snapshot ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            title="Licensing and delivery options"
            description="Reflect First offers flexible licensing designed for institutions. Invoice and purchase-order billing supported."
          />
          <div className="mt-12">
            <PricingBlock
              title="Institutional licensing"
              description="Annual or per-module licensing for universities, schools, and organizations. Volume discounts available for multi-module packages."
              features={[
                "Institution-friendly pricing and billing",
                "Invoice and purchase-order supported",
                "Includes facilitator guide and all session materials",
                "Quarterly content updates included",
              ]}
              cta="View pricing details"
              href="/pricing"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 10: Resources Preview ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro title="Resources" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Sample Scenario: Predictive Policing"
              type="Download"
              description="See what a Reflect First scenario brief looks like with this free sample from the AI Governance module."
              href="/sample"
            />
            <ResourceCard
              title="How to Teach AI Ethics Without Oversimplifying"
              type="Article"
              description="A practical guide to moving beyond trolley problems and into the messy reality of technology policy debates."
              href="/resources/how-to-teach-ai-ethics"
            />
            <ResourceCard
              title="Why AI Governance Belongs in Every Curriculum"
              type="Article"
              description="The case for making technology policy a core part of education, not an elective afterthought."
              href="/resources/why-ai-governance"
            />
          </div>
        </div>
      </section>

      {/* ───────────────────── Section 11: Final CTA ───────────────────── */}
      <section className="border-t border-border py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <CTABand
            title="Bring Reflect First into your classroom or program"
            primaryLabel="Contact Reflect First"
            primaryHref="/contact"
            secondaryLabel="Explore Pricing"
            secondaryHref="/pricing"
          />
        </div>
      </section>
    </main>
  );
}
