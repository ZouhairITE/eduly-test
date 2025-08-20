"use client";

import { useThemeToggle } from "@/src/theme/theme-registery";
import ContrastIcon from "@mui/icons-material/Contrast";
import IconButton from "@mui/material/IconButton";

export default function ThemeSwitcher() {
    const { mode, setMode } = useThemeToggle();

    return (
        <IconButton
            aria-label="theme"
            color="inherit"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
            <ContrastIcon />
        </IconButton>
    );
}
