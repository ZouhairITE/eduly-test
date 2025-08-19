import type { Locale } from "./i18n-config";
import en from "./dictionaries/en.json";
import ar from "./dictionaries/ar.json";

const dictionaries: Record<string, Record<string, string>> = {
    en,
    ar,
};

export type TranslationKey = keyof typeof en;

export const getDictionary = (locale: Locale) =>
    dictionaries[locale] ?? dictionaries.en;
