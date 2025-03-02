"use client";

import React, { useState, useRef } from 'react';
import {AnimatePresence, motion, useScroll, useTransform} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedText from "@/components/ui/animatedtext";

const AnimatedInput = ({
                         type = "text",
                         name,
                         value,
                         onChange,
                         placeholder,
                         required = false,
                         className = "",
                         delay = 0,
                         icon = null,
                         whileFocus,
                         ...props
                       }) => {
  const [ref, isInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isFocused, setIsFocused] = useState(false);

  return (
      <motion.div
          ref={ref}
          className="relative w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              delay
            }
          } : {}}
      >
        <div className="absolute inset-0 rounded-lg bg-purple-600/5 backdrop-blur-sm"></div>

        {/* Tech corner */}
        <div className="absolute top-0 left-0 w-5 h-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            <path d="M0 0V30H30" stroke={isFocused ? "#a855f7" : "#7e22ce"} strokeWidth="2" />
          </svg>
        </div>

        {/* Input container */}
        <div className="relative flex items-center">
          {icon && (
              <div className="absolute left-3 text-purple-400">
                {icon}
              </div>
          )}

          {type === "textarea" ? (
              <motion.textarea
                  name={name}
                  value={value}
                  onChange={onChange}
                  required={required}
                  placeholder={placeholder}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full bg-black/50 border ${isFocused ? 'border-purple-500' : 'border-purple-700/50'} outline-none rounded-lg text-base p-4 ${icon ? 'pl-10' : 'pl-4'} text-white transition-all duration-300 backdrop-blur-sm resize-none ${className}`}
                  {...props}
              />
          ) : (
              <motion.input
                  type={type}
                  name={name}
                  value={value}
                  onChange={onChange}
                  required={required}
                  placeholder={placeholder}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full bg-black/50 border ${isFocused ? 'border-purple-500' : 'border-purple-700/50'} outline-none rounded-lg text-base p-4 ${icon ? 'pl-10' : 'pl-4'} text-white transition-all duration-300 backdrop-blur-sm ${className}`}
                  {...props}
              />
          )}

          {/* Animated focus indicator */}
          <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: isFocused ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');
    setErrorMessage('');

    const wordCount = formData.message.trim().length;
    if (wordCount < 50) {
      setErrorMessage('Your message must be at least 50 characters.');
      setLoading(false);
      return;
    }

    // Discord webhook URL
    const webhookUrl = 'https://discord.com/api/webhooks/1345741574285561886/YCXE6ESW7j9Il2NP43wy5CqbJxfGCmWaK9ovWYdzhAYmJ6LrLAQ2-IB32aXPUrol3Sr8';

    try {
      // Prepare the message for Discord webhook
      const discordMessage = {
        embeds: [
          {
            title: `New Contact Form Submission`,
            color: 0xa855f7, // Purple color
            fields: [
              {
                name: 'Business Name',
                value: formData.businessName || 'Not provided',
                inline: true,
              },
              {
                name: 'Name',
                value: `${formData.firstName} ${formData.lastName}`,
                inline: true,
              },
              {
                name: 'Email',
                value: formData.email,
                inline: true,
              },
              {
                name: 'Phone',
                value: formData.phone || 'Not provided',
                inline: true,
              },
              {
                name: 'Message',
                value: formData.message,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: 'Sent from your website contact form'
            }
          }
        ]
      };

      // Send the data to Discord webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      if (response.ok) {
        setResponseMessage('Thank you for your message! We will get back to you soon.');
        // Reset form after successful submission
        setFormData({
          businessName: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        // If there was an error with the webhook
        console.error('Discord webhook error:', response.status);
        setErrorMessage('There was an error sending your message. Please try again later or contact us directly via email.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('There was an error sending your message. Please try again later or contact us directly via email.');
    } finally {
      setLoading(false);
    }
  };

  // Form section animation
  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Message count color
  const getMessageCountColor = () => {
    const count = formData.message.trim().length;
    if (count === 0) return 'text-gray-500';
    if (count < 50) return 'text-red-500';
    return 'text-purple-400';
  };

  return (
      <section
          ref={containerRef}
          className="relative bg-black py-24 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Gradient background instead of image */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>

          {/* Background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#a855f720_1px,transparent_1px)] [background-size:32px_32px] opacity-20"></div>

          {/* Accent lighting */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>

          {/* Ambient glow */}
          <div className="absolute -top-64 -right-64 w-[500px] h-[500px] rounded-full bg-purple-800/10 blur-[100px]"></div>
          <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] rounded-full bg-purple-800/10 blur-[100px]"></div>
        </div>

        {/* Content Wrapper */}
        <motion.div
            className="relative z-10 max-w-7xl mx-auto px-6"
            style={{ opacity, y: translateY }}
        >
          <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-stretch">
            {/* Contact Info Section */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-2/5 flex flex-col justify-center"
            >
              <div className="bg-black/40 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-10 h-full">
                {/* Section title with tech accent */}
                <div className="relative mb-6">
                  <div className="absolute top-0 left-0 w-10 h-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
                      <path d="M0 0V30H30" stroke="#a855f7" strokeWidth="2" />
                    </svg>
                  </div>

                  <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="inline-block mb-4 ml-6 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-1"
                  >
                    <span className="text-purple-300 text-sm font-medium tracking-wider">GET IN TOUCH</span>
                  </motion.h4>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl lg:text-4xl text-white font-light mb-6"
                >
                  Let's Create{" "}
                  <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 font-normal relative inline-block"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.6,
                          delay: 0.4
                        }
                      }}
                      viewport={{ once: true }}
                  >
                    Something Great
                    <motion.span
                        className="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-purple-500 to-transparent"
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-gray-300 font-light mb-12 leading-relaxed"
                >
                  <AnimatedText
                      text={"We're ready to bring your digital vision to life. Let's collaborate and create something extraordinary together."}
                      direction="up"
                      delay={0.4}
                      className="font-light whitespace-normal"
                  />
                </motion.p>

                {/* Contact methods with tech styling */}
                <div className="space-y-6 mb-8">
                  <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-purple-900/20 border border-purple-500/30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:jaundev768@gmail.com" className="text-white hover:text-purple-300 transition-colors">jaundev768@gmail.com</a>
                    </div>
                  </motion.div>

                  <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-purple-900/20 border border-purple-500/30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="10" r="3"></circle>
                        <path d="M7 20.662V19c0-1.657 2.239-3 5-3s5 1.343 5 3v1.662"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Discord</p>
                      <a href="https://discord.gg/6PGfR2N742" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-300 transition-colors">Join our community</a>
                    </div>
                  </motion.div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.a
                      href='mailto:jaundev768@gmail.com'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="group relative overflow-hidden rounded-full px-6 py-3"
                  >
                    {/* Button Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-500 opacity-90"></span>

                    {/* Button Shine Effect */}
                    <span className="absolute h-full w-20 bg-white/20 -skew-x-30 -translate-x-32 group-hover:translate-x-64 transition-transform duration-1000"></span>

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center justify-center text-white font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email Us
                  </span>
                  </motion.a>

                  <motion.a
                      href='https://discord.gg/6PGfR2N742'
                      target='_blank'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="relative overflow-hidden rounded-full px-6 py-3 border border-purple-500/50 text-white group"
                  >
                    {/* Button Hover Background */}
                    <span className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/20 transition-colors duration-300"></span>

                    {/* Button Content */}
                    <span className="relative z-10 flex items-center justify-center font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.119.119 0 0 0-.126.063c-.34.61-.642 1.408-.878 2.035a17.699 17.699 0 0 0-5.278 0 13.89 13.89 0 0 0-.887-2.035.124.124 0 0 0-.126-.063 19.148 19.148 0 0 0-4.885 1.49.113.113 0 0 0-.051.045C.334 9.053-.206 13.507.066 17.902a.136.136 0 0 0 .05.093 19.318 19.318 0 0 0 5.798 2.903.118.118 0 0 0 .128-.036c.7-.949 1.323-1.949 1.859-2.998a.114.114 0 0 0-.062-.159 12.706 12.706 0 0 1-1.81-.861.117.117 0 0 1-.012-.195c.122-.091.243-.186.359-.28a.11.11 0 0 1 .117-.014c5.908 2.685 12.297 2.685 18.148 0a.11.11 0 0 1 .118.014c.116.095.238.19.36.28a.117.117 0 0 1-.011.196 11.91 11.91 0 0 1-1.81.86.115.115 0 0 0-.062.16c.542 1.048 1.165 2.048 1.859 2.997a.116.116 0 0 0 .128.036 19.252 19.252 0 0 0 5.804-2.903.136.136 0 0 0 .05-.093c.326-5.145-.512-9.568-2.175-13.365a.112.112 0 0 0-.05-.045zm-12.115 10.8c-1.144 0-2.085-1.044-2.085-2.326 0-1.282.927-2.327 2.085-2.327 1.167 0 2.106 1.056 2.095 2.327 0 1.282-.928 2.326-2.095 2.326zm7.741 0c-1.144 0-2.085-1.044-2.085-2.326 0-1.282.928-2.327 2.085-2.327 1.168 0 2.106 1.056 2.095 2.327 0 1.282-.927 2.326-2.095 2.326z"></path>
                    </svg>
                    Discord
                  </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-3/5"
            >
              <div className="bg-black/40 backdrop-blur-sm border border-purple-600/30 rounded-2xl p-10">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-2xl text-white font-light mb-8 text-center"
                >
                  Fill out this form to get our services
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatedInput
                      type="text"
                      placeholder="Business Name"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      delay={0.1}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"></path>
                          <path d="M1 21h22"></path>
                          <path d="M10 9h4"></path>
                          <path d="M10 13h4"></path>
                          <path d="M10 17h4"></path>
                        </svg>
                      }
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedInput
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        delay={0.2}
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        }
                    />
                    <AnimatedInput
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        delay={0.3}
                    />
                  </div>

                  <AnimatedInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      delay={0.4}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      }
                  />

                  <AnimatedInput
                      type="tel"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      delay={0.5}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      }
                  />

                  <div className="relative">
                    <AnimatedInput
                        type="textarea"
                        rows="7"
                        placeholder="Message (Minimum 50 characters)"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        delay={0.6}
                        icon={
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        }
                    />

                    <motion.div
                        className={`absolute bottom-3 right-3 text-sm ${getMessageCountColor()}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                      {formData.message.trim().length}/50
                    </motion.div>
                  </div>

                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="pt-4"
                  >
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="group relative overflow-hidden rounded-lg w-full py-4 text-white font-medium"
                    >
                      {/* Button Background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-500 opacity-90"></span>

                      {/* Button Shine Effect */}
                      <span className="absolute h-full w-1/3 bg-white/20 -skew-x-30 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000"></span>

                      {/* Button Content */}
                      <span className="relative z-10 flex items-center justify-center">
                      {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                      ) : (
                          'Get Started'
                      )}
                    </span>
                    </motion.button>
                  </motion.div>

                  <AnimatePresence>
                    {responseMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4 mt-4"
                        >
                          <p className="text-center text-purple-200">
                            {responseMessage}
                          </p>
                        </motion.div>
                    )}

                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 mt-4"
                        >
                          <p className="text-center text-red-200">
                            {errorMessage}
                          </p>
                        </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
  );
};

export default Contact;