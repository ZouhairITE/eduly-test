import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { Locale, i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function isLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}

function getLocale(request: NextRequest): string | undefined {
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (
        cookieLocale &&
        isLocale(cookieLocale) &&
        i18n.locales.includes(cookieLocale)
    ) {
        return cookieLocale;
    }

    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    let locales: string[] = i18n.locales;

    let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    );

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
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
