"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { HclRoot, hclLines, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-marquee.css";

export type HclMarqueeProps = {
  sectionId?: string;
  // One keyword per line.
  items?: string;
  // "slow" | "normal" | "fast"
  speed?: string;
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclMarqueeDefaults: Required<Omit<HclMarqueeProps, keyof HclInjectedProps>> = {
  sectionId: "",
  items: [
    "Hand-picked in Maluku",
    "Sun-dried for days",
    "Sorted by hand",
    "Born on the Spice Route",
    "From smallholder gardens",
    "Sealed for aroma",
  ].join("\n"),
  speed: "normal",
  backgroundColor: "#4A2C21",
  textColor: "#F6F0E4",
};

const SPEEDS = new Set(["slow", "normal", "fast"]);

// Four-point clove-flower star used as the separator between keywords.
function HclMarqueeGlyph() {
  return (
    <svg className="hcl-marquee__glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0c.6 6.2 2.4 9.6 12 12-9.6 2.4-11.4 5.8-12 12-.6-6.2-2.4-9.6-12-12C9.6 9.6 11.4 6.2 12 0Z" />
    </svg>
  );
}

export default function HclMarquee(props: HclMarqueeProps) {
  const p = withHclDefaults(hclMarqueeDefaults, props);
  const items = hclLines(p.items);
  const speed = SPEEDS.has(p.speed) ? p.speed : "normal";
  if (items.length === 0) return null;

  // Each group repeats the list so one group is always wider than the
  // viewport; two identical groups slide by -50% for a seamless loop.
  const run = [...items, ...items, ...items];
  const group = (hidden: boolean) => (
    <ul className="hcl-marquee__group" aria-hidden={hidden || undefined}>
      {run.map((item, i) => (
        <Fragment key={i}>
          <li className="hcl-marquee__item" aria-hidden={(!hidden && i >= items.length) || undefined}>
            {item}
          </li>
          <li className="hcl-marquee__sep" aria-hidden="true">
            <HclMarqueeGlyph />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className={cn("hcl-marquee", `hcl-marquee--${speed}`, p.isCanvas && "hcl-marquee--static")}
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-marquee__viewport">
        <div className="hcl-marquee__track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </HclRoot>
  );
}
