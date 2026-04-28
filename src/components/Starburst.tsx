import type React from "react";

const POINTS = [
  [195, 100],
  [157.95, 55.53],
  [182.27, 147.5],
  [142.43, 142.43],
  [147.5, 182.27],
  [115.54, 157.95],
  [100, 195],
  [84.46, 157.95],
  [52.5, 182.27],
  [57.57, 142.43],
  [17.73, 147.5],
  [42.05, 55.53],
  [5, 100],
  [42.05, 144.47],
  [17.73, 52.5],
  [57.57, 57.57],
  [52.5, 17.73],
  [115.54, 42.05],
  [100, 5],
  [142.43, 57.57],
  [147.5, 17.73],
  [157.95, 144.47],
  [182.27, 52.5],
  [84.46, 42.05],
]
  .map(([x, y]) => `${x},${y}`)
  .join(" ");

export default function Starburst({
  size = 120,
  fill = "var(--rose)",
  children,
  className,
}: {
  size?: number;
  fill?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ position: "relative", width: size, height: size }}
      data-testid="starburst"
    >
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
        <title>Starburst decorative element</title>
        <polygon points={POINTS} fill={fill} stroke="var(--ink)" strokeWidth="3" />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
