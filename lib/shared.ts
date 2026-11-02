import { createGetUrl } from "fumadocs-core/source";
import { i18n } from "./i18n";

export const appName = "AI Learning";
// 默认指向 GitHub Pages 部署地址(gvray/ai-learning → /ai-learning 子路径);
// 自定义域名时用 NEXT_PUBLIC_SITE_URL 覆盖。
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gvray.github.io/ai-learning";
export const docsRoute = "/docs";
export const docsImageRoute = "/og/docs";
export const docsContentRoute = "/llms.mdx/docs";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "gvray",
  repo: "ai-learning",
  branch: "main",
};

const getContentUrl = createGetUrl(docsContentRoute, i18n);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "content.md"];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute, i18n);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, "image.png"];

  return { segments, url: getImageUrl(segments, page.locale) };
}
