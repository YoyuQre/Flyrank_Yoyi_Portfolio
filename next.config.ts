import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // Netlify starts each build from a clean tree, so a persisted Turbopack
    // build cache only wastes time — and it snapshots env values (including
    // RESEND_API_KEY) into .next/cache/turbopack, which trips Netlify's
    // secrets scanner. Disable it so secrets never land in build artifacts.
    turbopackFileSystemCacheForBuild: false,
  },
};

export default nextConfig;
