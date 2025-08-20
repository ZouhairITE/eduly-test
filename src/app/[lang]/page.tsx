import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import Image from "next/image";
import { useServerTranslation } from "@/src/lib/i18n/i18n-helpers";

export default async function Home() {
    const t = await useServerTranslation();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    py: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                {/* Logo */}
                <Box sx={{ mb: 4 }}>
                    <Image
                        src="/eduly-logo.png"
                        alt="Eduly Logo"
                        width={60}
                        height={60}
                        priority
                    />
                </Box>

                {/* Title */}
                <Typography
                    variant="h3"
                    component="h1"
                    fontWeight="bold"
                    gutterBottom
                >
                    {t("WelcomeTitle")}
                </Typography>

                {/* Subtitle */}
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 600 }}
                >
                    {t("WelcomeSubtitle")}
                </Typography>

                {/* CTA Button */}
                <Button
                    component={NextLink}
                    href="/dashboard"
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 2, px: 5 }}
                >
                    {t("GetStarted")}
                </Button>
            </Box>
        </Container>
    );
}
