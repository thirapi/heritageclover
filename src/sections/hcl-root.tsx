import type { CSSProperties, ElementType, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";
import { HclMotion } from "./hcl-motion";
import "./hcl-base.css";

// Mirrors exantara-saas `SectionInjectedProps`: runtime props the renderer
// passes to every section (not editor fields).
export interface HclInjectedProps {
  websiteId?: string;
  fullDomain?: string;
  isCanvas?: boolean;
  previewMode?: string;
}

interface HclRootProps {
  as?: ElementType;
  ref?: Ref<HTMLElement>;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

// Turbopack drops external @import in CSS and next/font does not reach the
// editor's shadow-DOM canvas, so fonts load through a React 19 hoisted
// stylesheet (deduped by href, lands in <head>).
export const HCL_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap";

// Root wrapper for every hcl-* section: applies the scoped design tokens
// (hcl-base.css), loads the brand fonts and the motion config.
export function HclRoot({ as: Tag = "div", ref, id, className, style, children }: HclRootProps) {
  return (
    <Tag ref={ref} id={id || undefined} className={cn("hcl-root", className)} style={style}>
      <link rel="stylesheet" href={HCL_FONTS_HREF} precedence="default" />
      <HclMotion>{children}</HclMotion>
    </Tag>
  );
}

// Editor repeaters cannot nest, so short lists inside a repeater item are
// stored as a textarea with one entry per line.
export const hclLines = (value?: string | null): string[] =>
  (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// Passed props win over defaults, except null/undefined (a missing key in an
// older saved section must not wipe the default). An empty string is kept:
// in the builder it means the owner cleared the field on purpose.
// Injected runtime props (isCanvas, websiteId, ...) pass through typed.
export function withHclDefaults<T extends object, P extends Partial<T>>(defaults: T, props: P): T & P {
  const merged = { ...defaults } as T & P;
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== null) {
      (merged as Record<string, unknown>)[key] = value;
    }
  }
  return merged;
}
