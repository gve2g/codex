import Link from "next/link";

interface ModuleCardProps {
  title: string;
  description: string;
  audiences?: string[];
  formats?: string[];
  scenarios?: string[];
  href: string;
}

export default function ModuleCard({
  title,
  description,
  audiences,
  formats,
  scenarios,
  href,
}: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-border bg-surface px-8 py-10 transition-all duration-200 hover:border-accent hover:border-l-4"
    >
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
      {audiences && audiences.length > 0 && (
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Audiences
          </span>
          <div className="mt-1 flex flex-wrap gap-2">
            {audiences.map((a) => (
              <span
                key={a}
                className="rounded bg-background px-2 py-0.5 text-xs text-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}
      {formats && formats.length > 0 && (
        <div className="mt-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Available formats
          </span>
          <div className="mt-1 flex flex-wrap gap-2">
            {formats.map((f) => (
              <span
                key={f}
                className="rounded bg-background px-2 py-0.5 text-xs text-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
      {scenarios && scenarios.length > 0 && (
        <div className="mt-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Example scenarios
          </span>
          <div className="mt-1 flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <span
                key={s}
                className="rounded bg-background px-2 py-0.5 text-xs text-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}
