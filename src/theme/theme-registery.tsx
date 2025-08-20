"use client";

import { useParams } from "next/navigation";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { prefixer } from "stylis";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import rtlPlugin from "@mui/stylis-plugin-rtl";

import { THEME_STORAGE_NAME } from "../lib/app-consts";

type ThemeOption = "light" | "dark";
const themeOptions = ["light", "dark"];

function isThemeOption(value: string): value is ThemeOption {
    return themeOptions.includes(value);
}

// Create rtl cache
const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

// Create context
const ThemeToggleContext = createContext<{
    mode: ThemeOption;
    setMode: (mode: ThemeOption) => void;
} | null>(null);

export const useThemeToggle = () => {
    const context = useContext(ThemeToggleContext);
    if (!context) {
        throw new Error("useThemeToggle must be used inside ThemeRegistry");
    }
    return context;
};

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<ThemeOption>("light");

    // Load preference from localStorage or system preference
    useEffect(() => {
        const savedMode = localStorage.getItem(THEME_STORAGE_NAME);
        if (savedMode && isThemeOption(savedMode)) {
            setMode(savedMode);
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            setMode(prefersDark ? "dark" : "light");
        }
    }, []);

    // Save to localStorage when user changes theme
    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_NAME, mode);
    }, [mode]);

    const params = useParams();
    const lang = params?.lang ?? "en";
    const direction = lang === "ar" ? "rtl" : "ltr";

    const theme = useMemo(
        () =>
            createTheme({
                direction,
                palette: {
                    mode,
                    ...(mode === "light"
                        ? { background: { default: "#fafafa" } }
                        : { background: { default: "#121212" } }),
                },
                typography: {
                    fontFamily:
                        lang === "ar"
                            ? "var(--font-almarai), sans-serif"
                            : "var(--font-geist), sans-serif",
                },
            }),
        [mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ThemeToggleContext.Provider value={{ mode, setMode }}>
                {lang === "ar" ? (
                    <CacheProvider value={rtlCache}>{children}</CacheProvider>
                ) : (
                    children
                )}
            </ThemeToggleContext.Provider>
        </ThemeProvider>
    );
}
