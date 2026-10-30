"use client";

import {
  ArrowRight,
  Droplets,
  Filter,
  Hand,
  Leaf,
  Package,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-steps.css";

const ICONS: Record<string, LucideIcon> = {
  Hand,
  Sun,
  Filter,
  Droplets,
  Package,
  Leaf,
};

export type HclStepsProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  steps?: { number: string; title: string; body: string; icon: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  backgroundColor?: string;
} & HclInjectedProps;

export const hclStepsDefaults: Required<
  Omit<HclStepsProps, keyof HclInjectedProps>
> = {
  sectionId: "",
  eyebrow: "",
  title: "From the tree to the jar",
  intro:
    "Picking, drying and sorting are done by hand, the way Maluku growers have always done them. Moisture is checked and every lot is sealed before it leaves the island.",
  steps: [
    {
      number: "01",
      title: "Hand-picked",
      body: "Buds are gathered by hand at the moment they blush pink, just before the flower opens.",
      icon: "Hand",
    },
    {
      number: "02",
      title: "Sun-dried",
      body: "Spread on woven mats, the buds dry in the equatorial sun until they turn a deep russet brown.",
      icon: "Sun",
    },
    {
      number: "03",
      title: "Hand-sorted",
      body: "Every batch is sifted and sorted by eye, keeping only whole, well-formed buds.",
      icon: "Filter",
    },
    {
      number: "04",
      title: "Moisture-tested",
      body: "Each lot is checked for moisture so the cloves stay dry, fragrant and shelf-stable.",
      icon: "Droplets",
    },
    {
      number: "05",
      title: "Sealed fresh",
      body: "Packed in airtight pouches that keep the aroma in until you open them.",
      icon: "Package",
    },
  ],
  ctaLabel: "See the full process",
  ctaHref: "/process",
  backgroundColor: "#FCFAF5",
};

export default function HclSteps(props: HclStepsProps) {
  const p = withHclDefaults(hclStepsDefaults, props);
  const steps = p.steps ?? [];
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-steps"
      style={{ backgroundColor: p.backgroundColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-steps__head">
          <div className="hcl-steps__heading">
            {p.eyebrow && (
              <p className="hcl-eyebrow hcl-steps__eyebrow">{p.eyebrow}</p>
            )}
            <h2 className="hcl-steps__title">{p.title}</h2>
            {p.intro && <p className="hcl-steps__intro">{p.intro}</p>}
          </div>
          {p.ctaLabel && (
            <HclLink
              href={p.ctaHref}
              className="hcl-btn hcl-btn--secondary hcl-steps__cta"
            >
              {p.ctaLabel}
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </HclLink>
          )}
        </HclReveal>

        <ol className="hcl-steps__list">
          {steps.map((step, i) => {
            const Icon = ICONS[step.icon] ?? Leaf;
            return (
              <HclReveal
                key={`${step.title}-${i}`}
                as="li"
                isCanvas={p.isCanvas}
                delay={i * 0.08}
                className="hcl-steps__item"
              >
                {step.number && (
                  <span className="hcl-num hcl-steps__number">
                    {step.number}
                  </span>
                )}
                <div className="hcl-steps__item-head">
                  <span className="hcl-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="hcl-steps__item-title">{step.title}</h3>
                </div>
                {step.body && <p className="hcl-steps__body">{step.body}</p>}
              </HclReveal>
            );
          })}
        </ol>
      </div>
    </HclRoot>
  );
}
