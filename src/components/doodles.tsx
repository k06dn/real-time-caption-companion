import type { ReactNode } from "react";
/** Decorative two-stroke highlighter behind text. */
export function Scribble({ children }: { children: ReactNode }) {
  return <span className="scribble">{children}</span>;
}
