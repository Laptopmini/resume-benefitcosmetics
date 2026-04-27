import type React from "react";

function MockImage(props: Record<string, unknown>) {
  // biome-ignore lint/a11y/useAltText: mock
  return <img {...props} />;
}

export default MockImage;
