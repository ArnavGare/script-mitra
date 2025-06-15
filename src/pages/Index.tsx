import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/index/HeroSection";
import ProductBoxes from "@/components/index/ProductBoxes";
import VideoMakingTips from "@/components/index/VideoMakingTips";
import VoiceModulation from "@/components/index/VoiceModulation";
import GrowthBlueprint from "@/components/index/GrowthBlueprint";
import Testimonials from "@/components/index/Testimonials";
import ContactSection from "@/components/index/ContactSection";
import FooterSection from "@/components/index/FooterSection";
import OGFlyInText from "@/components/OGFlyInText";
import { useAccessKey } from "@/context/AccessKeyContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingLogoutButton from "@/components/FloatingLogoutButton";
import UltraPremiumBg from "@/components/UltraPremiumBg";
import MotionGridBg from "@/components/MotionGridBg";
import DailyQuotaBox from "@/components/DailyQuotaBox";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { hasAccess, logout } = useAccessKey();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <>
      <Header />
      {/* SUPER PROMINENT FLOATING LOGOUT BUTTON, BOTTOM RIGHT */}
      <FloatingLogoutButton />
      {/* --- Floating DailyQuotaBox, BOTTOM RIGHT, always under header --- */}
      <div
        className="fixed z-30 bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-12"
        style={{
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            // Prevent covering header's shadow/interactivity when scrolled to top
            maxWidth: 260,
            boxShadow: "0 4px 32px 2px rgba(50,60,120,0.07)",
          }}
        >
          <DailyQuotaBox />
        </div>
      </div>
      {/* --- GRID ANIMATED BACKGROUND (premium grid, above ultra-premium video/bg, below content) --- */}
      <MotionGridBg />
      {/* --- ULTRA-PREMIUM ANIMATED BACKGROUND, below all content (z-index ordering important) --- */}
      <UltraPremiumBg />
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
        {/* Main Content */}
        <div className="relative z-10">
          {/* Main Content */}
          <HeroSection />
          <ProductBoxes />
          <VideoMakingTips />
          <VoiceModulation />
          <GrowthBlueprint />
          <Testimonials />
          <ContactSection />
          <FooterSection />
        </div>
      </div>
    </>
  );
};

export default Index;
