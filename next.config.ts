import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // Google OAuth
      "avatars.githubusercontent.com", // GitHub OAuth
    ],
  },
};

export default nextConfig;
