"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Particles } from "@/components/magicui/particles";

const FuturisticNavbar = () => {
    const [activeNav, setActiveNav] = useState('HOME');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { id: 'HOME', label: 'HOME' },
        { id: 'ABOUT', label: 'ABOUT US' },
        { id: 'SERVICES', label: 'SERVICES' },
        { id: 'PROJECTS', label: 'PROJECTS' },
        { id: 'TESTIMONIALS', label: 'TESTIMONIALS' }
    ];

    const glowVariants = {
        initial: { opacity: 0.9, scale: 0.98 },
        hover: {
            opacity: 1,
            scale: 1.05,
            textShadow: "0 0 12px rgba(233, 213, 255, 0.9)",
            transition: { duration: 0.3 }
        }
    };

    return (
        <header className="fixed w-full top-0 z-50">
            {/* Backdrop Layer */}
            <div className="absolute inset-0 backdrop-blur-md bg-black/70 border-b border-purple-600/50 z-0"></div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 to-transparent z-0"></div>

            {/* Particle Effects */}
            <Particles
                className="absolute inset-0 z-0"
                quantity={5}
                ease={10}
                size={4}
                color={'#d8b4fe'}
                refresh={false}
            />

            {/* Main Navbar Content */}
            <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-3 z-10">
                {/* Logo Area */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center"
                    >
                        {/* Futuristic Logo */}
                        <div className="relative h-10 w-10 mr-2">
                            <div className="absolute inset-0 bg-purple-500 rounded-full opacity-90"></div>
                            <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-medium">JR</span>
                            </div>
                            <div className="absolute -inset-1 bg-transparent border border-purple-300 rounded-full opacity-60 animate-pulse"></div>
                        </div>

                        <h2 className="text-xl text-white font-normal tracking-widest">
                            <span className="text-purple-400 font-semibold">JR</span>
                            <span className="text-xs ml-1 font-medium">STUDIOS</span>
                        </h2>
                    </motion.div>

                    {/* Mobile Hamburger */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="md:hidden text-white relative"
                    >
                        <div className={`w-6 h-0.5 bg-purple-300 mb-1 transition-all ${isExpanded ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-purple-300 mb-1 transition-all ${isExpanded ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-purple-300 transition-all ${isExpanded ? '-rotate-45 -translate-y-1' : ''}`}></div>
                    </motion.button>
                </div>

                {/* Nav Links - Futuristic Horizontal Navigation for Desktop */}
                <div className={`md:flex ${isExpanded ? 'flex' : 'hidden'} flex-col md:flex-row items-center w-full md:w-auto mt-4 md:mt-0 transition-all duration-300`}>
                    <nav className="relative flex flex-col md:flex-row md:items-center md:bg-black/70 md:backdrop-blur-sm md:rounded-full md:border md:border-purple-500/50 md:px-3 md:py-1 w-full md:w-auto">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.id}
                                variants={glowVariants}
                                initial="initial"
                                whileHover="hover"
                                className={`relative cursor-pointer text-white font-normal text-sm py-3 md:py-2 px-6 md:px-4 transition-all duration-300 ease-in ${
                                    activeNav === item.id
                                        ? 'text-purple-300 font-medium'
                                        : 'text-white hover:text-white'
                                } ${index !== navItems.length - 1 ? 'border-b md:border-b-0 border-purple-600/30' : ''}`}
                                onMouseOver={() => setActiveNav(item.id)}
                            >
                                {item.label}
                                {activeNav === item.id && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute bottom-0 left-0 h-0.5 bg-purple-400 w-full md:hidden"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                {activeNav === item.id && (
                                    <motion.div
                                        layoutId="activeDot"
                                        className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-1.5 w-1.5 bg-purple-300 rounded-full hidden md:block"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                            </motion.a>
                        ))}

                        {/* Animated Selection Indicator (Only visible on desktop) */}

                    </nav>

                    {/* Contact Button */}
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)" }}
                        className="mt-4 md:mt-0 md:ml-4 bg-purple-600 border border-purple-400 text-white font-medium rounded-full py-2 px-6 text-sm flex items-center justify-center relative group w-full md:w-auto"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                        <span className="relative z-10">CONTACT US</span>
                    </motion.button>
                </div>
            </div>
        </header>
    );
};

export default FuturisticNavbar;