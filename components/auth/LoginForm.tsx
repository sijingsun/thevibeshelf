"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithPassword, signInWithMagicLink } from "@/lib/actions/auth";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signInWithPassword(formData);
    setLoading(false);
    if (result?.error) {
      toast.error(result.error);
    }
    // On success, server redirects to /dashboard
  }

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await signInWithMagicLink(formData);
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

  const buttonStyle = {
    backgroundColor: "#1C1C1C",
    color: "#fff",
    fontFamily: "var(--font-abel)",
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 10,
    border: "none",
  };

  return (
    <Tabs defaultValue="password" className="w-full">
      <TabsList
        className="w-full mb-4"
        style={{
          backgroundColor: "rgba(26,25,24,0.06)",
          border: "1px solid rgba(26,25,24,0.1)",
          borderRadius: 10,
          padding: 3,
        }}
      >
        <TabsTrigger
          value="password"
          className="flex-1 data-[state=active]:shadow-sm"
          style={{ fontFamily: "var(--font-abel)", fontSize: 13, borderRadius: 8 }}
        >
          Password
        </TabsTrigger>
        <TabsTrigger
          value="magic"
          className="flex-1 data-[state=active]:shadow-sm"
          style={{ fontFamily: "var(--font-abel)", fontSize: 13, borderRadius: 8 }}
        >
          Magic Link
        </TabsTrigger>
      </TabsList>

      <TabsContent value="password">
        <form onSubmit={handlePasswordLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email-pw" style={labelStyle}>Email</Label>
            <Input
              id="email-pw"
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
              required
              className="placeholder:text-[#C4C3C1]"
              style={inputStyle}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={buttonStyle}
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="magic">
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email-magic" style={labelStyle}>Email</Label>
            <Input
              id="email-magic"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="placeholder:text-[#C4C3C1]"
              style={inputStyle}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            style={buttonStyle}
          >
            {loading ? "Sending…" : "Send Magic Link"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}
