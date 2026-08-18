import type { NextConfig } from "next";

/**
 * GitHub Pages serves this repo as a *project* page, so the site lives under
 * /satwik-rudra-portfolio rather than the domain root. The prefix is supplied
 * by CI (see .github/workflows/deploy.yml) and left empty locally so
 * `npm run dev` still serves from http://localhost:3000/.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Pages is a static host: emit plain HTML/CSS/JS into ./out
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // Next's image optimizer needs a running server, which Pages doesn't provide.
  images: { unoptimized: true },
  // Emit /path/index.html so Pages resolves routes without a rewrite rule.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
