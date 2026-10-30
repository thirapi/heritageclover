"use client";

import { MapPin } from "lucide-react";
import { ASSETS } from "@/content/assets";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-origin.css";

export type HclOriginProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  facts?: { label: string; value: string }[];
  factsTitle?: string;
  image?: string;
  imageAlt?: string;
  locationLabel?: string;
} & HclInjectedProps;

export const hclOriginDefaults: Required<Omit<HclOriginProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Where it grows",
  title: "Rooted in the original Spice Islands",
  body: "Our cloves come from smallholder gardens on the volcanic slopes of North Maluku, where sea breezes, rich soil and generations of know-how give each bud its deep, sweet warmth. We buy directly from the families who tend the trees.",
  facts: [
    { label: "Origin", value: "North Maluku" },
    { label: "Harvest", value: "By hand" },
    { label: "Drying", value: "4–5 days in the sun" },
    { label: "Sorting", value: "Bud by bud" },
  ],
  factsTitle: "At a glance",
  image: ASSETS.origin,
  imageAlt: "Clove trees on a hillside garden in North Maluku",
  locationLabel: "Ternate · North Maluku",
};

export default function HclOrigin(props: HclOriginProps) {
  const p = withHclDefaults(hclOriginDefaults, props);
  const facts = (p.facts ?? []).filter((f) => f.label || f.value);
  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-origin">
      <div className="hcl-origin__media">
        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hcl-origin__image" src={p.image} alt={p.imageAlt} loading="lazy" />
        )}
        {p.locationLabel && (
          <p className="hcl-origin__location">
            <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
            {p.locationLabel}
          </p>
        )}
        {facts.length > 0 && (
          <HclReveal isCanvas={p.isCanvas} delay={0.15} className="hcl-origin__card">
            {p.factsTitle && <p className="hcl-origin__card-title">{p.factsTitle}</p>}
            <dl className="hcl-origin__facts">
              {facts.map((fact, i) => (
                <div key={i} className="hcl-origin__fact">
                  <dt className="hcl-origin__fact-label">{fact.label}</dt>
                  <dd className="hcl-origin__fact-value">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </HclReveal>
        )}
      </div>
      <div className="hcl-origin__content">
        <HclReveal isCanvas={p.isCanvas} className="hcl-origin__text">
          {p.eyebrow && <p className="hcl-eyebrow hcl-origin__eyebrow">{p.eyebrow}</p>}
          <h2 className="hcl-origin__title">{p.title}</h2>
          <span className="hcl-origin__rule" aria-hidden="true" />
          {p.body && <p className="hcl-origin__body">{p.body}</p>}
        </HclReveal>
      </div>
    </HclRoot>
  );
}
