import type { SectionEntry } from "../registry";
import HclFooter, { hclFooterDefaults } from "./hcl-footer";
import HclHeader, { hclHeaderDefaults } from "./hcl-header";

// Style id → section for the "layout" group. Add one entry per hcl-* section here.
export const layoutSections: Record<string, SectionEntry> = {
  "hcl-header": { component: HclHeader, defaults: hclHeaderDefaults, group: "layout" },
  "hcl-footer": { component: HclFooter, defaults: hclFooterDefaults, group: "layout" },
};
