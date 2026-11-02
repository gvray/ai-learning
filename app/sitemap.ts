import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    // 用字符串拼接:page.url 是绝对路径(/en/docs/...),new URL 第二参数的 path 会被丢弃,
    // basePath 无法生效。siteUrl 已含 basePath(/ai-learning),直接拼。
    url: `${siteUrl}${page.url}`,
    lastModified: new Date(),
  }));
}
