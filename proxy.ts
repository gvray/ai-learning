import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from "next/server";
import { i18nConfig } from "@/lib/i18n";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const i18nMiddleware = createI18nMiddleware({
  languages: i18nConfig.languages,
  defaultLanguage: i18nConfig.defaultLanguage,
  hideLocale: i18nConfig.hideLocale,
});

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  const result = rewriteSuffix(pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl), {
      request: { headers: requestHeaders },
    });
  }

  if (isMarkdownPreferred(request)) {
    const mdResult = rewriteDocs(pathname);

    if (mdResult) {
      return NextResponse.rewrite(new URL(mdResult, request.nextUrl), {
        request: { headers: requestHeaders },
        headers: { Vary: "Accept" },
      });
    }
  }

  const i18nResult = i18nMiddleware(request, event);
  if (i18nResult instanceof NextResponse) {
    i18nResult.headers.set("x-pathname", pathname);
    return i18nResult;
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
    headers: { "x-pathname": pathname },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api|llms\\.txt|llms-full\\.txt).*)"],
};
