"use client";

import { TranslationKey, getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
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
