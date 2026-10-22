import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18nConfig } from "./i18n";
import { appName, gitConfig } from "./shared";

function NavTitle() {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-semibold">{appName}</span>
      <span className="hidden text-xs font-normal tracking-wide text-fd-muted-foreground sm:inline">
        Learning Path
      </span>
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
  };
}
