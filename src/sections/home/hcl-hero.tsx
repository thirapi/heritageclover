"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ASSETS } from "@/content/assets";
import { HclLink } from "../hcl-link";
import { cn } from "@/lib/utils";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-hero.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HclHeroProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
  overlayOpacity?: string; // select: "0.3" | "0.5" | "0.7"
} & HclInjectedProps;

export const hclHeroDefaults: Required<Omit<HclHeroProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Heritage Clover · Maluku, Indonesia",
  title: "The Spice That",
  titleAccent: "Shaped the World.",
  body: "Clove buds picked by hand in North Maluku, dried in the sun for four to five days and sealed fresh for your kitchen.",
  primaryLabel: "Shop cloves",
  primaryHref: "/store",
  secondaryLabel: "Our story",
  secondaryHref: "/our-story",
  image: ASSETS.hero,
  overlayOpacity: "0.5",
};

const OVERLAYS = new Set(["0.3", "0.5", "0.7"]);

export default function HclHero(props: HclHeroProps) {
  const p = withHclDefaults(hclHeroDefaults, props);
  const rootRef = useRef<HTMLElement>(null);
  const overlay = OVERLAYS.has(p.overlayOpacity) ? p.overlayOpacity : "0.5";

  // Light parallax on the background image; static in the editor canvas and
  // for visitors who prefer reduced motion.
  useGSAP(
    () => {
      if (p.isCanvas || !rootRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".hcl-hero__media", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: rootRef, dependencies: [p.isCanvas] },
  );

  return (
    <HclRoot
      as="section"
      ref={rootRef}
      id={p.sectionId}
      className="hcl-hero"
      style={{ ["--hcl-hero-overlay" as string]: overlay }}
    >
      {p.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hcl-hero__media" src={p.image} alt="" aria-hidden="true" fetchPriority="high" />
      )}
      <div className="hcl-hero__overlay" aria-hidden="true" />
      <div className="hcl-container">
        <div className={cn("hcl-hero__content", !p.isCanvas && "hcl-fade-up")}>
          {p.eyebrow && (
            <p className="hcl-eyebrow hcl-hero__eyebrow">
              {p.eyebrow}
            </p>
          )}
          <h1 className="hcl-hero__title">
            {p.title}
            {p.titleAccent && (
              <>
                {" "}
                <em className="hcl-hero__accent">{p.titleAccent}</em>
              </>
            )}
          </h1>
          {p.body && <p className="hcl-hero__body">{p.body}</p>}
          <div className="hcl-hero__actions">
            {p.primaryLabel && (
              <HclLink href={p.primaryHref} className="hcl-btn hcl-btn--primary hcl-hero__cta">
                {p.primaryLabel}
              </HclLink>
            )}
            {p.secondaryLabel && (
              <HclLink href={p.secondaryHref} className="hcl-btn hcl-btn--on-dark hcl-hero__cta">
                {p.secondaryLabel}
              </HclLink>
            )}
          </div>
        </div>
      </div>
    </HclRoot>
  );
}
