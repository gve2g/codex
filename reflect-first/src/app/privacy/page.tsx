import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Reflect First",
  description: "Privacy policy for Reflect First.",
};

export default function PrivacyPage() {
  return (
    <main className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-6 font-serif text-3xl md:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-muted">
          This privacy policy will be updated before launch. For questions,
          contact{" "}
          <a
            href="mailto:hello@reflectfirst.org"
            className="text-accent hover:text-accent-light"
          >
            hello@reflectfirst.org
          </a>
          .
        </p>
      </div>
    </main>
  );
}
