
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import OGFlyInText from "@/components/OGFlyInText";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
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

    const { error } = await supabase.auth.signInWithPassword({ 
      email: form.email, 
      password: form.password 
    });
    
    if (error) {
      setError(error.message || "Login failed.");
    } else {
      toast({ title: "Login Success", description: "Welcome back!" });
      navigate("/");
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
      <div className="max-w-md w-full px-8 py-10 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg border border-blue-900/20">
        <h2 className="text-3xl font-bold mb-7 text-center text-blue-800 dark:text-blue-300 headline-glow font-playfair relative">
          <OGFlyInText>
            Sign In
          </OGFlyInText>
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
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Password"
              value={form.password}
              onChange={handleInput}
              disabled={loading}
              className="h-12 text-base pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}
          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
