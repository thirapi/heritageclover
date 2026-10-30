"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { ASSETS } from "@/content/assets";
import { cn } from "@/lib/utils";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-process-detail.css";

export type HclProcessDetailProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  steps?: {
    number: string;
    title: string;
    body: string;
    image: string;
    duration: string;
  }[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclProcessDetailDefaults: Required<
  Omit<HclProcessDetailProps, keyof HclInjectedProps>
> = {
  sectionId: "",
  eyebrow: "",
  title: "Picked, dried, sorted, checked, sealed",
  intro:
    "Every harvest goes through the same five steps between the garden and your kitchen. Most of the work is done by hand, and the drying depends on the weather.",
  steps: [
    {
      number: "01",
      title: "Hand-picked at the bud",
      body: "Growers climb the trees and pick the clusters by hand while the buds are still closed, just as their tips turn from green to a soft pink. Timing is everything: once the flower opens, the aroma fades.",
      image: ASSETS.harvest,
      duration: "In the cool of the morning",
    },
    {
      number: "02",
      title: "Dried under the sun",
      body: "The buds are spread on mats and turned through the day as they darken from rosy pink to deep, glossy brown. Slow sun-drying locks in the essential oils that give cloves their warmth.",
      image: ASSETS.drying,
      duration: "4–5 sunny days",
    },
    {
      number: "03",
      title: "Sorted by hand",
      body: "Stems, broken heads and pale buds are picked out by eye and by hand. Only whole, well-formed cloves with their crowns intact move on to the next table.",
      image: ASSETS.sorting,
      duration: "Bud by bud",
    },
    {
      number: "04",
      title: "Checked for moisture",
      body: "Each batch is tested for moisture before it is accepted, so the cloves stay fragrant and keep well in your pantry. Anything that is not ready goes back to the sun.",
      image: ASSETS.testing,
      duration: "Every batch",
    },
    {
      number: "05",
      title: "Sealed to keep the fragrance",
      body: "Finished cloves are packed in airtight pouches and jars that protect them from light and air, so the oils that carry the aroma stay in the bud.",
      image: ASSETS.packing,
      duration: "Sealed fresh",
    },
  ],
  backgroundColor: "#F6F0E4",
  textColor: "#4A2C21",
};

export default function HclProcessDetail(props: HclProcessDetailProps) {
  const p = withHclDefaults(hclProcessDetailDefaults, props);
  const stepsRef = useRef<HTMLOListElement>(null);
  // "live" = scroll-driven sticky layout. Off in the canvas and for reduced
  // motion, where every step renders as a plain image + text block.
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (p.isCanvas) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLive(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [p.isCanvas]);

  useEffect(() => {
    const list = stepsRef.current;
    if (!live || !list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [live, p.steps.length]);

  const current = p.steps[active] ?? p.steps[0];

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className={cn("hcl-process-detail", live && "hcl-process-detail--live")}
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-process-detail__head">
          {p.eyebrow && (
            <p className="hcl-eyebrow hcl-process-detail__eyebrow">
              {p.eyebrow}
            </p>
          )}
          <h2 className="hcl-process-detail__title">{p.title}</h2>
          {p.intro && <p className="hcl-process-detail__intro">{p.intro}</p>}
        </HclReveal>

        <div className="hcl-process-detail__layout">
          {live && (
            <div className="hcl-process-detail__aside" aria-hidden="true">
              <div className="hcl-process-detail__sticky">
                <div className="hcl-process-detail__frame">
                  {p.steps.map((step, i) =>
                    step.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={`${step.number}-${i}`}
                        src={step.image}
                        alt=""
                        className={cn(
                          "hcl-process-detail__frame-img",
                          i === active && "is-active",
                        )}
                      />
                    ) : null,
                  )}
                </div>
                <div className="hcl-process-detail__progress">
                  <span className="hcl-process-detail__progress-label">
                    <span className="hcl-num">{current?.number}</span>
                    {current?.title}
                  </span>
                  <span className="hcl-process-detail__dots">
                    {p.steps.map((step, i) => (
                      <span
                        key={`${step.number}-${i}`}
                        className={cn(
                          "hcl-process-detail__dot",
                          i <= active && "is-on",
                        )}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )}

          <ol ref={stepsRef} className="hcl-process-detail__steps">
            {p.steps.map((step, i) => (
              <li
                key={`${step.number}-${i}`}
                data-step={i}
                className={cn(
                  "hcl-process-detail__step",
                  live && i === active && "is-active",
                )}
              >
                {step.image && (
                  <div className="hcl-process-detail__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={step.image} alt={step.title} loading="lazy" />
                  </div>
                )}
                <div className="hcl-process-detail__text">
                  <span className="hcl-process-detail__number hcl-num">
                    {step.number}
                  </span>
                  <h3 className="hcl-process-detail__step-title">
                    {step.title}
                  </h3>
                  <p className="hcl-process-detail__body">{step.body}</p>
                  {step.duration && (
                    <p className="hcl-process-detail__duration">
                      <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
                      {step.duration}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </HclRoot>
  );
}
