interface Step {
  number: number;
  title: string;
  description: string;
  items?: string[];
}

interface StepsComponentProps {
  steps: Step[];
  layout?: "grid" | "vertical";
}

export default function StepsComponent({ steps, layout = "grid" }: StepsComponentProps) {
  if (layout === "vertical") {
    return (
      <div className="space-y-16">
        {steps.map((step) => (
          <div
            key={step.number}
            className="grid gap-8 md:grid-cols-[120px_1fr]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent">
              <span className="font-mono text-sm font-medium text-accent">
                {String(step.number).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h3 className="mb-2 font-serif text-2xl">{step.title}</h3>
              <p className="mb-4 max-w-2xl text-muted">{step.description}</p>
              {step.items && step.items.length > 0 && (
                <ul className="list-inside list-disc space-y-2 text-sm text-foreground">
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col">
          <span className="font-mono text-sm font-semibold text-accent">
            {String(step.number).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-serif text-lg font-semibold">
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{step.description}</p>
          {step.items && step.items.length > 0 && (
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-foreground">
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
