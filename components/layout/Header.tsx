"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/actions/auth";
import type { Profile } from "@/lib/types";

interface HeaderProps {
  profile: Profile | null;
}

export function Header({ profile }: HeaderProps) {
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
  }

  const initial = profile?.display_name
    ? profile.display_name.charAt(0).toUpperCase()
    : profile?.username?.charAt(0).toUpperCase() ?? "?";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        height: 64,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        backgroundColor: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(26,25,24,0.08)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.5)",
        flexShrink: 0,
      }}
    >
      {/* Left side: logo + nav links */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 32 }}>
        {/* Logo circle */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "#1C1C1C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "var(--font-abel)",
                lineHeight: 1,
              }}
            >
              V
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 28 }}>
          <Link
            href="/"
            style={{
              fontSize: 14,
              fontFamily: "var(--font-abel)",
              color: pathname === "/" ? "#1A1918" : "#6D6C6A",
              fontWeight: pathname === "/" ? 600 : 400,
              textDecoration: "none",
            }}
          >
            The Main Shelf
          </Link>
          <Link
            href="/dashboard"
            style={{
              fontSize: 14,
              fontFamily: "var(--font-abel)",
              color: pathname.startsWith("/dashboard") ? "#1A1918" : "#6D6C6A",
              fontWeight: pathname.startsWith("/dashboard") ? 600 : 400,
              textDecoration: "none",
            }}
          >
            Your shelf
          </Link>
        </nav>
      </div>

      {/* Right side: avatar */}
      {profile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3FBFAD 0%, #5B9BD5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontFamily: "var(--font-abel)",
                  fontWeight: 600,
                  fontSize: 13,
                  lineHeight: 1,
                }}
              >
                {initial}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-xl p-1"
            style={{
              backgroundColor: "#fff",
              borderColor: "rgba(26,25,24,0.1)",
              boxShadow: "0 8px 24px rgba(26,25,24,0.12)",
            }}
          >
            <div className="px-3 py-2">
              <p className="text-sm font-semibold" style={{ color: "#1A1918" }}>
                {profile.display_name ?? profile.username}
              </p>
              <p className="text-xs" style={{ color: "#9C9B99" }}>
                @{profile.username}
              </p>
            </div>
            <DropdownMenuSeparator style={{ backgroundColor: "rgba(26,25,24,0.08)" }} />
            <DropdownMenuItem
              asChild
              className="cursor-pointer rounded-lg hover:bg-black/5 focus:bg-black/5"
              style={{ color: "#1A1918" }}
            >
              <Link href={`/profile/${profile.username}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ backgroundColor: "rgba(26,25,24,0.08)" }} />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer rounded-lg hover:bg-red-50 focus:bg-red-50"
              style={{ color: "#EF4444" }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/login"
          style={{
            fontSize: 13,
            fontFamily: "var(--font-abel)",
            color: "#6D6C6A",
            textDecoration: "none",
          }}
        >
          Sign in
        </Link>
      )}
    </header>
  );
}
