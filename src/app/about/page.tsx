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
      {/* ─── Hero with founder photo ─── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
                About
              </p>
              <hr className="mb-6 w-16 border-t border-accent" />
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">
                Built by facilitators,
                <br />
                not a software company
              </h1>
              <p className="mt-6 text-lg text-muted">
                Case &amp; Signal was created by Greg Eidsness and Henry Han,
                UBC Political Science alumni who have spent years facilitating
                AI policy workshops in university classrooms.
              </p>
            </div>

            {/* Founder photo — cinematic crop with overlay details */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/founders.jpg"
                  alt="Greg Eidsness and Henry Han, co-founders of Case & Signal"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
              {/* Name labels overlaid at bottom */}
              <div className="absolute bottom-0 left-0 right-0 rounded-b-2xl bg-gradient-to-t from-black/70 via-black/40 to-transparent px-6 pb-5 pt-12">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Greg Eidsness</p>
                    <p className="text-xs text-white/70">BA&apos;07, Political Science</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">Henry Han</p>
                    <p className="text-xs text-white/70">BA&apos;02, Political Science</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Origin story ─── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl">
                From mentoring program to classroom innovation
              </h2>
            </div>
            <div className="space-y-4 text-muted">
              <p>
                It started with UBC&apos;s Tri-Mentoring program, where Greg and
                Henry spent over a decade connecting political science students
                with alumni working in policy, government, and the private sector.
              </p>
              <p>
                That work evolved into a policy careers bootcamp — intensive
                workshops that brought real-world decision-making into the
                classroom. The results caught the attention of Professor Richard
                Price, who created a new course, <em>Professional Skills in
                Political Science</em>, built around alumni facilitators leading
                key sessions each week.
              </p>
              <p>
                Case &amp; Signal is the product of that model: structured debate
                modules refined over years of live classroom delivery, now
                packaged as complete digital teaching kits that any instructor
                can run — with or without us in the room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Alumni Builder Award ─── */}
      <section className="border-t border-border py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-2xl border border-border">
            {/* Award banner image */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/alumni-builder-award.jpg"
                alt="UBC Alumni Builder Awards presented by Boyden"
                className="w-full object-cover"
                style={{ maxHeight: "240px" }}
              />
            </div>

            {/* Award details below the banner */}
            <div className="bg-surface p-8 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    Recognition
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold md:text-2xl">
                    UBC Alumni Builder Award
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    Faculty of Arts
                  </p>
                </div>
                <div className="space-y-3 text-muted">
                  <p>
                    Greg and Henry received the UBC Alumni Builder Award for their
                    dedication to supporting students and their innovative approach
                    to engaging alumni as classroom facilitators.
                  </p>
                  <p>
                    Their model — bringing working professionals into the classroom
                    to facilitate structured policy debates — was recognized as an
                    approach that other faculties at UBC are considering adopting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Teaching philosophy ─── */}
      <section className="border-t border-border bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Teaching philosophy
          </p>
          <blockquote className="mt-6 font-serif text-2xl leading-relaxed md:text-3xl">
            &ldquo;Students learn judgment by exercising it —
            not by reading about it.&rdquo;
          </blockquote>
          <p className="mt-6 text-muted">
            Every Case &amp; Signal module puts students in a role with real
            evidence and a decision to defend. The learning happens in the
            argument, not the answer.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
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
