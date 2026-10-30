import type { SectionEntry } from "../registry";
import HclArticle, { hclArticleDefaults } from "./hcl-article";
import HclInsightGrid, { hclInsightGridDefaults } from "./hcl-insight-grid";

// Style id → section for the "insight" group. Add one entry per hcl-* section here.
export const insightSections: Record<string, SectionEntry> = {
  "hcl-insight-grid": { component: HclInsightGrid, defaults: hclInsightGridDefaults, group: "insight" },
  "hcl-article": { component: HclArticle, defaults: hclArticleDefaults, group: "insight" },
};
