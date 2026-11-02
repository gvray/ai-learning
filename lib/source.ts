import { llms, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import { i18n } from "./i18n";
import { docsRoute, siteUrl } from "./shared";

const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  i18n,
  plugins: [lucideIconsPlugin()],
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText("processed")}`,
});

// llms() 生成的 markdown 链接是 page.url(如 /zh/docs/...),不含 basePath;
// 静态导出部署在 /ai-learning 子路径下,直接用会 404。补全为绝对 URL。
function absolutizeLinks(text: string): string {
  return text.replace(/\]\((\/[^)]+)\)/g, `](${siteUrl}$1)`);
}

export async function llmsIndex(): Promise<string> {
  return absolutizeLinks(await docsLlms.index());
}

export async function llmsFull(): Promise<string> {
  return absolutizeLinks(await docsLlms.full());
}
