
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
      {/* Floating Logout Button (always visible on all pages if logged in) */}
      {hasAccess && (
        <div className="fixed top-4 right-4 z-[99999]">
          <Button
            onClick={handleLogout}
            variant="secondary"
            size="sm"
            aria-label="Logout"
            className="!bg-gradient-to-br !from-rose-600 !to-cyan-500 !text-white border border-cyan-300 font-bold shadow glow-on-hover hover:scale-105 px-4 py-2"
            style={{
              minWidth: 90,
              boxShadow: "0 4px 24px 0 #7de7fd99, 0 2px 8px 0 #4442ff18",
            }}
          >
            <LogOut className="w-4 h-4 text-white" />
            <span>Logout</span>
          </Button>
        </div>
      )}
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}>
        {/* Sophisticated Moving Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#131832] via-[#121728] to-[#312d4e] dark:from-[#080818] dark:via-[#111235] dark:to-[#24245a] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/30 dark:to-purple-900/30 animate-gradient-x"></div>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-float-delayed"></div>
            <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute top-1/6 w-2 h-2 bg-white/20 rounded-full animate-drift" style={{ animationDelay: '0s', animationDuration: '25s' }}></div>
            <div className="absolute top-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-drift" style={{ animationDelay: '5s', animationDuration: '30s' }}></div>
            <div className="absolute top-1/2 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-drift" style={{ animationDelay: '10s', animationDuration: '20s' }}></div>
            <div className="absolute top-2/3 w-1 h-1 bg-cyan-300/30 rounded-full animate-drift" style={{ animationDelay: '15s', animationDuration: '35s' }}></div>
            <div className="absolute top-1/5 left-1/5">
              <div className="w-1 h-1 bg-white/30 rounded-full animate-orbit" style={{ animationDelay: '0s' }}></div>
            </div>
            <div className="absolute bottom-1/5 right-1/5">
              <div className="w-0.5 h-0.5 bg-blue-300/40 rounded-full animate-orbit" style={{ animationDelay: '12s', animationDuration: '20s' }}></div>
            </div>
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
        </div>
        {/* Main Content */}
        <div className="relative z-10">
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
