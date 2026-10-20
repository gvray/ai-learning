import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: siteUrl ? new URL(page.url, siteUrl).toString() : page.url,
    lastModified: new Date(),
  }));
}
