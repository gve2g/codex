import type { Metadata } from "next";
import SectionIntro from "@/components/ui/SectionIntro";
import ResourceCard from "@/components/resources/ResourceCard";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "Resources | Case & Signal",
  description:
    "Download sample scenarios, read articles on structured debate pedagogy, and explore resources for integrating Case & Signal into your teaching.",
};

const resources = [
  {
    title: "Sample Scenario: Frontier Technologies",
    type: "Download",
    description:
      "A complete sample scenario from the Frontier Technologies module. Includes the briefing pack, role assignments, and facilitator notes so you can see exactly what a Case & Signal session looks like.",
    href: "/sample",
  },
  {
    title: "The Case for Case Studies in Political Science and the Humanities",
    type: "Article",
    description:
      "Case-based teaching built law and business schools into engines of professional judgment. The same method belongs in political science, public policy, and the humanities, from university lecture halls to high school classrooms.",
    href: "/resources/case-for-case-studies",
  },
  {
    title: "How to Teach AI Ethics Without Losing the Room",
    type: "Article",
    description:
      "AI ethics can feel abstract. This article explores how structured debate transforms passive learning into active engagement, giving students real stakes and real roles instead of lecture slides.",
    href: "/resources/how-to-teach-ai-ethics",
  },
  {
    title: "Why AI Governance Belongs in Every Curriculum",
    type: "Article",
    description:
      "AI is reshaping policy, labour, and society. This article makes the case for embedding AI governance across disciplines, not just in computer science departments.",
    href: "/resources/why-ai-governance",
  },
  {
    title: "Learning Outcomes and Assessment Framework",
    type: "Guide",
    description:
      "An overview of the learning outcomes mapped to each module, the assessment rubrics included in every teaching package, and how to use pre/post data for reporting and accreditation.",
    href: "/contact",
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
            description="Sample materials, articles, and background on the Case & Signal approach. Explore what structured debate looks like in practice."
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
        title="Ready to see Case & Signal in your classroom?"
        primaryLabel="Book a pilot session"
        primaryHref="/book-pilot"
        secondaryLabel="Get in touch"
        secondaryHref="/contact"
      />
    </main>
  );
}
