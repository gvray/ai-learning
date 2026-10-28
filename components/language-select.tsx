"use client";

import { buttonVariants } from "fumadocs-ui/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import type {
  LanguageSelectProps,
  LanguageSelectTextProps,
} from "fumadocs-ui/layouts/shared/slots/language-select";
import { Check } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { inferLocale } from "@/lib/locale";

const LOCALE_BADGES: Record<string, string> = {
  zh: "中",
  en: "EN",
};

// Matches defaultLanguage in lib/i18n.ts. useI18n() does not expose the default
// language, and lib/i18n can't be imported here (it pulls in next/headers).
const DEFAULT_LANGUAGE = "en";

// With hideLocale:"default-locale", the default-locale URL is rewritten to
// /[lang]/... internally, so usePathname() returns e.g. "/en/docs/foo" even
// though the browser shows "/docs/foo". Strip any locale prefix before
// rebuilding the target path, or switching locales stacks the prefixes.
function stripLocale(path: string): string {
  if (path === "/zh" || path === "/en") return "/";
  if (path.startsWith("/zh/") || path.startsWith("/en/")) return path.slice(3);
  return path;
}

function targetPath(bare: string, locale: string): string {
  if (locale === DEFAULT_LANGUAGE) return bare;
  return bare === "/" ? `/${locale}` : `/${locale}${bare}`;
}

export function LanguageSelectRoot({
  children,
  className,
  variant = "ghost",
  ...rest
}: LanguageSelectProps) {
  const { locales } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Derive the active locale from the URL instead of useI18n().locale: the
  // locale in context is computed in the root layout, which doesn't re-render
  // when the [lang] segment changes on client navigation, so it goes stale.
  const activeLocale = inferLocale(pathname ?? "/");
  const bare = stripLocale(pathname ?? "/");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Switch language"
        {...rest}
        className={(s) =>
          cn(
            buttonVariants({ variant }),
            "gap-1.5 p-1.5",
            s.open && "bg-fd-accent",
            className,
          )
        }
      >
        {children}
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-44 flex-col gap-0.5 p-1">
        {locales?.map((item) => {
          const active = item.locale === activeLocale;
          return (
            <Link
              key={item.locale}
              href={targetPath(bare, item.locale)}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                active
                  ? "bg-fd-primary/10 text-fd-primary"
                  : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground",
              )}
            >
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-muted text-[10px] font-semibold">
                {LOCALE_BADGES[item.locale] ?? item.locale.toUpperCase()}
              </span>
              <span className="flex-1">{item.name}</span>
              {active && <Check className="size-4" />}
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export function LanguageSelectText(props: LanguageSelectTextProps) {
  const { locales, locale } = useI18n();
  const text = locales?.find((item) => item.locale === locale)?.name;
  return <span {...props}>{text}</span>;
}
