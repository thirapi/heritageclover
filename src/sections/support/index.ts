import type { SectionEntry } from "../registry";
import HclContact, { hclContactDefaults } from "./hcl-contact";
import HclFaq, { hclFaqDefaults } from "./hcl-faq";

// Style id → section for the "support" group. Add one entry per hcl-* section here.
export const supportSections: Record<string, SectionEntry> = {
  "hcl-contact": { component: HclContact, defaults: hclContactDefaults, group: "support" },
  "hcl-faq": { component: HclFaq, defaults: hclFaqDefaults, group: "support" },
};
