
import React, { useState } from "react";
import { Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import HeaderAuthButtons from "./HeaderAuthButtons";
import Logo from "./Logo";

type Props = {
  onNavClick?: (anchor: string) => void;
};

export default function HeaderMobileMenu({ onNavClick }: Props) {
  const [open, setOpen] = useState(false);

  // Wrap the nav click to also close the menu
  const handleNavigate = (anchor: string) => {
    if (onNavClick) {
      onNavClick(anchor);
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
        <div className="fixed inset-0 z-[200] bg-[#181731e8] backdrop-blur-2xl flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5">
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
          <nav className="flex flex-col items-center justify-center flex-1 gap-8 text-lg">
            <NavLinks
              onNavigate={handleNavigate}
              compact
            />
          </nav>
          <div className="pb-10 flex justify-center">
            <HeaderAuthButtons />
          </div>
        </div>
      )}
    </>
  );
}
