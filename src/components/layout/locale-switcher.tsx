"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/src/lib/i18n/i18n-config";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import { LOCALE_COOKIE_NAME } from "@/src/lib/app-consts";

const localesText = {
    en: "English",
    ar: "العربية",
};

export default function LocaleSwitcher() {
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectedPathname = (locale: Locale) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    const handleLocaleChange = (locale: Locale) => {
        document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000`;
        handleClose();
    };

    return (
        <div>
            <IconButton
                color="inherit"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <LanguageIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: { "aria-labelledby": "basic-button" },
                }}
            >
                {i18n.locales.map((locale) => {
                    return (
                        <Link key={locale} href={redirectedPathname(locale)}>
                            <MenuItem
                                onClick={() => handleLocaleChange(locale)}
                            >
                                {localesText[locale]}
                            </MenuItem>
                        </Link>
                    );
                })}
            </Menu>
        </div>
    );
}
