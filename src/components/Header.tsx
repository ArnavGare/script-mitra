
import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import HeaderMobileMenu from "./HeaderMobileMenu";
import { useAccessKey } from "@/context/AccessKeyContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Header() {
  const navAnchorToId: Record<string, string> = {
    home: "home",
    "generate-scripts": "generate-scripts",
    store: "store",
    "about": "about-automation-mitra"
  };

  const handleNavClick = (anchor: string) => {
    const id = navAnchorToId[anchor];
    if (id) scrollToSection(id);
  };

  const { hasAccess, logout } = useAccessKey();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  // Prominent button style for Header Logout
  const logoutBtn = hasAccess ? (
      <Button
        onClick={handleLogout}
        variant="secondary"
        size="sm"
        aria-label="Logout"
        className="!bg-gradient-to-br !from-rose-600 !to-cyan-500 border border-cyan-300 !text-white font-bold relative z-50 shadow glow-on-hover hover:scale-105"
        style={{ minWidth: 90 }}
      >
        <LogOut className="w-4 h-4 text-white" />
        <span>Logout</span>
      </Button>
  ) : null;

  return (
    <header
      className="
        sticky top-0 z-[100] w-full
        bg-[#0C1827]/85 backdrop-blur-xl
        h-[66px] shadow
        border-b border-cyan-900/[0.10]
        transition-all duration-300
        flex items-center
      "
      style={{
        boxShadow: "0 2px 16px rgba(0,32,64,0.11)",
        minHeight: 66,
      }}
    >
      <div className="w-full flex items-center justify-between px-5 sm:px-8 mx-auto max-w-7xl">
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <nav className="hidden md:flex items-center flex-1 justify-center gap-3">
          {/* Insert Logout next to Store via extraElement prop */}
          <NavLinks extraElement={logoutBtn} />
        </nav>
        <div className="md:hidden flex items-center">
          <HeaderMobileMenu onNavClick={handleNavClick} onLogout={handleLogout} hasAccess={hasAccess} />
        </div>
      </div>
      <style>{`
        .glow-on-hover:hover, .glow-on-hover:focus-visible {
          box-shadow: 0 2px 12px 0 #4fdbff66, 0 0px 8px #26ffee33;
          filter: brightness(1.17) drop-shadow(0 0 14px #7de7fd88);
          border-color: #7de7fd;
        }
        .neon-pill-btn {
          box-shadow: 0 2px 16px #1cf6c233, 0 2px 10px #7265ff88;
          background: linear-gradient(92deg,#1cf6c2 18%,#7265ff 92%);
        }
        .neon-pill-btn:hover, .neon-pill-btn:focus-visible {
          filter: brightness(1.15) drop-shadow(0 0 12px #b5fafdcc);
          transform: scale(1.05);
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
