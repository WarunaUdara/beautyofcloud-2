'use client';

import React, { useRef } from 'react';
import { useScroll } from "framer-motion";

// Layout Components
import { Header } from "@/components/layout/Header";
import { ProgressBar } from "@/components/layout/ProgressBar";

// UI Components
import { TerminalOverlay } from "@/components/ui/TerminalOverlay";
import { Timeline } from "@/components/ui/Timeline";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

// Sections
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { GridMotionGallery } from "@/components/sections/GridMotionGallery";
import { Experience } from "@/components/sections/Experience";
import { Team } from "@/components/sections/Team";
import { Partners } from "@/components/sections/Partners";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <div 
        ref={targetRef} 
        className="relative w-full bg-background selection:bg-accent selection:text-white"
      >
        {/* Foundation */}
        <div className="bg-mesh" />
        {/* <TerminalOverlay /> */}
        <ProgressBar targetRef={targetRef} />

        {/* Layout */}
        <Header />

        {/* Narrative Flow */}
        {/* <Hero scrollYProgress={scrollYProgress} /> */}
        
        {/* <About /> */}

        <GridMotionGallery />

        <Timeline />

        {/* <Experience /> */}

        {/* <Team /> */}

        <Partners />

        <Footer />
      </div>
    </>
  );
}
