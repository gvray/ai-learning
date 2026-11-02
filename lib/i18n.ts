import { defineI18nUI } from "fumadocs-ui/i18n";

export type { Locale } from "./locale";

// hideLocale: "never" —— 静态导出无 middleware,`default-locale` 依赖的 rewrite 不可用,
// URL 必须显式带 locale 前缀 (/en、/zh),链接与路由才能一致。
export const i18n = defineI18nUI(
  {
    languages: ["zh", "en"],
    defaultLanguage: "en",
    hideLocale: "never",
    parser: "dir",
  },
  {
    zh: { displayName: "简体中文" },
    en: { displayName: "English" },
  },
);

export const i18nConfig = {
  languages: i18n.languages,
  defaultLanguage: i18n.defaultLanguage,
  hideLocale: i18n.hideLocale,
};
