import React from "react";

const ACCESS_KEY = "aiisfuture";
const LOCALSTORAGE_KEY = "access_key_entered";

export default function LandingGuard({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = React.useState<boolean>(false);
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [animating, setAnimating] = React.useState(true);

  // Check key on mount
  React.useEffect(() => {
    if (localStorage.getItem(LOCALSTORAGE_KEY) === ACCESS_KEY) {
      setHasAccess(true);
    }
    setAnimating(false);
  }, []);

  // Guard: block interaction w/ page if not unlocked
  if (!hasAccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-tr from-[#181d2b] via-[#24335c] to-[#06070e] min-h-screen z-[9999]">
        <div
          className="backdrop-blur-lg bg-white/10 dark:bg-slate-800/60 border border-white/20 rounded-xl shadow-2xl px-7 py-9 min-w-[340px] max-w-sm w-full flex flex-col items-center animate-fade-in-up"
          style={{
            boxShadow: "0 8px 48px 0 rgba(90,40,210,0.12), 0 2px 12px 1.5px rgba(0,99,255,0.14)",
            transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
            animation: animating ? "fadeInUp 0.85s cubic-bezier(.34,.37,.38,.95)" : undefined
          }}
        >
          <h2 className="text-2xl font-sf-pro font-bold mb-6 text-white/80 tracking-tight drop-shadow">
            🔐 Enter Access Key to Continue
          </h2>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              if (input === ACCESS_KEY) {
                localStorage.setItem(LOCALSTORAGE_KEY, ACCESS_KEY);
                setHasAccess(true);
              } else {
                setError("❌ Incorrect access key. Try again.");
                setInput("");
              }
            }}
            autoComplete="off"
          >
            <input
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-slate-300/20 dark:border-slate-700/30 text-white/90 placeholder:text-gray-200 text-lg font-medium outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
              type="password"
              inputMode="text"
              autoFocus
              value={input}
              spellCheck={false}
              placeholder="Enter key..."
              onChange={e => {
                setError("");
                setInput(e.target.value);
              }}
              data-testid="access-key-input"
            />
            <button
              type="submit"
              className="neon-pill-btn py-2.5 text-lg font-semibold rounded-lg w-full mt-2 shadow-md transition-all active:scale-[0.98]"
            >
              Submit
            </button>
            <div
              className={`w-full min-h-[24px] text-center text-base transition-all ${
                error ? "opacity-100 text-red-400 animate-fade-in" : "opacity-0"
              }`}
              style={{ minHeight: 28, marginTop: -6 }}
              data-testid="access-key-error"
            >
              {error}
            </div>
          </form>
          <style>{`
            @keyframes fadeInUp {
              from { opacity:0; transform: translateY(40px);}
              to {opacity:1; transform: translateY(0);}
            }
            .animate-fade-in-up {
              animation: fadeInUp 0.7s cubic-bezier(.24,.74,.58,.97) both;
            }
            .neon-pill-btn {
              background: linear-gradient(92deg,#00cfff 18%,#a06fff 92%);
              box-shadow: 0 2px 16px #33fdf855, 0 2px 10px #a06fff48;
              color: #fff !important;
              transition: filter .23s, transform .22s;
            }
            .neon-pill-btn:hover, .neon-pill-btn:focus-visible {
              filter: brightness(1.1) drop-shadow(0 0 13px #c2c6ffcc);
              transform: scale(1.04);
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Render main app if access key is entered
  return <>{children}</>;
}

// Utility to clear access key (for logout, to be used elsewhere)
export function logoutAccessKey() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  // Ideally: also refresh the page or trigger guard to re-show the screen.
}
