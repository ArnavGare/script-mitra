import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HashtagsMitra from "./pages/HashtagsMitra";
import { AccessKeyProvider } from "@/context/AccessKeyContext";
import AccessKeyGate from "@/components/AccessKeyGate";
import GenerateScriptsPage from "./pages/GenerateScriptsPage";
import StorePage from "./pages/StorePage";

const queryClient = new QueryClient();

const App = () => (
  <AccessKeyProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AccessKeyGate>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hashtags-mitra" element={<HashtagsMitra />} />
              <Route path="/generate-scripts" element={<GenerateScriptsPage />} />
              <Route path="/store" element={<StorePage />} />
              {/* Instead of NotFound, redirect all unknown routes to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AccessKeyGate>
      </TooltipProvider>
    </QueryClientProvider>
  </AccessKeyProvider>
);

export default App;
