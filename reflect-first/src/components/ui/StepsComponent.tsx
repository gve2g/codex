interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepsComponentProps {
  steps: Step[];
}

export default function StepsComponent({ steps }: StepsComponentProps) {
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
        </div>
      ))}
    </div>
  );
}
