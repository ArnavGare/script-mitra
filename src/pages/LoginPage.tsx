import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // basic validation
    if (!form.email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
      if (error) {
        setError(error.message || "Login failed.");
      } else {
        toast({ title: "Login Success", description: "Welcome back!" });
        navigate("/");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { emailRedirectTo: window.location.origin + "/" }
      });
      if (error) {
        setError(error.message || "Signup failed.");
      } else {
        toast({
          title: "Check your inbox!",
          description: "We've sent you a verification email. Please verify your email before logging in."
        });
        setIsLogin(true);
        setForm({ email: "", password: "" });
      }
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="max-w-md w-full px-8 py-10 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-blue-900/20">
        <h2 className="text-3xl font-bold mb-7 text-center text-blue-800 dark:text-blue-300 headline-glow font-playfair relative">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInput}
            disabled={loading}
            className="h-12 text-base"
          />
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={form.password}
            onChange={handleInput}
            disabled={loading}
            className="h-12 text-base"
          />
          {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}
          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? (isLogin ? "Signing In..." : "Signing Up...") : (isLogin ? "Sign In" : "Sign Up")}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <button
            className="text-blue-500 hover:underline dark:text-blue-200"
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            disabled={loading}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
