import type { SectionEntry } from "../registry";
import HclPageHero, { hclPageHeroDefaults } from "./hcl-page-hero";

// Style id → section for the "common" group. Add one entry per hcl-* section here.
export const commonSections: Record<string, SectionEntry> = {
  "hcl-page-hero": { component: HclPageHero, defaults: hclPageHeroDefaults, group: "common" },
};
