"use client";

import { useRef, useState } from "react";
import BackgroundEffects from "@/components/landing/BackgroundEffects";
import CloudSection from "@/components/landing/CloudSection";
import FooterSection from "@/components/landing/FooterSection";
import HeroSection from "@/components/landing/HeroSection";
import StorySection from "@/components/landing/StorySection";
import useLandingAnimations from "@/components/landing/useLandingAnimations";
import ScreenLoader from "@/components/ui/screen-loader";
import AdminLoginModal from "@/components/ui/AdminLoginModal";
import { Lock } from "lucide-react";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

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
        
        {/* Internal Tools Bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 px-6 py-3 rounded-2xl bg-[#0f172a]/40 border border-white/5 backdrop-blur-xl opacity-40 hover:opacity-100 transition-all duration-500 shadow-2xl">
          <a href="/landing-page" className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 hover:text-blue-500 transition-colors">
            Experimental V2
          </a>
          
          <div className="w-[1px] h-3 bg-white/10" />

          <button 
            onClick={() => setIsAdminModalOpen(true)}
            className="flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 hover:text-purple-500 transition-colors"
          >
            <Lock size={10} strokeWidth={3} />
            <span>Admin Terminal</span>
          </button>
        </div>
      </main>

      <AdminLoginModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
}
