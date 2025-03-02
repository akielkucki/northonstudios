"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDiscord, FaGem, FaEnvelope } from 'react-icons/fa';

const FooterLink = ({ href, children }) => {
  return (
      <motion.a
          href={href}
          className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center group mb-3"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
      >
      <span className="relative overflow-hidden">
        <span className="relative z-10">{children}</span>
        <motion.span
            className="absolute bottom-0 left-0 h-px w-0 bg-purple-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
        />
      </span>
        <motion.span
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ x: -5 }}
            animate={{ x: 0 }}
        >
          →
        </motion.span>
      </motion.a>
  );
};

const FuturisticFooter = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.8, 1], [50, 0]);

  const [logoRef, logoInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [socialsRef, socialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
      <footer ref={containerRef} className="relative bg-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#a855f720_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>

          {/* Accent lighting */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

          {/* Ambient glow */}
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-purple-900/10 blur-[100px]"></div>
        </div>

        {/* Social networks section */}
        <motion.section
            ref={socialsRef}
            style={{ opacity, y }}
            className="relative z-10 border-b border-purple-900/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={socialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="hidden lg:block"
              >
                <span className="text-gray-300 font-light">Get connected with us on social networks:</span>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={socialsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-6"
              >
                <a
                    href="https://discord.gg/6PGfR2N742"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                >
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-md group-hover:bg-purple-600/30 transition-colors duration-300"></div>
                  <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full border border-purple-500/50 bg-black/50 backdrop-blur-sm group-hover:border-purple-400 transition-colors duration-300">
                    <FaDiscord className="text-purple-400 text-lg group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>

                <a
                    href="mailto:jaundev768@gmail.com"
                    className="group relative"
                >
                  <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-md group-hover:bg-purple-600/30 transition-colors duration-300"></div>
                  <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full border border-purple-500/50 bg-black/50 backdrop-blur-sm group-hover:border-purple-400 transition-colors duration-300">
                    <FaEnvelope className="text-purple-400 text-lg group-hover:text-white transition-colors duration-300" />
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Main footer content */}
        <motion.section
            className="relative z-10 py-16"
            style={{ opacity, y }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company info */}
              <motion.div
                  ref={logoRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={logoInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
              >
                <div className="mb-6 flex items-center">
                  <div className="relative mr-2">
                    <div className="absolute inset-0 bg-purple-600/30 rounded-lg blur-md"></div>
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-lg border border-purple-500/50 bg-black/70">
                      <FaGem className="text-purple-400" />
                    </div>
                  </div>
                  <h2 className="text-white text-xl font-medium">
                    <span className="text-purple-400">JR</span> Studios
                  </h2>
                </div>
                <p className="text-gray-400 font-light leading-relaxed">
                  JR Studios is a software company that turns your ideas into code — not even just code, it's our creation!
                </p>

                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={logoInView ? { opacity: 1, width: "40%" } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="h-px bg-gradient-to-r from-purple-500 to-transparent mt-6"
                />
              </motion.div>

              {/* Services */}
              <div>
                <motion.h6
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-lg font-medium mb-6"
                >
                  Services
                </motion.h6>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <FooterLink href="#web-design">Web Design</FooterLink>
                  <FooterLink href="#web-development">Web Development</FooterLink>
                  <FooterLink href="#graphic-design">Graphic Design</FooterLink>
                  <FooterLink href="#3d-modeling">3D Modeling</FooterLink>
                </motion.div>
              </div>

              {/* Useful links */}
              <div>
                <motion.h6
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-lg font-medium mb-6"
                >
                  Useful Links
                </motion.h6>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <FooterLink
                      href="https://docs.google.com/document/d/19YBrtZ6MGNb3mbHUpn9sLbFruFUwCAXJ2Xs-OhXf7mA/edit?tab=t.0"
                  >
                    Terms Of Service
                  </FooterLink>
                  <FooterLink href="#projects">Our Projects</FooterLink>
                  <FooterLink href="#testimonials">Testimonials</FooterLink>
                  <FooterLink href="#contact">Contact Us</FooterLink>
                </motion.div>
              </div>

              {/* Contact */}
              <div>
                <motion.h6
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-white text-lg font-medium mb-6"
                >
                  Contact
                </motion.h6>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mr-3 mt-1">
                      <FaEnvelope className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-light">Email</p>
                      <a href="mailto:jaundev768@gmail.com" className="text-white hover:text-purple-400 transition-colors">
                        jaundev768@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mr-3 mt-1">
                      <FaDiscord className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-light">Discord</p>
                      <a href="https://discord.gg/6PGfR2N742" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition-colors">
                        Join our community
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Copyright */}
        <motion.div
            className="relative z-10 py-6 border-t border-purple-900/50 backdrop-blur-sm"
            style={{ opacity }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © 2025, <span className="text-purple-400 font-medium">JR Studios</span>. All rights reserved.
              </p>

              <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
              >
                <div className="h-1 w-1 rounded-full bg-purple-500 mr-2"></div>
                <p className="text-gray-400 text-sm">
                  Crafted with <span className="text-purple-400">♦</span> by JR Studios
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </footer>
  );
};

export default FuturisticFooter;