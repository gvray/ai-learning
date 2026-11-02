import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/og/", "/llms.mdx/"],
    },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
