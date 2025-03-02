"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useInView,
} from "framer-motion";
import Image from "next/image";


// Futuristic service card component
const ServiceCard = ({ service, isActive, index, onClick }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 }); // Lower threshold for earlier animation trigger

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: isActive ? 1 : 0.98,
                x: isActive ? 0 : index % 2 === 0 ? -15 : 15,
            } : {
                opacity: 0,
                y: 50,
                scale: 0.9
            }}
            whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)"
            }}
            transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15,
                layout: { duration: 0.6, type: "spring" },
            }}
            onClick={onClick}
            className={`relative w-full max-w-md p-6 rounded-lg backdrop-blur-sm border 
                 transition-all duration-300 cursor-pointer z-10
                 ${
                isActive
                    ? "bg-black/70 border-purple-500 shadow-lg shadow-purple-500/30"
                    : "bg-black/40 border-purple-500/30"
            }`}
        >
            {/* Tech corner */}
            <div className="absolute top-0 right-0 w-12 h-12">
                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                    <path
                        d="M100 0V30H70"
                        stroke={isActive ? "#a855f7" : "#a855f7"}
                        strokeWidth="1.5"
                    />
                </svg>
            </div>

            {/* Service Content */}
            <div className="flex flex-col items-center text-center">
                <div
                    className={`relative w-16 h-16 mb-4 rounded-lg flex items-center justify-center
                       ${
                        isActive
                            ? "bg-purple-900/40 border border-purple-400"
                            : "bg-purple-900/20 border border-purple-500/30"
                    }`}
                >
                    <Image
                        src={service.icon}
                        alt={service.title.toLowerCase()}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                    />

                    {/* Pulsing effect when active */}
                    {isActive && (
                        <motion.div
                            className="absolute inset-0 rounded-lg border border-purple-400"
                            animate={{
                                opacity: [0.2, 0.5, 0.2],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                </div>

                <h3
                    className={`text-xl mb-3 font-medium ${
                        isActive ? "text-purple-300" : "text-white"
                    }`}
                >
                    {service.title}
                </h3>

                <p className="text-gray-300 font-light leading-relaxed">
                    {service.description}
                </p>

                {/* View Details button - only shows when active */}
                {isActive && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 px-5 py-2 bg-purple-800/60 border border-purple-500/50 rounded-full
                     text-white text-sm font-medium flex items-center space-x-1 group hover:bg-purple-700/70"
                    >
                        <span>View Details</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

// Dot component
const Dot = ({ isActive, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });

    return (
        <motion.div
            ref={ref}
            className="relative z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? {
                scale: 1,
                opacity: 1,
                transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 10,
                    delay: index * 0.1
                }
            } : {
                scale: 0,
                opacity: 0
            }}
        >
            {/* Outer ring */}
            <motion.div
                className={`absolute inset-0 rounded-full ${
                    isActive ? "bg-purple-500/30" : "bg-purple-500/10"
                }`}
                animate={{
                    scale: isActive ? [1, 1.8, 1] : [1, 1.2, 1],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: isActive ? 0 : 0.5
                }}
            />

            {/* Inner dot */}
            <motion.div
                className={`relative w-4 h-4 rounded-full ${
                    isActive
                        ? "bg-purple-500"
                        : "bg-purple-700 border border-purple-500/50"
                }`}
                animate={{
                    boxShadow: isActive
                        ? [
                            "0 0 0px rgba(168, 85, 247, 0.3)",
                            "0 0 12px rgba(168, 85, 247, 0.8)",
                            "0 0 0px rgba(168, 85, 247, 0.3)",
                        ]
                        : [
                            "0 0 0px rgba(168, 85, 247, 0)",
                            "0 0 5px rgba(168, 85, 247, 0.4)",
                            "0 0 0px rgba(168, 85, 247, 0)",
                        ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>
    );
};

// Main component
const FuturisticServices = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef(null);
    const servicesRef = useRef([]);

    // Services data
    const services = [
        {
            icon: "/icons/web-dev.png",
            title: "Web Development",
            description:
                "Building and maintaining the core structure of websites, ensuring functionality and performance with cutting-edge technologies and frameworks.",
        },
        {
            icon: "/icons/web-design.png",
            title: "Web Design",
            description:
                "Crafting visually appealing and user-friendly website layouts, focusing on aesthetics and user experience to make your brand stand out.",
        },
        {
            icon: "/icons/3d-modeling.png",
            title: "3D Modeling",
            description:
                "Designing and rendering three-dimensional objects and environments for various purposes like gaming, film, architecture and virtual/augmented reality.",
        },
        {
            icon: "/icons/graphic-design.png",
            title: "Graphic Designing",
            description:
                "Producing visual content to communicate messages effectively, utilizing typography, imagery, and color theory to strengthen your brand identity.",
        },
    ];

    // Handle scrolling to a specific service
    const scrollToService = (index) => {
        if (isScrolling) return;

        setIsScrolling(true);
        setActiveIndex(index);

        const targetElement = servicesRef.current[index];
        if (targetElement) {
            window.scrollTo({
                top:
                    targetElement.offsetTop -
                    window.innerHeight / 2 +
                    targetElement.offsetHeight / 2,
                behavior: "smooth",
            });

            // Reset scrolling state after animation
            setTimeout(() => {
                setIsScrolling(false);
            }, 1000);
        }
    };

    // Handle scroll events to update active index
    useEffect(() => {
        const handleScroll = () => {
            if (isScrolling) return;

            const scrollY = window.scrollY + window.innerHeight / 2;

            let newActiveIndex = 0;
            servicesRef.current.forEach((section, index) => {
                if (!section) return;

                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    newActiveIndex = index;
                }
            });

            if (newActiveIndex !== activeIndex) {
                setActiveIndex(newActiveIndex);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeIndex, isScrolling]);

    // Hook into container scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Create a smoother progress for use in animations
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen bg-black py-20 overflow-hidden"
        >
            {/* Background elements */}
            <div className="absolute inset-0">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#a855f720_1px,transparent_1px)] [background-size:32px_32px] opacity-30"></div>

                {/* Purple gradient blob */}
                <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] rounded-full bg-purple-800/20 blur-[100px]"></div>
                <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] rounded-full bg-purple-800/10 blur-[100px]"></div>
            </div>

            {/* Header Section */}
            <div className="relative z-10 text-center mb-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-1 mb-4"
                >
          <span className="text-purple-300 text-sm font-medium tracking-wider">
            SERVICES
          </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-5xl text-white font-light max-w-2xl mx-auto"
                >
                    Explore Our{" "}
                    <motion.span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 font-normal relative inline-block"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                duration: 0.6,
                                delay: 0.4
                            }
                        }}
                    >
                        Services
                        <motion.span
                            className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent"
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.8 }}
                        />
                    </motion.span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-4 text-gray-300 max-w-2xl mx-auto font-light"
                >
                    Discover our range of specialized services designed to elevate your
                    digital presence and bring your ideas to life.
                </motion.p>
            </div>

            {/* Services content with integrated dots */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {services.map((service, index) => (
                    <div
                        key={index}
                        ref={(el) => (servicesRef.current[index] = el)}
                        className={`py-32 flex flex-col items-center justify-center p-6 relative ${
                            index > 0 ? 'mt-16' : ''
                        }`}
                    >
                        {/* Connection line to next service */}
                        {index < services.length - 1 && (
                            <motion.div
                                className={`absolute bottom-0 ${index % 2 === 0 ? 'left-28 md:left-1/3' : 'right-28 md:right-1/3'} w-px h-32 bg-gradient-to-b from-purple-500 to-transparent`}
                                initial={{ scaleY: 0, opacity: 0 }}
                                whileInView={{ scaleY: 1, opacity: 1 }}
                                viewport={{ threshold: 0.3 }}
                                transition={{
                                    duration: 1,
                                    delay: 0.3,
                                    ease: "easeOut"
                                }}
                            />
                        )}

                        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full">
                            {/* Left side: Dot with service number */}
                            <div className={`relative flex items-center justify-center ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                                <div className="relative">
                                    {/* Service number */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            rotateY: 0,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 10,
                                                duration: 0.7
                                            }
                                        }}
                                        viewport={{ threshold: 0.3 }}
                                        className="relative w-16 h-16 flex items-center justify-center"
                                    >
                                        <div className="absolute inset-0 bg-purple-800/40 rounded-lg backdrop-blur-sm border border-purple-500/30"></div>
                                        <span className="relative z-10 text-4xl font-light text-white">
                      0{index + 1}
                    </span>

                                        {activeIndex === index && (
                                            <motion.div
                                                className="absolute inset-0 rounded-lg"
                                                animate={{
                                                    boxShadow: [
                                                        "0 0 0px rgba(168, 85, 247, 0.3)",
                                                        "0 0 15px rgba(168, 85, 247, 0.7)",
                                                        "0 0 0px rgba(168, 85, 247, 0.3)",
                                                    ],
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}
                                    </motion.div>

                                    {/* Dot positioned below number */}
                                    <div className={`absolute -bottom-10 ${index % 2 === 1 ? 'md:left-12' : 'md:right-12'} transform ${index % 2 === 1 ? 'md:translate-x-full' : 'md:-translate-x-full'}`}>
                                        <Dot isActive={activeIndex === index} index={index} />
                                    </div>
                                </div>
                            </div>

                            {/* Right side: Service card */}
                            <div className={`w-full md:w-2/3 ${index % 2 === 1 ? 'md:pr-16' : 'md:pl-16'}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: "spring",
                                            stiffness: 50,
                                            damping: 15,
                                            delay: 0.2
                                        }
                                    }}
                                    viewport={{ threshold: 0.3 }}
                                >
                                    <ServiceCard
                                        service={service}
                                        isActive={activeIndex === index}
                                        index={index}
                                        onClick={() => scrollToService(index)}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FuturisticServices;