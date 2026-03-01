"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";

export function SignupForm() {
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirm = formData.get("confirm_password") as string;

    if (password !== confirm) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = await signUp(formData);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else if (result?.success) {
      toast.success(result.success);
    }
  }

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderColor: "rgba(26,25,24,0.15)",
    color: "#1A1918",
    fontFamily: "var(--font-abel)",
    fontSize: 14,
    borderRadius: 10,
  };

  const labelStyle = {
    fontFamily: "var(--font-abel)",
    fontSize: 13,
    color: "#6D6C6A",
    fontWeight: 400,
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email" style={labelStyle}>Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          className="placeholder:text-[#C4C3C1]"
          style={inputStyle}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password" style={labelStyle}>Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          minLength={8}
          required
          className="placeholder:text-[#C4C3C1]"
          style={inputStyle}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirm_password" style={labelStyle}>Confirm Password</Label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="••••••••"
          minLength={8}
          required
          className="placeholder:text-[#C4C3C1]"
          style={inputStyle}
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        style={{
          backgroundColor: "#1C1C1C",
          color: "#fff",
          fontFamily: "var(--font-abel)",
          fontSize: 14,
          fontWeight: 600,
          borderRadius: 10,
          border: "none",
        }}
      >
        {loading ? "Creating account…" : "Create Account"}
      </Button>
    </form>
  );
}
