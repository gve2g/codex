import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import PricingBlock from "@/components/ui/PricingBlock";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Licensing and Pricing | Reflect First",
  description:
    "Licensing options for universities, schools, and organizations. Flexible delivery models, institutional procurement support, and facilitator certification.",
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
      "License both AI Governance and Future of Work modules together at a reduced rate. Ideal for programs spanning multiple terms.",
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
    description:
      "Book a certified Reflect First facilitator to deliver a session directly. Ideal for evaluation, events, or one-off programs.",
    features: [
      "Certified facilitator delivers the session",
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
            description="Reflect First offers flexible licensing for institutions of all sizes. All prices are provided on request to account for institutional context, volume, and delivery requirements."
            centered
          />
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
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">
            Facilitator Certification
          </h3>
          <p className="mb-4 max-w-3xl text-muted">
            Facilitator certification is available as an add-on to any license or
            as a standalone purchase. Certification prepares instructors and
            facilitators to deliver Reflect First sessions independently, with
            training on methodology, facilitation techniques, and assessment
            practices.
          </p>
          <p className="mb-6 max-w-3xl text-muted">
            Certification is valid for twelve months and includes renewal
            support. Pricing is per individual and can be bundled with
            institutional licenses.
          </p>
          <Button variant="secondary" href="/certification">
            Learn about certification
          </Button>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">Procurement</h3>
          <p className="mb-4 max-w-3xl text-muted">
            Reflect First is designed to work within institutional procurement
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
        primaryLabel="Get in touch"
        primaryHref="/contact"
        secondaryLabel="Book a pilot session"
        secondaryHref="/book-pilot"
      />
    </main>
  );
}
