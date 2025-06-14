
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // If already logged in, redirect to home
  useEffect(() => {
    let ignore = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!ignore && data.session) {
        navigate("/", { replace: true });
      }
    });
    return () => { ignore = true; }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return;
    }
    setLoading(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (loginError) {
      setError(loginError.message);
      toast({ title: "Login failed", description: loginError.message });
      return;
    }
    // Successfully logged in
    toast({
      title: "Login successful",
      description: "Redirecting to home page...",
    });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        className="bg-card shadow-xl rounded-lg px-8 py-8 w-full max-w-md space-y-6 animate-fade-in"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-center mb-2">Log In</h2>
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
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Your password"
            autoComplete="current-password"
            value={password}
            type="password"
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
        <div className="mt-4 text-center text-sm">
          <Link className="text-blue-600 hover:underline" to="/auth/forgot-password">
            Forgot password?
          </Link>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/auth/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthLogin;
