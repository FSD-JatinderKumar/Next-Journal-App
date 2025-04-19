import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config({ path: ".env.dev" });

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  devIndicators: false,
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;