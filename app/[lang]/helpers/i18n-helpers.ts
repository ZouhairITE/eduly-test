import { Locale, SUPPORTED_LOCALES, i18n } from "@/i18n-config";
import { TranslationKey, getDictionary } from "@/get-dictionary";
import { cookies, headers } from "next/headers";
import Negotiator from "negotiator";

export function isLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}

export async function useServerTranslation() {
    const langCookie: string | undefined = (await cookies()).get(
        "NEXT_LOCALE"
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

    const dict = getDictionary(lang);

    return (key: TranslationKey) => dict[key] ?? key;
}
