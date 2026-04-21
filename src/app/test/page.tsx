'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HeroTest } from "@/components/sections/HeroTest";
import { LinuxEnvironment } from "@/components/ui/LinuxEnvironment";

gsap.registerPlugin(ScrollTrigger);

export default function TestHome() {
  const pinnedRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useGSAP(() => {
    // Start: window sitting partially off the bottom of the screen
    gsap.set(windowRef.current, {
      left: '50%',
      xPercent: -50,
      yPercent: 60,
      scale: 0.85,
      transformOrigin: 'bottom center',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedRef.current,
        start: 'top top',
        end: '+=250%',
        scrub: 1.2,
        pin: pinnedRef.current,
        anticipatePin: 1,
      },
    });

    // Phase 1: Window rises up into view from bottom
    tl.to(windowRef.current, {
      yPercent: 0,
      scale: 1,
      duration: 1,
      ease: 'power2.out',
    })
    // Phase 2: Hero text fades out as window is in view
    .to(heroContentRef.current, {
      opacity: 0,
      y: -80,
      duration: 0.6,
    }, 0.4)
    // Phase 3: Window expands to fill the full screen
    .to(windowRef.current, {
      left: 0,
      xPercent: 0,
      width: '100%',
      height: '100%',
      borderRadius: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    }, 1);

  }, { scope: pinnedRef });

  return (
    <>
      {/* 
        The pinned section. It must be positioned in normal flow so GSAP
        can pin it (GSAP adds position:fixed internally during pin).
      */}
      <div
        ref={pinnedRef}
        className="relative w-full h-screen bg-black overflow-hidden"
      >
        {/* Video background fills the pinned section */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/Earth.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        {/* Hero text — fades out on scroll */}
        <div
          ref={heroContentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-blue-400 text-[10px] font-bold tracking-[0.4em] uppercase font-mono">
              System Online // Phase 2.0
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-tighter uppercase mb-6">
            <span className="block text-white">Beauty Of</span>
            <span className="block text-blue-500 drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]">Cloud.</span>
          </h1>

          <p className="max-w-xl text-base md:text-lg text-white/50 uppercase tracking-widest font-mono">
            Sri Lanka's premier inter-university cloud ideathon.
          </p>
        </div>

        {/* 
          Linux window — anchored to the bottom center.
          GSAP will slide it up and expand it on scroll.
        */}
        <div
          ref={windowRef}
          className="absolute bottom-0 z-20 w-[85vw] h-[60vh] rounded-t-2xl overflow-hidden shadow-[0_-20px_80px_rgba(0,0,0,0.9)] border border-white/10 border-b-0"
        >
          <LinuxEnvironment />
        </div>
      </div>

      {/* 
        Scroll spacer lives OUTSIDE the pinned div so the page
        actually has scrollable height. GSAP pins the div above
        while the user scrolls through this space.
      */}
      <div style={{ height: '250vh' }} />
    </>
  );
}
