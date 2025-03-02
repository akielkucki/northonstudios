import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";
import React from "react";

const AnimatedText = ({ text, direction = "up", delay = 0, className = "", stagger = 0.03 }) => {
    const [ref, isInView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const words = text.split("\\s+");

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            }
        }
    };

    const wordVariants = {
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
                duration: 0.5,
            }
        }
    };

    return (
        <motion.span
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
        >
            {words.map((word, i) => (
                <motion.span key={i} variants={wordVariants} className="inline-block">
                    {word}{" "}
                </motion.span>
            ))}
        </motion.span>
    );
};
export default AnimatedText;