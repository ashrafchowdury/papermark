import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import AppMiddleware from "@/lib/middleware/app";
import DomainMiddleware from "@/lib/middleware/domain";
import { BLOCKED_PATHNAMES } from "./lib/constants";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     * 6. ingest (analytics)
     */
    "/((?!api/|_next/|_static|_vercel|ingest|favicon.ico|sitemap.xml).*)",
  ],
};

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const path = req.nextUrl.pathname;
  const host = req.headers.get("host");

  if (
    (process.env.NODE_ENV === "development" &&
      host?.includes("papermark-dev.local")) ||
    (process.env.NODE_ENV !== "development" &&
      !(
        host?.includes("localhost") ||
        host?.includes("papermark.io") ||
        host?.endsWith(".vercel.app")
      ))
  ) {
    return DomainMiddleware(req);
  }

  if (
    path !== "/" &&
    path !== "/v1" &&
    path !== "/register" &&
    path !== "/privacy" &&
    path !== "/oss-friends" &&
    path !== "/pricing" &&
    path !== "/docsend-alternatives" &&
    path !== "/launch-week" &&
    path !== "/open-source-investors" &&
    path !== "/investors" &&
    path !== "/ai" &&
    path !== "/share-notion-page" &&
    !path.startsWith("/alternatives") &&
    !path.startsWith("/investors") &&
    !path.startsWith("/blog/") &&
    !path.startsWith("/view/")
  ) {
    return AppMiddleware(req);
  }

  const url = req.nextUrl.clone();

  if (
    path.startsWith("/view/") &&
    (BLOCKED_PATHNAMES.some((blockedPath) => path.includes(blockedPath)) ||
      path.includes("."))
  ) {
    url.pathname = "/404";
    return NextResponse.rewrite(url, { status: 404 });
  }

  return NextResponse.next();
}
