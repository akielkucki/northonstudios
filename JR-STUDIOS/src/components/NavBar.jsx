"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from "@/components/magicui/particles";
import Image from "next/image";
import {brand} from "@/lib/vars";
import Link from "next/link";
import {usePathname} from "next/navigation";

const FuturisticNavbar = () => {
    const [activeNav, setActiveNav] = useState('HOME');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const route = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isExpanded]);

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
            transition: { duration: 0.1 }
        }
    };

    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                when: "afterChildren"
            }
        },
        open: {
            opacity: 1,
            height: "calc(100vh - 60px)",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        closed: {
            opacity: 0,
            x: -20,
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    const handleNavClick = (item) => {
        setActiveNav(item.id);
        setIsExpanded(false);

        if (route !== "/") {
            // Navigate to home with hash
            window.location.href = `/#${String(item.id).toLowerCase()}`;
        } else {
            // On home page, scroll smoothly
            const el = document.getElementById(String(item.id).toLowerCase());
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };


    return (
        <header className="fixed w-full top-0 z-50">
            {/* Backdrop Layer - Animated for mobile */}
            <motion.div
                className="absolute inset-0 backdrop-blur-md bg-black/70 border-b border-purple-600/50 z-0"
                initial={false}
                animate={{
                    height: isExpanded ? '100vh' : 'auto',
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Glow Effect */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-900/40 to-transparent z-0"
                initial={false}
                animate={{
                    opacity: isExpanded ? 0.8 : 0.4,
                    height: isExpanded ? '100vh' : '8rem',
                }}
                transition={{ duration: 0.3 }}
            />

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
            <div className="relative z-10">
                {/* Top Bar - Always visible */}
                <div className="flex items-center justify-between px-6 py-3">
                    {/* Logo Area */}
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
                                <span className="text-white text-xs font-medium"><Image src={"/brand/logo.png"} alt={`${brand.name} logo`} fill className={"rounded-full"}/></span>
                            </div>
                            <div className="absolute -inset-1 bg-transparent border border-purple-300 rounded-full opacity-60 animate-pulse"></div>
                        </div>

                        <h2 className="text-xl text-white font-normal tracking-widest">
                            <span className="text-purple-400 font-semibold">{brand.name.split(" ")[0]}</span>
                            <span className="ml-0.5 font-medium">{brand.name.split(" ")[1]}</span>
                        </h2>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <nav className="relative flex items-center bg-black/70 backdrop-blur-sm rounded-full border border-purple-500/50 px-3 py-1">
                            {navItems.map((item, index) => {
                                if (route.length > 1) return <Link
                                    key={item.id}
                                    className={`relative cursor-pointer text-white font-normal text-sm py-2 px-4 transition-all duration-300 ease-in ${
                                        activeNav === item.id
                                            ? 'text-purple-300 font-medium'
                                            : 'text-white hover:text-white'
                                    }`}
                                    onMouseOver={() => setActiveNav(item.id)}
                                    href={`/#${item.id}`}
                                >
                                    {item.label}
                                    {activeNav === item.id && (
                                        <motion.div
                                            layoutId="activeDot"
                                            className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-1.5 w-1.5 bg-purple-300 rounded-full"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                </Link>
                                else return <motion.a
                                    key={item.id}
                                    variants={glowVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className={`relative cursor-pointer text-white font-normal text-sm py-2 px-4 transition-all duration-300 ease-in ${
                                        activeNav === item.id
                                            ? 'text-purple-300 font-medium'
                                            : 'text-white hover:text-white'
                                    }`}
                                    onMouseOver={() => setActiveNav(item.id)}
                                    onClick={() => {
                                        document.getElementById(item.id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    {item.label}
                                    {activeNav === item.id && (
                                        <motion.div
                                            layoutId="activeDot"
                                            className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 h-1.5 w-1.5 bg-purple-300 rounded-full"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                </motion.a>
                            })}
                        </nav>

                        {/* Contact Button - Desktop */}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(168, 85, 247, 0.7)" }}
                            className="ml-4 bg-purple-600 border border-purple-400 text-white font-medium rounded-full py-2 px-6 text-sm flex items-center justify-center relative group"
                            onClick={() => {
                                if (route.length > 1) {
                                    window.location.href = '/#contact';
                                } else {
                                    document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                            <span className="relative z-10">CONTACT US</span>
                        </motion.button>
                    </div>

                    {/* Mobile Hamburger */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="md:hidden text-white relative z-50"
                    >
                        <motion.div
                            className="w-6 h-0.5 bg-purple-300 mb-1.5"
                            animate={{
                                rotate: isExpanded ? 45 : 0,
                                y: isExpanded ? 8 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="w-6 h-0.5 bg-purple-300 mb-1.5"
                            animate={{
                                opacity: isExpanded ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.div
                            className="w-6 h-0.5 bg-purple-300"
                            animate={{
                                rotate: isExpanded ? -45 : 0,
                                y: isExpanded ? -8 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>
                </div>

                {/* Mobile Menu - Fullscreen */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            className="md:hidden overflow-hidden"
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="flex flex-col items-center justify-center h-full px-6 space-y-2">
                                {/* Mobile Nav Items */}
                                {navItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={mobileItemVariants}
                                        className="w-full"
                                    >
                                        {route.length > 1 ? (
                                            <Link
                                                href={`/#${item.id}`}
                                                className={`block text-center text-white font-normal text-2xl py-4 transition-all duration-300 ${
                                                    activeNav === item.id
                                                        ? 'text-purple-300 font-medium'
                                                        : 'text-white hover:text-purple-300'
                                                }`}
                                                onClick={() => {
                                                    setActiveNav(item.id);
                                                    setIsExpanded(false);
                                                }}
                                            >
                                                {item.label}
                                                {activeNav === item.id && (
                                                    <motion.div
                                                        layoutId="mobileActiveIndicator"
                                                        className="h-0.5 bg-purple-400 w-24 mx-auto mt-2"
                                                        transition={{ type: "spring", duration: 0.5 }}
                                                    />
                                                )}
                                            </Link>
                                        ) : (
                                            <motion.button
                                                className={`w-full text-center text-white font-normal text-2xl py-4 transition-all duration-300 ${
                                                    activeNav === item.id
                                                        ? 'text-purple-300 font-medium'
                                                        : 'text-white hover:text-purple-300'
                                                }`}
                                                onClick={() => handleNavClick(item)}
                                            >
                                                {item.label}
                                                {activeNav === item.id && (
                                                    <motion.div
                                                        layoutId="mobileActiveIndicator"
                                                        className="h-0.5 bg-purple-400 w-24 mx-auto mt-2"
                                                        transition={{ type: "spring", duration: 0.5 }}
                                                    />
                                                )}
                                            </motion.button>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Mobile Contact Button */}
                                <motion.button
                                    variants={mobileItemVariants}
                                    className="mt-8 bg-purple-600 border border-purple-400 text-white font-medium rounded-full py-3 px-8 text-lg flex items-center justify-center relative group w-full max-w-xs"
                                    onClick={() => {
                                        setIsExpanded(false);
                                        if (route.length > 1) {
                                            window.location.href = '/#contact';
                                        } else {
                                            setTimeout(() => {
                                                document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' });
                                            }, 300);
                                        }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                                    <span className="relative z-10">CONTACT US</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default FuturisticNavbar;