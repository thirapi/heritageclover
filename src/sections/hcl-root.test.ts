import { describe, expect, it } from "vitest";
import { hclLines, withHclDefaults } from "./hcl-root";

describe("withHclDefaults", () => {
  const defaults = { title: "Default title", body: "Default body", count: "3" };

  it("returns the defaults when no props are passed", () => {
    expect(withHclDefaults(defaults, {})).toEqual(defaults);
  });

  it("lets passed props override defaults", () => {
    expect(withHclDefaults(defaults, { title: "Custom" }).title).toBe("Custom");
  });

  it("ignores null and undefined props", () => {
    const props: Partial<typeof defaults> = {
      title: undefined,
      body: null as unknown as string,
    };
    const merged = withHclDefaults(defaults, props);
    expect(merged.title).toBe("Default title");
    expect(merged.body).toBe("Default body");
  });

  it("keeps an empty string (field cleared on purpose)", () => {
    expect(withHclDefaults(defaults, { body: "" }).body).toBe("");
  });

  it("passes through injected props that are not in the defaults", () => {
    const props: Partial<typeof defaults> & { isCanvas: boolean } = { isCanvas: true };
    expect(withHclDefaults(defaults, props).isCanvas).toBe(true);
  });

  it("does not mutate the defaults object", () => {
    withHclDefaults(defaults, { title: "Changed" });
    expect(defaults.title).toBe("Default title");
  });
});

describe("hclLines", () => {
  it("splits on newlines, trims and drops empty lines", () => {
    expect(hclLines("  Whole cloves \n\n Ground cloves\n   \nClove oil  ")).toEqual([
      "Whole cloves",
      "Ground cloves",
      "Clove oil",
    ]);
  });

  it("handles CRLF line endings", () => {
    expect(hclLines("a\r\nb")).toEqual(["a", "b"]);
  });

  it("returns an empty list for empty, null or undefined", () => {
    expect(hclLines("")).toEqual([]);
    expect(hclLines(null)).toEqual([]);
    expect(hclLines(undefined)).toEqual([]);
  });
});
