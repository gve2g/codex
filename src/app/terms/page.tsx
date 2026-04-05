import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Case & Signal",
  description: "Terms of use for Case & Signal.",
};

export default function TermsPage() {
  return (
    <main className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-6 font-serif text-3xl md:text-4xl">Terms of Use</h1>
        <p className="mb-8 text-sm text-muted">Effective April 2, 2026</p>

        <div className="space-y-8 text-muted">
          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Acceptance of terms
            </h2>
            <p>
              By accessing or using the Case &amp; Signal website and services,
              you agree to be bound by these terms. If you do not agree, please
              do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Description of service
            </h2>
            <p>
              Case &amp; Signal provides simulation-based learning modules
              designed for use in universities, schools, and organizations. Our
              products include scenario briefing packs, role assignments,
              evidence documents, facilitator guides, and related educational
              materials. We also offer facilitated pilot sessions and licensing
              arrangements for institutional use.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Licensing, not ownership
            </h2>
            <p>
              When you or your institution licenses Case &amp; Signal materials,
              you receive a license to use those materials under the agreed
              terms. You do not acquire ownership of the materials themselves.
              The scope, duration, and conditions of each license are set out in
              the relevant licensing agreement between Case &amp; Signal and
              your institution.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Intellectual property
            </h2>
            <p>
              All content on this website and within our learning modules,
              including text, scenarios, graphics, logos, and design, is the
              property of Case &amp; Signal or its licensors and is protected by
              applicable intellectual property laws. You may not reproduce,
              distribute, or create derivative works from any of our materials
              without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Permitted use
            </h2>
            <p className="mb-2">
              You may use our website and any licensed materials for their
              intended educational purpose. This includes:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Browsing the website to learn about our offerings</li>
              <li>Submitting forms to request information, samples, or pilot sessions</li>
              <li>Using licensed modules in the educational settings described in your licensing agreement</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Prohibited use
            </h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Copy, redistribute, or resell any Case &amp; Signal materials without authorization</li>
              <li>Use our materials outside the scope of your licensing agreement</li>
              <li>Remove or alter any copyright or proprietary notices</li>
              <li>Use the website in any way that could damage, disable, or impair it</li>
              <li>Attempt to gain unauthorized access to any part of our systems</li>
              <li>Use automated tools to scrape or extract content from our website</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Disclaimer of warranties
            </h2>
            <p>
              Our website and materials are provided &quot;as is&quot; and
              &quot;as available.&quot; While we strive to keep everything
              accurate and up to date, we do not guarantee that the website will
              be error-free, uninterrupted, or free of harmful components. We
              make no warranties, express or implied, regarding the suitability
              of our materials for any particular purpose.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Case &amp; Signal and its
              team members will not be liable for any indirect, incidental,
              consequential, or punitive damages arising from your use of our
              website or materials. Our total liability for any claim related to
              our services will not exceed the amount you paid to us in the
              twelve months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to our
              website or services at any time if we reasonably believe you have
              violated these terms. Any provisions that by their nature should
              survive termination (such as intellectual property rights and
              limitation of liability) will remain in effect.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of the Province of British
              Columbia, Canada, without regard to conflict of law principles. Any
              disputes arising from these terms will be resolved in the courts of
              British Columbia, Canada.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. When we do, we will
              revise the effective date at the top of this page. Continued use of
              the website after changes are posted constitutes your acceptance of
              the updated terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Contact us
            </h2>
            <p>
              If you have questions about these terms, please contact us at{" "}
              <a
                href="mailto:hello@caseandsignal.com"
                className="text-accent hover:text-accent-light"
              >
                hello@caseandsignal.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
