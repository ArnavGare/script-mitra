
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { useNavigate, useLocation } from "react-router-dom";
import { useAccessKey } from "@/context/AccessKeyContext";
import MotionGridBg from "./MotionGridBg";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

export default function Header() {
  const { hasAccess } = useAccessKey();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useSupabaseUser();

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
          {/* Right section: Email (if logged in) or Login button */}
          <div className="flex items-center min-w-[110px] justify-end">
            {/* Show spinner while loading user */}
            {isLoading ? (
              <span className="w-[110px] animate-pulse text-cyan-400">Loading...</span>
            ) : user ? (
              <span
                className="px-3 py-1 rounded-lg font-semibold text-base bg-gradient-to-tr from-[#1cf6c2]/10 via-[#7265ff]/10 to-[#7265ff]/20 text-white border border-cyan-300/10 shadow-inner transition-all duration-200"
                title={user.email}
                style={{
                  letterSpacing: "0.01em",
                  maxWidth: 170,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  background: "linear-gradient(92deg,rgba(0,255,229,0.07),rgba(182,240,255,0.11) 70%,rgba(157,124,255,0.09) )",
                  boxShadow: "0 2px 14px 0 rgba(76,88,221,0.13)",
                }}
                aria-label={user.email}
              >
                {user.email}
              </span>
            ) : (
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
                  outline outline-2 outline-cyan-300/70
                `}
                style={{
                  minWidth: 110,
                  letterSpacing: "0.02em",
                }}
                aria-label="Login"
              >
                Login
              </button>
            )}
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
