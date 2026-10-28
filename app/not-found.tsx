import Link from "next/link";
import { getLocale, type Locale } from "@/lib/i18n";

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

export default async function NotFound() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 px-8 text-center">
      <h1 className="text-6xl font-bold text-fd-muted-foreground">{t.title}</h1>
      <h2 className="text-2xl font-semibold">{t.subtitle}</h2>
      <p className="max-w-md text-fd-muted-foreground">{t.description}</p>
      <Link
        href={locale === "zh" ? "/zh" : "/"}
        className="inline-flex items-center rounded-md border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent"
      >
        {t.cta}
      </Link>
    </div>
  );
}
