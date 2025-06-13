
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Sophisticated Moving Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        {/* Base gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient-x"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-float"></div>
          
          {/* Drifting particles */}
          <div className="absolute top-1/6 w-2 h-2 bg-white/20 rounded-full animate-drift" style={{ animationDelay: '0s', animationDuration: '25s' }}></div>
          <div className="absolute top-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-drift" style={{ animationDelay: '5s', animationDuration: '30s' }}></div>
          <div className="absolute top-1/2 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-drift" style={{ animationDelay: '10s', animationDuration: '20s' }}></div>
          <div className="absolute top-2/3 w-1 h-1 bg-cyan-300/30 rounded-full animate-drift" style={{ animationDelay: '15s', animationDuration: '35s' }}></div>
          
          {/* Orbiting elements */}
          <div className="absolute top-1/5 left-1/5">
            <div className="w-1 h-1 bg-white/30 rounded-full animate-orbit" style={{ animationDelay: '0s' }}></div>
          </div>
          <div className="absolute bottom-1/5 right-1/5">
            <div className="w-0.5 h-0.5 bg-blue-300/40 rounded-full animate-orbit" style={{ animationDelay: '12s', animationDuration: '20s' }}></div>
          </div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        </div>
      </div>

      {/* 404 Content */}
      <div className="relative z-10 text-center backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20 shadow-2xl">
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/90 mb-6">Oops! Page not found</p>
        <a 
          href="/" 
          className="notion-button-primary inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
