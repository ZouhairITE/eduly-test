import type { Locale } from "@/src/lib/i18n/i18n-config";
import en from "@/src/dictionaries/en.json";
import ar from "@/src/dictionaries/ar.json";

const dictionaries: Record<string, Record<string, string>> = {
    en,
    ar,
};

export type TranslationKey = keyof typeof en;

export const getDictionary = (locale: Locale) =>
    dictionaries[locale] ?? dictionaries.en;
