import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AdminShortcut from "@/components/AdminShortcut";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ThemeScript } from "@/components/ThemeScript";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Origin Labs | Web Development Agency",
  description:
    "Origin Labs - Professionelle Websites, Webapps und Mobile Apps. Wir entwickeln digitale Lösungen, die begeistern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} font-body antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <AdminShortcut />
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
