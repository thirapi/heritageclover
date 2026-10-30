"use client";

import { Award, Droplets, Leaf, MapPin, ScanSearch, ShieldCheck, Sprout, type LucideIcon } from "lucide-react";
import { ASSETS } from "@/content/assets";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-quality.css";

const ICONS: Record<string, LucideIcon> = { Award, Droplets, Leaf, MapPin, ScanSearch, ShieldCheck, Sprout };

export type HclQualityProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  points?: { title: string; body: string; icon: string }[];
  badgesLabel?: string;
  badges?: { label: string; image: string }[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclQualityDefaults: Required<Omit<HclQualityProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "",
  title: "Quality you can smell before you open the jar",
  body: "Good cloves are plump, whole and slightly oily to the touch. Every batch is sorted by hand and moisture-tested before it is packed.",
  points: [
    {
      title: "Traceable origin",
      body: "Sourced from smallholder gardens in Maluku, the islands where the clove trade began.",
      icon: "MapPin",
    },
    {
      title: "Whole, hand-sorted buds",
      body: "Broken stems and spent buds are sorted out by hand, so only intact cloves reach you.",
      icon: "ScanSearch",
    },
    {
      title: "Moisture checked",
      body: "Every lot is tested after drying so the buds stay crisp, fragrant and properly dry.",
      icon: "Droplets",
    },
    {
      title: "Nothing added",
      body: "Whole clove buds only, with no fillers, colouring or preservatives.",
      icon: "Leaf",
    },
  ],
  badgesLabel: "Certifications",
  badges: [
    { label: "Certification (TBD)", image: ASSETS.cert },
    { label: "Certification (TBD)", image: ASSETS.cert },
    { label: "Certification (TBD)", image: ASSETS.cert },
  ],
  backgroundColor: "#EFE6D3",
  textColor: "#4A2C21",
};

export default function HclQuality(props: HclQualityProps) {
  const p = withHclDefaults(hclQualityDefaults, props);
  const points = p.points ?? [];
  const badges = p.badges ?? [];
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-quality"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container hcl-quality__inner">
        <HclReveal isCanvas={p.isCanvas} className="hcl-quality__intro">
          {p.eyebrow && <p className="hcl-eyebrow hcl-quality__eyebrow">{p.eyebrow}</p>}
          <h2 className="hcl-quality__title">{p.title}</h2>
          {p.body && <p className="hcl-quality__lead">{p.body}</p>}
        </HclReveal>

        <ul className="hcl-quality__points">
          {points.map((point, i) => {
            const Icon = ICONS[point.icon] ?? ShieldCheck;
            return (
              <HclReveal
                key={`${point.title}-${i}`}
                as="li"
                isCanvas={p.isCanvas}
                delay={0.1 + i * 0.08}
                className="hcl-quality__point"
              >
                <div className="hcl-quality__point-head">
                  <span className="hcl-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="hcl-quality__point-title">{point.title}</h3>
                </div>
                {point.body && <p className="hcl-quality__point-body">{point.body}</p>}
              </HclReveal>
            );
          })}
        </ul>

        {badges.length > 0 && (
          <HclReveal isCanvas={p.isCanvas} delay={0.2} className="hcl-quality__badges">
            {p.badgesLabel && <p className="hcl-quality__badges-label">{p.badgesLabel}</p>}
            <ul className="hcl-quality__badge-list">
              {badges.map((badge, i) => (
                <li key={`${badge.label}-${i}`} className="hcl-quality__badge">
                  {badge.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="hcl-quality__badge-image" src={badge.image} alt="" aria-hidden="true" loading="lazy" />
                  )}
                  <span className="hcl-quality__badge-text">{badge.label}</span>
                </li>
              ))}
            </ul>
          </HclReveal>
        )}
      </div>
    </HclRoot>
  );
}
