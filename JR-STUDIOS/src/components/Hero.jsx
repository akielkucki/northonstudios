"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom component for text animation
const AnimatedText = ({ text, direction = "up", delay = 0, className = "", type = "span" }) => {
    const [ref, isInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
        },
        show: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.7,
                delay,
            }
        }
    };

    const Component = motion[type];

    return (
        <Component
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
        >
            {text}
        </Component>
    );
};

const FuturisticHero = () => {
    const containerRef = React.useRef(null);

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                {/* Abstract Grid Lines */}
                <div className="absolute inset-0 opacity-30">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent absolute top-1/4"></div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-300 to-transparent absolute top-2/4"></div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent absolute top-3/4"></div>

                    <div className="w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent absolute left-1/4"></div>
                    <div className="w-px h-full bg-gradient-to-b from-transparent via-purple-300 to-transparent absolute left-2/4"></div>
                    <div className="w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent absolute left-3/4"></div>
                </div>

                {/* Futuristic Circle */}
                <div className="absolute -bottom-1/2 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-purple-500/20"></div>
                <div className="absolute -bottom-1/3 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-purple-400/30"></div>
                <div className="absolute -bottom-1/4 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] rounded-full border border-purple-300/40"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-6 text-center">
                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-6"
                >
                    <div className="bg-black/50 backdrop-blur-md border border-purple-500/50 rounded-full px-6 py-2 inline-block">
                        <AnimatedText
                            text="JR STUDIOS"
                            direction="up"
                            delay={0.1}
                            className="text-base md:text-lg font-medium text-white tracking-widest"
                        />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-px w-10 bg-gradient-to-r from-purple-600 to-transparent"></div>
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-px w-10 bg-gradient-to-l from-purple-600 to-transparent"></div>
                </motion.div>

                {/* Main Heading with Glitch Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="relative mb-6"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white">
            <span className="relative inline-block">
              <AnimatedText
                  text="Empowering"
                  direction="up"
                  delay={0.4}
                  className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-purple-300 to-white"
                  type="span"
              />
              <div className="absolute inset-0 bg-purple-500/10 blur-xl"></div>
            </span>{" "}
                        <span className="relative inline-block">
              <AnimatedText
                  text="Brands"
                  direction="up"
                  delay={0.5}
                  className="relative z-10 font-normal"
                  type="span"
              />
            </span>{" "}
                        <span className="relative inline-block">
              <AnimatedText
                  text="In The"
                  direction="up"
                  delay={0.6}
                  className="relative z-10"
                  type="span"
              />
            </span>{" "}
                        <span className="relative inline-block">
              <AnimatedText
                  text="Tech Age"
                  direction="up"
                  delay={0.7}
                  className="relative z-10 text-purple-300 font-semibold"
                  type="span"
              />
              <div className="absolute inset-0 bg-purple-500/10 blur-xl"></div>
            </span>
                    </h1>

                    {/* Animated Underline */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-4"
                    />
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="mb-10 relative"
                >
                    <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
                        <AnimatedText
                            text="JR Studios is a software company that turns your ideas into code —"
                            direction="up"
                            delay={0.9}
                            className="font-light"
                        />
                        <AnimatedText
                            text=" not even just code, it's our creation!"
                            direction="up"
                            delay={1}
                            className="text-purple-200 font-medium"
                        />
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                </motion.div>

                {/* CTA Button with Futuristic Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                    className="relative"
                >
                    <motion.a
                        href="mailto:jaundev768@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4"
                    >
                        {/* Button Background */}
                        <span className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800"></span>

                        {/* Button Glow Effect */}
                        <span className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                        {/* Button Border */}
                        <span className="absolute inset-px rounded-full bg-black"></span>

                        {/* Button Content */}
                        <span className="relative z-10 flex items-center justify-center space-x-2">
              <AnimatedText
                  text="INQUIRE"
                  direction="up"
                  delay={1.3}
                  className="text-white font-medium tracking-wider"
              />

                            {/* Arrow Animation */}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5 text-white"
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                            >
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </motion.svg>
            </span>
                    </motion.a>

                    {/* Button Reflection */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-3 bg-purple-600/20 blur-xl rounded-full"></div>
                </motion.div>
            </div>
        </div>
    );
};

export default FuturisticHero;