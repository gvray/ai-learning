"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { inferLocale, type Locale } from "@/lib/locale";

const content: Record<
  Locale,
  { title: string; description: string; cta: string }
> = {
  zh: {
    title: "出错了",
    description: "渲染此页面时发生异常。",
    cta: "重试",
  },
  en: {
    title: "Something went wrong",
    description: "An error occurred while rendering this page.",
    cta: "Try again",
  },
};

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = content[inferLocale(usePathname())];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-semibold">{t.title}</h2>
      <p className="max-w-md text-fd-muted-foreground">{t.description}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="inline-flex items-center rounded-md border border-fd-border px-4 py-2 text-sm font-medium hover:bg-fd-accent"
      >
        {t.cta}
      </button>
    </div>
  );
}
