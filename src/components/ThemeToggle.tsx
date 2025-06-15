
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Sync with system and local preference
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return localStorage.getItem("theme") || getSystemTheme();
  });

  useEffect(() => {
    const handler = () => setTheme(getSystemTheme());
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
    return () =>
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      aria-label="Toggle color mode"
      className="theme-toggle-btn ml-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 
        border border-white/10 shadow transition-all duration-150 flex items-center"
      onClick={toggle}
      tabIndex={0}
      style={{
        boxShadow: "0 2px 12px #72ecff22",
        lineHeight: 1,
      }}
    >
      <span className="relative flex items-center">
        {theme === "dark" ? (
          <Sun size={20} className="text-cyan-200 transition-colors" />
        ) : (
          <Moon size={20} className="text-violet-300 transition-colors" />
        )}
      </span>
    </button>
  );
}
