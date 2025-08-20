import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/src/lib/i18n/i18n-config";
import { getLocaleFromRequest } from "@/src/lib/i18n/i18n-helpers";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocaleFromRequest(request);
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
