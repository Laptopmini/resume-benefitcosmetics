import type React from "react";

interface SectionProps {
  id: string;
  title?: string;
  testId: string;
  children: React.ReactNode;
}

export default function Section({ id, title, testId, children }: SectionProps) {
  return (
    <section id={id} data-testid={testId} className="section-pad">
      {title && (
        <h2
          data-testid={`${testId}-title`}
          className="text-4xl md:text-6xl font-semibold tracking-tight mb-12"
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
