"use client";

import React from "react";
import Image from "next/image";
import {ScrollingBrands} from "@/components/magicui/constant-scroll-velocity";



const Brands = () => {
    // Array of 5 brand images (update paths and alt texts as needed)
    const brands = [
        { src: "/imgs/audi.svg", alt: "Audi" },
        { src: "/imgs/redbridge.svg", alt: "Red Bridge" },
        { src: "/imgs/cre8v.svg", alt: "Red Bridge" },

    ];

    return (
        <div className="relative flex w-full items-center justify-center overflow-hidden bg-black py-20">
            <ScrollingBrands
                brands={brands}/>
        </div>
    );
};

export default Brands;
