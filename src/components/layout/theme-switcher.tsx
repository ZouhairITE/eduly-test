"use client";

import { IconButton } from "@mui/material";
import { useThemeToggle } from "@/src/theme/theme-registery";
import SunnyIcon from "@mui/icons-material/Sunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";

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
