"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Components
const QuoteIcon = () => (
    <svg className="w-12 h-12 text-neon-gold-400/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
);

const RatingStars = () => (
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-neon-gold-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
      ))}
    </div>
);

const TestimonialCard = ({ review }) => (
    <Card className="group relative h-full bg-black/30 border border-neon-gold-500/10 backdrop-blur-sm hover:border-neon-gold-400/30 transition-all duration-500">
      <CardContent className="p-8 h-full flex flex-col">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6">
          <QuoteIcon />
        </div>

        {/* Rating */}
        <RatingStars />

        {/* Testimonial Text */}
        <p className="text-gray-300 leading-relaxed text-sm mb-8 flex-grow">
          "{review.body}"
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-neon-gold-500/10">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-gold-400/10 rounded-full blur-md group-hover:bg-neon-gold-400/20 transition-all" />
            <div className="relative w-12 h-12 rounded-full border border-neon-gold-400/30 overflow-hidden">
              <Image src={review.img} alt={review.name} fill className="object-cover" sizes="48px" />
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">{review.name}</h3>
            <p className="text-neon-gold-300/70 text-xs">{review.username}</p>
          </div>
        </div>
      </CardContent>
    </Card>
);

const ProgressIndicator = ({ current, total, onDotClick }) => (
    <div className="flex items-center justify-center gap-2">
      {[...Array(total)].map((_, index) => (
          <button
              key={index}
              onClick={() => onDotClick(index)}
              className="transition-all duration-300"
              aria-label={`Go to testimonial ${index + 1}`}
          >
            <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                    current === index
                        ? 'w-8 bg-neon-gold-400'
                        : 'w-1.5 bg-neon-gold-400/30 hover:bg-neon-gold-400/50'
                }`}
            />
          </button>
      ))}
    </div>
);

// Data
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

// Main Component
const FuturisticTestimonials = ({ id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState(null);
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleDotClick = (index) => {
    api?.scrollTo(index);
  };

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();

  return (
      <section className="relative bg-black py-24 overflow-hidden" id={id}>
        {/* Subtle Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6 px-6 py-2 bg-neon-gold-800/10 backdrop-blur-sm border border-neon-gold-400/20 rounded-full"
            >
              <span className="text-neon-gold-300 text-xs font-medium tracking-wider uppercase">Testimonials</span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl font-light text-white mb-4"
            >
              What People{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold-400 to-neon-gold-200 font-normal">
              Say About Us
            </span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto text-sm"
            >
              Here's what our clients have to say about their experience working with our team.
            </motion.p>
          </div>

          {/* Carousel */}
          <motion.div
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Carousel
                opts={{ align: "start", loop: true }}
                setApi={setApi}
                className="w-full"
            >
              <CarouselContent className="-ml-4">
                {reviews.map((review, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <TestimonialCard review={review} />
                    </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Navigation & Progress */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                  onClick={scrollPrev}
                  className="bg-black/40 border border-neon-gold-400/30 text-white hover:bg-black/60 hover:border-neon-gold-400/50 transition-all h-10 w-10 rounded-full flex items-center justify-center"
                  aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <ProgressIndicator current={activeIndex} total={reviews.length} onDotClick={handleDotClick} />

              <button
                  onClick={scrollNext}
                  className="bg-black/40 border border-neon-gold-400/30 text-white hover:bg-black/60 hover:border-neon-gold-400/50 transition-all h-10 w-10 rounded-full flex items-center justify-center"
                  aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
  );
};

export default FuturisticTestimonials;