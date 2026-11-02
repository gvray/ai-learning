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
    description: "应用发生严重错误，请稍后重试。",
    cta: "重试",
  },
  en: {
    title: "Something went wrong",
    description: "A critical error occurred. Please try again.",
    cta: "Try again",
  },
};

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const locale = inferLocale(usePathname());
  const t = content[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang={locale === "en" ? "en" : "zh-CN"}>
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "0 1rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", margin: 0 }}>{t.title}</h2>
        <p style={{ maxWidth: "28rem", color: "#666", margin: 0 }}>
          {t.description}
        </p>
        <button
          type="button"
          onClick={() => retry()}
          style={{
            border: "1px solid #ccc",
            borderRadius: "0.375rem",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            cursor: "pointer",
            background: "transparent",
          }}
        >
          {t.cta}
        </button>
      </body>
    </html>
  );
}
