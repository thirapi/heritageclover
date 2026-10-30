"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HclLink, useHclLocaleLinks } from "../hcl-link";
import { HclRoot, withHclDefaults, type HclInjectedProps } from "../hcl-root";
import "./hcl-header.css";

export type HclHeaderProps = {
  sectionId?: string;
  logoText?: string;
  logoImage?: string;
  links?: { label: string; href: string }[];
  shopLabel?: string;
  shopHref?: string;
  cartHref?: string;
  cartLabel?: string;
  menuLabel?: string;
  closeLabel?: string;
  languageLabel?: string;
  panelNote?: string;
  backgroundColor?: string;
} & HclInjectedProps;

export const hclHeaderDefaults: Required<Omit<HclHeaderProps, keyof HclInjectedProps>> = {
  sectionId: "",
  logoText: "Heritage Clover",
  logoImage: "",
  links: [
    { label: "Our Story", href: "/our-story" },
    { label: "Process", href: "/process" },
    { label: "Insight", href: "/insight" },
    { label: "Contact", href: "/contact" },
  ],
  shopLabel: "Shop",
  shopHref: "/store",
  cartHref: "/store/cart",
  cartLabel: "Cart",
  menuLabel: "Menu",
  closeLabel: "Close",
  languageLabel: "Language",
  panelNote: "Hand-picked cloves from the Spice Islands of Maluku.",
  backgroundColor: "#F6F0E4",
};

const SCROLL_THRESHOLD = 40;
const MOBILE_QUERY = "(max-width: 899px)";

export default function HclHeader(props: HclHeaderProps) {
  const p = withHclDefaults(hclHeaderDefaults, props);
  const localeLinks = useHclLocaleLinks();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Transparent over the dark hero, solid once the page scrolls.
  useEffect(() => {
    if (p.isCanvas) return;
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [p.isCanvas]);

  // Mobile panel: lock body scroll, close on Escape or when leaving the mobile breakpoint.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) menuButtonRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => {
      if (!mq.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const solid = p.isCanvas || scrolled;
  const close = () => setOpen(false);
  const panelId = `${p.sectionId || "hcl-header"}-panel`;

  return (
    <HclRoot
      as="header"
      id={p.sectionId}
      className={cn(
        "hcl-header",
        solid && "hcl-header--solid",
        open && "hcl-header--open",
        p.isCanvas && "hcl-header--canvas",
      )}
      style={{ "--hcl-header-solid": p.backgroundColor } as CSSProperties}
    >
      <div className="hcl-container hcl-header__bar">
        <HclLink href="/" className="hcl-header__logo" onClick={close}>
          {p.logoImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hcl-header__logo-image" src={p.logoImage} alt="" aria-hidden="true" />
          )}
          <span className="hcl-header__logo-text">{p.logoText}</span>
        </HclLink>

        <nav className="hcl-header__nav" aria-label="Main">
          <ul className="hcl-header__links">
            {p.links.map((link, i) => (
              <li key={`${link.href}-${i}`}>
                <HclLink href={link.href} className="hcl-header__link">
                  {link.label}
                </HclLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hcl-header__actions">
          <div className="hcl-header__lang" role="group" aria-label={p.languageLabel}>
            {localeLinks.map((item, i) => (
              <span key={item.locale} className="hcl-header__lang-item">
                {i > 0 && <span className="hcl-header__lang-sep" aria-hidden="true" />}
                <a
                  href={item.href}
                  hrefLang={item.locale}
                  className={cn("hcl-header__lang-link", item.active && "hcl-header__lang-link--active")}
                  aria-current={item.active ? "true" : undefined}
                >
                  {item.locale.toUpperCase()}
                </a>
              </span>
            ))}
          </div>

          <HclLink href={p.cartHref} className="hcl-header__cart" aria-label={p.cartLabel} onClick={close}>
            <ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" />
          </HclLink>

          <HclLink href={p.shopHref} className={cn("hcl-btn hcl-header__shop", solid && !open ? "hcl-btn--primary" : "hcl-btn--on-dark")}>
            {p.shopLabel}
          </HclLink>

          <button
            ref={menuButtonRef}
            type="button"
            className="hcl-header__toggle"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? p.closeLabel : p.menuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            className="hcl-header__panel"
            role="dialog"
            aria-modal="true"
            aria-label={p.menuLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hcl-container hcl-header__panel-inner">
              <ul className="hcl-header__panel-links">
                {p.links.map((link, i) => (
                  <motion.li
                    key={`${link.href}-${i}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <HclLink href={link.href} className="hcl-header__panel-link" onClick={close}>
                      {link.label}
                    </HclLink>
                  </motion.li>
                ))}
              </ul>

              <div className="hcl-header__panel-foot">
                <HclLink href={p.shopHref} className="hcl-btn hcl-btn--primary hcl-header__panel-shop" onClick={close}>
                  {p.shopLabel}
                </HclLink>
                <div className="hcl-header__lang hcl-header__lang--panel" role="group" aria-label={p.languageLabel}>
                  {localeLinks.map((item, i) => (
                    <span key={item.locale} className="hcl-header__lang-item">
                      {i > 0 && <span className="hcl-header__lang-sep" aria-hidden="true" />}
                      <a
                        href={item.href}
                        hrefLang={item.locale}
                        className={cn("hcl-header__lang-link", item.active && "hcl-header__lang-link--active")}
                        aria-current={item.active ? "true" : undefined}
                      >
                        {item.locale.toUpperCase()}
                      </a>
                    </span>
                  ))}
                </div>
                {p.panelNote && <p className="hcl-header__panel-note">{p.panelNote}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </HclRoot>
  );
}
