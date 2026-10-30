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
  body: "Whole buds, fine-ground spice and pure clove bud oil, hand-picked by smallholder farmers in Maluku and sun-dried the way it has been done for generations.",
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
          <span className="hcl-final-cta__ornament" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 0c.6 6.2 2.4 9.6 12 12-9.6 2.4-11.4 5.8-12 12-.6-6.2-2.4-9.6-12-12C9.6 9.6 11.4 6.2 12 0Z" />
            </svg>
          </span>
          <h2 className="hcl-final-cta__title">{p.title}</h2>
          {p.body && <p className="hcl-final-cta__body">{p.body}</p>}
          <div className="hcl-final-cta__actions">
            {p.primaryLabel && (
              <HclLink href={p.primaryHref} className="hcl-btn hcl-btn--primary hcl-final-cta__btn">
                {p.primaryLabel}
              </HclLink>
            )}
            {p.secondaryLabel && (
              <HclLink href={p.secondaryHref} className="hcl-btn hcl-btn--ghost hcl-final-cta__btn hcl-final-cta__btn--ghost">
                {p.secondaryLabel}
              </HclLink>
            )}
          </div>
        </HclReveal>
      </div>
    </HclRoot>
  );
}
