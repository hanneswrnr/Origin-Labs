import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import AdminShortcut from "@/components/AdminShortcut";

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
    <html lang="de">
      <body
        className={`${montserrat.variable} ${inter.variable} font-body antialiased bg-white text-foreground`}
      >
        <AdminShortcut />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
