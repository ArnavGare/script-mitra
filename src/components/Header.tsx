import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import HeaderAuthButtons from "./HeaderAuthButtons";
import HeaderMobileMenu from "./HeaderMobileMenu";
import UserCreditsBadge from "./UserCreditsBadge";

// Smooth scroll to section helper
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Header() {
  // Maps nav anchors to section IDs in the page
  const navAnchorToId: Record<string, string> = {
    home: "home",
    "generate-scripts": "generate-scripts",
    store: "store",
  };

  const handleNavClick = (anchor: string) => {
    const id = navAnchorToId[anchor];
    if (id) scrollToSection(id);
  };

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
          <NavLinks onNavigate={handleNavClick} />
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <UserCreditsBadge />
          <HeaderAuthButtons />
        </div>
        <div className="md:hidden flex items-center">
          <UserCreditsBadge />
          {/* pass handleNavClick so mobile menu can use same smooth scroll */}
          <HeaderMobileMenu onNavClick={handleNavClick} />
        </div>
      </div>

      <style>{`
        .neon-pill-btn {
          box-shadow: 0 2px 16px #33fdf855, 0 2px 10px #a06fff48;
          background: linear-gradient(92deg,#00cfff 18%,#a06fff 92%);
        }
        .neon-pill-btn:hover, .neon-pill-btn:focus-visible {
          filter: brightness(1.18) drop-shadow(0 0 11px #c2c6ffcc);
          transform: scale(1.06);
        }
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
