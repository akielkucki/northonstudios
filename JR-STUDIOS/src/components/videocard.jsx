"use client"
import {easeOut, motion, useScroll, useTransform} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

const VideoCard = () => {
    const containerRef = useRef(null);

    // Track scroll progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const [hasAnimated, setHasAnimated] = useState(false);
    const { scrollY } = useScroll();
    useEffect(() => {
        // Get navigation timing
        const navigation = performance.getEntriesByType(
            "navigation"
        )[0];

        // Check if this is a fresh page load or reload
        if (navigation?.type === "reload" || navigation?.type === "navigate") {
            setHasAnimated(false);
        } else {
            setHasAnimated(true);
        }
    }, []);

    // Transform video size and width based on scroll with eased transitions
    const videoScale = useTransform(scrollY, [0, 500], [0.9, 1], {
        ease: easeOut,
    });
    const videoWidth = useTransform(scrollY, [0, 500], ["85%", "100%"], {
        ease: easeOut,
    });
    const videoBorderRadius = useTransform(scrollY, [0, 500], [32, 0], {
        ease: easeOut,
    });
    const videoContainerVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 0.8,
                duration: 1.2,
                ease: [0.25, 0.1, 0, 1],
            },
        },
    };
    return (
    <motion.div
        className="flex justify-center w-full md:px-0 bg-black h-screen"

    >
        <motion.div
            style={{
                width: videoWidth,
                scale: videoScale,
                borderRadius: videoBorderRadius,
                overflow: "hidden",
            }}
            className="relative w-full md:w-auto shadow-[0_5px_35px_rgba(137,0,157,1)] ring-2 ring-purple-900"
        >
            <motion.video
                src="/herovideo.mp4"
                autoPlay
                initial={hasAnimated ? "visible" : "hidden"}
                animate="visible"
                variants={videoContainerVariants}
                muted
                loop
                className="w-full h-full object-cover pointer-events-none"
            />
        </motion.div>
    </motion.div>
    );
};

export default VideoCard;