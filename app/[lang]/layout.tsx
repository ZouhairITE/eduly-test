import type { Metadata } from "next";
import { Geist, Almarai } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import "./globals.css";
import ThemeRegistry from "../../theme/theme-registery";
import ResponsiveAppBar from "./components/layout/main-app-bar";

const geistSans = Geist({
    variable: "--font-geist",
    subsets: ["latin"],
});

const almaraiSans = Almarai({
    variable: "--font-almarai",
    weight: "400",
});

export const metadata: Metadata = {
    title: "Eduly exam dashboard",
    description: "A realtime dashboard for exam",
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}>) {
    const { lang } = await params;
    const dir = lang === "ar" ? "rtl" : "ltr";

    return (
        <html lang={lang} dir={dir}>
            <body className={`${geistSans.variable} ${almaraiSans.variable}`}>
                <AppRouterCacheProvider>
                    <ThemeRegistry>
                        <ResponsiveAppBar />
                        <main style={{ marginTop: "64px", padding: "1rem" }}>
                            {children}
                        </main>
                    </ThemeRegistry>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
