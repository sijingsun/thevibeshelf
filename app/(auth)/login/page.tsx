import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Logo + heading */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: "#1C1C1C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, fontFamily: "var(--font-abel)", lineHeight: 1 }}>V</span>
            </div>
            <span style={{ fontFamily: "var(--font-eb-garamond)", fontSize: 28, fontWeight: 400, color: "#1A1918", letterSpacing: "-0.5px" }}>
              The vibe shelf
            </span>
          </Link>
          <p style={{ fontFamily: "var(--font-abel)", fontSize: 14, color: "#9C9B99", margin: 0 }}>Sign in to your account</p>
        </div>

        {/* Glass card */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 20,
            padding: "28px 28px",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 32px rgba(26,25,24,0.08), 0 1px 0 rgba(255,255,255,0.8) inset",
          }}
        >
          <LoginForm />
        </div>

        <p style={{ textAlign: "center", fontFamily: "var(--font-abel)", fontSize: 13, color: "#9C9B99", margin: 0 }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ color: "#1A1918", fontWeight: 600, textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
