import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";


import dns from "dns";

// MongoDB Atlas uses mongodb+srv:// which requires SRV/TXT DNS lookups.
// Some local/ISP resolvers fail these, causing ECONNREFUSED — force public DNS.
dns.setServers(["1.1.1.1", "8.8.8.8"]);
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


export default function Ffyebuyfbveuvbsufevu({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Navigation />
                {children}
                {/*<div className="flex justify-center">Copyright John Doe 2026</div>*/}
            </body>
        </html>
    );
}
