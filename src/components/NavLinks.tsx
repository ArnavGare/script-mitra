
import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Generate Scripts", anchor: "generate-scripts" },
  { name: "Hashtags Mitra", to: "/hashtags-mitra" },
  { name: "Store", anchor: "store" },
];

type Props = {
  onNavigate?: (anchor: string) => void;
  compact?: boolean;
};

export default function NavLinks({ onNavigate, compact }: Props) {
  return (
    <ul className="flex items-center gap-3 sm:gap-5">
      {navLinks.map((link) => (
        <li key={link.name}>
          {link.to ? (
            <Link
              to={link.to}
              className="relative px-2 py-1 sm:px-3 font-semibold text-[1.01rem]
                tracking-wide font-inter transition-all duration-300 group"
              style={{ letterSpacing: "0.05em" }}
            >
              <span className="relative z-10 text-white group-hover:text-cyan-300 group-hover:drop-shadow-[0_1px_8px_#7de7fd] transition-colors duration-300">
                {link.name}
              </span>
              <span
                className="absolute left-0 bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 group-hover:w-full"
              />
            </Link>
          ) : (
            <button
              type="button"
              className="relative px-2 py-1 sm:px-3 font-semibold text-[1.01rem]
                tracking-wide font-inter transition-all duration-300 group"
              style={{ letterSpacing: "0.05em" }}
              onClick={() => onNavigate?.(link.anchor!)}
            >
              <span className="relative z-10 text-white group-hover:text-cyan-300 group-hover:drop-shadow-[0_1px_8px_#7de7fd] transition-colors duration-300">
                {link.name}
              </span>
              <span
                className="absolute left-0 bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 group-hover:w-full"
              />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

