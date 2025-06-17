
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HashtagsMitra from "./pages/HashtagsMitra";
import StorePage from "./pages/StorePage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "@/components/PrivateRoute";
import ForbiddenPage from "@/pages/ForbiddenPage";
import ScriptMitraPage from "@/pages/ScriptMitraPage";
import AccountPage from "./pages/AccountPage";
import DailyQuotaBox from "@/components/DailyQuotaBox";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

const queryClient = new QueryClient();

const App = () => {
  const { user } = useSupabaseUser();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Floating DailyQuotaBox, bottom-right on every page - only when logged in */}
          {user && (
            <div
              className="fixed z-30 bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-12"
              style={{
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  pointerEvents: "auto",
                  maxWidth: 260,
                  boxShadow: "0 4px 32px 2px rgba(50,60,120,0.07)",
                }}
              >
                <DailyQuotaBox />
              </div>
            </div>
          )}
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
              path="/scriptmitra"
              element={
                <PrivateRoute>
                  <ScriptMitraPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/hashtagmitra"
              element={
                <PrivateRoute>
                  <HashtagsMitra />
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
            <Route path="/account" element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            } />
            {/* Instead of NotFound, redirect all unknown routes to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
