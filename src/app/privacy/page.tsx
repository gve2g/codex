import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Case & Signal",
  description: "Privacy policy for Case & Signal.",
};

export default function PrivacyPage() {
  return (
    <main className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-6 font-serif text-3xl md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-8 text-sm text-muted">Effective April 2, 2026</p>

        <div className="space-y-8 text-muted">
          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Who we are
            </h2>
            <p>
              Case &amp; Signal is an education technology company that develops
              simulation-based learning modules for universities, schools, and
              organizations. This policy explains how we handle your personal
              information when you interact with our website and services.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              What we collect
            </h2>
            <p className="mb-2">
              When you fill out a form on our website, we may collect:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your institution or organization</li>
              <li>Your role (if provided)</li>
              <li>Any additional information you choose to include in a message or form field</li>
            </ul>
            <p className="mt-2">
              We only collect information that you provide to us directly through
              our web forms. We do not collect data from third-party sources.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Why we collect it
            </h2>
            <p>
              We use your information for the specific purpose you provided it:
              to respond to your inquiry, send you a requested sample, arrange a
              pilot session, or discuss our offerings with you. That is it.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              How we use your information
            </h2>
            <ul className="list-disc space-y-1 pl-6">
              <li>To respond to your inquiries and requests</li>
              <li>To schedule and coordinate pilot sessions</li>
              <li>To send you materials you have requested (such as sample scenarios)</li>
              <li>To follow up on conversations about our products and services</li>
            </ul>
            <p className="mt-2">
              We will never use your information for purposes unrelated to the
              reason you provided it without asking for your consent first.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Who we share it with
            </h2>
            <p>
              Nobody. We do not sell, rent, or share your personal information
              with third parties. Your data stays with Case &amp; Signal and is
              used only for the purposes described above.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Data retention
            </h2>
            <p>
              We keep your information for as long as it is needed to fulfill the
              purpose for which it was collected, or as long as we have an
              ongoing relationship with you or your institution. If you would
              like us to delete your data, contact us and we will do so promptly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Your rights
            </h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Request a copy of the personal information we hold about you</li>
              <li>Ask us to correct any inaccurate information</li>
              <li>Ask us to delete your personal information</li>
              <li>Withdraw any consent you have previously given</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email us at{" "}
              <a
                href="mailto:hello@caseandsignal.com"
                className="text-accent hover:text-accent-light"
              >
                hello@caseandsignal.com
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Cookies and analytics
            </h2>
            <p>
              Our website does not use tracking cookies or third-party advertising
              trackers. We may use basic analytics to understand how visitors use
              our site (such as which pages are visited and how often). These
              analytics do not identify you personally and are used solely to
              improve our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Changes to this policy
            </h2>
            <p>
              We may update this privacy policy from time to time. If we make
              significant changes, we will note the updated effective date at the
              top of this page. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-xl text-foreground">
              Contact us
            </h2>
            <p>
              If you have any questions about this privacy policy or how we
              handle your data, please contact us at{" "}
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
