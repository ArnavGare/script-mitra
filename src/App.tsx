
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HashtagsMitra from "./pages/HashtagsMitra";
import GenerateScriptsPage from "./pages/GenerateScriptsPage";
import StorePage from "./pages/StorePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "@/components/PrivateRoute";
import ForbiddenPage from "@/pages/ForbiddenPage";
// Removed AccessKeyProvider and AccessKeyGate import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/403" element={<ForbiddenPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Index />
              </PrivateRoute>
            }
          />
          <Route
            path="/hashtags-mitra"
            element={
              <PrivateRoute>
                <HashtagsMitra />
              </PrivateRoute>
            }
          />
          <Route
            path="/generate-scripts"
            element={
              <PrivateRoute>
                <GenerateScriptsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/store"
            element={
              <PrivateRoute>
                <StorePage />
              </PrivateRoute>
            }
          />
          {/* Instead of NotFound, redirect all unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

