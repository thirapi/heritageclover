import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heritage Clover",
  description: "Indonesian cloves from the historic spice route.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
