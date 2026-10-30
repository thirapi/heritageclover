import Link from "next/link";
import { HclRoot } from "@/sections/hcl-root";

// Standalone stub: in exantara-saas /store is served by the standard store v1
// (catalog, cart, checkout), so nothing here is ported.
export default function StoreStub() {
  return (
    <HclRoot as="main" className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="hcl-eyebrow">Shop</p>
      <h1 style={{ fontSize: "var(--hcl-h2)" }}>Store is served by Exantara (standard store v1)</h1>
      <p style={{ color: "var(--hcl-ink-muted)", maxWidth: "48ch" }}>
        Catalog, cart and checkout come from the Exantara platform once this site is ported.
      </p>
      <Link className="hcl-btn hcl-btn--primary" href="/en">
        Back to home
      </Link>
    </HclRoot>
  );
}
