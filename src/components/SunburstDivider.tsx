import type React from "react";

export default function SunburstDivider() {
  const rays: React.ReactNode[] = [];

  for (let i = 0; i < 24; i++) {
    const angleDeg = -90 + i * 7.5;
    const angleRad = (angleDeg * Math.PI) / 180;

    const outerX = 300 + 95 * Math.cos(angleRad);
    const outerY = 95 * Math.sin(angleRad);
    const innerAngleRad = ((-90 + (i + 0.5) * 7.5) * Math.PI) / 180;
    const innerX = 300 + 60 * Math.cos(innerAngleRad);
    const innerY = 60 * Math.sin(innerAngleRad);

    const color = i % 2 === 0 ? "var(--rose)" : "var(--mustard)";

    rays.push(
      <polygon key={i} points={`300,0 ${outerX},${outerY} ${innerX},${innerY}`} fill={color} />,
    );
  }

  return (
    <div className="my-4 flex justify-center" data-testid="sunburst-divider">
      <svg viewBox="0 0 600 60" className="w-full max-w-editorial" aria-hidden="true">
        <line x1="0" y1="2" x2="600" y2="2" stroke="var(--ink)" strokeWidth="3" />
        {rays}
      </svg>
    </div>
  );
}
