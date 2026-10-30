"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-stats.css";

export type HclStatsProps = {
  sectionId?: string;
  title?: string;
  stats?: { value: string; suffix: string; label: string }[];
  note?: string;
  backgroundColor?: string;
} & HclInjectedProps;

export const hclStatsDefaults: Required<Omit<HclStatsProps, keyof HclInjectedProps>> = {
  sectionId: "",
  title: "Our clove gardens in numbers",
  stats: [
    { value: "XXX", suffix: "+", label: "Smallholder farmers" },
    { value: "XXX", suffix: "ha", label: "Hectares of gardens" },
    { value: "XXX", suffix: "t", label: "Tonnes dried each season" },
    { value: "XXX", suffix: "+", label: "Years of tradition" },
  ],
  note: "Figures will be confirmed with our farmer partners.",
  backgroundColor: "#FCFAF5",
};

// Plain numbers only ("120", "1,200", "4.5"); anything else ("XXX", "A+") is shown as-is.
const NUMERIC = /^\d{1,3}(,\d{3})*(\.\d+)?$|^\d+(\.\d+)?$/;

function formatLike(n: number, template: string) {
  const decimals = template.includes(".") ? template.split(".")[1].length : 0;
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: template.includes(","),
  });
}

function HclStatValue({ value, isCanvas }: { value: string; isCanvas?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const countable = NUMERIC.test(value.trim()) && !isCanvas && !reduced;
  const target = countable ? Number(value.replace(/,/g, "")) : 0;

  // Reset to zero before the item scrolls into view, then count up once.
  useEffect(() => {
    const el = ref.current;
    if (!el || !countable) return;
    if (!inView) {
      el.textContent = formatLike(0, value);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = formatLike(v, value);
      },
    });
    return () => controls.stop();
  }, [countable, inView, target, value]);

  return (
    <span ref={ref} className="hcl-stats__number hcl-num">
      {value}
    </span>
  );
}

export default function HclStats(props: HclStatsProps) {
  const p = withHclDefaults(hclStatsDefaults, props);
  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-stats" style={{ backgroundColor: p.backgroundColor }}>
      <div className="hcl-container">
        {p.title && (
          <HclReveal isCanvas={p.isCanvas} className="hcl-stats__head">
            <h2 className="hcl-stats__title">{p.title}</h2>
          </HclReveal>
        )}
        <dl className="hcl-stats__grid">
          {p.stats.map((stat, i) => (
            <HclReveal key={i} isCanvas={p.isCanvas} delay={i * 0.08} className="hcl-stats__item">
              <dt className="hcl-stats__label">{stat.label}</dt>
              <dd className="hcl-stats__value">
                <HclStatValue value={stat.value} isCanvas={p.isCanvas} />
                {stat.suffix && <span className="hcl-stats__suffix">{stat.suffix}</span>}
              </dd>
            </HclReveal>
          ))}
        </dl>
        {p.note && <p className="hcl-stats__note">{p.note}</p>}
      </div>
    </HclRoot>
  );
}
