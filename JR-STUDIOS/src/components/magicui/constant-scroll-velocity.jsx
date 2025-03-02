"use client";

import {
    motion,
    useAnimationFrame,
} from "motion/react";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function InfiniteScroll({ children, speed = 50, ...props }) {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [items, setItems] = useState([]);
    const [itemWidth, setItemWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const positionRef = useRef(0);

    useEffect(() => {
        if (!children || React.Children.count(children) === 0) return;

        const childrenArray = React.Children.toArray(children).map((child, index) =>
            React.cloneElement(child, { key: `original-${index}` })
        );

        setItems(childrenArray);
    }, [children]);

    // Measure container and item dimensions
    useEffect(() => {
        if (!containerRef.current || !scrollerRef.current || items.length === 0) return;

        const measureElements = () => {
            const containerWidth = containerRef.current.offsetWidth;
            setContainerWidth(containerWidth);

            // Get width of first item
            const firstItem = scrollerRef.current.children[0];
            if (firstItem) {
                const itemTotalWidth = firstItem.offsetWidth;
                setItemWidth(itemTotalWidth);

                // Now that we've measured, we can consider the component initialized
                setIsInitialized(true);
            }
        };

        measureElements();

        // Re-measure on window resize
        window.addEventListener('resize', measureElements);
        return () => window.removeEventListener('resize', measureElements);
    }, [items, containerRef.current, scrollerRef.current]);

    // Dynamically duplicate items as needed to fill the container
    useEffect(() => {
        if (!isInitialized || items.length === 0 || itemWidth === 0 || containerWidth === 0) return;

        // Determine how many items we need to fill the screen plus buffer
        const totalWidth = items.length * itemWidth;
        const itemsNeeded = Math.ceil(containerWidth / totalWidth) + 1;

        if (itemsNeeded <= 1) return; // No duplication needed

        // Create duplicates to ensure we have enough content
        const originalItems = items.filter(item => item.key.toString().startsWith('original-'));
        const allItems = [...originalItems];

        // Add duplicates
        for (let i = 1; i < itemsNeeded; i++) {
            const duplicates = originalItems.map((item, index) =>
                React.cloneElement(item, { key: `dup-${i}-${index}` })
            );
            allItems.push(...duplicates);
        }

        setItems(allItems);
    }, [isInitialized, itemWidth, containerWidth]);

    // Animation logic - smoothly scroll and recycle items
    useAnimationFrame((_, delta) => {
        if (!scrollerRef.current || !isInitialized || items.length === 0) return;

        // Calculate movement based on speed and delta time
        const pixelsPerSecond = speed;
        const moveBy = (pixelsPerSecond * delta) / 1000;

        // Update position
        positionRef.current -= moveBy;

        // Detect when first item is completely off-screen
        if (Math.abs(positionRef.current) >= itemWidth) {
            // Move the first item to the end
            const itemsArray = [...items];
            const firstItem = itemsArray.shift();

            // Create a new clone of the first item with a new key
            const recycledItem = React.cloneElement(
                firstItem,
                { key: `recycled-${Date.now()}` }
            );

            // Add the recycled item to the end
            itemsArray.push(recycledItem);

            // Reset position by the width of the removed item
            positionRef.current += itemWidth;

            // Update state
            setItems(itemsArray);
        }

        // Apply transform
        scrollerRef.current.style.transform = `translateX(${positionRef.current}px)`;
    });

    return (
        <div ref={containerRef} className="w-full overflow-hidden" {...props}>
            <div
                ref={scrollerRef}
                className="flex flex-row items-center"
            >
                {items}
            </div>
        </div>
    );
}

// Improved ScrollingBrands component
export function ScrollingBrands({
                                    speed = 50,
                                    brands,
                                    className = "",
                                    ...props
                                }) {
    return (
        <div className={`relative w-full bg-black py-20 ${className}`} {...props}>
            <InfiniteScroll speed={speed}>
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 mx-4 flex items-center justify-center h-24"
                    >
                        <Image
                            src={brand.src}
                            alt={brand.alt}
                            width={250}
                            height={150}
                            className="object-contain fill-gray-100 max-h-16"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: 'auto 0'
                            }}
                        />
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}