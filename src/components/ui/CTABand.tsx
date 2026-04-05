import Button from "@/components/ui/Button";

interface CTABandProps {
  title: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABand({
  title,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABandProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-light px-8 py-16 text-center text-white md:px-16 md:py-20">
      <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button
          href={primaryHref}
          variant="secondary"
          className="border-white text-white hover:bg-white hover:text-accent"
        >
          {primaryLabel}
        </Button>
        {secondaryLabel && secondaryHref && (
          <Button
            href={secondaryHref}
            variant="secondary"
            className="border-white/50 text-white hover:bg-white hover:text-accent"
          >
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
