
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccessKey } from "@/context/AccessKeyContext";
import MotionGridBg from "./MotionGridBg";

export default function Header() {
  const { hasAccess } = useAccessKey();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCTA = () => {
    if (hasAccess) {
      navigate("/"); // Dashboard or home
    } else {
      navigate("/auth/login", { state: { from: location } });
    }
  };

  return (
    <>
      <header
        className={`
            sticky top-0 z-[100] w-full
            bg-[#0B0F19]/70 backdrop-blur-md
            border-b border-cyan-200/10
            shadow-[0_2px_16px_0_rgba(0,32,64,0.11)]
            transition-all duration-300
            flex items-center
            h-[60px]
          `}
        style={{
          minHeight: 60,
        }}
      >
        <div className="w-full flex items-center justify-between px-5 sm:px-8 mx-auto max-w-7xl">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <nav className="flex items-center flex-1 justify-center gap-3">
            <NavLinks />
          </nav>
          {/* CTA Button (right) */}
          <div className="flex items-center">
            <button
              onClick={handleCTA}
              className={`
                px-4 py-2 rounded-lg font-semibold text-base
                bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600
                hover:from-blue-500 hover:to-purple-500
                shadow-lg border-0
                text-white transition-all duration-200
                focus-visible:outline-none outline-none
                focus-visible:ring-2 focus-visible:ring-cyan-400/70
                relative
                ${
                  hasAccess
                    ? "glow-pulse"
                    : "outline outline-2 outline-cyan-300/70"
                }
              `}
              style={{
                boxShadow:
                  "0 8px 24px 0 rgba(63, 189, 255, 0.07), 0 1.5px 6px rgba(87, 96, 210, 0.22)",
                minWidth: 110,
                letterSpacing: "0.02em",
              }}
              aria-label={hasAccess ? "Dashboard" : "Login"}
            >
              {hasAccess ? "Dashboard" : "Login"}
            </button>
          </div>
        </div>
        <style>{`
          .glow-pulse {
            animation: glowAnim 1.8s infinite alternate;
          }
          @keyframes glowAnim {
            0% { box-shadow: 0 0 8px #b6f0ff33; }
            100% { box-shadow: 0 0 32px #9d7cff88; }
          }
        `}</style>
      </header>
    </>
  );
}
