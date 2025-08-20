"use client";

import { TranslationKey, getDictionary } from "@/src/lib/i18n/get-dictionary";
import { Locale } from "@/src/lib/i18n/i18n-config";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export function useTranslation() {
    const params = useParams<{ lang: Locale }>();
    const lang = params?.lang ?? "en";

    return useMemo(() => {
        const dict = getDictionary(lang);
        return (key: TranslationKey) => dict[key] ?? key;
    }, [lang]);
}
