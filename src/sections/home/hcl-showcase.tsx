"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ASSETS } from "@/content/assets";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-showcase.css";

export type HclShowcaseProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  products?: { name: string; description: string; image: string; href: string }[];
  cardLinkLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  swipeHint?: string;
} & HclInjectedProps;

export const hclShowcaseDefaults: Required<Omit<HclShowcaseProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "The collection",
  title: "From the Spice Islands, for your table",
  body: "Four ways to bring the warmth of Maluku cloves into your home, each one sorted by hand and sealed at its aromatic best.",
  products: [
    {
      name: "Whole Cloves",
      description: "Premium hand-sorted buds with intact heads, full of warm, sweet aroma.",
      image: ASSETS.productWhole,
      href: "/store",
    },
    {
      name: "Ground Cloves",
      description: "Finely milled for baking, curries, marinades and spiced drinks.",
      image: ASSETS.productGround,
      href: "/store",
    },
    {
      name: "Clove Bud Oil",
      description: "Distilled from dried buds for aromatherapy and home rituals.",
      image: ASSETS.productOil,
      href: "/store",
    },
    {
      name: "Heritage Gift Set",
      description: "A keepsake hamper of spice-route treasures, ready to give.",
      image: ASSETS.productGift,
      href: "/store",
    },
  ],
  cardLinkLabel: "Shop now",
  ctaLabel: "Visit the store",
  ctaHref: "/store",
  swipeHint: "Swipe to explore",
};

export default function HclShowcase(props: HclShowcaseProps) {
  const p = withHclDefaults(hclShowcaseDefaults, props);
  const products = p.products ?? [];
  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-showcase">
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-showcase__head">
          <div className="hcl-showcase__heading">
            {p.eyebrow && <p className="hcl-eyebrow hcl-showcase__eyebrow">{p.eyebrow}</p>}
            <h2 className="hcl-showcase__title">{p.title}</h2>
          </div>
          <div className="hcl-showcase__lead">
            {p.body && <p className="hcl-showcase__body">{p.body}</p>}
            {p.ctaLabel && (
              <HclLink href={p.ctaHref} className="hcl-btn hcl-btn--primary hcl-showcase__cta">
                {p.ctaLabel}
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </HclLink>
            )}
          </div>
        </HclReveal>

        <ul className="hcl-showcase__track">
          {products.map((product, i) => (
            <HclReveal key={i} as="li" isCanvas={p.isCanvas} delay={0.08 * i} className="hcl-showcase__item">
              <HclLink href={product.href || "/store"} className="hcl-showcase__card">
                <div className="hcl-showcase__media">
                  {product.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="hcl-showcase__image" src={product.image} alt={product.name} loading="lazy" />
                  )}
                  <span className="hcl-showcase__index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="hcl-showcase__info">
                  <h3 className="hcl-showcase__name">{product.name}</h3>
                  {product.description && <p className="hcl-showcase__desc">{product.description}</p>}
                  {p.cardLinkLabel && (
                    <span className="hcl-showcase__more">
                      {p.cardLinkLabel}
                      <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  )}
                </div>
              </HclLink>
            </HclReveal>
          ))}
        </ul>
        {p.swipeHint && (
          <p className="hcl-showcase__hint" aria-hidden="true">
            <span className="hcl-showcase__hint-rule" />
            {p.swipeHint}
          </p>
        )}
      </div>
    </HclRoot>
  );
}
