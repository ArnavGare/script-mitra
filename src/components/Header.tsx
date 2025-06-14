import React, { useState, useEffect } from "react";
import { Menu, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Animated glowing announcement bar
function AnnouncementBar() {
  return (
    <div className="w-full bg-gradient-to-r from-[#4b006e] via-[#00132e] to-[#4b006e] py-2 px-4 flex items-center overflow-hidden border-t-0 border-b-2 border-b-[#2563eb]">
      <div className="w-full relative">
        <span
          className="absolute animate-marquee whitespace-nowrap text-xs md:text-sm font-semibold text-[#93c5fd] glow"
          style={{
            minWidth: "100%",
            willChange: "transform",
            letterSpacing: "0.02em",
          }}
        >
          🚀 Limited Time: Get Your Free Social Media Growth PDF Now! &nbsp;&nbsp;&nbsp;
          🚀 Limited Time: Get Your Free Social Media Growth PDF Now!
          &nbsp;&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
}

// Section IDs must match the ones in Index.tsx!
const navLinks = [
  { name: "Home", anchor: "home" },
  { name: "Generate Scripts", anchor: "generate-scripts" },
  { name: "Video Tips", anchor: "video-tips" },
  { name: "Grow on Social Media", anchor: "grow-social" },
  { name: "Store", anchor: "store" },
  { name: "Contact", anchor: "contact" },
];

function handleSmoothScroll(anchor: string) {
  // Add small timeout so page renders first if needed
  setTimeout(() => {
    const section = document.getElementById(anchor);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 0);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  // Authentication state
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");

  const navigate = useNavigate();

  // Set up listener for auth state change - BEST PRACTICE
  useEffect(() => {
    // Attach listener before fetching current session
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Determine display name
  useEffect(() => {
    if (!user) {
      setUserName("");
      return;
    }
    // Name may be in user.user_metadata, else fallback to email
    const meta = user.user_metadata || {};
    if (meta.name) {
      setUserName(meta.name);
    } else if (meta.full_name) {
      setUserName(meta.full_name);
    } else if (user.email) {
      // fallback to part before '@'
      setUserName(user.email.split("@")[0]);
    } else {
      setUserName("User");
    }
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setUserName("");
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Glow animated announcement */}
      <AnnouncementBar />
      {/* Sticky NAVBAR */}
      <header
        className={`
          sticky top-0 z-40 w-full
          transition-all duration-300
          ${shrink ? "backdrop-blur-md bg-[#181f2e]/90 shadow-md py-2" : "bg-transparent py-3"}
        `}
        style={{
          borderBottom: shrink
            ? "1.5px solid #312e81"
            : "1.5px solid transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleSmoothScroll("home")}>
            <span
              className="font-extrabold text-[1.5rem] md:text-2xl
                         text-white neon-text
                         tracking-wide animate-fade-in uppercase select-none"
              style={{
                fontFamily: '"Space Grotesk", Poppins, sans-serif',
                textShadow:
                  "0 0 8px #5eeeff, 0 0 18px #312e81, 0 0 24px #60a5fa",
              }}
            >
              Script Mitra
            </span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-2 lg:gap-4 xl:gap-6 items-center ml-4 flex-1 justify-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  type="button"
                  onClick={() => handleSmoothScroll(link.anchor)}
                  className="relative px-3 py-2 text-sm font-medium
                             text-[#b1b5dd] hover:text-[#5eeeff]
                             transition duration-200
                             after:absolute after:left-0 after:bottom-1 after:w-0 after:h-[2.5px]
                             after:bg-gradient-to-r after:from-[#9333ea] after:to-[#38bdf8]
                             after:rounded-md after:transition-all after:duration-300
                             hover:after:w-full
                             hover:bg-white/5 hover:backdrop-blur-md rounded-lg group
                             focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
                             "
                  style={{ letterSpacing: "0.03em" }}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Auth Buttons/Info - Desktop */}
          <div className="hidden md:flex gap-2 items-center ml-6">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth/login")}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <span className="text-white font-medium mr-2">{`Welcome, ${userName}`}</span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Call-to-action Button */}
          <button
            type="button"
            onClick={() => handleSmoothScroll("generate-scripts")}
            className="hidden md:inline-block ml-6 relative group"
            tabIndex={0}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white neon-gradient-bg shadow-cyan-500/20
              transition-all duration-300 text-base
              hover:scale-105 hover:shadow-lg
              ring-2 ring-purple-600/20 hover:ring-blue-400 focus-visible:ring-blue-400
              animate-fade-in-up"
            >
              <Sparkles className="w-5 h-5 -ml-1 text-sky-300 glow" />
              Get Your Free Script
            </span>
            {/* Glow background effect behind */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#9333ea] to-[#38bdf8] rounded-full blur-md opacity-25 group-hover:opacity-35 transition-all" />
          </button>

          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 rounded-lg z-50 relative neon-bg focus:outline-none"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open Menu"
          >
            <Menu className="w-7 h-7 text-[#83fab5] drop-shadow-[0_2px_12px_#512ea8]" />
          </button>
        </nav>
        {/* Mobile Slide Drawer */}
        <div
          className={`fixed md:hidden top-0 left-0 w-full h-full bg-[#161c30]/90 z-40 transition-all duration-300
          ${mobileOpen ? "translate-x-0 visible" : "-translate-x-full invisible"}
        `}
        >
          <div className="flex flex-col items-start px-6 pt-20 pb-10 gap-8 w-4/5 max-w-xs min-h-full
            bg-gradient-to-br from-[#312e81]/90 via-[#1e293b]/95 to-[#9333ea]/80
            shadow-2xl
            animate-slide-in-left
            "
          >
            <button
              className="mb-1 ml-auto p-2 rounded-full hover:bg-[#9333ea]/10"
              onClick={() => setMobileOpen(false)}
              aria-label="Close Menu"
            >
              <span className="block w-[32px] h-[32px] relative">
                <span className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-cyan-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                <span className="absolute left-1/2 top-1/2 w-6 h-0.5 bg-cyan-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
              </span>
            </button>
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                className="text-lg font-semibold text-white tracking-wide neon-mob-link
                  px-1 py-2 w-full rounded-lg
                  transition-transform duration-200
                  hover:scale-105 hover:text-cyan-400
                  hover:bg-slate-50/10
                "
                style={{ fontFamily: "Poppins, sans-serif" }}
                onClick={() => {
                  setMobileOpen(false);
                  handleSmoothScroll(link.anchor);
                }}
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Auth Buttons */}
            {!user ? (
              <div className="w-full flex flex-col gap-3 mt-2 mb-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/auth/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/auth/signup");
                  }}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3 mt-2 mb-6">
                <span className="text-white font-medium">{`Welcome, ${userName}`}</span>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleSmoothScroll("generate-scripts");
              }}
              className="w-full mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-white neon-gradient-bg transition-all text-base shadow-xl
                  hover:scale-105 focus-visible:ring-2 ring-cyan-300"
              style={{
                fontFamily: '"Space Grotesk", Poppins, sans-serif',
              }}
            >
              <Sparkles className="w-6 h-6 mr-2 text-sky-300 glow" />
              Get Your Free Script
            </button>
          </div>
          {/* Click-away bg */}
          <div
            className="fixed inset-0 z-0"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      </header>

      {/* Custom styles for glow/text effects */}
      <style>{`
        .neon-text {
          text-shadow: 
            0 0 2.5px #67e8f9,
            0 0 8px #6366f1,
            0 0 16px #c084fc,
            0 0 36px #67e8f9;
        }
        .neon-gradient-bg {
          background: linear-gradient(90deg, #a21caf 0%, #2563eb 55%, #22d3ee 100%);
          box-shadow: 0 0 16px 0 #1e40af88, 0 0 32px 0 #c084fc77;
        }
        .glow {
          filter: drop-shadow(0 0 5px #67e8f9) drop-shadow(0 0 12px #9333ea60);
        }
        .animate-marquee {
          animation: marquee 16s linear infinite;
        }
        @keyframes marquee {
          0% { left: 0; }
          100% { left: -100%; }
        }
        .neon-bg {
          background: linear-gradient(120deg, #312e81 20%, #9333ea 70%, #38bdf8 100%);
          box-shadow: 0 0 10px #60a5fa44;
        }
        .neon-mob-link {
          text-shadow: 0 0 7px #38bdf8, 0 0 13px #9333ea33;
        }
        @media (max-width: 767px) {
          .animate-marquee { font-size: 1rem; }
        }
      `}</style>
    </>
  );
}
