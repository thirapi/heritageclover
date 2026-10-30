"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-faq.css";

export type HclFaqProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  items?: { question: string; answer: string }[];
  contactText?: string;
  contactLabel?: string;
  contactHref?: string;
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclFaqDefaults: Required<Omit<HclFaqProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Questions & answers",
  title: "Everything you wanted to ask about our cloves",
  intro: "From the jar on your shelf to an order for your whole team, here is what our customers ask us most.",
  items: [
    {
      question: "How should I store my cloves?",
      answer:
        "Keep them in a sealed glass jar, away from the stove, moisture and direct sunlight. Whole cloves hold their essential oil far longer than ground ones, so grind only what you need for the dish in front of you.",
    },
    {
      question: "How long do they stay fresh?",
      answer:
        "Stored well, whole cloves keep their aroma for many months, while ground cloves fade sooner. Every pack carries a best-before date printed on the label. For a quick check, press a bud with your fingernail: a fresh clove releases a little oil.",
    },
    {
      question: "How do I order and where do you ship?",
      answer:
        "All orders are placed through our online store, where you will find current prices, pack sizes and shipping options at checkout. Every parcel is packed airtight to protect the aroma on the way to you.",
    },
    {
      question: "What do your clove grades mean?",
      answer:
        "Our premium grade is made of whole, unbroken buds with intact heads, low moisture and a deep, even colour, hand-sorted after sun-drying. Our kitchen grade may include buds without heads or with slight variation in size: the same warmth, at a gentler price, ideal for ground spice and slow cooking.",
    },
    {
      question: "How can I use clove bud oil?",
      answer:
        "Our clove bud oil is meant for aroma and home care: a few drops in a diffuser, or blended into a carrier oil for a warm, spiced scent. It is highly concentrated, so always dilute it before it touches skin, keep it away from eyes and out of reach of children, and do not take it internally.",
    },
    {
      question: "Do you take corporate and bulk orders?",
      answer:
        "Yes. We prepare heritage gift sets for corporate occasions and supply larger volumes for kitchens, bakeries and retailers. Tell us the quantity, timing and any custom packaging you have in mind, and we will come back to you with a proposal.",
    },
  ],
  contactText: "Still curious about something?",
  contactLabel: "Contact us",
  contactHref: "/contact",
  backgroundColor: "#F6F0E4",
  textColor: "#4A2C21",
};

export default function HclFaq(props: HclFaqProps) {
  const p = withHclDefaults(hclFaqDefaults, props);
  const uid = useId();
  const items = (p.items ?? []).filter((it) => it.question);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-faq"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container hcl-faq__grid">
        <HclReveal isCanvas={p.isCanvas} className="hcl-faq__head">
          {p.eyebrow && <p className="hcl-eyebrow hcl-faq__eyebrow">{p.eyebrow}</p>}
          {p.title && <h2 className="hcl-faq__title">{p.title}</h2>}
          <span className="hcl-faq__rule" aria-hidden="true" />
          {p.intro && <p className="hcl-faq__intro">{p.intro}</p>}
          {p.contactLabel && (
            <p className="hcl-faq__contact">
              {p.contactText && <span>{p.contactText}</span>}
              <HclLink href={p.contactHref || "/contact"} className="hcl-faq__contact-link">
                {p.contactLabel}
              </HclLink>
            </p>
          )}
        </HclReveal>

        <HclReveal isCanvas={p.isCanvas} delay={0.1} className="hcl-faq__list">
          {items.map((it, i) => {
            const isOpen = open === i;
            const btnId = `${uid}-q${i}`;
            const panelId = `${uid}-a${i}`;
            return (
              <div key={`${i}-${it.question}`} className={cn("hcl-faq__item", isOpen && "hcl-faq__item--open")}>
                <h3 className="hcl-faq__q">
                  <button
                    id={btnId}
                    type="button"
                    className="hcl-faq__button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="hcl-faq__num" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="hcl-faq__question">{it.question}</span>
                    <span className="hcl-faq__toggle" aria-hidden="true">
                      <Plus size={18} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="hcl-faq__panel"
                  inert={!isOpen}
                >
                  <div className="hcl-faq__panel-inner">
                    <p className="hcl-faq__answer">{it.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </HclReveal>
      </div>
    </HclRoot>
  );
}
