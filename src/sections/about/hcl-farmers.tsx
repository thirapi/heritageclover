"use client";

import { ASSETS } from "@/content/assets";
import { HclReveal } from "../hcl-motion";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-farmers.css";

export type HclFarmersProps = {
  sectionId?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  people?: { name: string; role: string; image: string; quote: string }[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclFarmersDefaults: Required<
  Omit<HclFarmersProps, keyof HclInjectedProps>
> = {
  sectionId: "",
  eyebrow: "",
  title: "Meet the people who keep the gardens",
  body: "Our cloves come from family gardens in Maluku, where trees planted by one generation are often harvested by the next. These are some of the growers we work with.",
  people: [
    {
      name: "Farmer name",
      role: "Clove grower, Ternate",
      image: ASSETS.farmer1,
      quote:
        "My grandfather planted these trees. When I climb them at harvest, I am picking his work as much as mine.",
    },
    {
      name: "Farmer name",
      role: "Clove grower, Tidore",
      image: ASSETS.farmer2,
      quote:
        "We pick only when the buds blush pink at the tip. A day too late and the flower opens, and the fragrance goes with it.",
    },
    {
      name: "Farmer name",
      role: "Drying and sorting, Ambon",
      image: ASSETS.farmer3,
      quote:
        "The sun does the real work. We just turn the buds, watch the sky, and sort them by hand until they are right.",
    },
  ],
  backgroundColor: "#FCFAF5",
  textColor: "#4A2C21",
};

export default function HclFarmers(props: HclFarmersProps) {
  const p = withHclDefaults(hclFarmersDefaults, props);
  return (
    <HclRoot
      as="section"
      id={p.sectionId}
      className="hcl-farmers"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-farmers__head">
          <div className="hcl-farmers__head-main">
            {p.eyebrow && (
              <p className="hcl-eyebrow hcl-farmers__eyebrow">{p.eyebrow}</p>
            )}
            <h2 className="hcl-farmers__title">{p.title}</h2>
          </div>
          {p.body && <p className="hcl-farmers__body">{p.body}</p>}
        </HclReveal>

        <ul className="hcl-farmers__grid">
          {p.people.map((person, i) => (
            <HclReveal
              key={`${person.name}-${i}`}
              as="li"
              isCanvas={p.isCanvas}
              delay={i * 0.1}
              className="hcl-farmers__person"
            >
              <figure className="hcl-farmers__figure">
                <div className="hcl-farmers__portrait">
                  {person.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.image}
                      alt={`Portrait of ${person.name}, ${person.role}`}
                      loading="lazy"
                    />
                  )}
                </div>
                <blockquote className="hcl-farmers__quote">
                  <p>&ldquo;{person.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="hcl-farmers__caption">
                  <span className="hcl-farmers__name">{person.name}</span>
                  <span className="hcl-farmers__role">{person.role}</span>
                </figcaption>
              </figure>
            </HclReveal>
          ))}
        </ul>
      </div>
    </HclRoot>
  );
}
