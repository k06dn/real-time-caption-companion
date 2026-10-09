import type { ReactNode } from "react";

/** Decorative hand-drawn pencil marks. Always aria-hidden. */
export function Scribble({ children, variant = "underline" }: { children: ReactNode; variant?: "underline" | "circle" }) {
  return (
    <span className="scribble">
      {children}
      {variant === "underline" ? (
        <svg className="scribble-mark scribble-under" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M3 13 C 60 6, 120 15, 180 9 S 270 7, 297 11" />
          <path d="M14 16 C 90 11, 170 17, 260 13" opacity=".55" />
        </svg>
      ) : (
        <svg className="scribble-mark scribble-circle" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M150 6 C 60 4, 6 26, 8 52 C 10 82, 90 96, 160 94 C 240 92, 296 72, 292 46 C 288 18, 220 4, 130 10" />
        </svg>
      )}
    </span>
  );
}

export function Doodle({ type, className = "" }: { type: "star" | "arrow" | "squiggle"; className?: string }) {
  const paths = {
    star: <><path d="M20 4 L22 18 M8 12 L34 26 M6 26 L34 12" /></>,
    arrow: <><path d="M4 30 C 20 10, 40 6, 58 14" /><path d="M48 6 L58 14 L47 21" /></>,
    squiggle: <path d="M4 20 C 12 4, 20 36, 28 20 S 44 4, 52 20 S 68 36, 76 20" />,
  };
  const vb = type === "star" ? "0 0 40 30" : type === "arrow" ? "0 0 62 34" : "0 0 80 40";
  return (
    <svg className={`doodle doodle-${type} ${className}`} viewBox={vb} aria-hidden="true" focusable="false">
      {paths[type]}
    </svg>
  );
}
