import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useServerTranslation } from "./helpers/i18n-helpers";

export default async function Home() {
    const t = await useServerTranslation();

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    {t("Settings")}
                </Typography>
                <Link href="/about" color="secondary" component={NextLink}>
                    Go to the about page
                </Link>
            </Box>
        </Container>
    );
}
