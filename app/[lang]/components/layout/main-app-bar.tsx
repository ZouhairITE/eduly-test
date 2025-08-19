import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";
import { ProfileMenu } from "./profile-menu";
import ThemeSwitcher from "./theme-switcher";
import LocaleSwitcher from "./locale-switcher";
import Link from "next/link";

function MainAppBar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexGrow: 1,
                        }}
                    >
                        <MobileMenu />
                        <Link href="/">
                            <Image
                                src="/eduly-logo.png"
                                alt="Eduly logo"
                                height={38}
                                width={38}
                            />
                        </Link>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Button
                                href="/dashboard"
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                Dashboard
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                        <LocaleSwitcher />
                        <ThemeSwitcher />
                        <ProfileMenu />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default MainAppBar;
