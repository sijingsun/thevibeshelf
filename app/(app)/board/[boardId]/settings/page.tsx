import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BoardSettingsForm } from "@/components/board/BoardSettingsForm";
import type { Board } from "@/lib/types";

interface SettingsPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardSettingsPage({ params }: SettingsPageProps) {
  const { boardId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: rawBoard, error } = await supabase
    .from("boards")
    .select("*")
    .eq("id", boardId)
    .single();

  if (error || !rawBoard) {
    notFound();
  }

  const board = rawBoard as Board;

  if (board.owner_id !== user.id) {
    redirect(`/board/${boardId}`);
  }

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Board Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">{board.title}</p>
      </div>
      <BoardSettingsForm board={board} />
    </div>
  );
}
