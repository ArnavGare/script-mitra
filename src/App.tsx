import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LandingGuard from "./components/LandingGuard";
import HashtagsMitra from "./pages/HashtagsMitra";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <LandingGuard>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hashtags-mitra" element={<HashtagsMitra />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LandingGuard>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
