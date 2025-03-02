import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Header from "@/components/partials/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "JR Studios Website Design & Digital Marketing Agency",
    description: "Award-winning website design and digital marketing solutions that drive results. Our expert team creates stunning, conversion-focused websites with advanced SEO strategies.",
    keywords: "website design, digital marketing, SEO, web development, UI/UX, conversion optimization, responsive design",
    openGraph: {
        title: "JR Studios Website Design & Digital Marketing Agency",
        description: "Award-winning website design and digital marketing solutions that drive results. Our expert team creates stunning, conversion-focused websites with advanced SEO strategies.",
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
        title: "Premier Website Design & Digital Marketing Agency",
        description: "Award-winning website design and digital marketing solutions that drive results.",
        images: ["https://jrstudios.co/twitter-image.jpg"],
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
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black selection:bg-purple-500 selection:text-white font-thin`}
        >
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="bg-purple-900 text-white py-6">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm">{new Date().getFullYear()} JR Studios</p>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}