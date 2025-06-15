import React from "react";
import { Button } from "@/components/ui/button";
import OGFlyInText from "@/components/OGFlyInText";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-indigo-900">
      <div className="max-w-md w-full px-8 py-10 bg-white/95 dark:bg-gray-900/90 rounded-xl shadow-lg border border-indigo-900/40 text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4 headline-glow">
          <OGFlyInText>
            403
          </OGFlyInText>
        </h1>
        <h2 className="text-2xl font-semibold mb-3">
          <OGFlyInText delay={0.16}>Access Denied</OGFlyInText>
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          You are not authorized to access this application.<br/>
          Please contact the admin for access.
        </p>
        <Button asChild>
          <a href="/auth/login">Back to Login</a>
        </Button>
      </div>
    </div>
  );
}
