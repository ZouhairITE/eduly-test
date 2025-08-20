"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

import { getDictionary, TranslationKey } from "@/src/lib/i18n/get-dictionary";
import { Locale } from "@/src/lib/i18n/i18n-config";

export function useTranslation() {
    const params = useParams<{ lang: Locale }>();
    const lang = params?.lang ?? "en";

    return useMemo(() => {
        const dict = getDictionary(lang);
        return (key: TranslationKey) => dict[key] ?? key;
    }, [lang]);
}
