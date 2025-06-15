
import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

type Props = {
  onNavClick?: (anchor: string) => void;
  onLogout?: () => void;
  hasAccess?: boolean;
};

export default function HeaderMobileMenu({ onNavClick, onLogout, hasAccess }: Props) {
  const [open, setOpen] = useState(false);

  // Wrap the nav click to also close the menu
  const handleNavigate = (anchor: string) => {
    if (onNavClick) {
      onNavClick(anchor);
    }
    setOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-full bg-[#191934] hover:bg-[#22224b] border border-cyan-700 shadow hover:scale-105 transition-all duration-300"
        aria-label="Open Menu"
      >
        <Menu className="w-7 h-7 text-cyan-300" />
      </button>
      {open && (
        <div className="fixed inset-0 z-[200] flex justify-center items-start bg-[#181731e8] backdrop-blur-xl">
          {/* Menu card */}
          <div className="w-full max-w-sm mx-auto mt-7 rounded-3xl bg-[#181a2d]/95 backdrop-blur-2xl border border-[#202042] shadow-xl transition-all duration-300 flex flex-col pb-7 relative animate-fade-in" style={{ boxShadow: "0 8px 52px #000a4a22, 0 0px 8px #7de7fd33" }}>
            <div className="flex items-center justify-between px-6 py-5 border-b border-cyan-900/20">
              <Logo />
              <button
                className="p-3 rounded-full bg-[#22224b] hover:bg-cyan-900 text-cyan-200 transition"
                onClick={() => setOpen(false)}
                aria-label="Close Menu"
              >
                <span className="block w-[26px] h-[26px] relative">
                  <span className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                  <span className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
                </span>
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center px-5 pt-5 pb-3 gap-6">
              <NavLinks compact />
            </nav>
            <div className="h-px bg-cyan-900/25 w-11/12 mx-auto mb-3 rounded" />
            <div className="flex justify-center items-center px-4">
              {/* Logout button if user is logged in */}
              {hasAccess && (
                <button
                  onClick={handleLogout}
                  className="notion-button-secondary w-full flex items-center justify-center py-2 mt-1 rounded font-medium transition-colors duration-150 gap-2"
                  style={{
                    outline: "none",
                    border: "none",
                    background: "rgba(88,65,176,0.15)",
                    color: "#ffe",
                  }}
                >
                  <LogOut className="mr-1 w-5 h-5" /> Logout
                </button>
              )}
            </div>
            {/* Decorative bottom glow */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none opacity-80">
              <div className="w-32 h-9 blur-2xl rounded-full bg-gradient-to-r from-[#7de7fd77] via-[#522fff44] to-[#a06fff66]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
