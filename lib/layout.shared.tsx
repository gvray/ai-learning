import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18nConfig } from "./i18n";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n: i18nConfig,
  };
}
