"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ARTICLES, articleHref } from "@/content/insight";
import { cn } from "@/lib/utils";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-insight-grid.css";

export type HclInsightGridProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  filterLabel?: string;
  allLabel?: string;
  readMoreLabel?: string;
  emptyText?: string;
  articles?: { title: string; excerpt: string; image: string; href: string; date: string; category: string }[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclInsightGridDefaults: Required<Omit<HclInsightGridProps, keyof HclInjectedProps>> = {
  sectionId: "",
  eyebrow: "Insight",
  title: "Notes from the Spice Islands",
  intro: "Stories, recipes and practical guides on the bud that shaped the world, written from our sorting tables in Maluku.",
  filterLabel: "Filter articles by category",
  allLabel: "All",
  readMoreLabel: "Read article",
  emptyText: "No articles here yet. New stories from the clove gardens are on their way.",
  articles: ARTICLES.en.map((a) => ({
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    href: articleHref(a.slug),
    date: a.date,
    category: a.category,
  })),
  backgroundColor: "#F6F0E4",
  textColor: "#4A2C21",
};

export default function HclInsightGrid(props: HclInsightGridProps) {
  const p = withHclDefaults(hclInsightGridDefaults, props);
  const articles = p.articles ?? [];
  const [active, setActive] = useState<string | null>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category?.trim()).filter(Boolean))) as string[];

  // A category removed in the editor must not leave the grid stuck on an empty filter.
  const current = active && categories.includes(active) ? active : null;
  const visible = current ? articles.filter((a) => a.category?.trim() === current) : articles;

  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-insight-grid"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-insight-grid__head">
          {p.eyebrow && <p className="hcl-eyebrow hcl-insight-grid__eyebrow">{p.eyebrow}</p>}
          {p.title && <h2 className="hcl-insight-grid__title">{p.title}</h2>}
          <span className="hcl-insight-grid__rule" aria-hidden="true">
            <span />
          </span>
          {p.intro && <p className="hcl-insight-grid__intro">{p.intro}</p>}
        </HclReveal>

        {categories.length > 1 && (
          <div className="hcl-insight-grid__filters" role="group" aria-label={p.filterLabel}>
            {[null, ...categories].map((cat) => {
              const selected = cat === current;
              return (
                <button
                  key={cat ?? "__all"}
                  type="button"
                  aria-pressed={selected}
                  className={cn("hcl-insight-grid__pill", selected && "hcl-insight-grid__pill--active")}
                  onClick={() => setActive(cat)}
                >
                  {cat ?? p.allLabel}
                </button>
              );
            })}
          </div>
        )}

        {visible.length === 0 ? (
          <p className="hcl-insight-grid__empty">{p.emptyText}</p>
        ) : (
          <ul className="hcl-insight-grid__list" aria-live="polite">
            {visible.map((a, i) => (
              <HclReveal
                key={`${a.href}-${a.title}`}
                as="li"
                isCanvas={p.isCanvas}
                delay={(i % 3) * 0.08}
                className="hcl-insight-grid__item"
              >
                <article className="hcl-insight-grid__card">
                  <div className="hcl-insight-grid__media">
                    {a.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="hcl-insight-grid__img" src={a.image} alt={a.title} loading="lazy" />
                    )}
                  </div>
                  <div className="hcl-insight-grid__body">
                    <p className="hcl-insight-grid__meta">
                      {a.category && <span className="hcl-insight-grid__category">{a.category}</span>}
                      {a.category && a.date && <span className="hcl-insight-grid__dot" aria-hidden="true" />}
                      {a.date && <span>{a.date}</span>}
                    </p>
                    <h3 className="hcl-insight-grid__card-title">
                      <HclLink href={a.href} className="hcl-insight-grid__link">
                        {a.title}
                      </HclLink>
                    </h3>
                    {a.excerpt && <p className="hcl-insight-grid__excerpt">{a.excerpt}</p>}
                    {p.readMoreLabel && (
                      <span className="hcl-insight-grid__more" aria-hidden="true">
                        {p.readMoreLabel}
                        <ArrowUpRight size={16} strokeWidth={1.75} />
                      </span>
                    )}
                  </div>
                </article>
              </HclReveal>
            ))}
          </ul>
        )}
      </div>
    </HclRoot>
  );
}
