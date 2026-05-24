import type { NextConfig } from "next";

// When deploying to GitHub Pages (project site at /networkdigital/), set
// GITHUB_PAGES=true so basePath/assetPrefix resolve correctly. On Vercel and in
// local dev the env var is unset, so the site serves from the root with no prefix.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/networkdigital";

const nextConfig: NextConfig = {
  output: "export",
  // Pin the workspace root (a stray lockfile in $HOME otherwise misleads Next).
  outputFileTracingRoot: process.cwd(),
  basePath: isGithubPages ? repoBasePath : undefined,
  assetPrefix: isGithubPages ? `${repoBasePath}/` : undefined,
  trailingSlash: true,
  images: {
    // next/image optimisation is disabled for static export.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBasePath : "",
  },
  reactStrictMode: true,
};

export default nextConfig;
