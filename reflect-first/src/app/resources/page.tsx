import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import ResourceCard from "@/components/resources/ResourceCard";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Resources | Reflect First",
  description:
    "Download sample scenarios, read articles on structured debate pedagogy, and explore resources for integrating Reflect First into your teaching.",
};

const resources = [
  {
    title: "Sample Scenario: AI Governance",
    type: "Download",
    description:
      "A complete sample scenario from the AI Governance module. Includes the briefing pack, role assignments, and facilitator notes so you can see exactly what a Reflect First session looks like.",
    href: "/sample",
  },
  {
    title: "Why Structured Debate Belongs in Every Curriculum",
    type: "Article",
    description:
      "An overview of the pedagogical case for structured debate, the skills it develops, and why traditional assessment methods miss what matters most.",
    href: "/resources/why-structured-debate",
  },
  {
    title: "Teaching AI Governance Without Taking Sides",
    type: "Article",
    description:
      "How Reflect First modules handle politically sensitive topics by focusing on argumentation quality rather than ideological positions.",
    href: "/resources/teaching-ai-governance",
  },
  {
    title: "From Classroom to Boardroom: Debate as Professional Development",
    type: "Article",
    description:
      "How the skills developed through structured debate, including stakeholder analysis, evidence evaluation, and decision-making under uncertainty, transfer directly to professional contexts.",
    href: "/resources/debate-as-professional-development",
  },
];

export default function ResourcesPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionIntro
            eyebrow="Resources"
            title="Resources and reading"
            description="Sample materials, articles, and background on the Reflect First approach. Explore what structured debate looks like in practice."
            centered
          />
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {resources.map((resource) => (
              <ResourceCard
                key={resource.title}
                title={resource.title}
                type={resource.type}
                description={resource.description}
                href={resource.href}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to see Reflect First in your classroom?"
        primaryLabel="Book a pilot session"
        primaryHref="/book-pilot"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
      />
    </main>
  );
}
