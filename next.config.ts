import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        // Decap CMS fetches config.yml relative to /admin (no trailing slash)
        // which resolves to /config.yml — rewrite it to the correct path
        source: "/config.yml",
        destination: "/admin/config.yml",
      },
      {
        // Proxy Netlify Identity requests to the actual Netlify site
        // Decap CMS git-gateway fetches /.netlify/identity/* on the current domain
        source: "/.netlify/identity/:path*",
        destination:
          "https://ephemeral-crepe-e6f2b7.netlify.app/.netlify/identity/:path*",
      },
      {
        // Proxy Netlify Git Gateway requests to the actual Netlify site
        source: "/.netlify/git/:path*",
        destination:
          "https://ephemeral-crepe-e6f2b7.netlify.app/.netlify/git/:path*",
      },
    ];
  },
};

export default nextConfig;
