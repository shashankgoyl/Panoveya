import { NextResponse, type NextRequest } from "next/server";
import { articleSlugs, industrySlugs, serviceSlugs } from "@/content/route-slugs";

/**
 * Returns a genuine HTTP 404 for unknown slugs under dynamic routes.
 * (With partial prerendering, a notFound() inside the page would stream with a 200 status.)
 */
const known: Record<string, readonly string[]> = {
  services: serviceSlugs,
  industries: industrySlugs,
  insights: articleSlugs,
};

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const slugs = known[section];
  if (slugs && slug && (rest.length > 0 || !slugs.includes(slug))) {
    // Rewriting to a path with no route renders the app's not-found page with a 404 status.
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:path+", "/industries/:path+", "/insights/:path+"],
};
