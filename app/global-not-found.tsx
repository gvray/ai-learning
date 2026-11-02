"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { inferLocale, type Locale } from "@/lib/locale";
import "./global.css";

const content: Record<
  Locale,
  { title: string; subtitle: string; description: string; cta: string }
> = {
  zh: {
    title: "404",
    subtitle: "页面未找到",
    description: "您访问的页面可能已被删除、改名或暂时不可用。",
    cta: "返回首页",
  },
  en: {
    title: "404",
    subtitle: "Page Not Found",
    description:
      "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    cta: "Go home",
  },
};

// 根路径或无 locale 前缀的路径(如 /foo)→ 跳转到对应 locale 首页;
// 已带 locale 前缀但页面不存在(如 /en/nonexistent)→ 显示 404。
const LOCALE_RE = /^\/(en|zh)(\/|$)/;

export default function GlobalNotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = inferLocale(pathname ?? "/");
  const t = content[locale];

  useEffect(() => {
    if (!pathname || !LOCALE_RE.test(pathname)) {
      router.replace(`/${locale}`);
    }
  }, [pathname, locale, router]);

  return (
    <html lang={locale === "en" ? "en" : "zh-CN"}>
      <body className="flex flex-col min-h-screen items-center justify-center gap-4 px-8 text-center">
        <h1 className="text-6xl font-bold text-neutral-400">{t.title}</h1>
        <h2 className="text-2xl font-semibold">{t.subtitle}</h2>
        <p className="max-w-md text-neutral-500">{t.description}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
        >
          {t.cta}
        </Link>
      </body>
    </html>
  );
}
