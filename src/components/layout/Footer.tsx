import Link from "next/link";
const columns = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Modules", href: "/modules" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Audiences",
    links: [
      { label: "For Universities", href: "/for-universities" },
      { label: "For Schools", href: "/for-schools" },
      { label: "For Organizations", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Sample Scenario", href: "/sample" },
      { label: "Facilitator Certification", href: "/certification" },
      { label: "Book a Pilot Workshop", href: "/book-pilot" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-foreground">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <span aria-label="Case & Signal" className="font-serif text-sm font-bold text-foreground opacity-60">
            Case <span className="text-accent">&amp;</span> Signal
          </span>
          <p className="text-xs text-muted">
            &copy; 2026 Case &amp; Signal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
