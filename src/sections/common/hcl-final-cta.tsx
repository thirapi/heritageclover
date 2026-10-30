"use client";

import { ASSETS } from "@/content/assets";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-final-cta.css";

export type HclFinalCtaProps = {
  sectionId?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
  backgroundColor?: string;
} & HclInjectedProps;

export const hclFinalCtaDefaults: Required<Omit<HclFinalCtaProps, keyof HclInjectedProps>> = {
  sectionId: "",
  title: "Bring the Spice Islands to your table.",
  body: "Whole cloves, ground cloves and clove bud oil from smallholder gardens in Maluku. Hand-picked, sun-dried and sealed fresh.",
  primaryLabel: "Shop the collection",
  primaryHref: "/store",
  secondaryLabel: "Talk to us",
  secondaryHref: "/contact",
  image: ASSETS.cta,
  backgroundColor: "#2E1A13",
};

export default function HclFinalCta(props: HclFinalCtaProps) {
  const p = withHclDefaults(hclFinalCtaDefaults, props);
  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-final-cta" style={{ backgroundColor: p.backgroundColor }}>
      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hcl-final-cta__media" src={p.image} alt="" aria-hidden="true" />
      )}
      <div className="hcl-final-cta__overlay" aria-hidden="true" />
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-final-cta__content">
          <h2 className="hcl-final-cta__title">{p.title}</h2>
          {p.body && <p className="hcl-final-cta__body">{p.body}</p>}
          <div className="hcl-final-cta__actions">
            {p.primaryLabel && (
              <HclLink href={p.primaryHref} className="hcl-btn hcl-btn--primary hcl-final-cta__btn">
                {p.primaryLabel}
              </HclLink>
            )}
            {p.secondaryLabel && (
              <HclLink href={p.secondaryHref} className="hcl-btn hcl-btn--on-dark hcl-final-cta__btn">
                {p.secondaryLabel}
              </HclLink>
            )}
          </div>
        </HclReveal>
      </div>
    </HclRoot>
  );
}
