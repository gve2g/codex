import Button from "@/components/ui/Button";

interface PricingBlockProps {
  title: string;
  description: string;
  features?: string[];
  cta: string;
  href: string;
}

export default function PricingBlock({
  title,
  description,
  features,
  cta,
  href,
}: PricingBlockProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-8">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 text-accent">-</span>
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
