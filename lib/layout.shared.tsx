import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import {
  LanguageSelectRoot,
  LanguageSelectText,
} from "@/components/language-select";
import { i18nConfig } from "./i18n";
import { appName, gitConfig } from "./shared";

function NavTitle() {
  return (
    <span className="inline-flex items-center gap-2">
      {/* logo.svg: 深蓝主色适配浅色背景；logo-dark.svg: 白色主色适配深色背景 */}
      <img src="/logo.svg" alt="" aria-hidden className="h-6 w-6 dark:hidden" />
      <img
        src="/logo-dark.svg"
        alt=""
        aria-hidden
        className="hidden h-6 w-6 dark:block"
      />
      <span className="font-semibold">{appName}</span>
    </span>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NavTitle />,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n: i18nConfig,
    slots: {
      languageSelect: { root: LanguageSelectRoot, text: LanguageSelectText },
    },
  };
}
