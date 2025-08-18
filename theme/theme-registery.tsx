"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode, useMemo, useState, useEffect } from "react";

// Create context
import { createContext, useContext } from "react";
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
    const savedMode = localStorage.getItem("theme") as "light" | "dark" | null;

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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? { background: { default: "#fafafa" } }
            : { background: { default: "#121212" } }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggleContext.Provider value={{ mode, setMode }}>
        {children}
      </ThemeToggleContext.Provider>
    </ThemeProvider>
  );
}
