import { type ReactNode } from "react";

interface CardProps {
  title: string;
  description?: string;
  metadata?: string[];
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  metadata,
  children,
}: CardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5">
      <h3 className="font-serif text-lg font-semibold">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      {metadata && metadata.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {metadata.map((item) => (
            <li
              key={item}
              className="rounded bg-background px-2 py-0.5 text-xs text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
