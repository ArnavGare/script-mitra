
import React from "react";
import { useAppAccessGate } from "@/hooks/useAppAccessGate";
import ForbiddenPage from "@/pages/ForbiddenPage";
import { useLocation, Navigate } from "react-router-dom";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { allowed, accessChecked, user } = useAppAccessGate();
  const location = useLocation();

  if (!accessChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-blue-700 dark:text-blue-200">
        Checking access...
      </div>
    );
  }
  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (!allowed) {
    return <ForbiddenPage />;
  }
  return <>{children}</>;
}
