"use client";

import {
  Compass,
  HandHeart,
  Leaf,
  Scale,
  ShieldCheck,
  Sprout,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-values.css";

const ICONS: Record<string, LucideIcon> = {
  Compass,
  HandHeart,
  Leaf,
  Scale,
  ShieldCheck,
  Sprout,
  Sun,
  Users,
};

export type HclValuesProps = {
  sectionId?: string;
  eyebrow?: string;
  mission?: string;
  missionNote?: string;
  values?: { title: string; body: string; icon: string }[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclValuesDefaults: Required<
  Omit<HclValuesProps, keyof HclInjectedProps>
> = {
  sectionId: "",
  eyebrow: "",
  mission:
    "To bring Indonesian cloves to your kitchen the way growers in Maluku keep them: picked by hand, dried in the sun and sealed while the oils are still in the bud.",
  missionNote:
    "We are a small Indonesian brand. We buy from smallholder clove gardens and work with the families who pick, dry and sort the harvest.",
  values: [
    {
      title: "Rooted in origin",
      body: "We source from smallholder gardens and tell you where every harvest comes from, because provenance is part of the flavour.",
      icon: "Compass",
    },
    {
      title: "Picked by hand, dried in the sun",
      body: "Buds are picked while still closed and dried on mats in the sun for several days, the same method Maluku growers have used for generations.",
      icon: "Sun",
    },
    {
      title: "Fair to the hands that grow it",
      body: "We work directly with growers and their families, building relationships that last longer than a single season.",
      icon: "HandHeart",
    },
    {
      title: "Quality you can check",
      body: "Every batch is sorted by hand and checked for moisture before it is packed. Batches that are not dry enough go back to the sun.",
      icon: "ShieldCheck",
    },
  ],
  backgroundColor: "#2E1A13",
  textColor: "#FCFAF5",
};

export default function HclValues(props: HclValuesProps) {
  const p = withHclDefaults(hclValuesDefaults, props);
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-values"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-values__mission">
          <div>
            {p.eyebrow && (
              <p className="hcl-eyebrow hcl-values__eyebrow">{p.eyebrow}</p>
            )}
            <h2 className="hcl-values__statement">{p.mission}</h2>
          </div>
          {p.missionNote && <p className="hcl-values__note">{p.missionNote}</p>}
        </HclReveal>

        <ul className="hcl-values__grid">
          {p.values.map((value, i) => {
            const Icon = ICONS[value.icon] ?? Leaf;
            return (
              <HclReveal
                key={`${value.title}-${i}`}
                as="li"
                isCanvas={p.isCanvas}
                delay={i * 0.08}
                className="hcl-values__item"
              >
                <div className="hcl-values__item-head">
                  <span className="hcl-icon hcl-values__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="hcl-values__title">{value.title}</h3>
                </div>
                <p className="hcl-values__body">{value.body}</p>
              </HclReveal>
            );
          })}
        </ul>
      </div>
    </HclRoot>
  );
}
