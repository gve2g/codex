import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import PricingBlock from "@/components/ui/PricingBlock";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Licensing and Pricing | Case & Signal",
  description:
    "Licensing options for universities, schools, and organizations. Flexible delivery models, institutional procurement support, and facilitator training.",
};

const pricingOptions = [
  {
    title: "University License",
    description:
      "Annual institutional license for a single module. Includes all teaching materials, digital access, and quarterly updates.",
    features: [
      "Complete module package with facilitator guide",
      "Student briefing packs and evidence documents",
      "Assessment rubrics and reflection worksheets",
      "Digital access for instructors and students",
      "Quarterly scenario updates included",
      "Onboarding support and facilitator briefing",
      "Multi-module discounts available",
    ],
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "School License",
    description:
      "Annual license for the 75-minute school-adapted format. Designed for secondary school timetables and younger audiences.",
    features: [
      "Age-appropriate module with adapted materials",
      "Teacher facilitator guide with scaffolded prompts",
      "Student briefing packs ready to print or share",
      "Assessment rubric aligned to school standards",
      "Post-session reflection worksheet",
      "Onboarding call and teacher support",
      "Volume pricing for multi-school trusts",
    ],
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Module Bundle",
    description:
      "License both Frontier Technologies and Public Policy and The Future of Work modules together at a reduced rate. Ideal for programs spanning multiple terms.",
    features: [
      "Both modules with full teaching packages",
      "Cross-module assessment framework",
      "Shared facilitator guide and methodology",
      "Students develop transferable skills across topics",
      "Reduced per-module cost",
      "Single onboarding process for both modules",
      "Priority access to new module releases",
    ],
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Direct Delivery / Pilot",
    recommended: true,
    description:
      "Book a Case & Signal facilitator to deliver a session directly. Ideal for evaluation, events, or one-off programs. Typical group size: 15-40 participants. Sessions run 75 minutes to full-day depending on format. Available in-person or online.",
    features: [
      "Case & Signal facilitator delivers the session",
      "All materials provided and managed",
      "Pre-session briefing with your team",
      "Post-session debrief and feedback report",
      "No license commitment required",
      "Available for universities, schools, and organizations",
      "Can be applied toward a license if you proceed",
    ],
    cta: "Book a pilot",
    href: "/book-pilot",
  },
];

export default function PricingPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Pricing"
            title="Licensing and delivery options"
            description="Case & Signal offers flexible licensing for institutions of all sizes. All prices are provided on request to account for institutional context, volume, and delivery requirements."
            centered
          />
        </div>
      </section>

      {/* Typical engagement section */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-8 font-serif text-2xl">Typical engagements</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-border p-6">
              <h4 className="mb-2 font-semibold text-foreground">Pilot session</h4>
              <p className="text-sm text-muted">
                A single facilitated session, ideal for evaluation. Includes all materials and a post-session debrief.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h4 className="mb-2 font-semibold text-foreground">Single module license</h4>
              <p className="text-sm text-muted">
                Annual access to one module for your department or program. Includes facilitator guide, student materials, assessments, and quarterly updates.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h4 className="mb-2 font-semibold text-foreground">Multi-module bundle</h4>
              <p className="text-sm text-muted">
                Both modules at a reduced rate. Ideal for programs spanning multiple terms or departments.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h4 className="mb-2 font-semibold text-foreground">Facilitator training add-on</h4>
              <p className="text-sm text-muted">
                Half-day workshop to prepare your instructors for independent delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {pricingOptions.map((option) => (
              <PricingBlock
                key={option.title}
                title={option.title}
                description={option.description}
                features={option.features}
                cta={option.cta}
                href={option.href}
                recommended={"recommended" in option && option.recommended}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What influences pricing section */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-6 font-serif text-2xl">What influences pricing</h3>
          <p className="mb-6 max-w-3xl text-muted">
            Pricing is provided on request because it depends on several factors specific to your institution and delivery needs:
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted max-w-3xl">
            <li>Number of modules licensed</li>
            <li>Number of sessions planned per term</li>
            <li>Whether facilitator training is included</li>
            <li>Institution type (university, school, organization)</li>
            <li>Single department vs. institution-wide access</li>
            <li>Delivery format (self-facilitated vs. Case &amp; Signal-delivered)</li>
          </ul>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Facilitator Training
          </h3>
          <p className="mb-6 max-w-3xl text-muted">
            Facilitator training is available as an add-on to any license. The
            half-day workshop prepares your instructors and facilitators to
            deliver sessions independently with confidence.
          </p>
          <Button variant="secondary" href="/certification">
            Learn about facilitator training
          </Button>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">Procurement</h3>
          <p className="mb-4 max-w-3xl text-muted">
            Case & Signal is designed to work within institutional procurement
            workflows. We understand the requirements of university purchasing
            departments, school business managers, and corporate procurement
            teams.
          </p>
          <ul className="list-inside list-disc space-y-2 text-muted">
            <li>Invoice and purchase order payment supported</li>
            <li>
              Institution-friendly onboarding with dedicated point of contact
            </li>
            <li>Vendor registration documentation available on request</li>
            <li>
              Flexible billing cycles aligned to academic or financial years
            </li>
          </ul>
        </div>
      </section>

      <CTABand
        title="Need a custom arrangement?"
        primaryLabel="Download a sample"
        primaryHref="/sample"
        secondaryLabel="Book a pilot session"
        secondaryHref="/book-pilot"
      />
    </main>
  );
}
