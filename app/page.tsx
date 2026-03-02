import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { KanbanBoard } from "@/components/board/KanbanBoard";
import { AvatarDropdown } from "@/components/layout/AvatarDropdown";
import type { Board, BoardWithColumns, ColumnWithResources } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { display_name: string | null; username: string | null } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("display_name, username")
      .eq("id", user.id)
      .single();
    profile = data ?? null;
  }

  const defaultBoardId = process.env.NEXT_PUBLIC_DEFAULT_BOARD_ID;

  let boardWithColumns: BoardWithColumns | null = null;

  if (defaultBoardId) {
    const { data: rawBoard } = await supabase
      .from("boards")
      .select(`*, columns(*, resources(*))`)
      .eq("id", defaultBoardId)
      .single();

    if (rawBoard) {
      const board = rawBoard as Board & { columns: ColumnWithResources[] };

      let upvotedResourceIds = new Set<string>();
      if (user) {
        const { data: upvotes } = await supabase
          .from("upvotes")
          .select("resource_id")
          .eq("user_id", user.id);
        upvotedResourceIds = new Set(
          ((upvotes ?? []) as { resource_id: string }[]).map((u) => u.resource_id)
        );
      }

      const sortedColumns: ColumnWithResources[] = (board.columns ?? [])
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((col) => ({
          ...col,
          resources: (col.resources ?? [])
            .slice()
            .sort((a, b) => a.position - b.position)
            .map((r) => ({ ...r, userUpvoted: upvotedResourceIds.has(r.id) })),
        }));

      boardWithColumns = { ...board, columns: sortedColumns };
    }
  }

  const isOwner = !!(user && boardWithColumns && user.id === boardWithColumns.owner_id);
  const isAuthenticated = !!user;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Nav — matches the app header style exactly */}
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
        {/* Left: logo + nav links */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 32 }}>
          <Link href="/" aria-label="The Vibe Shelf — home" style={{ textDecoration: "none", flexShrink: 0 }}>
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
          <nav aria-label="Main navigation" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 28 }}>
            <Link
              href="/"
              aria-current="page"
              style={{
                fontSize: 14,
                fontFamily: "var(--font-abel)",
                color: "#1A1918",
                fontWeight: 600,
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
                color: "#6D6C6A",
                fontWeight: 400,
                textDecoration: "none",
              }}
            >
              Your shelf
            </Link>
          </nav>
        </div>

        {/* Right: avatar or auth buttons */}
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
          {user ? (
            <AvatarDropdown
              displayName={profile?.display_name ?? null}
              username={profile?.username ?? null}
              email={user.email ?? null}
            />
          ) : (
            <>
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
              <Link
                href="/signup"
                style={{
                  padding: "7px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontFamily: "var(--font-abel)",
                  backgroundColor: "#1C1C1C",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Board content */}
      {boardWithColumns ? (
        <div style={{ flex: 1 }}>
          <Suspense fallback={null}>
            <KanbanBoard
              board={boardWithColumns}
              isOwner={isOwner}
              isAuthenticated={isAuthenticated}
            />
          </Suspense>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "80px 24px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontSize: 48,
              fontWeight: 400,
              letterSpacing: "-1.5px",
              color: "#1A1918",
              marginBottom: 16,
            }}
          >
            The vibe shelf
          </h1>
          <p
            style={{
              fontFamily: "var(--font-abel)",
              fontSize: 14,
              color: "#9C9B99",
              marginBottom: 32,
              maxWidth: 360,
            }}
          >
            Curated dev resources, organized your way.
          </p>
          <Link
            href="/signup"
            style={{
              padding: "10px 24px",
              borderRadius: 12,
              backgroundColor: "#1C1C1C",
              color: "#fff",
              fontFamily: "var(--font-abel)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Get started
          </Link>
        </div>
      )}
    </div>
  );
}
