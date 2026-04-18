"use client";

import { useRef, useState } from "react";
import BackgroundEffects from "@/components/landing/BackgroundEffects";
import CloudSection from "@/components/landing/CloudSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import StorySection from "@/components/landing/StorySection";
import useLandingAnimations from "@/components/landing/useLandingAnimations";
import ScreenLoader from "@/components/ui/screen-loader";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useLandingAnimations(pageRef, { onReady: () => setIsLoading(false) });

  return (
    <>
      <ScreenLoader isVisible={isLoading} />

      <main ref={pageRef} className="js-page boc-page relative">
        <BackgroundEffects />
        <HeroSection />
        <StorySection />
        <CloudSection />
        <FooterSection />
        
        {/* Workspace Link for development */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] opacity-30 hover:opacity-100 transition-opacity">
          <a href="/landing-page" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-blue-500 font-mono">
            Switch to Premium V2 /landing-page
          </a>
        </div>
      </main>
    </>
  );
}
