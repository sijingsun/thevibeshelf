"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/actions/auth";

interface AvatarDropdownProps {
  displayName: string | null;
  username: string | null;
  email: string | null;
}

export function AvatarDropdown({ displayName, username, email }: AvatarDropdownProps) {
  const initial = displayName
    ? displayName.charAt(0).toUpperCase()
    : username
    ? username.charAt(0).toUpperCase()
    : email?.charAt(0).toUpperCase() ?? "?";

  return (
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
            {displayName ?? username ?? email}
          </p>
          {username && (
            <p className="text-xs" style={{ color: "#9C9B99" }}>
              @{username}
            </p>
          )}
        </div>
        <DropdownMenuSeparator style={{ backgroundColor: "rgba(26,25,24,0.08)" }} />
        {username && (
          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-lg hover:bg-black/5 focus:bg-black/5"
            style={{ color: "#1A1918" }}
          >
            <Link href={`/profile/${username}`}>Profile</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator style={{ backgroundColor: "rgba(26,25,24,0.08)" }} />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer rounded-lg hover:bg-red-50 focus:bg-red-50"
          style={{ color: "#EF4444" }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
