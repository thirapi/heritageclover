"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ASSETS } from "@/content/assets";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-heritage-teaser.css";

export type HclHeritageTeaserProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  milestones?: { year: string; label: string }[]; // max 4
  ctaLabel?: string;
  ctaHref?: string;
  mapImage?: string;
} & HclInjectedProps;

export const hclHeritageTeaserDefaults: Required<Omit<HclHeritageTeaserProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "The spice route",
  title: "A tiny bud that drew fleets across the world",
  body: "For centuries the clove grew on only a handful of islands in North Maluku. Its fragrance travelled by sail to distant courts and kitchens, and it changed the map of the world along the way.",
  milestones: [
    { year: "Antiquity", label: "Cloves leave Maluku on early sea routes towards China and India." },
    { year: "1500s", label: "Ternate and Tidore become the beating heart of the clove trade." },
    { year: "1600s", label: "European fleets race each other for the Spice Islands." },
    { year: "Today", label: "Smallholder growers keep the harvest alive, bud by bud." },
  ],
  ctaLabel: "Read our story",
  ctaHref: "/our-story",
  mapImage: ASSETS.heritageMap,
};

// Simplified spice-route line from the west (Europe) to Maluku in the east.
const ROUTE =
  "M6 254 C 110 150, 230 240, 360 160 S 560 50, 700 120 S 900 220, 1010 120 S 1110 60, 1150 88";

const ISLANDS = [
  { cx: 1158, cy: 84, r: 7 },
  { cx: 1178, cy: 106, r: 5 },
  { cx: 1190, cy: 80, r: 8 },
  { cx: 1172, cy: 62, r: 4 },
];

export default function HclHeritageTeaser(props: HclHeritageTeaserProps) {
  const p = withHclDefaults(hclHeritageTeaserDefaults, props);
  const reduce = useReducedMotion();
  const animate = !p.isCanvas && !reduce;
  const milestones = (p.milestones ?? []).filter((m) => m.year || m.label).slice(0, 4);

  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-heritage-teaser">
      {p.mapImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="hcl-heritage-teaser__texture" src={p.mapImage} alt="" aria-hidden="true" loading="lazy" />
      )}
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-heritage-teaser__head">
          <div>
            {p.eyebrow && <p className="hcl-eyebrow hcl-heritage-teaser__eyebrow">{p.eyebrow}</p>}
            <h2 className="hcl-heritage-teaser__title">{p.title}</h2>
          </div>
          <div className="hcl-heritage-teaser__lead">
            {p.body && <p className="hcl-heritage-teaser__body">{p.body}</p>}
            {p.ctaLabel && (
              <HclLink href={p.ctaHref} className="hcl-heritage-teaser__cta">
                {p.ctaLabel}
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </HclLink>
            )}
          </div>
        </HclReveal>

        <div className="hcl-heritage-teaser__route">
          <svg
            className="hcl-heritage-teaser__map"
            viewBox="0 0 1200 260"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            aria-hidden="true"
          >
            <g className="hcl-heritage-teaser__grid" stroke="currentColor" strokeWidth="0.5">
              {[65, 130, 195].map((y) => (
                <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} />
              ))}
              {[200, 400, 600, 800, 1000].map((x) => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="260" />
              ))}
            </g>
            <path className="hcl-heritage-teaser__path-shadow" d={ROUTE} />
            <motion.path
              className="hcl-heritage-teaser__path"
              d={ROUTE}
              initial={animate ? { pathLength: 0 } : false}
              whileInView={animate ? { pathLength: 1 } : undefined}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <g className="hcl-heritage-teaser__islands">
              {ISLANDS.map((isl, i) => (
                <circle key={i} cx={isl.cx} cy={isl.cy} r={isl.r} />
              ))}
            </g>
            <g className="hcl-heritage-teaser__compass" transform="translate(64 64)">
              <circle r="34" />
              <circle r="24" />
              <path d="M0 -44 L5 -5 L0 0 L-5 -5 Z M0 44 L5 5 L0 0 L-5 5 Z M-44 0 L-5 -5 L0 0 L-5 5 Z M44 0 L5 -5 L0 0 L5 5 Z" />
            </g>
            <text className="hcl-heritage-teaser__map-label" x="1192" y="136" textAnchor="end">
              MALUKU
            </text>
          </svg>

          {milestones.length > 0 && (
            <ol className="hcl-heritage-teaser__list">
              {milestones.map((m, i) => (
                <HclReveal
                  key={i}
                  as="li"
                  isCanvas={p.isCanvas}
                  delay={0.12 * i}
                  className="hcl-heritage-teaser__item"
                >
                  <span className="hcl-heritage-teaser__dot" aria-hidden="true" />
                  <p className="hcl-heritage-teaser__year">{m.year}</p>
                  <p className="hcl-heritage-teaser__label">{m.label}</p>
                </HclReveal>
              ))}
            </ol>
          )}
        </div>
      </div>
    </HclRoot>
  );
}
