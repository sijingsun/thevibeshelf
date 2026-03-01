import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BoardCard } from "@/components/board/BoardCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Board, BoardWithCounts, Profile } from "@/lib/types";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  // Fetch profile
  const { data: rawProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !rawProfile) {
    notFound();
  }

  const profile = rawProfile as Profile;
  const isOwnProfile = currentUser?.id === profile.id;

  // Fetch boards
  let boardsQuery = supabase
    .from("boards")
    .select(`*, columns(count), resources(count)`)
    .eq("owner_id", profile.id)
    .order("updated_at", { ascending: false });

  if (!isOwnProfile) {
    boardsQuery = boardsQuery.eq("is_public", true);
  }

  const { data: rawBoards } = await boardsQuery;

  type RawBoard = Board & {
    columns: { count: number }[];
    resources: { count: number }[];
  };

  const boardsWithCounts: BoardWithCounts[] = ((rawBoards ?? []) as RawBoard[]).map((b) => ({
    ...b,
    column_count: b.columns?.[0]?.count ?? 0,
    resource_count: b.resources?.[0]?.count ?? 0,
  }));

  const initials = (profile.display_name ?? profile.username)
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10">
        <Avatar className="h-16 w-16 border-2 border-zinc-700">
          <AvatarImage src={profile.avatar_url ?? undefined} />
          <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            {profile.display_name ?? profile.username}
          </h1>
          <p className="text-zinc-500 text-sm">@{profile.username}</p>
          {profile.bio && (
            <p className="text-zinc-400 text-sm mt-1 max-w-md">{profile.bio}</p>
          )}
        </div>
      </div>

      {/* Boards */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-200">
          {isOwnProfile ? "My Boards" : "Public Boards"}
        </h2>
        <span className="text-sm text-zinc-500">
          {boardsWithCounts.length} board{boardsWithCounts.length !== 1 ? "s" : ""}
        </span>
      </div>

      {boardsWithCounts.length === 0 ? (
        <p className="text-zinc-500 text-sm py-10 text-center">
          No boards yet.
        </p>
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
