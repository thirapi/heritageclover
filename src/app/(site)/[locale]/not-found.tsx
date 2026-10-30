import { HclLink } from "@/sections/hcl-link";
import { HclRoot } from "@/sections/hcl-root";

// notFound() inside a localized route (e.g. unknown insight slug).
export default function LocaleNotFound() {
  return (
    <HclRoot as="main" className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 pt-24 text-center">
      <p className="hcl-eyebrow">404</p>
      <h1 style={{ fontSize: "var(--hcl-h2)" }}>This page was lost on the spice route.</h1>
      <HclLink className="hcl-btn hcl-btn--primary" href="/">
        Back to home
      </HclLink>
    </HclRoot>
  );
}
