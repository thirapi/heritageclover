import type { SectionEntry } from "../registry";
import { homeSectionsA } from "./index-a";
import { homeSectionsB } from "./index-b";

// Style id → section for the "home" group, split in two files so both halves
// can be built in parallel.
export const homeSections: Record<string, SectionEntry> = {
  ...homeSectionsA,
  ...homeSectionsB,
};
