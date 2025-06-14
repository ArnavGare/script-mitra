
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const AuthSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    // Supabase recommends storing additional user fields in a separate profile table; here we pass name as metadata
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      toast({ title: "Sign up failed", description: signUpError.message });
      return;
    }
    toast({
      title: "Check your email",
      description: "A confirmation email has been sent.",
    });
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        className="bg-card shadow-xl rounded-lg px-8 py-8 w-full max-w-md space-y-6 animate-fade-in"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name"
            autoComplete="name"
            value={name}
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            type="password"
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/auth/login">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AuthSignUp;
