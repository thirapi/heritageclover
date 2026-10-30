"use client";

import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Music2, Youtube } from "lucide-react";
import { HclLink } from "../hcl-link";
import { HclReveal } from "../hcl-motion";
import { HclRoot, hclLines, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-footer.css";

const ICONS = { Instagram, Facebook, Youtube, Linkedin, MessageCircle, Music2, Mail };

type HclFooterLink = { label: string; href: string };

export type HclFooterProps = {
  sectionId?: string;
  brandName?: string;
  tagline?: string;
  exploreTitle?: string;
  exploreLinks?: HclFooterLink[];
  shopTitle?: string;
  shopLinks?: HclFooterLink[];
  contactTitle?: string;
  address?: string;
  email?: string;
  whatsapp?: string;
  socials?: { label: string; href: string; icon: string }[];
  newsletterEyebrow?: string;
  newsletterTitle?: string;
  newsletterBody?: string;
  newsletterPlaceholder?: string;
  newsletterButton?: string;
  copyright?: string;
  legalLinks?: HclFooterLink[];
  backgroundColor?: string;
  textColor?: string;
} & HclInjectedProps;

export const hclFooterDefaults: Required<Omit<HclFooterProps, keyof HclInjectedProps>> = {
  sectionId: "",
  brandName: "Heritage Clover",
  tagline:
    "The spice that shaped the world, hand-picked in the Spice Islands of Maluku and sun-dried the way it has been for centuries.",
  exploreTitle: "Explore",
  exploreLinks: [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/our-story" },
    { label: "Process", href: "/process" },
    { label: "Insight", href: "/insight" },
    { label: "Contact", href: "/contact" },
  ],
  shopTitle: "Shop",
  shopLinks: [
    { label: "Whole Cloves", href: "/store" },
    { label: "Ground Cloves", href: "/store" },
    { label: "Clove Bud Oil", href: "/store" },
    { label: "Heritage Gift Sets", href: "/store" },
  ],
  contactTitle: "Contact",
  address: "Ternate, North Maluku\nIndonesia",
  email: "hello@heritageclover.com",
  whatsapp: "+62 XXX XXXX XXXX",
  socials: [
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
    { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
  ],
  newsletterEyebrow: "Letters from the spice route",
  newsletterTitle: "Stories, recipes and first word on each new harvest.",
  newsletterBody: "A few thoughtful letters a season. Unsubscribe whenever you like.",
  newsletterPlaceholder: "Your email address",
  newsletterButton: "Subscribe",
  copyright: "© 2026 Heritage Clover. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
  backgroundColor: "#2E1A13",
  textColor: "#FCFAF5",
};

function LinkColumn({ title, links, isCanvas, delay }: { title: string; links: HclFooterLink[]; isCanvas?: boolean; delay: number }) {
  if (!links.length) return null;
  return (
    <HclReveal isCanvas={isCanvas} delay={delay} className="hcl-footer__col">
      <h3 className="hcl-footer__heading">{title}</h3>
      <ul className="hcl-footer__list">
        {links.map((link, i) => (
          <li key={`${link.label}-${i}`}>
            <HclLink href={link.href} className="hcl-footer__link">
              {link.label}
            </HclLink>
          </li>
        ))}
      </ul>
    </HclReveal>
  );
}

export default function HclFooter(props: HclFooterProps) {
  const p = withHclDefaults(hclFooterDefaults, props);
  const waDigits = p.whatsapp.replace(/\D/g, "");
  const waHref = waDigits.length >= 8 ? `https://wa.me/${waDigits}` : "";
  const inputId = `${p.sectionId || "hcl-footer"}-newsletter`;

  return (
    <HclRoot
      as="footer"
      id={p.sectionId}
      className="hcl-footer"
      style={{ backgroundColor: p.backgroundColor, color: p.textColor }}
    >
      <div className="hcl-container">
        <HclReveal isCanvas={p.isCanvas} className="hcl-footer__newsletter">
          <div className="hcl-footer__newsletter-copy">
            {p.newsletterEyebrow && <p className="hcl-eyebrow hcl-footer__eyebrow">{p.newsletterEyebrow}</p>}
            <h2 className="hcl-footer__newsletter-title">{p.newsletterTitle}</h2>
          </div>
          <form className="hcl-footer__form" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor={inputId} className="hcl-footer__sr-only">
              {p.newsletterPlaceholder}
            </label>
            <div className="hcl-footer__field">
              <input
                id={inputId}
                type="email"
                name="email"
                autoComplete="email"
                placeholder={p.newsletterPlaceholder}
                className="hcl-footer__input"
              />
              <button type="submit" className="hcl-btn hcl-btn--primary hcl-footer__submit">
                {p.newsletterButton}
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            {p.newsletterBody && <p className="hcl-footer__form-note">{p.newsletterBody}</p>}
          </form>
        </HclReveal>

        <div className="hcl-footer__ornament" aria-hidden="true">
          <span />
          <svg viewBox="0 0 24 24">
            <path
              d="M12 2c1.7 2.6 1.7 5.8 0 8.5-1.7-2.7-1.7-5.9 0-8.5Zm0 20c-1.7-2.6-1.7-5.8 0-8.5 1.7 2.7 1.7 5.9 0 8.5ZM2 12c2.6-1.7 5.8-1.7 8.5 0-2.7 1.7-5.9 1.7-8.5 0Zm20 0c-2.6 1.7-5.8 1.7-8.5 0 2.7-1.7 5.9-1.7 8.5 0Z"
              fill="currentColor"
            />
          </svg>
          <span />
        </div>

        <div className="hcl-footer__grid">
          <HclReveal isCanvas={p.isCanvas} className="hcl-footer__brand">
            <HclLink href="/" className="hcl-footer__brand-name">
              {p.brandName}
            </HclLink>
            {p.tagline && <p className="hcl-footer__tagline">{p.tagline}</p>}
            {p.socials.length > 0 && (
              <ul className="hcl-footer__socials">
                {p.socials.map((social, i) => {
                  const Icon = ICONS[social.icon as keyof typeof ICONS] ?? MessageCircle;
                  return (
                    <li key={`${social.label}-${i}`}>
                      <HclLink href={social.href} className="hcl-footer__social" aria-label={social.label}>
                        <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      </HclLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </HclReveal>

          <LinkColumn title={p.exploreTitle} links={p.exploreLinks} isCanvas={p.isCanvas} delay={0.08} />
          <LinkColumn title={p.shopTitle} links={p.shopLinks} isCanvas={p.isCanvas} delay={0.16} />

          <HclReveal isCanvas={p.isCanvas} delay={0.24} className="hcl-footer__col">
            <h3 className="hcl-footer__heading">{p.contactTitle}</h3>
            <ul className="hcl-footer__list hcl-footer__contact">
              {p.address && (
                <li>
                  <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                  <address className="hcl-footer__address">
                    {hclLines(p.address).map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </address>
                </li>
              )}
              {p.email && (
                <li>
                  <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                  <a href={`mailto:${p.email}`} className="hcl-footer__link">
                    {p.email}
                  </a>
                </li>
              )}
              {p.whatsapp && (
                <li>
                  <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />
                  {waHref ? (
                    <a href={waHref} target="_blank" rel="noopener noreferrer" className="hcl-footer__link">
                      {p.whatsapp}
                    </a>
                  ) : (
                    <span>{p.whatsapp}</span>
                  )}
                </li>
              )}
            </ul>
          </HclReveal>
        </div>

        <p className="hcl-footer__wordmark" aria-hidden="true">
          {p.brandName}
        </p>

        <div className="hcl-footer__bottom">
          <p className="hcl-footer__copyright">{p.copyright}</p>
          {p.legalLinks.length > 0 && (
            <ul className="hcl-footer__legal">
              {p.legalLinks.map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <HclLink href={link.href} className="hcl-footer__link">
                    {link.label}
                  </HclLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </HclRoot>
  );
}
