import Button from "@/components/ui/Button";

interface PricingBlockProps {
  title: string;
  subtitle?: string;
  description: string;
  features?: string[];
  cta: string;
  href: string;
  recommended?: boolean;
}

export default function PricingBlock({
  title,
  subtitle,
  description,
  features,
  cta,
  href,
  recommended,
}: PricingBlockProps) {
  return (
    <div className={`rounded-xl border p-8 transition-all duration-300 hover:shadow-md ${recommended ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-border bg-surface"}`}>
      <div className="flex items-center gap-3">
        <h3 className="font-serif text-xl font-semibold">{title}</h3>
        {recommended && (
          <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-white">
            Start here
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-1 text-sm font-medium text-accent">{subtitle}</p>
      )}
      <p className="mt-3 text-muted">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-accent">&mdash;</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Button href={href} variant="primary">
          {cta}
        </Button>
      </div>
    </div>
  );
}
