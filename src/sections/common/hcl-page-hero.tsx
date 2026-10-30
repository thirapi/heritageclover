"use client";

import { ASSETS } from "@/content/assets";
import { cn } from "@/lib/utils";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-page-hero.css";

export type HclPageHeroProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclPageHeroDefaults: Required<Omit<HclPageHeroProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Heritage Clover",
  title: "Our Story",
  subtitle: "From the Spice Islands of Maluku to your kitchen, one hand-picked bud at a time.",
  image: ASSETS.pageHero,
  backgroundColor: "#2E1A13",
  textColor: "#FCFAF5",
};

export default function HclPageHero(props: HclPageHeroProps) {
  const p = withHclDefaults(hclPageHeroDefaults, props);
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-page-hero"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hcl-page-hero__media" src={p.image} alt="" aria-hidden="true" />
      )}
      <div className="hcl-page-hero__overlay" aria-hidden="true" />
      <div className="hcl-container">
        <div className={cn("hcl-page-hero__content", !p.isCanvas && "hcl-fade-up")}>
          {p.eyebrow && <p className="hcl-eyebrow hcl-page-hero__eyebrow">{p.eyebrow}</p>}
          <h1 className="hcl-page-hero__title">{p.title}</h1>
          <span className="hcl-page-hero__rule" aria-hidden="true" />
          {p.subtitle && <p className="hcl-page-hero__subtitle">{p.subtitle}</p>}
        </div>
      </div>
    </HclRoot>
  );
}
