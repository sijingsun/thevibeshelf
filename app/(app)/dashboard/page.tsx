import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BoardCard } from "@/components/board/BoardCard";
import { CreateBoardButton } from "@/components/board/CreateBoardButton";
import type { Board, BoardWithCounts } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch boards with counts via subquery (exclude the shared vibe shelf)
  const defaultBoardId = process.env.NEXT_PUBLIC_DEFAULT_BOARD_ID;
  let query = supabase
    .from("boards")
    .select(`
      *,
      columns(count),
      resources(count)
    `)
    .eq("owner_id", user!.id)
    .order("updated_at", { ascending: false });

  if (defaultBoardId) {
    query = query.neq("id", defaultBoardId);
  }

  const { data: rawBoards } = await query;

  type RawBoard = Board & {
    columns: { count: number }[];
    resources: { count: number }[];
  };

  const boardsWithCounts: BoardWithCounts[] = ((rawBoards ?? []) as RawBoard[]).map((b) => ({
    ...b,
    column_count: b.columns?.[0]?.count ?? 0,
    resource_count: b.resources?.[0]?.count ?? 0,
  }));

  return (
    <div style={{ padding: "40px" }}>
      <div className="flex items-end justify-between" style={{ marginBottom: "40px" }}>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontSize: "48px",
              fontWeight: 400,
              letterSpacing: "-1.5px",
              marginBottom: "12px",
              color: "#1A1918",
              lineHeight: 1.05,
            }}
          >
            Your Shelf
          </h1>
          <p style={{ fontSize: "14px", color: "#9C9B99", fontFamily: "var(--font-abel)" }}>
            {boardsWithCounts.length} board{boardsWithCounts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateBoardButton />
      </div>

      {boardsWithCounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{
            height: "240px",
            border: "1px dashed rgba(26,25,24,0.15)",
            borderRadius: "16px",
          }}
        >
          <p style={{ fontSize: "14px", marginBottom: "16px", color: "#9C9B99", fontFamily: "var(--font-abel)" }}>
            You haven&apos;t cloned any boards yet. Visit the Vibe Shelf to get started.
          </p>
          <Link
            href="/"
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
            Go to the Vibe Shelf
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "20px" }}>
          {boardsWithCounts.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  );
}
