import { describe, expect, it } from "vitest";
import { localizeHref } from "./hcl-link";

describe("localizeHref", () => {
  it("prefixes internal paths with the locale", () => {
    expect(localizeHref("/our-story", "id")).toBe("/id/our-story");
    expect(localizeHref("/insight/clove-history", "en")).toBe("/en/insight/clove-history");
    expect(localizeHref("/", "id")).toBe("/id");
  });

  it("leaves /store paths alone", () => {
    expect(localizeHref("/store", "id")).toBe("/store");
    expect(localizeHref("/store/cart", "en")).toBe("/store/cart");
  });

  it("does not double-prefix", () => {
    expect(localizeHref("/en/process", "id")).toBe("/en/process");
  });

  it("passes through external, anchor and contact links", () => {
    expect(localizeHref("https://wa.me/62", "en")).toBe("https://wa.me/62");
    expect(localizeHref("#faq", "en")).toBe("#faq");
    expect(localizeHref("mailto:hi@example.com", "en")).toBe("mailto:hi@example.com");
  });
});
