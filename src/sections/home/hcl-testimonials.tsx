"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-testimonials.css";

export type HclTestimonialsProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  items?: { quote: string; name: string; role: string }[];
  prevLabel?: string;
  nextLabel?: string;
  backgroundColor?: string;
} & HclInjectedProps;

export const hclTestimonialsDefaults: Required<Omit<HclTestimonialsProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Kind words",
  title: "From kitchens near and far",
  items: [
    {
      quote:
        "The moment I opened the pouch, the whole kitchen smelled like my grandmother's rendang. Whole, glossy buds, nothing broken.",
      name: "Customer name",
      role: "Home cook · placeholder review",
    },
    {
      quote:
        "I simmer a few buds with cinnamon and orange peel every weekend. The aroma is warm and sweet, never dusty or flat.",
      name: "Customer name",
      role: "Tea lover · placeholder review",
    },
    {
      quote:
        "We sent the heritage gift set to our partners this year. Everyone asked about the story of the spice islands behind it.",
      name: "Customer name",
      role: "Corporate gifting · placeholder review",
    },
  ],
  prevLabel: "Previous testimonial",
  nextLabel: "Next testimonial",
  backgroundColor: "#FCFAF5",
};

const SWIPE_THRESHOLD = 48;

export default function HclTestimonials(props: HclTestimonialsProps) {
  const p = withHclDefaults(hclTestimonialsDefaults, props);
  const items = p.items ?? [];
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const startX = useRef<number | null>(null);

  const current = count ? items[((index % count) + count) % count] : null;
  const position = count ? ((index % count) + count) % count : 0;

  const go = (step: number) => {
    if (count < 2) return;
    setDirection(step);
    setIndex((i) => i + step);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (startX.current === null) return;
    const delta = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
  };

  const quote = current && (
    <figure className="hcl-testimonials__figure">
      <blockquote className="hcl-testimonials__quote">
        <p>{current.quote}</p>
      </blockquote>
      <figcaption className="hcl-testimonials__cite">
        <span className="hcl-testimonials__name">{current.name}</span>
        {current.role && <span className="hcl-testimonials__role">{current.role}</span>}
      </figcaption>
    </figure>
  );

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-testimonials"
      style={{ backgroundColor: p.backgroundColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-testimonials__inner">
          <div className="hcl-testimonials__head">
            {p.eyebrow && <p className="hcl-eyebrow hcl-testimonials__eyebrow">{p.eyebrow}</p>}
            <h2 className="hcl-testimonials__title">{p.title}</h2>
          </div>

          <div
            className="hcl-testimonials__stage"
            role="group"
            aria-roledescription="carousel"
            aria-label={p.title}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              startX.current = null;
            }}
          >
            <span className="hcl-testimonials__mark" aria-hidden="true">
              &ldquo;
            </span>
            <div className="hcl-testimonials__viewport" aria-live="polite">
              {p.isCanvas ? (
                quote
              ) : (
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  <motion.div
                    key={index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -32 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {quote}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>

          {count > 1 && (
            <div className="hcl-testimonials__controls">
              <button
                type="button"
                className="hcl-testimonials__button"
                aria-label={p.prevLabel}
                onClick={() => go(-1)}
              >
                <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <p className="hcl-testimonials__counter" aria-hidden="true">
                <span>{String(position + 1).padStart(2, "0")}</span>
                <i />
                <span>{String(count).padStart(2, "0")}</span>
              </p>
              <button
                type="button"
                className="hcl-testimonials__button"
                aria-label={p.nextLabel}
                onClick={() => go(1)}
              >
                <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </HclReveal>
      </div>
    </HclRoot>
  );
}
