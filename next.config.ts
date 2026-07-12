import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Jangan preload semua route ke memory saat server start —
    // kurangi footprint dev server (Next 16 memory-usage guide).
    preloadEntriesOnStart: false,
  },
};

export default nextConfig;
