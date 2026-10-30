import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Heritage Clover",
  robots: { index: false, follow: false },
};

// Root layout for non-localized tooling routes (/dev/sections, /store stub).
export default function ToolsLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
