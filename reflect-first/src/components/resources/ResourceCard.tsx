import Link from "next/link";

interface ResourceCardProps {
  title: string;
  type: string;
  description: string;
  href: string;
}

export default function ResourceCard({
  title,
  type,
  description,
  href,
}: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="block rounded border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        {type}
      </span>
      <h3 className="mt-2 font-serif text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>
    </Link>
  );
}
