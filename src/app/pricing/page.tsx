import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import PricingBlock from "@/components/ui/PricingBlock";
import Button from "@/components/ui/Button";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Licensing and Pricing | Case & Signal",
  description:
    "Licensing options for universities and schools. Standardized tiers, institutional procurement support, and facilitator certification.",
};

const pricingOptions = [
  {
    title: "Pilot Workshop",
    subtitle: "Best for first-time evaluation",
    recommended: true,
    description:
      "Book a Case & Signal facilitator to deliver a workshop directly. Ideal for evaluation before committing to a license. 15–40 participants. 75 minutes to full-day. In-person or online.",
    features: [
      "Case & Signal facilitator delivers the workshop",
      "All materials provided and managed",
      "Pre-workshop briefing with your team",
      "Post-workshop debrief and feedback report",
      "No license commitment required",
      "Can be applied toward a license if you proceed",
    ],
    cta: "Book a pilot",
    href: "/book-pilot",
  },
  {
    title: "University License",
    subtitle: "Best for course or department use",
    description:
      "Annual institutional license for a single module. Includes the complete digital teaching package and ongoing updates.",
    features: [
      "Complete module with facilitator guide",
      "Student briefing packs and evidence documents",
      "Assessment rubrics and reflection worksheets",
      "Slide deck for instructor-led delivery",
      "Onboarding support and facilitator briefing",
      "Multi-module discounts available",
    ],
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "School License",
    subtitle: "Best for Grades 10–12 implementation",
    description:
      "Annual license for the 75-minute school-adapted format. Designed for secondary school timetables with age-appropriate materials.",
    features: [
      "Age-appropriate module with adapted materials",
      "Teacher facilitator guide with scaffolded prompts",
      "Student briefing packs ready to print or share",
      "Assessment rubric aligned to school standards",
      "Post-session reflection worksheet",
      "Onboarding call and teacher support",
    ],
    cta: "Request a quote",
    href: "/contact",
  },
  {
    title: "Facilitator Certification",
    subtitle: "Add-on for institutions delivering independently",
    description:
      "Half-day certification workshop to prepare your instructors for independent delivery. Available in person or online.",
    features: [
      "Half-day training workshop",
      "Methodology deep-dive and practice facilitation",
      "Access to facilitator community and resources",
      "Certificate of completion",
      "Available as add-on to any license tier",
    ],
    cta: "Learn more",
    href: "/certification",
  },
];

export default function PricingPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Pricing"
            title="Standardized licensing tiers"
            description="Clear options for institutions of all sizes. Start with a pilot workshop, then license the modules you need."
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
                subtitle={option.subtitle}
                description={option.description}
                features={option.features}
                cta={option.cta}
                href={option.href}
                recommended={"recommended" in option && option.recommended}
              />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Pricing available on request to account for institutional context, volume, and delivery requirements.
          </p>
        </div>
      </section>

      {/* What influences pricing section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-6 font-serif text-2xl">What influences pricing</h3>
          <ul className="list-inside list-disc space-y-2 text-muted max-w-3xl">
            <li>Number of modules licensed</li>
            <li>Number of workshops planned per term</li>
            <li>Whether facilitator certification is included</li>
            <li>Institution type (university or school)</li>
            <li>Single department vs. institution-wide access</li>
            <li>Delivery format (self-facilitated vs. Case &amp; Signal-delivered)</li>
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="mb-4 font-serif text-2xl">Procurement</h3>
          <p className="mb-4 max-w-3xl text-muted">
            Case & Signal is designed to work within institutional procurement
            workflows. We understand the requirements of university purchasing
            departments and school business managers.
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
        title="Start with a pilot workshop"
        primaryLabel="Book a Pilot Workshop"
        primaryHref="/book-pilot"
        secondaryLabel="Download a sample"
        secondaryHref="/sample"
      />
    </main>
  );
}
