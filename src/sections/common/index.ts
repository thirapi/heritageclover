import type { SectionEntry } from "../registry";
import HclFinalCta, { hclFinalCtaDefaults } from "./hcl-final-cta";
import HclMarquee, { hclMarqueeDefaults } from "./hcl-marquee";
import HclPageHero, { hclPageHeroDefaults } from "./hcl-page-hero";
import HclRichText, { hclRichTextDefaults } from "./hcl-rich-text";
import HclStats, { hclStatsDefaults } from "./hcl-stats";

// Style id → section for the "common" group. Add one entry per hcl-* section here.
export const commonSections: Record<string, SectionEntry> = {
  "hcl-page-hero": { component: HclPageHero, defaults: hclPageHeroDefaults, group: "common" },
  "hcl-marquee": { component: HclMarquee, defaults: hclMarqueeDefaults, group: "common" },
  "hcl-stats": { component: HclStats, defaults: hclStatsDefaults, group: "common" },
  "hcl-final-cta": { component: HclFinalCta, defaults: hclFinalCtaDefaults, group: "common" },
  "hcl-rich-text": { component: HclRichText, defaults: hclRichTextDefaults, group: "common" },
};
