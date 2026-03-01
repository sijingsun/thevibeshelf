import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cloneBoard } from "@/lib/actions/boards";

interface ContributePageProps {
  params: Promise<{ boardId: string }>;
}

// This page handles the post-login redirect for the Contribute flow.
// It clones the default board for the authenticated user and redirects them to their copy.
export default async function ContributePage({ params }: ContributePageProps) {
  const { boardId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/contribute/${boardId}`);
  }

  // Fetch the source board title
  const { data: sourceBoard } = await supabase
    .from("boards")
    .select("title")
    .eq("id", boardId)
    .single();

  const newTitle = sourceBoard?.title
    ? `${sourceBoard.title} (my version)`
    : "My VibeStack Board";

  const result = await cloneBoard(boardId, newTitle);

  if (result?.error || !result?.boardId) {
    redirect("/dashboard");
  }

  redirect(`/board/${result.boardId}`);
}
