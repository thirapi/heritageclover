"use client";

import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-rich-text.css";

export type HclRichTextProps = {
  sectionId?: string;
  title?: string;
  updatedAt?: string;
  // body: paragraphs separated by a blank line.
  blocks?: { heading: string; body: string }[];
} & HclInjectedProps;

export const hclRichTextDefaults: Required<Omit<HclRichTextProps, keyof HclInjectedProps>> = {
  sectionId: "",
  title: "Privacy Policy (Draft, needs legal review)",
  updatedAt: "Last updated: XXX",
  blocks: [
    {
      heading: "Who we are",
      body: "Heritage Clover brings hand-picked cloves from smallholder gardens in Maluku to kitchens and homes around the world. This policy explains what personal information we collect when you visit our website or contact us, and how we look after it.\n\nIf you have any question about this policy, you can reach us through the contact page at any time.",
    },
    {
      heading: "What we collect and why",
      body: "When you send us a message, we receive the details you choose to share, such as your name, email address and the content of your enquiry. We use them only to reply to you and, where relevant, to follow up on your request.\n\nOrders placed in our store are processed by our store provider, which handles payment and delivery details under its own privacy terms. We do not sell your personal information to anyone.",
    },
    {
      heading: "Your choices",
      body: "You may ask us at any time to see, correct or delete the personal information we hold about you. We will respond within a reasonable time and in line with applicable law.\n\nWe may update this policy as our business grows. The date at the top of this page shows when it was last revised.",
    },
  ],
};

const paragraphs = (body?: string) =>
  (body ?? "")
    .split(/\n\s*\n/)
    .map((para) => para.trim())
    .filter(Boolean);

export default function HclRichText(props: HclRichTextProps) {
  const p = withHclDefaults(hclRichTextDefaults, props);
  return (
    <HclRoot as="section" id={p.sectionId} className="hcl-rich-text">
      <div className="hcl-container">
        <article className="hcl-rich-text__article">
          {(p.title || p.updatedAt) && (
            <HclReveal isCanvas={p.isCanvas} className="hcl-rich-text__head">
              {p.title && <h2 className="hcl-rich-text__title">{p.title}</h2>}
              {p.updatedAt && <p className="hcl-rich-text__meta">{p.updatedAt}</p>}
            </HclReveal>
          )}
          {p.blocks.map((block, i) => (
            <div key={i} className="hcl-rich-text__block">
              {block.heading && (
                <h3 className="hcl-rich-text__heading">{block.heading}</h3>
              )}
              {paragraphs(block.body).map((para, j) => (
                <p key={j} className="hcl-rich-text__para">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </article>
      </div>
    </HclRoot>
  );
}
