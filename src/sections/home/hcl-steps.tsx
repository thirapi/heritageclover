"use client";

import type { CSSProperties } from "react";
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
  eyebrow: "From tree to jar",
  title: "Five unhurried steps",
  intro:
    "The same patient craft the spice islands have practised for centuries, kept honest with a few modern checks.",
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
      body: "Spread on woven mats, they dry slowly under the equatorial sun until deep russet brown.",
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
      body: "Packed in airtight pouches that hold the warm, sweet aroma until you open them.",
      icon: "Package",
    },
  ],
  ctaLabel: "See our process",
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
          {p.eyebrow && (
            <p className="hcl-eyebrow hcl-steps__eyebrow">{p.eyebrow}</p>
          )}
          <h2 className="hcl-steps__title">{p.title}</h2>
          <span className="hcl-steps__ornament" aria-hidden="true">
            <span />
            <i />
            <span />
          </span>
          {p.intro && <p className="hcl-steps__intro">{p.intro}</p>}
        </HclReveal>

        <div
          className="hcl-steps__track"
          style={
            { "--hcl-steps-count": Math.max(steps.length, 1) } as CSSProperties
          }
        >
          <span className="hcl-steps__line" aria-hidden="true" />
          <ol className="hcl-steps__list">
            {steps.map((step, i) => {
              const Icon = ICONS[step.icon] ?? Leaf;
              return (
                <HclReveal
                  key={`${step.title}-${i}`}
                  as="li"
                  isCanvas={p.isCanvas}
                  delay={i * 0.1}
                  className="hcl-steps__item"
                >
                  <span className="hcl-steps__medallion" aria-hidden="true">
                    <Icon strokeWidth={1.4} />
                  </span>
                  <div className="hcl-steps__text">
                    {step.number && (
                      <span className="hcl-steps__number">{step.number}</span>
                    )}
                    <h3 className="hcl-steps__item-title">{step.title}</h3>
                    {step.body && (
                      <p className="hcl-steps__body">{step.body}</p>
                    )}
                  </div>
                </HclReveal>
              );
            })}
          </ol>
        </div>

        {p.ctaLabel && (
          <div className="hcl-steps__actions">
            <HclLink
              href={p.ctaHref}
              className="hcl-btn hcl-btn--ghost hcl-steps__cta"
            >
              {p.ctaLabel}
              <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </HclLink>
          </div>
        )}
      </div>
    </HclRoot>
  );
}
