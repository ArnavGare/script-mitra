
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import HeaderAuthButtons from "./HeaderAuthButtons";
import HeaderMobileMenu from "./HeaderMobileMenu";

export default function Header() {
  return (
    <header
      className="
        sticky top-0 z-[100] w-full
        bg-[#0D0D2B]/80 backdrop-blur-xl
        h-[64px] shadow
        border-b border-cyan-900/[0.13]
        transition-all duration-300
        flex items-center
      "
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        minHeight: 64,
      }}
    >
      <div className="w-full flex items-center justify-between px-5 sm:px-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center flex-1 justify-center">
          <NavLinks />
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <HeaderAuthButtons />
        </div>
        <div className="md:hidden flex items-center">
          <HeaderMobileMenu />
        </div>
      </div>

      {/* Header Animations and Global Styles */}
      <style>{`
        .neon-pill-btn {
          box-shadow: 0 2px 16px #33fdf855, 0 2px 10px #a06fff48;
          background: linear-gradient(92deg,#00cfff 18%,#a06fff 92%);
        }
        .neon-pill-btn:hover, .neon-pill-btn:focus-visible {
          filter: brightness(1.18) drop-shadow(0 0 11px #c2c6ffcc);
          transform: scale(1.06);
        }
        .shimmer-ltr {
          animation: shimmer 2.2s linear infinite;
        }
        @keyframes shimmer {
          0% { filter: brightness(1.08); }
          40% { filter: brightness(1.28); }
          100% { filter: brightness(1.08); }
        }
        /* Nav underline effect */
        nav button > span:last-child {
          transition: width .36s cubic-bezier(.45,.12,.62,.74);
          left: 0;
          bottom: -3px;
          height: 2px;
        }
        nav button:hover > span:last-child,
        nav button:focus-visible > span:last-child {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
