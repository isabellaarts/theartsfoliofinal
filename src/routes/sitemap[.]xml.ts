import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { TEAM } from "@/lib/site-data";

const BASE_URL = "https://arts-folio-studio.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/about",
          "/services",
          "/portfolio",
          "/artists",
          "/reviews",
          "/careers",
          "/blog",
          "/contact",
          "/quote",
          "/privacy",
          "/terms",
          "/refund",
          "/cookies",
        ];
        const artistPaths = TEAM.map((a) => `/artists/${a.slug}`);
        const urls = [...staticPaths, ...artistPaths].map((p) => {
          const priority = p === "/" ? "1.0" : p.startsWith("/artists/") ? "0.7" : "0.8";
          return `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        });
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
