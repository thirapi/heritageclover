import type { SectionEntry } from "../registry";
import HclInsightTeaser, { hclInsightTeaserDefaults } from "./hcl-insight-teaser";
import HclQuality, { hclQualityDefaults } from "./hcl-quality";
import HclSteps, { hclStepsDefaults } from "./hcl-steps";
import HclTestimonials, { hclTestimonialsDefaults } from "./hcl-testimonials";
import HclUses, { hclUsesDefaults } from "./hcl-uses";

// Home sections, part B. Add one entry per hcl-* section here.
export const homeSectionsB: Record<string, SectionEntry> = {
  "hcl-steps": { component: HclSteps, defaults: hclStepsDefaults, group: "home" },
  "hcl-uses": { component: HclUses, defaults: hclUsesDefaults, group: "home" },
  "hcl-quality": { component: HclQuality, defaults: hclQualityDefaults, group: "home" },
  "hcl-testimonials": { component: HclTestimonials, defaults: hclTestimonialsDefaults, group: "home" },
  "hcl-insight-teaser": { component: HclInsightTeaser, defaults: hclInsightTeaserDefaults, group: "home" },
};
