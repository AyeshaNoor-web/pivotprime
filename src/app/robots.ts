import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/metadata";
import { DIAGNOSTIC_ENABLED } from "@/lib/flags";

/**
 * robots.txt. Spec 4.5 asks for one, alongside the sitemap.
 *
 * /api is disallowed because nothing there is a page. /diagnostic is disallowed
 * while it is gated: the route 404s, but a stale link should not send a crawler
 * at it either.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DIAGNOSTIC_ENABLED ? ["/api/"] : ["/api/", "/diagnostic"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
