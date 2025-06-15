
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { useAccessKey } from "@/context/AccessKeyContext";
import { Button } from "@/components/ui/button";

// Helper: determine shrink on scroll
const useShrinkOnScroll = () => {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShrink(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return shrink;
};

export default function Header() {
  const shrink = useShrinkOnScroll();
  const { hasAccess } = useAccessKey();
  const navigate = useNavigate();

  // Right-side CTA: Login or Dashboard
  const CTAButton = hasAccess ? (
    <Button
      variant="outline"
      size="sm"
      className="nav-cta-btn bg-gradient-to-r from-[#2CB2FF] to-[#7067F0] text-white font-semibold rounded-lg px-4 py-2 shadow-lg 
        border-0 hover:from-[#1ddcff] hover:to-[#8b7bff] focus-visible:ring-2 focus-visible:ring-cyan-400"
      onClick={() => navigate("/dashboard")}
      style={{ fontWeight: 600, letterSpacing: "0.01em" }}
    >
      Dashboard
    </Button>
  ) : (
    <Button
      variant="secondary"
      size="sm"
      className="nav-cta-btn border border-cyan-400/50 text-cyan-50 font-semibold rounded-lg px-4 py-2 shadow-lg
        bg-gradient-to-t from-[#25355699] to-[#191D2A66] hover:from-[#283a5b] hover:border-cyan-300
        focus-visible:ring-2 focus-visible:ring-cyan-400/80"
      onClick={() => navigate("/auth/login")}
      style={{ fontWeight: 600, letterSpacing: "0.01em" }}
    >
      Login
    </Button>
  );

  return (
    <header
      className={`
        app-header sticky top-0 left-0 z-[1050] w-full select-none
        transition-all duration-300
        ${shrink ? "backdrop-blur-xl min-h-[56px] h-[56px] shadow-[0_2px_44px_-2px_#04091f1e] border-b border-cyan-100/10"
                 : "backdrop-blur-2xl min-h-[68px] h-[68px] shadow-[0_2px_36px_0_#04173c29,0_0px_18px_#1cf6c213] border-b border-cyan-100/[0.05]"}
        glassy-header
      `}
      style={{
        background: "linear-gradient(80deg,rgba(11,15,25,0.82) 74%,rgba(32,38,64,0.67) 100%)",
        WebkitBackdropFilter: "blur(18px)",
        backdropFilter: "blur(18px)",
        transition: "all 0.27s cubic-bezier(.72,.12,0,.98)",
        boxShadow: shrink
          ? "0 2px 18px #050d1b22,0 1px 12px #2530ae33"
          : "0 4px 32px #0415421f, 0 0.5px 18px #2064d622",
        borderBottom: shrink
          ? "1.5px solid rgba(91,245,255,0.11)"
          : "1.5px solid rgba(91,187,255,0.05)",
      }}
    >
      <div className="app-header-inner flex items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-8">
        {/* Logo */}
        <div className="flex items-center pr-3">
          <Logo />
        </div>
        {/* Main Navigation */}
        <nav className="flex-1 flex items-center justify-center">
          <NavLinks />
        </nav>
        {/* Right actions */}
        <div className="flex items-center gap-2 pl-3">
          {CTAButton}
          <ThemeToggle />
        </div>
      </div>
      {/* frosted border/blur effect at bottom */}
      <div className="header-glow-blur-border pointer-events-none absolute inset-x-0 -bottom-[1.5px] h-[18px] z-[1]" />
      <style>{`
        .app-header {
          font-family: 'Inter', 'Satoshi', 'Poppins', system-ui, sans-serif;
          font-weight: 500;
          letter-spacing: 0.003em;
        }
        .header-glow-blur-border {
          background: linear-gradient(180deg, rgba(100,255,255,0.045) 2%,rgba(9,18,50,0.1) 70%,transparent 100%);
          filter: blur(6px) brightness(1.08);
        }
        .glassy-header {
          /* for fallback on unsupported browsers */
          background-blend-mode: lighten;
        }
      `}</style>
    </header>
  );
}
