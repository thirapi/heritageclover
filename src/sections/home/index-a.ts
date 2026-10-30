import type { SectionEntry } from "../registry";
import HclHeritageTeaser, { hclHeritageTeaserDefaults } from "./hcl-heritage-teaser";
import HclHero, { hclHeroDefaults } from "./hcl-hero";
import HclIntro, { hclIntroDefaults } from "./hcl-intro";
import HclOrigin, { hclOriginDefaults } from "./hcl-origin";
import HclShowcase, { hclShowcaseDefaults } from "./hcl-showcase";

// Home sections, part A. Add one entry per hcl-* section here.
export const homeSectionsA: Record<string, SectionEntry> = {
  "hcl-hero": { component: HclHero, defaults: hclHeroDefaults, group: "home" },
  "hcl-intro": { component: HclIntro, defaults: hclIntroDefaults, group: "home" },
  "hcl-heritage-teaser": { component: HclHeritageTeaser, defaults: hclHeritageTeaserDefaults, group: "home" },
  "hcl-showcase": { component: HclShowcase, defaults: hclShowcaseDefaults, group: "home" },
  "hcl-origin": { component: HclOrigin, defaults: hclOriginDefaults, group: "home" },
};
