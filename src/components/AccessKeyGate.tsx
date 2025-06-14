
import React, { useState } from "react";
import { storeAccessKey, useAccessKey } from "@/context/AccessKeyContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SECRET = "aiisfuture";

export default function AccessKeyGate({ children }: { children: React.ReactNode }) {
  const { hasAccess } = useAccessKey();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  if (hasAccess) return <>{children}</>;

  // Glassmorphism + dark mode container design
  return (
    <div className="fixed z-[99999] inset-0 min-h-screen min-w-full flex items-center justify-center bg-black/80 select-none">
      <div
        className="w-[95vw] max-w-md p-7 rounded-2xl shadow-2xl bg-white/10 border border-white/20 dark:bg-black/40
          dark:backdrop-blur-2xl backdrop-blur-xl transition-[box-shadow,transform] duration-500
          flex flex-col items-center relative"
        style={{ animation: "fadeInUp 0.8s cubic-bezier(.55,.12,.62,.85)" }}
      >
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-white/95 tracking-tight">
          <span className="text-3xl mr-1">🔐</span> Enter Access Key to Continue
        </h1>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={e => {
            e.preventDefault();
            setIsEntering(true);
            setTimeout(() => {
              if (input === SECRET) {
                storeAccessKey();
                window.location.reload(); // Reload entire app so context updates everywhere
              } else {
                setError(true);
                setIsEntering(false);
              }
            }, 370);
          }}
        >
          <Input
            autoFocus
            type="password"
            autoComplete="current-password"
            className={
              "glass-input py-3 px-4 text-lg rounded-lg transition" +
              (error ? " border-red-500 animate-shake" : " border-white/30")
            }
            value={input}
            placeholder="Access Key"
            onChange={e => {
              setInput(e.target.value);
              setError(false);
            }}
            disabled={isEntering}
          />
          <Button
            type="submit"
            size="lg"
            className={
              "w-full shadow-lg glass-input text-base font-medium uppercase tracking-wide" +
              (isEntering ? " opacity-80 pointer-events-none" : "")
            }
            disabled={isEntering}
          >
            {isEntering ? "Checking..." : "Submit"}
          </Button>
        </form>
        {error && (
          <div
            className="text-red-400 text-sm mt-3 font-medium transition-all animate-fade-in-up"
            style={{ minHeight: 28, animation: "fadeInUp 0.35s" }}
          >
            <span className="mr-1">❌</span> Incorrect access key. Try again.
          </div>
        )}
        <style>{`
          .glass-input {
            background: rgba(249, 250, 255, 0.14);
            border: 1.5px solid rgba(230,230,255,0.12);
            transition: box-shadow 0.25s, border 0.25s;
          }
          .glass-input:focus {
            outline: none;
            border-color: #60a5fa;
            box-shadow: 0 2px 24px #38bdf833, 0 1.5px 8px #a06fff17;
          }
          @media (prefers-color-scheme: dark) {
            .glass-input {
              background: rgba(36,21,44,0.28);
              color: #fff;
            }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(28px) scale(0.97);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
          @keyframes shake {
            0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-6px);}40%,80%{transform:translateX(6px);}
          }
          .animate-shake { animation: shake 0.42s cubic-bezier(.56,.08,.57,.61); }
        `}</style>
      </div>
    </div>
  );
}
