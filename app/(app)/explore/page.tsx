import { createClient } from "@/lib/supabase/server";
import { BoardCard } from "@/components/board/BoardCard";
import type { Board, BoardWithCounts } from "@/lib/types";

interface ExplorePageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("boards")
    .select(`*, columns(count), resources(count)`)
    .eq("is_public", true)
    .order("updated_at", { ascending: false })
    .limit(48);

  if (q) {
    query = query.ilike("title", `%${q}%`);
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
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Explore</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Discover public resource boards from the community
        </p>
      </div>

      {/* Search */}
      <form method="GET" className="mb-6">
        <div className="relative max-w-sm">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search boards…"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </form>

      {boardsWithCounts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 border border-zinc-800">
            <span className="text-2xl">🔍</span>
          </div>
          <h2 className="text-lg font-semibold text-zinc-300 mb-2">
            No boards found
          </h2>
          <p className="text-zinc-500 text-sm">
            {q ? `No results for "${q}"` : "No public boards yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {boardsWithCounts.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      )}
    </div>
  );
}
