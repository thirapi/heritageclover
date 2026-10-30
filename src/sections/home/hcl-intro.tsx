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
  eyebrow: "",
  statement:
    "For centuries, cloves grew only on a few small islands in North Maluku.\nWe buy ours there, from the families who grow them.",
  body: "Heritage Clover works with smallholder growers on Ternate and the neighbouring islands. Each bud is picked by hand as it turns from green to pink, dried in the sun for four to five days and sorted by hand before it is packed.",
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
          {p.eyebrow && <p className="hcl-eyebrow hcl-intro__eyebrow">{p.eyebrow}</p>}
          <h2 className="hcl-intro__statement">
            {lines.map((line, i) => (
              <span key={i} className={i === 0 ? "hcl-intro__line" : "hcl-intro__line hcl-intro__line--accent"}>
                {line}
              </span>
            ))}
          </h2>
          {(p.body || p.signature) && (
            <div className="hcl-intro__aside">
              {p.body && <p className="hcl-intro__body">{p.body}</p>}
              {p.signature && <p className="hcl-intro__signature">{p.signature}</p>}
            </div>
          )}
        </HclReveal>
        {p.image && (
          <HclReveal isCanvas={p.isCanvas} delay={0.15} className="hcl-intro__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hcl-intro__image" src={p.image} alt={p.imageAlt} loading="lazy" />
          </HclReveal>
        )}
      </div>
    </HclRoot>
  );
}
