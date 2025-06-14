
import React from "react";
import { LogIn, PenLine, Sparkles } from "lucide-react";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { useNavigate } from "react-router-dom";

// Helper for scroll on the same page
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
};

export default function HeaderAuthButtons() {
  const { user, isLoading } = useSupabaseUser();
  const navigate = useNavigate();

  // Hide login/signup buttons if the user is logged in
  if (!isLoading && user) return null;

  return (
    <div className="flex gap-2 items-center">
      <button
        className="
          bg-white text-[#11163b] font-semibold font-inter rounded-full px-4 py-1.5 shadow-md border border-white
          flex items-center gap-1 transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:bg-[#e6e7f2] active:scale-100
        "
        style={{ height: 38, fontWeight: 600 }}
        onClick={() => {
          // Try scroll, otherwise navigate to "/auth/login"
          if (!scrollToSection("auth-login")) {
            navigate("/auth/login");
          }
        }}
        type="button"
      >
        <LogIn size={17} className="mr-1 text-[#246bfb]" />
        Login
      </button>
      <button
        className="
          bg-white text-[#11163b] font-semibold font-inter rounded-full px-4 py-1.5 shadow-md border border-white
          flex items-center gap-1 transition-all duration-300
          hover:scale-105 hover:shadow-lg hover:bg-[#e6e7f2] active:scale-100
        "
        style={{ height: 38, fontWeight: 600 }}
        onClick={() => {
          // Try scroll, otherwise navigate to "/auth/signup"
          if (!scrollToSection("auth-signup")) {
            navigate("/auth/signup");
          }
        }}
        type="button"
      >
        <PenLine size={17} className="mr-1 text-[#925fff]" />
        Sign Up
      </button>
      <button
        className="
          bg-white text-[#11163b] font-bold font-inter px-4 py-1.5
          rounded-[50px] shadow-md border border-white relative
          flex items-center gap-1.5 transition-all duration-300
          hover:bg-gradient-to-r hover:from-cyan-400 hover:to-[#A06FFF]
          hover:text-white hover:shadow-[0_0_22px_3px_rgba(90,198,250,0.28)]
          hover:scale-105 active:scale-100
        "
        style={{
          fontWeight: 700,
          height: 38,
        }}
        onClick={() => scrollToSection("generate-scripts")}
        type="button"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 -ml-1 text-[#00CFFF]" />
          <span>Get Your Free Script</span>
        </span>
      </button>
    </div>
  );
}
