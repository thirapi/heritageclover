import { HclRoot } from "@/sections/hcl-root";

// Temporary placeholder; replaced by the [locale] routes in US-003.
export default function Home() {
  return (
    <HclRoot as="main" className="flex min-h-screen flex-col items-center justify-center gap-6">
      <p className="hcl-eyebrow">Since the spice route</p>
      <h1 style={{ fontSize: "var(--hcl-h1)" }}>Heritage Clover</h1>
      <a className="hcl-btn hcl-btn--primary" href="/store">
        Shop cloves
      </a>
    </HclRoot>
  );
}
