import { cn } from "@/lib/utils";
import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";

const companies = [
    { name: "Paved Payments", logo: "/logo-1.png" },
    { name: "Red Bridge", logo: "/redbridge-logo.png" },
    { name: "Monman11", logo: "/monman11.png" },
    { name: "Addison Wolfe Real Estate", logo: "/wolfe-logo.webp" },
];

const firstRow = companies.slice(0, Math.ceil(companies.length));

const CompanyLogo = ({ name, logo }) => (
    <div className="mx-8 flex items-center justify-center">
        <div className="w-32 h-16 sm:w-40 sm:h-20 relative flex items-center justify-center">
            <Image
                src={logo}
                alt={`${name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 8rem, 10rem"
            />
        </div>
    </div>
);

const Trusted = () => {
    return (
        <div className={cn("w-full overflow-hidden bg-black text-white py-12")}>
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                    Trusted by growing businesses across all industries
                </h2>
                <p className="text-gray-300">
                    Our platform empowers serious entrepreneur who are focused on achieving real, measurable growth.
                </p>
            </div>

            <div className="flex w-full flex-col items-center mt-10 md:mt-0">
                <Marquee
                    pauseOnHover
                    className="[--duration:60s] sm:[--duration:40s]"
                >
                    {firstRow.map((company, idx) => (
                        <CompanyLogo key={`${company.name}-${idx}`} {...company} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default Trusted;