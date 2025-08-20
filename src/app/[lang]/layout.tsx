import type { Metadata } from "next";
import "./globals.css";

import { Almarai, Geist } from "next/font/google";

import MainAppBar from "@/src/components/layout/main-app-bar";
import ThemeRegistry from "@/src/theme/theme-registery";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

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
                        <MainAppBar />
                        <main style={{ marginTop: "64px" }}>{children}</main>
                    </ThemeRegistry>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
