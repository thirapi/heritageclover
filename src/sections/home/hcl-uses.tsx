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
  eyebrow: "",
  title: "Four ways to use whole cloves",
  intro:
    "In Indonesian kitchens cloves season rendang and spiced rice and go into hot drinks. A few buds simmered in water will also scent a whole room.",
  uses: [
    {
      title: "Cooking",
      body: "Toast whole buds in oil before adding rendang spices, or cook them with rice, gingerbread and mulled wine.",
      image: ASSETS.useCulinary,
    },
    {
      title: "Drinks and bath",
      body: "Steep a few buds in hot water for wedang cengkeh, or add a drop of clove bud oil to a warm bath.",
      image: ASSETS.useWellness,
    },
    {
      title: "Home scent",
      body: "Simmer a handful with cinnamon and orange peel, or press them into an orange to make a pomander.",
      image: ASSETS.useAroma,
    },
    {
      title: "Gifting",
      body: "Gift sets of whole Maluku cloves, packed to send to family, friends and business partners.",
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
              </div>
              <h3 className="hcl-uses__card-title">{use.title}</h3>
              {use.body && <p className="hcl-uses__body">{use.body}</p>}
            </HclReveal>
          ))}
        </ul>
      </div>
    </HclRoot>
  );
}
