"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useParams } from "next/navigation";
import { ReactNode, useMemo, useState, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { createContext, useContext } from "react";

// Create rtl cache
const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

// Create context
const ThemeToggleContext = createContext<{
    mode: "light" | "dark";
    setMode: (mode: "light" | "dark") => void;
} | null>(null);

export const useThemeToggle = () => {
    const context = useContext(ThemeToggleContext);
    if (!context) {
        throw new Error("useThemeToggle must be used inside ThemeRegistry");
    }
    return context;
};

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">("light");

    // Load preference from localStorage or system preference
    useEffect(() => {
        const savedMode = localStorage.getItem("theme") as
            | "light"
            | "dark"
            | null;

        if (savedMode) {
            setMode(savedMode);
        } else {
            // Detect system preference
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            setMode(prefersDark ? "dark" : "light");
        }
    }, []);

    // Save to localStorage when user changes theme
    useEffect(() => {
        localStorage.setItem("theme", mode);
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
