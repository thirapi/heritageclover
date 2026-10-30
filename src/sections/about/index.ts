import type { SectionEntry } from "../registry";
import HclFarmers, { hclFarmersDefaults } from "./hcl-farmers";
import HclProcessDetail, {
  hclProcessDetailDefaults,
} from "./hcl-process-detail";
import HclTimeline, { hclTimelineDefaults } from "./hcl-timeline";
import HclValues, { hclValuesDefaults } from "./hcl-values";

// Style id → section for the "about" group. Add one entry per hcl-* section here.
export const aboutSections: Record<string, SectionEntry> = {
  "hcl-timeline": {
    component: HclTimeline,
    defaults: hclTimelineDefaults,
    group: "about",
  },
  "hcl-values": {
    component: HclValues,
    defaults: hclValuesDefaults,
    group: "about",
  },
  "hcl-farmers": {
    component: HclFarmers,
    defaults: hclFarmersDefaults,
    group: "about",
  },
  "hcl-process-detail": {
    component: HclProcessDetail,
    defaults: hclProcessDetailDefaults,
    group: "about",
  },
};
