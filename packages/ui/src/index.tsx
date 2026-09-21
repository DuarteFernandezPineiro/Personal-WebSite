import type { ComponentProps } from "react";

function classes(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}

export type SectionShellProps = ComponentProps<"section"> & {
  tone?: "ink" | "paper" | "tide";
};

export function SectionShell({ tone = "paper", className, ...props }: SectionShellProps) {
  return <section data-tone={tone} className={classes("section-shell", className)} {...props} />;
}

export type EyebrowProps = ComponentProps<"p">;

export function Eyebrow({ className, ...props }: EyebrowProps) {
  return <p className={classes("eyebrow", className)} {...props} />;
}

export type TagProps = ComponentProps<"span">;

export function Tag({ className, ...props }: TagProps) {
  return <span className={classes("tag", className)} {...props} />;
}

export type ArrowProps = ComponentProps<"svg">;

export function Arrow({ className, ...props }: ArrowProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

