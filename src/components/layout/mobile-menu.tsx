"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useTranslation } from "@/src/shared-fe/hooks/use-translation";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export function MobileMenu() {
    const t = useTranslation();
    const pages = [
        {
            label: t("Dashboard"),
            link: "/dashboard",
        },
    ];
    const [open, setOpen] = useState(false);

    const toggleDrawer = (value: boolean) => () => {
        setOpen(value);
    };

    return (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
            {/* Menu Button */}
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>

            {/* Sidebar Drawer */}
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 260 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {/* Logo + Title */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 2,
                            gap: 1.5,
                        }}
                    >
                        <Image
                            src="/eduly-logo.png" // place logo in public/eduly-logo.png
                            alt="Eduly Logo"
                            width={40}
                            height={40}
                        />
                        <Typography variant="h6" fontWeight="bold">
                            Eduly
                        </Typography>
                    </Box>

                    <Divider />

                    {/* Navigation Links */}
                    <List>
                        {pages.map((page) => (
                            <ListItem key={page.label} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={page.link}
                                >
                                    <ListItemText primary={page.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
