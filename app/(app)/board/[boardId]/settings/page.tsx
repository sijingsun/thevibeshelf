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
    <div style={{ padding: "40px", maxWidth: 640, margin: "0 auto" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-eb-garamond)", fontSize: 36, fontWeight: 400, letterSpacing: "-0.5px", color: "#1A1918", marginBottom: 6 }}>
          Board Settings
        </h1>
        <p style={{ fontFamily: "var(--font-abel)", fontSize: 14, color: "#9C9B99" }}>{board.title}</p>
      </div>
      <BoardSettingsForm board={board} />
    </div>
  );
}
