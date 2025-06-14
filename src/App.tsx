
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Home from "./pages/Home";
import GenerateScripts from "./pages/GenerateScripts";
import VideoTips from "./pages/VideoTips";
import GrowOnSocial from "./pages/GrowOnSocial";
import Store from "./pages/Store";
import Contact from "./pages/Contact";

// Simple fade page transition for routes
function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location.pathname]);
  return (
    <div
      key={location.pathname}
      className="animate-fade-in transition-opacity duration-300 min-h-screen bg-background"
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/generate-scripts" element={<GenerateScripts />} />
        <Route path="/video-tips" element={<VideoTips />} />
        <Route path="/grow-on-social" element={<GrowOnSocial />} />
        <Route path="/store" element={<Store />} />
        <Route path="/contact" element={<Contact />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
