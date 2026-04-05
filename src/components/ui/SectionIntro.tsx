interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  centered = true,
}: SectionIntroProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-[2.75rem]">{title}</h2>
      {description && (
        <p
          className={[
            "mt-4 max-w-2xl text-lg text-muted",
            centered ? "mx-auto" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      )}
    </div>
  );
}
