import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Header from "@/components/partials/Header";
import FuturisticNavbar from "@/components/NavBar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "JR Studios",
    description: "JR Studios - Empowering Brands In The Tech Age. We turn your ideas into code, creating innovative solutions for the digital world.",
    keywords: "JR Studios, software development, tech solutions, digital innovation, brand empowerment, website development, website design, digital marketing, SEO, web development, UI/UX, conversion optimization, responsive design, 3d, 3d modeling, graphic, graphic designing",
    openGraph: {
        title: "JR Studios",
        description: "JR Studios - Empowering Brands In The Tech Age. We turn your ideas into code, creating innovative solutions for the digital world.",
        url: "https://jrstudios.co",
        siteName: "JR Studios",
        images: [
            {
                url: "/imgs/logo.png",
                width: 1200,
                height: 630,
                alt: "JR Studios Logo",
            }
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "JR Studios - Empowering Brands In The Tech Age",
        description: "JR Studios - Empowering Brands In The Tech Age. We turn your ideas into code, creating innovative solutions for the digital world.",
        images: ["https://www.jrstudios.co/imgs/logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    canonical: "https://jrstudios.co",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
            <link rel="icon" type="image/svg+xml" href="/imgs/web-logo.png" />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black selection:bg-purple-500 selection:text-white font-thin`}
            >
                <div className="flex flex-col min-h-screen">
                    <FuturisticNavbar />
                    <main className="flex-grow">{children}</main>
                </div>
            </body>
        </html>
    );
}