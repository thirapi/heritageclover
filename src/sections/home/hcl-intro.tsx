"use client";

import { ASSETS } from "@/content/assets";
import { HclReveal } from "../hcl-motion";
import { HclRoot, hclLines, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-intro.css";

export type HclIntroProps = {
  sectionId?: string;
  eyebrow?: string;
  statement?: string; // textarea: one display line per row
  body?: string;
  signature?: string;
  image?: string;
  imageAlt?: string;
} & HclInjectedProps;

export const hclIntroDefaults: Required<Omit<HclIntroProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Since the spice route",
  statement:
    "Once worth more than gold, the clove sailed from Maluku to every corner of the world.\nWe bring it home again, as it was always meant to be.",
  body: "Heritage Clover works with smallholder growers in the Spice Islands, where clove trees have flowered for centuries. Every bud is picked by hand at the moment it blushes pink, dried slowly under the equatorial sun and sorted with care, so its warm, honeyed aroma reaches you whole.",
  signature: "The Heritage Clover family",
  image: ASSETS.intro,
  imageAlt: "Hands sorting dried clove buds",
};

export default function HclIntro(props: HclIntroProps) {
  const p = withHclDefaults(hclIntroDefaults, props);
  const lines = hclLines(p.statement);
  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-intro">
      <div className="hcl-container hcl-intro__grid">
        <HclReveal isCanvas={p.isCanvas} className="hcl-intro__text">
          {p.eyebrow && (
            <p className="hcl-eyebrow hcl-intro__eyebrow">
              <span className="hcl-intro__eyebrow-rule" aria-hidden="true" />
              {p.eyebrow}
            </p>
          )}
          <h2 className="hcl-intro__statement">
            {lines.map((line, i) => (
              <span key={i} className={i === 0 ? "hcl-intro__line" : "hcl-intro__line hcl-intro__line--accent"}>
                {line}
              </span>
            ))}
          </h2>
          <div className="hcl-intro__aside">
            <span className="hcl-intro__ornament" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="20" cy="20" r="19" />
                <path d="M20 6 L22.5 17.5 L34 20 L22.5 22.5 L20 34 L17.5 22.5 L6 20 L17.5 17.5 Z" />
              </svg>
            </span>
            <div>
              {p.body && <p className="hcl-intro__body">{p.body}</p>}
              {p.signature && <p className="hcl-intro__signature">{p.signature}</p>}
            </div>
          </div>
        </HclReveal>
        {p.image && (
          <HclReveal isCanvas={p.isCanvas} delay={0.15} className="hcl-intro__media">
            <span className="hcl-intro__frame" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hcl-intro__image" src={p.image} alt={p.imageAlt} loading="lazy" />
          </HclReveal>
        )}
      </div>
    </HclRoot>
  );
}
