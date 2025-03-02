"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import AnimatedText from "@/components/ui/animatedtext";


// Animated hexagonal icon component
const HexIcon = ({ children, delay = 0 }) => {
    const [ref, isInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, rotate: -30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -30 }}
            transition={{ duration: 0.7, delay }}
            className="relative h-16 w-16 flex items-center justify-center"
        >
            {/* Outer hexagon */}
            <div className="absolute inset-0 bg-purple-900/20 backdrop-blur-sm"></div>

            {/* Inner hexagon with glow */}
            <div className="absolute inset-1.5 bg-black border border-purple-500/50 flex items-center justify-center">
                <div className="text-purple-400 text-xl z-10">{children}</div>
            </div>

            {/* Edge highlights */}
            <motion.div
                className="absolute top-0 left-1/2 w-1/2 h-0.5 bg-purple-500/50"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
    );
};

const ClientsBanner = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageTranslateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Feature item animation
    const featureVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3 + (i * 0.2),
                duration: 0.6
            }
        })
    };

    // Image container animation
    const imageContainerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section ref={containerRef} className="relative w-full py-24 overflow-hidden bg-gradient-to-b from-black via-black to-black/95">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Diagonal lines */}
                <div className="absolute inset-0 opacity-10">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                            style={{
                                top: `${15 * i}%`,
                                right: '0',
                                left: '0',
                                transform: `skewY(${-8 + (i * 2)}deg)`
                            }}
                        />
                    ))}
                </div>

                {/* Background blur circle */}
                <motion.div
                    className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-purple-800/5 blur-3xl"
                    style={{ y: useTransform(scrollYProgress, [0, 1], [100, -50]) }}
                />
            </div>

            {/* Content container */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="flex flex-col-reverse md:flex-row md:items-center gap-16 lg:gap-24">
                    {/* Left Side: Text & Features */}
                    <div className="w-full md:w-3/5">
                        {/* Section Header */}
                        <div className="mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center mb-4"
                            >
                                {/* Modern badge design */}
                                <div className="h-px w-8 bg-purple-600 mr-4"></div>
                                <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-1">
                                    <span className="text-purple-300 text-sm font-medium tracking-wider">WHY US?</span>
                                </div>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-tight"
                            >
                                Why Our Clients <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 font-normal">
                  Choose JR Studios
                </span>
                            </motion.h2>
                        </div>

                        {/* Features */}
                        <div className="space-y-10">
                            {/* Fast Response */}
                            <motion.div
                                custom={0}
                                variants={featureVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex gap-6"
                            >
                                <HexIcon delay={0.3}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </HexIcon>
                                <div>
                                    <h3 className="text-xl text-white font-medium mb-2">
                                        Fast Response
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.5 }}
                                            className="h-px bg-gradient-to-r from-purple-600 to-transparent mt-1 w-12"
                                        />
                                    </h3>
                                    <p className="text-gray-300 font-light leading-relaxed">
                                        We prioritize quick and efficient communication to ensure your projects
                                        stay on track and your concerns are addressed <AnimatedText text="promptly" highlight={true} className="font-medium" />.
                                    </p>
                                </div>
                            </motion.div>

                            {/* World Class Freelancers */}
                            <motion.div
                                custom={1}
                                variants={featureVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex gap-6"
                            >
                                <HexIcon delay={0.5}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M2 12h20" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                </HexIcon>
                                <div>
                                    <h3 className="text-xl text-white font-medium mb-2">
                                        World Class Freelancers
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.7 }}
                                            className="h-px bg-gradient-to-r from-purple-600 to-transparent mt-1 w-12"
                                        />
                                    </h3>
                                    <p className="text-gray-300 font-light leading-relaxed">
                                        Our team comprises highly skilled freelancers from around the globe, each
                                        bringing <AnimatedText text="unique expertise" highlight={true} className="font-medium" /> to deliver exceptional results.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Best Quality */}
                            <motion.div
                                custom={2}
                                variants={featureVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="flex gap-6"
                            >
                                <HexIcon delay={0.7}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                </HexIcon>
                                <div>
                                    <h3 className="text-xl text-white font-medium mb-2">
                                        Best Quality
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: 0.9 }}
                                            className="h-px bg-gradient-to-r from-purple-600 to-transparent mt-1 w-12"
                                        />
                                    </h3>
                                    <p className="text-gray-300 font-light leading-relaxed">
                                        We are committed to delivering the highest quality in every project, ensuring that
                                        our work consistently <AnimatedText text="meets and exceeds" highlight={true} className="font-medium" /> expectations.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-12 overflow-hidden rounded-md px-8 py-3 relative group"
                        >
                            {/* Button Background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-800 to-purple-600 opacity-90"></span>

                            {/* Button Shine Effect */}
                            <span className="absolute h-full w-20 bg-white/20 -skew-x-30 -translate-x-32 group-hover:translate-x-64 transition-transform duration-1000"></span>

                            {/* Button Content */}
                            <span className="relative z-10 flex items-center justify-center text-white font-medium">
                Explore Our Services
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
                        </motion.button>
                    </div>

                    {/* Right Side: Animated Image */}
                    <motion.div
                        className="w-full md:w-2/5"
                        variants={imageContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="relative group">
                            {/* Main image container with futuristic frame */}
                            <div className="relative overflow-hidden rounded-lg backdrop-blur-sm border border-purple-500/30 p-2">
                                {/* Inner border */}
                                <div className="absolute inset-0 border-2 border-dashed border-purple-500/20 rounded-lg opacity-80"></div>

                                {/* Pulsing corners */}
                                <div className="absolute top-0 left-0 w-5 h-5">
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                                        <path d="M0 0V50H50" stroke="#9333ea" strokeWidth="6" />
                                    </svg>
                                    <motion.div
                                        className="absolute top-0 left-0 w-3 h-3 bg-purple-500 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-5 h-5">
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                                        <path d="M100 100V50H50" stroke="#9333ea" strokeWidth="6" />
                                    </svg>
                                    <motion.div
                                        className="absolute bottom-0 right-0 w-3 h-3 bg-purple-500 rounded-full"
                                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    />
                                </div>

                                {/* Image with parallax effect */}
                                <motion.div
                                    className="relative h-[60vh] md:h-[450px] overflow-hidden rounded"
                                    style={{ y: imageTranslateY }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-transparent mix-blend-overlay z-10"></div>
                                    <Image
                                        src="/imgs/thanks.png"
                                        alt="Client Appreciation"
                                        className="object-cover"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* Tech details overlay */}
                            <div className="absolute -right-4 -bottom-4 px-4 py-2 bg-black/80 backdrop-blur-md border border-purple-500/30 rounded">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 1 }}
                                    className="flex flex-col"
                                >
                                    <span className="text-xs text-purple-300 font-mono">client.satisfaction</span>
                                    <motion.span
                                        className="text-white text-lg font-medium"
                                        animate={{ opacity: [0.7, 1, 0.7] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    >
                                        99.8%
                                    </motion.span>
                                </motion.div>
                            </div>

                            {/* Tech line decorations */}
                            <motion.div
                                className="absolute -right-8 top-1/3 w-16 h-px bg-gradient-to-r from-purple-500 to-transparent"
                                animate={{ opacity: [0.3, 0.8, 0.3], width: ['30px', '60px', '30px'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute -left-8 bottom-1/3 w-16 h-px bg-gradient-to-l from-purple-500 to-transparent"
                                animate={{ opacity: [0.3, 0.8, 0.3], width: ['30px', '60px', '30px'] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ClientsBanner;