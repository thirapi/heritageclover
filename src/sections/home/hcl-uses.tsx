"use client";

import { ASSETS } from "@/content/assets";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-uses.css";

export type HclUsesProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  uses?: { title: string; body: string; image: string }[];
  backgroundColor?: string;
} & HclInjectedProps;

export const hclUsesDefaults: Required<Omit<HclUsesProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Ways to enjoy",
  title: "One small bud, many rituals",
  intro:
    "Cloves have perfumed kitchens, homes and celebrations along the spice route for generations. A few ways to bring that warmth into your days.",
  uses: [
    {
      title: "Culinary",
      body: "Bloom whole buds in rendang, spiced rice, gingerbread and mulled drinks for deep, sweet warmth.",
      image: ASSETS.useCulinary,
    },
    {
      title: "Wellness rituals",
      body: "A cup of wedang cengkeh or a drop of clove bud oil in a warm bath for a slow, comforting evening.",
      image: ASSETS.useWellness,
    },
    {
      title: "Home aroma",
      body: "Simmer pots, pomanders and diffuser blends that fill the house with a cosy, spiced scent.",
      image: ASSETS.useAroma,
    },
    {
      title: "Gifting",
      body: "Heritage gift sets that carry a story from the Spice Islands to the people you love.",
      image: ASSETS.useGifting,
    },
  ],
  backgroundColor: "#F6F0E4",
};

export default function HclUses(props: HclUsesProps) {
  const p = withHclDefaults(hclUsesDefaults, props);
  const uses = p.uses ?? [];
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-uses"
      style={{ backgroundColor: p.backgroundColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-uses__head">
          <div className="hcl-uses__heading">
            {p.eyebrow && <p className="hcl-eyebrow hcl-uses__eyebrow">{p.eyebrow}</p>}
            <h2 className="hcl-uses__title">{p.title}</h2>
          </div>
          {p.intro && <p className="hcl-uses__intro">{p.intro}</p>}
        </HclReveal>

        <ul className="hcl-uses__grid">
          {uses.map((use, i) => (
            <HclReveal
              key={`${use.title}-${i}`}
              as="li"
              isCanvas={p.isCanvas}
              delay={i * 0.08}
              className="hcl-uses__card"
            >
              <div className="hcl-uses__media">
                {use.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="hcl-uses__image" src={use.image} alt={use.title} loading="lazy" />
                )}
                <span className="hcl-uses__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="hcl-uses__text">
                <h3 className="hcl-uses__card-title">{use.title}</h3>
                <span className="hcl-uses__rule" aria-hidden="true" />
                {use.body && <p className="hcl-uses__body">{use.body}</p>}
              </div>
            </HclReveal>
          ))}
        </ul>
      </div>
    </HclRoot>
  );
}
