"use client";
import React from 'react';
import { Particles } from "@/components/magicui/particles";
import FuturisticNavbar from "@/components/NavBar";
import FuturisticHero from "@/components/Hero";


const Header = ({id}) => {
    return (
        <section className="relative bg-transparent" id={id}>
            <Particles
                className="absolute inset-0 z-0"
                quantity={20}
                ease={10}
                size={10}
                color={'#fff'}
                refresh
            />
            <Particles
                className="absolute inset-0 z-0"
                quantity={20}
                ease={10}
                size={5}
                color={'#fff'}
                refresh
            />

            {/* Implement the new Futuristic Navbar */}


            {/* Replace with the new hero component */}
            <FuturisticHero />
        </section>
    );
};

export default Header;