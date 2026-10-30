import type { NextConfig } from "next";

// Kept close to exantara-saas' config so sections behave the same after porting.
const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts ((site)/[locale] and (tools)) → one global 404 page.
    globalNotFound: true,
  },
};

export default nextConfig;
