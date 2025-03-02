"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";


// Futuristic Project Card Component
const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ref, isInView] = useInView({
        triggerOnce: false,
        threshold: 0.2
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    delay: index * 0.1
                }
            } : { opacity: 0, y: 50 }}
            whileHover={{ y: -10 }}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="group overflow-hidden rounded-lg">
                {/* Card Background with Tech Borders */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-lg border border-purple-600/50 z-0
                     transition-all duration-500 group-hover:border-purple-500 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"></div>

                {/* Tech Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 z-10 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                        <path d="M0 0V30H30" stroke="#a855f7" strokeWidth="1.5" />
                    </svg>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 z-10 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                        <path d="M100 100V70H70" stroke="#a855f7" strokeWidth="1.5" />
                    </svg>
                </div>

                {/* Project Number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-black/80 border border-purple-500/50 flex items-center justify-center z-20 pointer-events-none">
                    <span className="text-purple-300 text-sm font-medium">0{index + 1}</span>
                </div>

                {/* Project Content */}
                <div className="relative flex flex-col z-10 p-4 h-full">
                    {/* Image Container with Animated Overlay */}
                    <div className="relative w-full h-64 mb-4 overflow-hidden rounded">
                        <Image
                            src={project.image}
                            alt={project.title}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                        {/* Tech Pulse */}
                        <motion.div
                            className="absolute inset-0 border-2 border-purple-500/0 rounded pointer-events-none"
                            animate={isHovered ? {
                                borderColor: ["rgba(168,85,247,0)", "rgba(168,85,247,0.3)", "rgba(168,85,247,0)"],
                                boxShadow: [
                                    "0 0 0px rgba(168,85,247,0)",
                                    "0 0 10px rgba(168,85,247,0.3)",
                                    "0 0 0px rgba(168,85,247,0)"
                                ]
                            } : {}}
                            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                        />
                    </div>

                    {/* Project Info */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl text-white font-medium mb-3 relative">
                            {project.title}
                            <motion.div
                                className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent"
                                animate={isHovered ? { width: "100%" } : { width: "0%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </h3>

                        {/* Action buttons */}
                        <div className="mt-2 flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-4 py-2 bg-purple-600/30 border border-purple-500/50 rounded-full text-white text-sm flex items-center space-x-1 group hover:bg-purple-600/50 transition-all duration-300"
                            >
                                <span>Details</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.button>

                            {project.link && (
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-4 py-2 bg-transparent border border-purple-500/50 rounded-full text-white text-sm flex items-center hover:bg-purple-600/20 transition-all duration-300"
                                >
                                    <span>Live</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Main Projects Component
const FuturisticProjects = () => {
    const [projects, setProjects] = useState([]);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    const [headerRef, headerInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    useEffect(() => {
        setProjects([
            {
                index: 1,
                title: "Paved Payments",
                image: "/projects-img/9.png",
                link: "https://pavedpayments.com/"
            },
            {
                index: 2,
                title: "Red Bridge Construction",
                image: "/projects-img/redbridge.png",
                link: "https://redbridgeconstructionllc.com"
            },
            {
                index: 3,
                title: "Email Signature",
                image: "/projects-img/liam-email-sign.png",
            },
            {
                index: 4,
                title: "Custom Plugin FC-Overval",
                image: "/projects-img/alberto-plugin.png",
            },
            {
                index: 5,
                title: "The Blockcade",
                image: "/projects-img/10.png",
                link: "https://theblockcade.com/"
            }
        ]);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative bg-black py-24 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#a855f720_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>

                {/* Accent lighting */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
                <div className="absolute -bottom-10 right-1/4 w-96 h-96 rounded-full bg-purple-900/20 blur-[100px]"></div>
            </div>

            {/* Content Container */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6"
                style={{ opacity }}
            >
                {/* Header Section */}
                <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
                    <div className="mb-6 md:mb-0">
                        {/* Section Title Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block mb-4 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-1"
                        >
                            <span className="text-purple-300 text-sm font-medium tracking-wider">PROJECTS</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-3xl md:text-4xl lg:text-5xl text-white font-light"
                        >
                            Discover Our{" "}
                            <motion.span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 font-normal relative inline-block"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={headerInView ? {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        duration: 0.6,
                                        delay: 0.4
                                    }
                                } : {}}
                            >
                                Completed Work
                                <motion.span
                                    className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent"
                                    animate={headerInView ? { width: "100%" } : { width: "0%" }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                />
                            </motion.span>
                        </motion.h2>
                    </div>

                    {/* View All Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative overflow-hidden rounded-full px-6 py-3"
                    >
                        {/* Button Background */}
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-500"></span>

                        {/* Button Shine Effect */}
                        <span className="absolute h-full w-20 bg-white/20 -skew-x-30 -translate-x-32 group-hover:translate-x-64 transition-transform duration-1000"></span>

                        {/* Button Content */}
                        <span className="relative z-10 flex items-center justify-center text-white font-medium">
              View All Projects
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
                    </motion.button>
                </div>

                {/* Projects Gallery */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    {/* Custom Carousel Version */}
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-4">
                            {projects.map((project, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <ProjectCard project={project} index={index} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Custom Nav Buttons */}
                        <div className="flex justify-end gap-2 mt-8">
                            <CarouselPrevious className="relative rounded-full bg-black/50 border border-purple-500/50 text-white hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300" />
                            <CarouselNext className="relative rounded-full bg-black/50 border border-purple-500/50 text-white hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300" />
                        </div>
                    </Carousel>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default FuturisticProjects;