import type { ComponentType } from "react";
import { aboutSections } from "./about";
import { commonSections } from "./common";
import { homeSections } from "./home";
import { insightSections } from "./insight";
import { layoutSections } from "./layout";
import { supportSections } from "./support";

export type SectionGroup = "common" | "home" | "about" | "insight" | "support" | "layout";

export interface SectionEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- each section has its own props
  component: ComponentType<any>;
  defaults: object;
  group: SectionGroup;
}

// Style id → section. Each group keeps its own index.ts so groups can be
// built in parallel; this mirrors the category index files in exantara-saas.
export const sectionRegistry: Record<string, SectionEntry> = {
  ...layoutSections,
  ...commonSections,
  ...homeSections,
  ...aboutSections,
  ...insightSections,
  ...supportSections,
};
