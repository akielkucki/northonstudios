'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {useEffect, useMemo, useState} from "react";

export const services = [
    {
        icon: "/icons/web-dev.png",
        title: "Web Development",
        description:
            "Building and maintaining the core structure of websites, ensuring functionality and performance with cutting-edge technologies and frameworks.",
        features: [
            "Responsive Design Implementation",
            "API Integration & Backend Development",
            "Performance Optimization",
            "Cross-Browser Compatibility"
        ]
    },
    {
        icon: "/icons/web-design.png",
        title: "Web Design",
        description:
            "Crafting visually appealing and user-friendly website layouts, focusing on aesthetics and user experience to make your brand stand out.",
        features: [
            "UI/UX Design",
            "Brand Identity Development",
            "Wireframing & Prototyping",
            "Interactive Animations"
        ]
    },
    {
        icon: "/icons/software.svg",
        title: "Software Development",
        description:
            "Creating custom software solutions tailored to your business needs, from enterprise applications to specialized tools and automation systems.",
        features: [
            "Custom Application Development",
            "System Integration",
            "Cloud Solutions",
            "Automation & Workflow Tools"
        ]
    },
    {
        icon: "/icons/seo.svg",
        title: "SEO Optimization",
        description:
            "Enhancing your website's visibility on search engines through strategic optimization, content refinement, and technical improvements to drive organic traffic.",
        features: [
            "Keyword Research & Strategy",
            "On-Page Optimization",
            "Technical SEO Audits",
            "Performance Tracking & Analytics"
        ]
    },
    {
        icon: "/icons/branding.svg",
        title: "Brand Strategy",
        description:
            "Developing comprehensive brand identities that resonate with your target audience, from logo design to complete visual identity systems.",
        features: [
            "Logo & Visual Identity",
            "Brand Guidelines",
            "Marketing Collateral",
            "Social Media Assets"
        ]
    },
    {
        icon: "/icons/consulting.svg",
        title: "Tech Consulting",
        description:
            "Providing expert guidance on technology decisions, architecture planning, and digital transformation strategies to accelerate your business growth.",
        features: [
            "Technology Stack Selection",
            "Architecture Planning",
            "Digital Strategy",
            "Project Management"
        ]
    }
];


export default function ServicesPage() {
    const [orbs, setOrbs] = useState(() => []);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        function onMouseMove(event) {
            setMousePos({ x: event.clientX, y: event.clientY });
        }

        window.addEventListener('mouseover', onMouseMove);
        return () => window.removeEventListener('mouseover', onMouseMove);
    }, []);

    useEffect(() => {
        const generatedOrbs = [];
        const radius = 20; // Distance from mouse

        for (let i = 0; i < 100; i++) {
            // Convert index to angle (distribute evenly in circle)
            const angle = (i / 100) * Math.PI * 2;

            // Or for random angle: const angle = Math.random() * Math.PI * 2;

            // Random distance within radius
            const distance = Math.random() * radius;

            generatedOrbs.push({
                x: mousePos.x + Math.cos(angle) * distance,
                y: mousePos.y + Math.sin(angle) * distance,
                scale: Math.random() * 2 + 1,
                opacity: Math.random(),
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
            });
        }

        setOrbs(generatedOrbs);
    }, [mousePos]);
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Purple glowing orbs */}
                <motion.div
                    className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
                    style={{ top: '10%', left: '10%' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"
                    style={{ bottom: '10%', right: '10%' }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating particles */}
                {orbs.map((orb, idx) => (
                    <motion.div
                        key={idx}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
                        style={{
                            left: orb.x,
                            top: orb.y,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, orb.opacity, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block px-6 py-2 mb-6 rounded-full border border-purple-500/30 bg-purple-500/10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">
                            Our Services
                        </span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        What We
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Offer
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Comprehensive digital solutions designed to elevate your brand and
                        drive measurable results in the digital landscape.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="group relative"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1
                            }}
                        >
                            {/* Card */}
                            <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10">
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all duration-500" />

                                {/* Animated border glow on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)',
                                    }}
                                    animate={{
                                        x: ['-100%', '200%'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                    }}
                                />

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div
                                        className="w-16 h-16 mb-6 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-500"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <Image
                                            src={service.icon}
                                            alt={service.title}
                                            width={32}
                                            height={32}
                                            className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-500">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <div className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="flex items-start gap-3"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 + idx * 0.05 }}
                                            >
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                                <span className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-500">
                                                    {feature}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Learn More Link */}
                                    <motion.button
                                        className="mt-8 text-purple-400 font-medium flex items-center gap-2 group/btn"
                                        whileHover={{ x: 5 }}
                                    >
                                        <span>Learn More</span>
                                        <motion.svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </motion.svg>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-500/20 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            Let&#39;s discuss how our services can help bring your vision to life.
                        </p>
                        <motion.button
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get In Touch →
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}