import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern, smaller formats so product photos load fast.
    formats: ["image/avif", "image/webp"],
    // Allow crisp product imagery (Next 16 requires whitelisting qualities).
    qualities: [75, 85, 90, 100],
  },
};

export default nextConfig;
