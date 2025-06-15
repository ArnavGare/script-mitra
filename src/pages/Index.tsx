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
      {/* --- GRID ANIMATED BACKGROUND (premium grid, above ultra-premium video/bg, below content) --- */}
      <MotionGridBg />
      {/* --- ULTRA-PREMIUM ANIMATED BACKGROUND, below all content (z-index ordering important) --- */}
      <UltraPremiumBg />
      {/* NOISE OVERLAY: covers all backgrounds/glows but not the main content */}
      <div className="noise-overlay" />
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
