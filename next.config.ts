import type { NextConfig } from "next";

// Статическая демо-версия для GitHub Pages (npm run build:pages).
const isStatic = process.env.NEXT_PUBLIC_STATIC === "1";

const nextConfig: NextConfig = {
  ...(isStatic && {
    output: "export" as const,
    basePath: "/yakitoriya-pro",
    trailingSlash: true,
  }),
  images: {
    unoptimized: isStatic,
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  cacheComponents: !isStatic,
  partialPrefetching: !isStatic,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
