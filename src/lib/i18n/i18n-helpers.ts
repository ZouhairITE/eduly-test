import { Locale, SUPPORTED_LOCALES, i18n } from "@/src/lib/i18n/i18n-config";
import { TranslationKey, getDictionary } from "@/src/lib/i18n/get-dictionary";
import { cookies, headers } from "next/headers";
import Negotiator from "negotiator";
import { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { LOCALE_COOKIE_NAME } from "../app-consts";

export function isLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}

export async function getLocale() {
    const langCookie: string | undefined = (await cookies()).get(
        LOCALE_COOKIE_NAME
    )?.value;

    const h = await headers();
    const negotiator = new Negotiator({
        headers: Object.fromEntries(h.entries()),
    });
    const detected = negotiator.language(SUPPORTED_LOCALES) || "en";

    const lang: Locale =
        langCookie && isLocale(langCookie)
            ? langCookie
            : detected && isLocale(detected)
            ? detected
            : "en";

    return lang;
}

export function getLocaleFromRequest(request: NextRequest): string | undefined {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
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

export async function useServerTranslation() {
    const lang = await getLocale();

    const dict = getDictionary(lang);

    return (key: TranslationKey) => dict[key] ?? key;
}
