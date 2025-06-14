
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, PenLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeaderAuthButtons() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="outline"
        className="text-white border-cyan-400 border font-semibold font-inter rounded-full px-4 py-1.5 shadow-md bg-transparent hover:bg-cyan-900/20 transition-all duration-300 flex items-center gap-1.5"
        onClick={() => navigate("/auth/login")}
        style={{ height: 38, fontWeight: 600 }}
      >
        <LogIn size={17} className="mr-1 text-cyan-300" /> Login
      </Button>
      <Button
        variant="default"
        className="
          text-white bg-gradient-to-r from-[#246bfb] to-[#925fff] font-semibold font-inter rounded-full px-4 py-1.5 shadow-lg hover:brightness-110 hover:scale-[1.03] transition-all duration-300 flex items-center gap-1.5
        "
        onClick={() => navigate("/auth/signup")}
        style={{
          background: "linear-gradient(90deg,#246bfb 0%, #925fff 100%)",
          height: 38,
          fontWeight: 600,
        }}
      >
        <PenLine size={17} className="mr-1 text-white" /> Sign Up
      </Button>
      <Button
        variant="ghost"
        className="
          px-3 py-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-[#A06FFF]
          text-white font-bold rounded-full text-sm shadow-md neon-pill-btn
          relative transition-all duration-300 ml-1
        "
        style={{
          boxShadow: "0 2px 14px #00CFFF80, 0 2px 10px #a06fff50",
          borderRadius: 80,
          fontWeight: 700,
          height: 38,
        }}
        onClick={() => navigate("/#generate-scripts")}
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-5 h-5 -ml-1 shimmer-ltr" />
          <span>Get Your Free Script</span>
        </span>
      </Button>
    </div>
  );
}
