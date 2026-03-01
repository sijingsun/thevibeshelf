"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_COLUMNS = [
  { title: "Design References", color: "#a78bfa", position: 0 },
  { title: "UI Libraries", color: "#60a5fa", position: 1 },
  { title: "Vibe Coding Tools", color: "#fbbf24", position: 2 },
  { title: "Backend & Deployment", color: "#34d399", position: 3 },
  { title: "Tips & Tutorials", color: "#f87171", position: 4 },
];

export async function createBoard(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const isPublic = formData.get("is_public") !== "false";

  if (!title?.trim()) {
    return { error: "Title is required" };
  }

  // Create board
  const { data: board, error: boardError } = await supabase
    .from("boards")
    .insert({
      owner_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      is_public: isPublic,
    })
    .select()
    .single();

  if (boardError || !board) {
    return { error: boardError?.message ?? "Failed to create board" };
  }

  // Create default columns
  const { error: columnsError } = await supabase.from("columns").insert(
    DEFAULT_COLUMNS.map((col) => ({
      board_id: board.id,
      ...col,
    }))
  );

  if (columnsError) {
    // Clean up board if columns failed
    await supabase.from("boards").delete().eq("id", board.id);
    return { error: columnsError.message };
  }

  revalidatePath("/dashboard");
  redirect(`/board/${board.id}`);
}

export async function updateBoard(
  boardId: string,
  data: { title?: string; description?: string; is_public?: boolean }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("boards")
    .update(data)
    .eq("id", boardId)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/board/${boardId}`);
  revalidatePath(`/board/${boardId}/settings`);
  return { success: true };
}

export async function deleteBoard(boardId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", boardId)
    .eq("owner_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function cloneBoard(boardId: string, newTitle: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data: newBoardId, error } = await supabase.rpc("clone_board", {
    p_board_id: boardId,
    p_new_owner_id: user.id,
    p_new_title: newTitle,
  });

  if (error || !newBoardId) {
    return { error: error?.message ?? "Failed to clone board" };
  }

  revalidatePath("/dashboard");
  return { boardId: newBoardId as string };
}
