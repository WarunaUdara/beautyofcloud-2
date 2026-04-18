'use client';

import React, { useRef } from 'react';
import { useScroll, AnimatePresence, motion } from "framer-motion";

// Layout Components
import { Header } from "@/components/layout/Header";
import { ProgressBar } from "@/components/layout/ProgressBar";

// UI Components
import { TerminalOverlay } from "@/components/ui/TerminalOverlay";
import { Timeline } from "@/components/ui/Timeline";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

// Sections
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { GridMotionGallery } from "@/components/sections/GridMotionGallery";
import { Experience } from "@/components/sections/Experience";
import { Team } from "@/components/sections/Team";
import { Partners } from "@/components/sections/Partners";
import { Footer } from "@/components/sections/Footer";

export default function LandingPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const targetRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Lock scroll while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Artificial delay to ensure the premium animation is seen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            key="loader" 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[1000]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

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
        <Hero scrollYProgress={scrollYProgress} />
        
        <About />

        <GridMotionGallery />

        <Timeline />

        <Experience />

        <Team />

        <Partners />

        <Footer />
      </div>
    </>
  );
}
