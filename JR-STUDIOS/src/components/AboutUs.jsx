"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import AnimatedText from "@/components/ui/animatedtext";


// Animated number counter component
const CounterAnimation = ({ target, duration = 2, className = "" }) => {
    const [ref, isInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let start = 0;
        if (isInView) {
            const end = parseInt(target);
            if (start === end) return;

            const increment = end / (duration * 60);
            const timer = setInterval(() => {
                start += increment;
                setCount(Math.floor(start));
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                }
            }, 16.7); // ~60fps

            return () => clearInterval(timer);
        }
    }, [isInView, target, duration]);

    return <span ref={ref} className={className}>{count}+</span>;
};

const AboutUs = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const translateY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const [statsRef, statsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const scaleVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const contentAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    return (
        <section ref={containerRef} className="w-full bg-black relative overflow-hidden py-24">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-12 h-full w-full">
                        {Array(12).fill(0).map((_, i) => (
                            <div key={i} className="border-r border-purple-500/20"></div>
                        ))}
                    </div>
                    <div className="grid grid-rows-12 h-full w-full">
                        {Array(12).fill(0).map((_, i) => (
                            <div key={i} className="border-b border-purple-500/20"></div>
                        ))}
                    </div>
                </div>

                {/* Floating circles */}
                <motion.div
                    className="absolute -right-20 top-1/4 w-80 h-80 rounded-full border border-purple-600/20 opacity-30"
                    style={{ y: translateY }}
                />
                <motion.div
                    className="absolute -left-40 top-1/2 w-96 h-96 rounded-full border border-purple-600/20 opacity-20"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 100]) }}
                />

                {/* Purple accent line */}
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-600 to-transparent opacity-70"></div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Header Section */}
                <div ref={headerRef} className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center mb-4"
                    >
                        <div className="h-px w-12 bg-purple-600 mr-4"></div>
                        <h4 className="text-purple-400 text-lg font-medium tracking-wider">ABOUT US</h4>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight"
                    >
            <span className="relative inline-block">
              We Are
              <span className="relative ml-2">
                <span className="relative z-10">More</span>
                <motion.span
                    className="absolute bottom-0 left-0 right-0 h-3 bg-purple-600/20 rounded-sm -z-0"
                    initial={{ width: 0 }}
                    animate={headerInView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                />
              </span>
            </span> <br />
                        <span className="text-purple-300">Than an Agency</span>
                    </motion.h2>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Left Column - Image and Stats */}
                    <div className="relative">
                        <motion.div
                            className="relative aspect-square w-full bg-black/50 rounded-md backdrop-blur-sm border border-purple-500/30 overflow-hidden"
                            variants={scaleVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {/* Enhanced Image Container */}
                            <div className="absolute inset-5 overflow-hidden rounded">
                                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent mix-blend-overlay z-10"></div>
                                <Image
                                    src="/imgs/logo.png"
                                    alt="JR-Studios-Logo"
                                    className="object-contain"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-20 h-20">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                                    <path d="M100 0V30H70" stroke="#9333ea" strokeWidth="1" />
                                </svg>
                            </div>
                            <div className="absolute bottom-0 left-0 w-20 h-20">
                                <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                                    <path d="M0 100V70H30" stroke="#9333ea" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* Glowing Dot */}
                            <motion.div
                                className="absolute top-6 right-6 w-2 h-2 rounded-full bg-purple-500"
                                animate={{ boxShadow: ['0 0 0px rgba(147, 51, 234, 0.7)', '0 0 10px rgba(147, 51, 234, 0.7)', '0 0 0px rgba(147, 51, 234, 0.7)'] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* Stats Section */}
                        <motion.div
                            ref={statsRef}
                            className="grid grid-cols-2 gap-8 mt-10"
                            variants={contentAnimation}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <motion.div variants={contentAnimation} className="bg-black/30 backdrop-blur-sm border border-purple-500/20 p-6 rounded-md">
                                <h3 className="text-4xl font-light text-white mb-2">
                                    <CounterAnimation target="120" className="text-purple-300 font-medium" />
                                </h3>
                                <p className="text-gray-400 text-sm">Successful Projects</p>
                            </motion.div>

                            <motion.div variants={contentAnimation} className="bg-black/30 backdrop-blur-sm border border-purple-500/20 p-6 rounded-md">
                                <h3 className="text-4xl font-light text-white mb-2">
                                    <CounterAnimation target="95" className="text-purple-300 font-medium" />
                                </h3>
                                <p className="text-gray-400 text-sm">Happy Clients</p>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Column - Text Content */}
                    <motion.div
                        variants={contentAnimation}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col justify-center"
                    >
                        <motion.p
                            variants={contentAnimation}
                            className="text-gray-300 leading-relaxed mb-8 text-lg"
                        >
                            <AnimatedText
                                text="JR Studios is your gateway to innovation in the digital realm. We're not just a tech agency – we're a creative force that blends cutting-edge development with visionary design."
                                direction="up"
                                delay={0.2}
                                stagger={0.03}
                                className="font-light"
                            />
                        </motion.p>

                        <motion.div
                            variants={contentAnimation}
                            className="space-y-6"
                        >
                            {/* Service Highlights */}
                            <motion.div variants={contentAnimation} className="flex">
                                <div className="w-12 h-12 rounded-md bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">Web Development</h3>
                                    <p className="text-gray-400 text-sm">Crafting responsive, high-performance web applications using cutting-edge technologies.</p>
                                </div>
                            </motion.div>

                            <motion.div variants={contentAnimation} className="flex">
                                <div className="w-12 h-12 rounded-md bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">Graphic Design</h3>
                                    <p className="text-gray-400 text-sm">Creating stunning visuals that capture your brand's essence and captivate your audience.</p>
                                </div>
                            </motion.div>

                            <motion.div variants={contentAnimation} className="flex">
                                <div className="w-12 h-12 rounded-md bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">3D Modeling</h3>
                                    <p className="text-gray-400 text-sm">Bringing ideas to life with intricate 3D models for diverse applications and industries.</p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.button
                            variants={contentAnimation}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-10 self-start group relative overflow-hidden rounded-md px-8 py-3"
                        >
                            {/* Button Background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-500"></span>

                            {/* Button Background Animation */}
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                            {/* Shinning Effect */}
                            <span className="absolute h-full w-1/3 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000"></span>

                            {/* Button Content */}
                            <span className="relative z-10 flex items-center justify-center text-white font-medium">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;