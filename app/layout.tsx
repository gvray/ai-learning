import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Inter } from "next/font/google";
import { getLocale, i18n } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
});

export default async function Layout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale === "en" ? "en" : "zh-CN"}
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider i18n={i18n.provider(locale)}>{children}</RootProvider>
      </body>
    </html>
  );
}
