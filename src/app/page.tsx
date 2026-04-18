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
        <FooterSection onAdminClick={() => setIsAdminModalOpen(true)} />
        
      </main>

      <AdminLoginModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </>
  );
}
