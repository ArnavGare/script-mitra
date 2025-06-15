
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

// Nav items: add id/route structure
const navLinks = [
  { name: "Home", to: "/" },
  { name: "Script Mitra", to: "/scriptmitra" },
  { name: "Hashtag Mitra", to: "/hashtagmitra" },
  { name: "Store", to: "/store" },
  // Future: { name: "Resources", to: "/resources" }, { name: "Blog", to: "/blog" },
];

type Props = {
  compact?: boolean;
};

export default function NavLinks({ compact }: Props) {
  const location = useLocation();
  return (
    <ul className="flex items-center gap-3 sm:gap-6 font-inter font-semibold text-white text-[1.02rem]">
      {navLinks.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.to}
            className={({ isActive }) =>
              `
                group relative px-2.5 py-1 transition-all duration-200 rounded-md
                ${
                  isActive
                    ? "text-[#A6FFEF] font-bold underline underline-offset-4"
                    : "text-white/90"
                }
              `
            }
            style={{
              letterSpacing: "0.03em",
              fontWeight: 600,
            }}
          >
            <span
              className="
                z-10 relative group-hover:text-neon-mint
                group-hover:drop-shadow-[0_2px_10px_#70fff7cc]
                transition-colors duration-200
              "
              style={{
                transition: "color 0.19s cubic-bezier(.46,.99,.56,1.25)",
              }}
            >
              {link.name}
            </span>
            {/* Animated underline on hover or active */}
            <span
              className={`
                pointer-events-none
                absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2.2px]
                rounded-lg bg-gradient-to-r from-cyan-400/90 via-violet-400/80 to-pink-500/80
                opacity-70 group-hover:w-full group-hover:opacity-100 transition-all duration-300
                ${location.pathname === link.to ? "w-full opacity-100" : ""}
              `}
              style={{
                transitionProperty: "width, opacity",
                transitionDuration: "300ms",
              }}
            />
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
