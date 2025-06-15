
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAccessKey } from "@/context/AccessKeyContext";
import { useNavigate } from "react-router-dom";

// A big, neon, circular floating logout button (bottom right)
export default function FloatingLogoutButton() {
  const { hasAccess, logout } = useAccessKey();
  const navigate = useNavigate();

  if (!hasAccess) return null;

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      aria-label="Logout"
      className="
        fixed bottom-7 right-7 z-[12000]
        w-16 h-16 rounded-full flex flex-col items-center justify-center
        bg-gradient-to-br from-rose-500 via-cyan-500 to-purple-600
        shadow-xl border-4 border-white/80
        animate-pulse-slow
        hover:scale-110 hover:shadow-2xl
        transition-all duration-200
        group
      "
      style={{
        boxShadow: "0 8px 32px 0 #00fff899, 0 4px 16px 0 #e73ff299",
      }}
    >
      <LogOut size={34} className="text-white drop-shadow group-hover:scale-110 transition" />
      <span className="mt-1 text-xs font-bold text-white drop-shadow">Logout</span>
    </button>
  );
}
