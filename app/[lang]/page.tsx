"use client";

import { IconButton } from "@mui/material";
import { useThemeToggle } from "@/theme/theme-registery";

export default function ThemeSwitcher() {
  const { mode, setMode } = useThemeToggle();

  return (
    <IconButton
      color="inherit"
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {mode === "dark" ? <div>dark</div> : <div>light</div>}
    </IconButton>
  );
}
