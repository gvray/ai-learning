export type Locale = "zh" | "en";

export function inferLocale(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}
