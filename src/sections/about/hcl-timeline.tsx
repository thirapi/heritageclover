"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ASSETS } from "@/content/assets";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-timeline.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export type HclTimelineProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  events?: { year: string; title: string; body: string; image: string }[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclTimelineDefaults: Required<
  Omit<HclTimelineProps, keyof HclInjectedProps>
> = {
  sectionId: "",
  eyebrow: "",
  title: "A spice that shaped the world",
  intro:
    "From ancient maritime trade to the fertile volcanic slopes of East Java, cloves have shaped global commerce for centuries. These are the turning points.",
  events: [
    {
      year: "Before 1500",
      title: "Born in the eastern archipelago",
      body: "Cloves grow wild on volcanic slopes in the eastern seas. For centuries, Asian and Arab traders carry the dried buds westward, link by link along the maritime spice route.",
      image: ASSETS.origin,
    },
    {
      year: "Early 1500s",
      title: "Europe sails for the spice route",
      body: "Portuguese and Spanish ships race across the globe for a single prize: the small brown bud worth more, weight for weight, than almost anything else aboard.",
      image: ASSETS.heritageMap,
    },
    {
      year: "1600s",
      title: "The age of monopoly",
      body: "The Dutch East India Company (VOC) seizes control of the trade, confining cultivation and tightly guarding every tree to keep prices high.",
      image: ASSETS.intro,
    },
    {
      year: "Late 1700s",
      title: "Thriving in East Java soils",
      body: "Seedlings spread into smallholder gardens across the archipelago. The rich volcanic slopes of East Java prove ideal, producing fragrant, oil-rich clove groves.",
      image: ASSETS.drying,
    },
    {
      year: "Today",
      title: "Heritage, carried forward",
      body: "Smallholder families across Trenggalek, Pacitan, and Semeru still hand-pick each bud at its peak and dry it under the sun. Heritage Clover brings that harvest directly to you.",
      image: ASSETS.harvest,
    },
  ],
  backgroundColor: "#F6F0E4",
  textColor: "#4A2C21",
};

export default function HclTimeline(props: HclTimelineProps) {
  const p = withHclDefaults(hclTimelineDefaults, props);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (p.isCanvas || !list) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        list.classList.add("hcl-timeline__list--live");
        const progress = list.querySelector<HTMLElement>(
          ".hcl-timeline__progress",
        );
        if (progress) {
          gsap.fromTo(
            progress,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: list,
                start: "top 60%",
                end: "bottom 60%",
                scrub: 0.4,
              },
            },
          );
        }
        gsap.utils
          .toArray<HTMLElement>(".hcl-timeline__marker", list)
          .forEach((marker) => {
            ScrollTrigger.create({
              trigger: marker,
              start: "top 60%",
              onEnter: () => marker.classList.add("is-reached"),
              onLeaveBack: () => marker.classList.remove("is-reached"),
            });
          });
        return () => list.classList.remove("hcl-timeline__list--live");
      });
      return () => mm.revert();
    },
    { scope: listRef, dependencies: [p.isCanvas, p.events.length] },
  );

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-timeline"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-timeline__head">
          <div>
            {p.eyebrow && (
              <p className="hcl-eyebrow hcl-timeline__eyebrow">{p.eyebrow}</p>
            )}
            <h2 className="hcl-timeline__title">{p.title}</h2>
          </div>
          {p.intro && <p className="hcl-timeline__intro">{p.intro}</p>}
        </HclReveal>

        <div ref={listRef} className="hcl-timeline__list">
          <span className="hcl-timeline__track" aria-hidden="true">
            <span className="hcl-timeline__progress" />
          </span>
          <ol className="hcl-timeline__events">
            {p.events.map((event, i) => (
              <li key={`${event.year}-${i}`} className="hcl-timeline__event">
                <p className="hcl-timeline__year hcl-num">{event.year}</p>
                <span className="hcl-timeline__marker" aria-hidden="true" />
                <HclReveal
                  isCanvas={p.isCanvas}
                  as="article"
                  className="hcl-timeline__card"
                >
                  <div className="hcl-timeline__text">
                    <h3 className="hcl-timeline__event-title">{event.title}</h3>
                    <p className="hcl-timeline__body">{event.body}</p>
                  </div>
                  {event.image && (
                    <div className="hcl-timeline__media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={event.image} alt={event.title} loading="lazy" />
                    </div>
                  )}
                </HclReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </HclRoot>
  );
}
