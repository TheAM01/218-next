import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"]
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "218Next",
        template: "%s - 218Next - E-Commerce Store"
    }
}


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Navigation />
                {children}
                {/*<div className="flex justify-center">Copyright John Doe 2026</div>*/}
            </body>
        </html>
    );
}
