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
  eyebrow: "Our mission",
  mission:
    "To return the clove to its rightful place: honestly grown, carefully kept, and as fragrant as the day it left the Spice Islands.",
  missionNote:
    "We are a small Indonesian brand with a long memory. Everything we do starts with the growers who keep this heritage alive.",
  values: [
    {
      title: "Rooted in origin",
      body: "We source from smallholder gardens and tell you where every harvest comes from, because provenance is part of the flavour.",
      icon: "Compass",
    },
    {
      title: "Patience over shortcuts",
      body: "Picked by hand at the bud stage and dried slowly in the sun. We let tradition set the pace, not the clock.",
      icon: "Sun",
    },
    {
      title: "Fair to the hands that grow it",
      body: "We work directly with growers and their families, building relationships that last longer than a single season.",
      icon: "HandHeart",
    },
    {
      title: "Quality you can check",
      body: "Every batch is sorted, inspected and sealed with care. If it is not good enough for our own kitchens, it does not leave.",
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
          {p.eyebrow && (
            <p className="hcl-eyebrow hcl-values__eyebrow">{p.eyebrow}</p>
          )}
          <span className="hcl-values__quote-mark" aria-hidden="true">
            &ldquo;
          </span>
          <h2 className="hcl-values__statement">{p.mission}</h2>
          <span className="hcl-values__ornament" aria-hidden="true">
            <span />
            <i />
            <span />
          </span>
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
                <span className="hcl-values__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="hcl-values__icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.4} />
                </span>
                <h3 className="hcl-values__title">{value.title}</h3>
                <p className="hcl-values__body">{value.body}</p>
              </HclReveal>
            );
          })}
        </ul>
      </div>
    </HclRoot>
  );
}
