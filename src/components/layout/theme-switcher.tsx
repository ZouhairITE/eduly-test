"use client";

import { useThemeToggle } from "@/src/theme/theme-registery";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SunnyIcon from "@mui/icons-material/Sunny";
import { IconButton } from "@mui/material";

export default function ThemeSwitcher() {
    const { mode, setMode } = useThemeToggle();

    return (
        <IconButton
            aria-label="theme"
            color="inherit"
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
            {mode === "dark" ? <SunnyIcon /> : <DarkModeIcon />}
        </IconButton>
    );
}
