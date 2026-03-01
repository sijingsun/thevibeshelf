import { Suspense } from "react";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { KanbanBoard } from "@/components/board/KanbanBoard";
import type { Board, BoardWithColumns, ColumnWithResources } from "@/lib/types";

interface BoardPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch board with columns and resources
  const { data: rawBoard, error } = await supabase
    .from("boards")
    .select(`
      *,
      columns (
        *,
        resources (*)
      )
    `)
    .eq("id", boardId)
    .single();

  if (error || !rawBoard) {
    notFound();
  }

  // Cast to known shape
  const board = rawBoard as Board & {
    columns: Array<ColumnWithResources & { resources: ColumnWithResources["resources"] }>;
  };

  // Check visibility
  if (!board.is_public && board.owner_id !== user?.id) {
    notFound();
  }

  // Get user upvotes for this board
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

  // Sort columns by position and resources by position
  const sortedColumns: ColumnWithResources[] = (board.columns ?? [])
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((col) => ({
      ...col,
      resources: (col.resources ?? [])
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((r) => ({
          ...r,
          userUpvoted: upvotedResourceIds.has(r.id),
        })),
    }));

  const boardWithColumns: BoardWithColumns = {
    ...board,
    columns: sortedColumns,
  };

  const isOwner = user?.id === board.owner_id;
  const isAuthenticated = !!user;

  return (
    <Suspense fallback={null}>
      <KanbanBoard
        board={boardWithColumns}
        isOwner={isOwner}
        isAuthenticated={isAuthenticated}
      />
    </Suspense>
  );
}
