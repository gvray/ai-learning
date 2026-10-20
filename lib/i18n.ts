import { defineI18nUI } from "fumadocs-ui/i18n";
import { headers } from "next/headers";
import { inferLocale, type Locale } from "./locale";

export type { Locale };

export async function getLocale(): Promise<Locale> {
  const headersList = await headers();
  return inferLocale(headersList.get("x-pathname") ?? "");
}

export const i18n = defineI18nUI({
  languages: ["zh", "en"],
  defaultLanguage: "zh",
  hideLocale: "default-locale",
  parser: "dir",
});

export const i18nConfig = {
  languages: i18n.languages,
  defaultLanguage: i18n.defaultLanguage,
  hideLocale: i18n.hideLocale,
};
