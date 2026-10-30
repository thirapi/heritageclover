import Link from "next/link";
import type { Metadata } from "next";
import { HclRoot } from "@/sections/hcl-root";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · Heritage Clover",
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <HclRoot as="main" className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="hcl-eyebrow">404</p>
          <h1 style={{ fontSize: "var(--hcl-h2)" }}>This page was lost on the spice route.</h1>
          <Link className="hcl-btn hcl-btn--primary" href="/en">
            Back to home
          </Link>
        </HclRoot>
      </body>
    </html>
  );
}
