"use client";
import { MouseEvent, useState } from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export function ProfileMenu() {
    const t = useTranslation();
    const settings = [t("Profile"), t("Settings"), t("Logout")];

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                    alt="Eduly User"
                    sx={{ bgcolor: "secondary.main", height: 36, width: 36 }}
                >
                    E
                </Avatar>
            </IconButton>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                disableScrollLock // 👈 this prevents the body from shifting
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                            {setting}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}
