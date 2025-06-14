
import React, { useState, useEffect } from "react";
import { Menu, Sparkles, LogIn, PenLine, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

// Utility (CSS-in-JS, but for brevity delegating to index.css for large effects)
const BRAND_NAME = "SCRIPT MITRA";

// Nav config
const navLinks = [
  { name: "Home", anchor: "home" },
  { name: "Generate Scripts", anchor: "generate-scripts" },
  { name: "Video Tips", anchor: "video-tips" },
  { name: "Grow on Social Media", anchor: "grow-social" },
  { name: "Store", anchor: "store" },
  { name: "Contact", anchor: "contact" },
];

function handleSmoothScroll(anchor: string) {
  setTimeout(() => {
    const section = document.getElementById(anchor);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 0);
}

// Glass shadow for sticky header
function useHeaderScroll(setShrink: (v: boolean) => void) {
  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShrink]);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  // Dark mode support
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode((m) => !m);
  };

  useHeaderScroll(setShrink);

  // Auth state
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setUserName("");
      return;
    }
    const meta = user.user_metadata || {};
    if (meta.name) setUserName(meta.name);
    else if (meta.full_name) setUserName(meta.full_name);
    else if (user.email) setUserName(user.email.split("@")[0]);
    else setUserName("User");
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setUserName("");
    navigate("/", { replace: true });
  };

  // For staggered mobile nav animation
  const staggerVariants = [
    "delay-[0ms]","delay-[60ms]","delay-[120ms]","delay-[180ms]","delay-[240ms]","delay-[300ms]"
  ];

  return (
    <>
      {/* Animated Glow Announcement */}
      <div className="w-full bg-gradient-to-r from-[#4b006e] via-[#00132e] to-[#4b006e] py-2 px-4 flex items-center overflow-hidden border-t-0 border-b-2 border-b-[#5eeeffdd] shadow-[0_2px_16px_#67e8f933] select-none">
        <span
          className="animate-marquee whitespace-nowrap text-xs md:text-sm font-semibold text-[#93c5fd]/90 font-inter"
        >
          🚀 Limited Time: Download Your Free Social Media Growth PDF Now! &nbsp;&nbsp;&nbsp;
          🚀 Limited Time: Download Your Free Social Media Growth PDF Now!
        </span>
      </div>
      {/* Header */}
      <header
        className={`
          sticky top-0 z-[100] w-full shadow-premium
          transition-all duration-300
          ${shrink
            ? "backdrop-blur-xl bg-white/70 dark:bg-[#0d1020]/70"
            : "backdrop-blur-xl bg-white/60 dark:bg-[#0d1020]/65"
          }
          border-b border-[#00000022]
        `}
        style={{
          boxShadow: shrink
            ? "0 4px 24px 0 rgba(62,50,169,0.08), 0px 4px 16px rgba(0,0,0,0.15)"
            : "0 4px 16px 0 rgba(0,0,0,0.10)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* NAV */}
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-[66px]">
          {/* Brand */}
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => handleSmoothScroll("home")}
          >
            <span className="font-extrabold text-[1.7rem] md:text-[2.1rem] uppercase select-none brand-gradient tracking-wide font-inter block"
              style={{ letterSpacing: "0.08em" }}>
              {BRAND_NAME}
            </span>
          </div>

          {/* Desktop NAV LINKS */}
          <ul className="hidden md:flex gap-2.5 items-center ml-4 flex-1 justify-center">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <button
                  type="button"
                  onClick={() => handleSmoothScroll(link.anchor)}
                  className={`
                    nav-link-premium px-3 py-1.5 text-[1.07rem] font-semibold
                     font-inter rounded-lg relative
                  ${staggerVariants[i]}
                   transition-all duration-300`}
                  style={{ letterSpacing: "0.045em" }}
                >
                  {link.name}
                  <span className="nav-underline" />
                </button>
              </li>
            ))}
          </ul>
          {/* Desktop AUTH */}
          <div className="hidden md:flex gap-2 items-center ml-6">
            {!user ? (
              <>
                <Button
                  variant="ghost"
                  className="btn-pill-white flex items-center text-base font-inter font-semibold px-4 py-2 mr-1 group border-0"
                  onClick={() => navigate("/auth/login")}
                  style={{ borderRadius: "999px" }}
                >
                  <LogIn className="mr-2 text-[#1e293b] group-hover:rotate-[12deg] group-hover:scale-110 transition-transform duration-300" size={20} />
                  Login
                </Button>
                <Button
                  variant="default"
                  className="btn-pill-signup flex items-center text-base font-inter font-semibold px-4 py-2 group ml-1"
                  onClick={() => navigate("/auth/signup")}
                  style={{ borderRadius: "999px" }}
                >
                  <PenLine className="mr-2 group-hover:-rotate-12 group-hover:scale-108 transition-transform duration-300" size={20} />
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <span className="text-gray-900 dark:text-white font-inter font-semibold mr-2 tracking-wide">{`Welcome, ${userName}`}</span>
                <Button
                  variant="ghost"
                  className="btn-pill-white px-4 py-2 text-base ml-1"
                  onClick={handleLogout}
                  style={{ borderRadius: "999px" }}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
          {/* Desktop CTA */}
          <button
            type="button"
            onClick={() => handleSmoothScroll("generate-scripts")}
            className="hidden md:inline-block ml-3 cta-premium group relative overflow-visible hover:scale-105"
            tabIndex={0}
          >
            <span className="inline-flex items-center gap-2 px-6 py-2.5 font-bold text-[1.09rem] font-inter rounded-full z-10">
              <Sparkles className="w-6 h-6 -ml-1 text-[#4bcafe] shimmer-ltr group-hover:animate-fly" />
              Get Your Free Script
              <span className="ml-1 text-lg animate-fly">📝</span>
            </span>
            <span className="absolute inset-0 -z-1 neon-glow-gradient opacity-70 group-hover:opacity-100" />
          </button>
          {/* Dark/Light Toggle */}
          <button
            className="ml-4 md:ml-6 p-2 rounded-full bg-white/80 dark:bg-black/70 border-2 border-[#e0e7ee50] shadow transition-all ring-0 ring-cyan-100/0 hover:ring-4 hover:ring-cyan-200/40 icon-dark-toggle hover:rotate-[20deg]"
            onClick={toggleDark}
            aria-label="Toggle Dark Mode"
            style={{
              transition: "transform 0.3s cubic-bezier(.7,.1,.7,.9), box-shadow 0.3s",
            }}
          >
            {darkMode ? <Moon size={20} className="text-black dark:text-gray-100" /> : <Sun size={20} className="text-blue-700" />}
          </button>
          {/* Hamburger for Mobile */}
          <button
            className="md:hidden p-2 rounded-full neon-bg z-50 relative group focus:outline-none transition-all"
            aria-label="Open Menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-7 h-7 text-[#38bdf8] drop-shadow-[0_2px_12px_#4f46e5bb] group-hover:scale-110 transition-all duration-300" />
          </button>
        </nav>
        {/* Mobile Glass Drawer */}
        <div
          className={`fixed md:hidden inset-0 z-[200] bg-[#e2e8f02a] dark:bg-[#131434dd] backdrop-blur-2xl transition-transform duration-500 ease-in-out
           ${mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
         `}
        >
          <div className="flex flex-col items-start px-8 pt-20 pb-10 gap-8 w-full min-h-full
            glass-card bg-white/60 dark:bg-[#171b2c]/70 shadow-xl rounded-none"
            style={{ backdropFilter: "blur(32px)" }}
          >
            <button
              className="absolute right-4 top-5 p-3 rounded-full bg-white/60 dark:bg-[#181c29]/85 hover:bg-blue-100/60 group"
              onClick={() => setMobileOpen(false)}
              aria-label="Close Menu"
            >
              <span className="block w-[30px] h-[30px] relative">
                <span className="absolute left-1/2 top-1/2 w-7 h-0.5 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                <span className="absolute left-1/2 top-1/2 w-7 h-0.5 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
              </span>
            </button>
            {navLinks.map((link, i) => (
              <button
                key={link.name}
                type="button"
                className={`w-full text-lg font-bold font-inter tracking-wide my-2 nav-link-premium-mob fade-in-up ${staggerVariants[i]}
                 ${mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
                  `}
                style={{
                  letterSpacing: "0.06em",
                  transitionDelay: `${i * 80 + 80}ms`,
                  transition: "all 0.32s cubic-bezier(.54,1.9,.46,.73)",
                }}
                onClick={() => {
                  setMobileOpen(false);
                  handleSmoothScroll(link.anchor);
                }}
              >
                {link.name}
              </button>
            ))}
            {/* Mobile Auth */}
            {!user ? (
              <div className="w-full flex flex-col gap-3 mt-2 mb-6">
                <Button
                  variant="ghost"
                  className="btn-pill-white w-full flex items-center justify-center text-lg font-inter font-semibold px-4 py-2 group border-0"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/auth/login");
                  }}
                  style={{ borderRadius: "999px" }}
                >
                  <LogIn className="mr-2 text-[#1e293b] group-hover:rotate-[12deg] transition-transform duration-300" size={20} />
                  Login
                </Button>
                <Button
                  variant="default"
                  className="btn-pill-signup w-full flex items-center justify-center text-lg font-inter font-semibold px-4 py-2 group"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/auth/signup");
                  }}
                  style={{ borderRadius: "999px" }}
                >
                  <PenLine className="mr-2 group-hover:-rotate-12 transition-transform duration-300" size={20} />
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-3 mt-2 mb-6">
                <span className="text-gray-900 dark:text-gray-50 font-inter font-semibold">
                  {`Welcome, ${userName}`}
                </span>
                <Button
                  variant="ghost"
                  className="btn-pill-white w-full px-4 py-2 text-lg"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  style={{ borderRadius: "999px" }}
                >
                  Logout
                </Button>
              </div>
            )}

            {/* CTA Mobile */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                handleSmoothScroll("generate-scripts");
              }}
              className="w-full mt-2 cta-premium group relative inline-flex items-center justify-center px-5 py-3 mb-4 font-bold text-white text-lg font-inter rounded-full neon-glow-gradient z-10"
              style={{
                borderRadius: "50px",
                fontFamily: "Inter, Satoshi, sans-serif",
                boxShadow: "0 2px 18px 0 #1e40af3c, 0 2px 24px 0 #c084fc44",
              }}
            >
              <Sparkles className="w-6 h-6 mr-2 text-[#38bdf8] shimmer-ltr group-hover:animate-fly" />
              Get Your Free Script
              <span className="ml-2 animate-fly">✨</span>
            </button>
          </div>
          {/* Glass click-away */}
          <div
            className="fixed inset-0 z-0"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      </header>
      {/* CSS */}
      <style>{`
        .brand-gradient {
          background: linear-gradient(72deg,#00d1ff 14%,#ad53fa 85%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .neon-glow-gradient {
          background: linear-gradient(87deg, #3a9cff 0%, #ad67fa 108%);
          filter: drop-shadow(0 0 14px #7dd3fc90);
          border-radius: 50px;
          pointer-events: none;
        }
        .cta-premium {
          background: linear-gradient(90deg, #3a9cff 20%, #9552e8 100%);
          color: #fff;
          border-radius: 50px;
          box-shadow: 0 4px 18px #67e8f941, 0 4px 18px #a78bfa61;
          font-weight: 700;
          position: relative;
          overflow: visible;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .cta-premium:hover {
          box-shadow: 0 4px 32px #3b82f680, 0 2px 18px #a78bfa90,0 1.5px 18px #ad67fa80;
          filter: brightness(1.10) drop-shadow(0 0 28px #67e8f9d1);
          transform: scale(1.045) translateY(-2px);
        }
        .shimmer-ltr {
          animation: shimmer 2.2s linear infinite;
        }
        @keyframes shimmer {
          0% { filter: brightness(1.08); }
          40% { filter: brightness(1.40); }
          100% { filter: brightness(1.08); }
        }
        @keyframes fly {
          0% { transform: translateY(0px) scale(1); opacity:.95; }
          25% { transform: translateY(-7px) scale(1.12); opacity:0.77; }
          80% { transform: translateY(1px) scale(1.06); opacity:1; }
          100% { transform: translateY(0px) scale(1); opacity:.95; }
        }
        .animate-fly { animation: fly 2.1s ease-in-out infinite alternate; }
        .shadow-premium {
          box-shadow: 0px 8px 40px 0 #2be7ff17, 0 2px 24px #faf7fa22, 0 4px 24px #00000032 !important;
        }
        /* Glass Card Mobile */
        .glass-card {
          background: rgba(255,255,255,0.88);
          border-radius: 24px;
          box-shadow: 0 2px 42px 0 #ad67fa1a, 0 4px 28px #38bdf833;
          backdrop-filter: blur(24px);
        }
        .btn-pill-white {
          background: #fff;
          color: #181c29;
          border-radius: 999px;
          box-shadow: 0 2px 13px #7dd3fc11;
          transition: background 0.22s, color 0.22s, box-shadow 0.22s;
        }
        .btn-pill-white:hover {
          background: #f0f5ff;
          color: #333;
        }
        .btn-pill-signup {
          background: linear-gradient(90deg,#19b0ff 0%, #8e55e9 100%);
          color:white;
          border-radius:999px;
          box-shadow:0 2px 18px #67e8f922;
        }
        .btn-pill-signup:hover {
          filter:brightness(1.085) saturate(1.07);
        }
        .icon-dark-toggle {
          transition: box-shadow 0.2s, transform 0.25s cubic-bezier(.63,.36,.29,.87);
        }
        /* Nav Link Hover (Underline Animation) */
        .nav-link-premium, .nav-link-premium-mob {
          background: transparent;
          color: #17203d;
          position: relative;
          overflow: visible;
          font-family: Inter, Satoshi, 'Poppins', 'Space Grotesk',sans-serif;
          border: none;
          outline: none;
          transition: color .3s cubic-bezier(.55,.06,.64,.98), text-shadow .3s, letter-spacing .24s;
        }
        .nav-link-premium .nav-underline,
        .nav-link-premium-mob .nav-underline {
          pointer-events: none;
          display: block;
          position: absolute;
          left: 0;
          bottom: 2px;
          height: 2.5px;
          width: 0%;
          background: linear-gradient(90deg, #45f4f9 22%, #ad67fa 100%);
          border-radius: 2px;
          transition: width .35s cubic-bezier(.45,.12,.62,.74);
        }
        .nav-link-premium:hover, .nav-link-premium:focus-visible,
        .nav-link-premium-mob:hover, .nav-link-premium-mob:focus-visible {
          color: #67e8f9;
          letter-spacing: 0.12em;
        }
        .nav-link-premium:hover .nav-underline,
        .nav-link-premium:focus-visible .nav-underline,
        .nav-link-premium-mob:hover .nav-underline,
        .nav-link-premium-mob:focus-visible .nav-underline {
          width: 100%;
        }
        /* Mobile nav fade animation */
        .fade-in-up {
          opacity: 0;
          transform: translateY(24px);
          animation: mobnavfadeup 0.7s forwards;
        }
        @keyframes mobnavfadeup {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Animate marquee (for announcement) */
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          0% { left: 0; }
          100% { left: -100%; }
        }
        @media (max-width: 767px) {
          .brand-gradient { font-size:1.24rem !important; }
        }
      `}</style>
    </>
  );
}

