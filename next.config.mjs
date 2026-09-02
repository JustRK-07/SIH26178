/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mapbox GL is bundled; if you swap to MapLibre, no changes needed.
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
};

export default nextConfig;
