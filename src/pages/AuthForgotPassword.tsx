
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AuthForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setError(null);
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    setLoading(true);
    const redirectTo = `${window.location.origin}/auth/login`;
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      toast({ title: "Error", description: resetError.message });
      return;
    }
    setMsg("Password reset email sent. Please check your inbox.");
    toast({
      title: "Check your email",
      description: "A password reset link has been sent.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        className="bg-card shadow-xl rounded-lg px-8 py-8 w-full max-w-md space-y-6 animate-fade-in"
        onSubmit={handleForgot}
      >
        <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            type="email"
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        {msg && <div className="text-green-600 text-sm mt-1">{msg}</div>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending reset..." : "Send Reset Email"}
        </Button>
        <div className="mt-4 text-center text-sm">
          <Link className="text-blue-600 hover:underline" to="/auth/login">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthForgotPassword;
