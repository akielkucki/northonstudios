"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Quote Icon Component
const QuoteIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
);

// Rating Stars Component
const RatingStars = ({ rating = 5 }) => {
  return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ${i < rating ? 'text-purple-400' : 'text-gray-600'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        ))}
      </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ review, index, isActive }) => {
  const [ref, isInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  return (
      <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 50,
              damping: 15,
              delay: index * 0.1
            }
          } : { opacity: 0, y: 30 }}
          className="h-full"
      >
        <Card className={`relative overflow-hidden h-full border backdrop-blur-sm transition-all duration-500 
                      ${isActive
            ? 'bg-black/70 border-purple-500/70 shadow-lg shadow-purple-500/20'
            : 'bg-black/50 border-purple-600/30 hover:border-purple-500/50'}`}>
          <CardContent className="p-6 h-full flex flex-col">
            {/* Tech Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12">
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                <path d="M0 0V30H30" stroke="#a855f7" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Quote Icon */}
            <div className="absolute top-4 right-4">
              <QuoteIcon className="w-8 h-8 text-purple-500/30" />
            </div>

            {/* Rating */}
            <div className="mb-4">
              <RatingStars rating={5} />
            </div>

            {/* Testimonial Text */}
            <div className="flex-grow mb-6">
              <p className="text-gray-300 leading-relaxed font-light relative">
              <span className="relative">
                "{review.body}"
              </span>
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center mt-auto">
              {/* Avatar with glow effect */}
              <div className="relative mr-4">
                <div className={`absolute inset-0 rounded-full ${isActive ? 'bg-purple-500/20' : 'bg-purple-600/10'} blur-sm`}></div>
                <div className="relative w-12 h-12 rounded-full border border-purple-500/30 overflow-hidden">
                  <Image
                      src={review.img}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                  />
                </div>
                {isActive && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(168, 85, 247, 0.3)",
                            "0 0 8px rgba(168, 85, 247, 0.7)",
                            "0 0 0px rgba(168, 85, 247, 0.3)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
              </div>

              {/* Name and Username */}
              <div>
                <h3 className="text-white font-medium">{review.name}</h3>
                <p className="text-purple-400/80 text-sm">{review.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
  );
};

const reviews = [
  {
    name: "Ilanox",
    username: "@ilanox",
    body: "Did a great job, really like his work! The attention to detail and clean code made the project exceed my expectations. Would definitely work with them again for future projects.",
    img: "/testimonials-img/ilanox.png",
  },
  {
    name: "Pilot",
    username: "@pilot685",
    body: "Everything works as intended. The team was responsive, professional and delivered the project right on schedule. Their technical expertise is impressive.",
    img: "/testimonials-img/pilot.gif",
  },
  {
    name: "Chase",
    username: "@policechase",
    body: "Awesome Developer and product!!! I couldn't be happier with the results. The interface is intuitive and the performance is outstanding. Highly recommended.",
    img: "/testimonials-img/chase.jpeg",
  },
  {
    name: "Holy",
    username: "@holy",
    body: "Amazing devs, They are great to work with. Nice and friendly, understanding and goes beyond to deliver exactly what you want for a very very fair price. Definitely would recommend for anyone looking for a web work. Completes it in time and helps you along the way with every single step. Will definitely be asking for JR Studios anytime I need some dev work !! :)",
    img: "/testimonials-img/holy.webp",
  },
];

// Main Testimonials Component
const FuturisticTestimonials = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          <div className="absolute -top-10 left-1/4 w-96 h-96 rounded-full bg-purple-900/20 blur-[100px]"></div>
        </div>

        {/* Content Container */}
        <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6"
            style={{ opacity }}
        >
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16">
            {/* Section Title Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-4 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-1"
            >
              <span className="text-purple-300 text-sm font-medium tracking-wider">TESTIMONIALS</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl text-white font-light mx-auto max-w-3xl"
            >
              What People{" "}
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
                Say About Us
                <motion.span
                    className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent"
                    animate={headerInView ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 text-gray-300 max-w-2xl mx-auto font-light"
            >
              Here's what our clients have to say about their experience working with our team.
            </motion.p>
          </div>

          {/* Testimonials Carousel */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
                onSelect={(index) => setActiveIndex(index)}
            >
              <CarouselContent className="-ml-4">
                {reviews.map((review, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <TestimonialCard review={review} index={index} isActive={activeIndex === index} />
                    </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom Nav Buttons */}
              <div className="flex justify-center gap-2 mt-10">
                <CarouselPrevious className="relative rounded-full bg-black/50 border border-purple-500/50 text-white hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300" />

                {/* Dots Indicator */}
                <div className="flex items-center gap-2 mx-4">
                  {reviews.map((_, index) => (
                      <motion.button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              activeIndex === index ? 'bg-purple-500 w-4' : 'bg-purple-500/30'
                          }`}
                          onClick={() => {
                            const carouselElement = document.querySelector('[data-carousel-container="true"]');
                            if (carouselElement) {
                              const carouselApi = carouselElement.__emblaApi;
                              if (carouselApi) carouselApi.scrollTo(index);
                            }
                          }}
                      />
                  ))}
                </div>

                <CarouselNext className="relative rounded-full bg-black/50 border border-purple-500/50 text-white hover:bg-purple-900/30 hover:border-purple-500 transition-all duration-300" />
              </div>
            </Carousel>
          </motion.div>
        </motion.div>
      </section>
  );
};

export default FuturisticTestimonials;