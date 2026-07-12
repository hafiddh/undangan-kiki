import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Jangan preload semua route ke memory saat server start —
    // kurangi footprint dev server (Next 16 memory-usage guide).
    // preloadEntriesOnStart: false,
  },
  images: {
    // Next 16 ubah default minimumCacheTTL 60s -> 4 jam. Bikin swap
    // gambar public/ tak kelihatan saat dev. 0 = revalidasi tiap request.
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
