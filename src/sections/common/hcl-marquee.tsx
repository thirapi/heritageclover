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
    "Picked at the bud",
    "From smallholder gardens",
    "Sealed for aroma",
  ].join("\n"),
  speed: "normal",
  backgroundColor: "#EFE6D3",
  textColor: "#4A2C21",
};

const SPEEDS = new Set(["slow", "normal", "fast"]);

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
            ·
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
