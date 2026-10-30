"use client";

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { ARTICLES } from "@/content/insight";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-article.css";

export type HclArticleProps = {
  sectionId?: string;
  category?: string;
  title?: string;
  date?: string;
  image?: string;
  imageAlt?: string;
  body?: string;
  backLabel?: string;
  backHref?: string;
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

const first = ARTICLES.en[0];

export const hclArticleDefaults: Required<Omit<HclArticleProps, keyof HclInjectedProps>> = {
  sectionId: "",
  category: first.category,
  title: first.title,
  date: first.date,
  image: first.image,
  imageAlt: "Dried clove buds from the gardens of North Maluku",
  body: first.body,
  backLabel: "All articles",
  backHref: "/insight",
  backgroundColor: "#F6F0E4",
  textColor: "#4A2C21",
};

// Blocks are separated by a blank line; a line starting with "## " is a heading.
function renderBody(body: string): ReactNode[] {
  const out: ReactNode[] = [];
  body
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .forEach((block, b) => {
      let paragraph: string[] = [];
      const flush = (key: string) => {
        if (paragraph.length) out.push(<p key={key}>{paragraph.join(" ")}</p>);
        paragraph = [];
      };
      block.split("\n").forEach((raw, l) => {
        const line = raw.trim();
        if (!line) return;
        if (line.startsWith("## ")) {
          flush(`p-${b}-${l}`);
          out.push(<h2 key={`h-${b}-${l}`}>{line.slice(3).trim()}</h2>);
        } else {
          paragraph.push(line);
        }
      });
      flush(`p-${b}-end`);
    });
  return out;
}

export default function HclArticle(props: HclArticleProps) {
  const p = withHclDefaults(hclArticleDefaults, props);
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-article"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <article className="hcl-container hcl-article__inner">
        <HclReveal isCanvas={p.isCanvas} className="hcl-article__head">
          {p.backLabel && (
            <HclLink href={p.backHref || "/insight"} className="hcl-article__back">
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
              {p.backLabel}
            </HclLink>
          )}
          <p className="hcl-article__meta">
            {p.category && <span className="hcl-article__category">{p.category}</span>}
            {p.category && p.date && <span className="hcl-article__dot" aria-hidden="true" />}
            {p.date && <span className="hcl-article__date">{p.date}</span>}
          </p>
          <h1 className="hcl-article__title">{p.title}</h1>
          <span className="hcl-article__rule" aria-hidden="true">
            <span />
          </span>
        </HclReveal>

        {p.image && (
          <HclReveal isCanvas={p.isCanvas} delay={0.1} className="hcl-article__figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hcl-article__img" src={p.image} alt={p.imageAlt || p.title} />
          </HclReveal>
        )}

        <HclReveal isCanvas={p.isCanvas} delay={0.15} className="hcl-article__body">
          {renderBody(p.body)}
        </HclReveal>

        {p.backLabel && (
          <div className="hcl-article__foot">
            <span className="hcl-article__foot-rule" aria-hidden="true" />
            <HclLink href={p.backHref || "/insight"} className="hcl-btn hcl-btn--ghost hcl-article__foot-link">
              <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
              {p.backLabel}
            </HclLink>
          </div>
        )}
      </article>
    </HclRoot>
  );
}
