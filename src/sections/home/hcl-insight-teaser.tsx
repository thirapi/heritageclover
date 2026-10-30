"use client";

import { ArrowRight } from "lucide-react";
import { ARTICLES, articleHref } from "@/content/insight";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-insight-teaser.css";

export type HclInsightTeaserProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  articles?: { title: string; excerpt: string; image: string; href: string; date: string }[];
  readLabel?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundColor?: string;
} & HclInjectedProps;

export const hclInsightTeaserDefaults: Required<Omit<HclInsightTeaserProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "",
  title: "Notes from the spice route",
  articles: ARTICLES.en.slice(0, 3).map((a) => ({
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    href: articleHref(a.slug),
    date: a.date,
  })),
  readLabel: "Read article",
  ctaLabel: "All articles",
  ctaHref: "/insight",
  backgroundColor: "#F6F0E4",
};

export default function HclInsightTeaser(props: HclInsightTeaserProps) {
  const p = withHclDefaults(hclInsightTeaserDefaults, props);
  const articles = p.articles ?? [];
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-insight-teaser"
      style={{ backgroundColor: p.backgroundColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-insight-teaser__head">
          <div>
            {p.eyebrow && <p className="hcl-eyebrow hcl-insight-teaser__eyebrow">{p.eyebrow}</p>}
            <h2 className="hcl-insight-teaser__title">{p.title}</h2>
          </div>
          {p.ctaLabel && (
            <HclLink href={p.ctaHref} className="hcl-link hcl-insight-teaser__cta">
              {p.ctaLabel}
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </HclLink>
          )}
        </HclReveal>

        <ul className="hcl-insight-teaser__grid">
          {articles.map((article, i) => (
            <HclReveal
              key={`${article.href}-${i}`}
              as="li"
              isCanvas={p.isCanvas}
              delay={i * 0.1}
              className="hcl-insight-teaser__item"
            >
              <HclLink href={article.href} className="hcl-insight-teaser__card">
                <div className="hcl-insight-teaser__media">
                  {article.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="hcl-insight-teaser__image" src={article.image} alt="" loading="lazy" />
                  )}
                </div>
                <div className="hcl-insight-teaser__text">
                  {article.date && <p className="hcl-num hcl-insight-teaser__date">{article.date}</p>}
                  <h3 className="hcl-insight-teaser__card-title">{article.title}</h3>
                  {article.excerpt && <p className="hcl-insight-teaser__excerpt">{article.excerpt}</p>}
                  {p.readLabel && (
                    <span className="hcl-link hcl-insight-teaser__read">
                      {p.readLabel}
                      <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  )}
                </div>
              </HclLink>
            </HclReveal>
          ))}
        </ul>
      </div>
    </HclRoot>
  );
}
