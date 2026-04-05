import type { Metadata } from "next";
import CTABand from "@/components/ui/CTABand";

export const metadata: Metadata = {
  title: "About | Case & Signal",
  description:
    "Case & Signal was built by UBC alumni who spent years facilitating AI policy workshops in the classroom. Learn about the founders and the teaching philosophy behind the modules.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
            About
          </p>
          <hr className="mb-8 w-16 border-t border-accent" />
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">
            Built by facilitators, not a software company
          </h1>
          <p className="mt-8 text-lg text-muted">
            Case &amp; Signal was created by Greg Eidsness (BA&apos;07) and Henry
            Han (BA&apos;02), UBC Political Science alumni who have spent years
            facilitating AI policy workshops in university classrooms.
          </p>
          <p className="mt-4 text-lg text-muted">
            Their work began with UBC&apos;s Tri-Mentoring program and grew into
            a policy careers bootcamp that led Professor Richard Price to create
            a new course — Professional Skills in Political Science — which brings
            alumni into the classroom each week to facilitate key course content.
          </p>
          <p className="mt-4 text-lg text-muted">
            That model of alumni-led, structured debate became the foundation for
            Case &amp; Signal: ready-to-run case study modules that any instructor
            can deliver, with or without us in the room.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-2xl">Recognition</h2>
          <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <p className="font-serif text-lg font-semibold text-foreground">
              UBC Alumni Builder Award
            </p>
            <p className="mt-2 text-sm text-muted">
              Greg and Henry received the UBC Alumni Builder Award for their
              innovative approach to engaging alumni as classroom facilitators.
              The award recognized their model as one that other faculties at UBC
              are considering adopting.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-2xl">Teaching philosophy</h2>
          <p className="mt-4 text-muted">
            Students learn judgment by exercising it — not by reading about it.
            Every Case &amp; Signal module puts students in a role with real
            evidence and a decision to defend. The learning happens in the
            argument, not the answer.
          </p>
        </div>
      </section>

      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <CTABand
            title="See the modules in action"
            primaryLabel="Book a Pilot Workshop"
            primaryHref="/book-pilot"
            secondaryLabel="View modules"
            secondaryHref="/modules"
          />
        </div>
      </section>
    </main>
  );
}
