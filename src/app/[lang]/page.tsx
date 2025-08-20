import Image from "next/image";
import NextLink from "next/link";
import * as React from "react";

import { META } from "@/src/lib/app-consts";
import { Locale } from "@/src/lib/i18n/i18n-config";
import { dispatchServerTranslation } from "@/src/lib/i18n/i18n-helpers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default async function Home() {
    const t = await dispatchServerTranslation();

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
                    data-testid="get-started"
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

import type { Metadata } from "next";
interface PageProps {
    params: Promise<{
        lang: Locale;
    }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { lang } = await params;
    const meta = META[lang];

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            url: meta.url,
            images: [
                { url: meta.image, width: 1200, height: 630, alt: meta.title },
            ],
            type: "website",
        },
    };
}
