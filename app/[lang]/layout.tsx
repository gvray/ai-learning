import { HomeLayout } from "fumadocs-ui/layouts/home";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { i18n } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import type { Locale } from "@/lib/locale";
import { siteUrl } from "@/lib/shared";
import "../global.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:8001"),
  icons: { icon: "/favicon.ico" },
};

const inter = Inter({
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const params = await props.params;
  const lang: Locale = params.lang === "zh" ? "zh" : "en";

  return (
    <html
      lang={lang === "en" ? "en" : "zh-CN"}
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {/* search: 静态导出不支持 server-side search route(它依赖 request.url);
            暂时禁用,待接入 Orama Cloud 或静态 index 方案后移除。 */}
        <RootProvider i18n={i18n.provider(lang)} search={{ enabled: false }}>
          <HomeLayout {...baseOptions()}>{props.children}</HomeLayout>
        </RootProvider>
      </body>
    </html>
  );
}
