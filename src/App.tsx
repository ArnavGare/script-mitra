import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthSignUp from "./pages/AuthSignUp";
import AuthLogin from "./pages/AuthLogin";
import AuthForgotPassword from "./pages/AuthForgotPassword";
import ProtectedRoute from "@/components/ProtectedRoute";
import Pricing from "./pages/Pricing";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/auth/signup" element={<AuthSignUp />} />
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/forgot-password" element={<AuthForgotPassword />} />
          {/* Protected Routes */}
          <Route
            path="/generate-scripts"
            element={
              <ProtectedRoute>
                <Index /> {/* replace with your actual Generate Scripts page if it's a separate component */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/store"
            element={
              <ProtectedRoute>
                <Index /> {/* replace with your actual Store page if it's a separate component */}
              </ProtectedRoute>
            }
          />
          <Route path="/account" element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
