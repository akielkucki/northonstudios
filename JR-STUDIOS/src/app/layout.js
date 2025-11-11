import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import NavBar from "@/components/NavBar";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Northon Studios — Web Design & Automation Agency",
    description:
        "Northon Studios builds high-performing websites, automations, and digital systems that help real businesses grow. We turn complex ideas into clean, fast, and conversion-focused web experiences.",
    keywords:
        "Northon Studios, web design, Next.js development, automation agency, SaaS development, software development, digital marketing, SEO, UI/UX, web automation, lead generation, responsive websites, brand strategy, JR Studios partner",
    openGraph: {
        title: "Northon Studios — Web Design & Automation Agency",
        description:
            "We craft digital systems that convert. Northon Studios builds high-performing websites and automations for serious business owners focused on real growth.",
        url: "https://northonstudios.com",
        siteName: "Northon Studios",
        images: [
            {
                url: "/imgs/northon-logo.png",
                width: 1200,
                height: 630,
                alt: "Northon Studios Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Northon Studios — Web Design & Automation Agency",
        description:
            "Building websites and automations that help real businesses grow. Clean code, high conversion, real results.",
        images: ["https://www.northonstudios.com/imgs/northon-logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    canonical: "https://northonstudios.com",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="h-full">
        <link rel="icon" type="image/png" href="/imgs/northon-logo.png" />
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black selection:bg-blue-500 selection:text-white font-light`}
        >
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
        </div>
        </body>
        </html>
    );
}
