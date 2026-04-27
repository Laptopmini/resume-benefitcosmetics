import type React from "react";

function createMotionComponent(tag: string) {
  const Component = (props: Record<string, unknown>) => {
    const { initial, animate, whileInView, viewport, transition, style, children, ...rest } = props;
    const Tag = tag as keyof React.JSX.IntrinsicElements;
    return (
      <Tag style={style as React.CSSProperties} {...rest}>
        {children as React.ReactNode}
      </Tag>
    );
  };
  Component.displayName = `motion.${tag}`;
  return Component;
}

export const motion = new Proxy(
  {},
  {
    get(_target, prop: string) {
      return createMotionComponent(prop);
    },
  },
);

export function useScroll() {
  return { scrollY: { get: () => 0 } };
}

export function useTransform() {
  return { get: () => 0 };
}
