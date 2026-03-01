"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "";
  }
}

export async function addResource(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const columnId = formData.get("column_id") as string;
  const boardId = formData.get("board_id") as string;
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const description = formData.get("description") as string;
  const tagsRaw = formData.get("tags") as string;

  if (!title?.trim() || !url?.trim() || !columnId || !boardId) {
    return { error: "Title, URL, column and board are required" };
  }

  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Get max position in column
  const { data: lastResource } = await supabase
    .from("resources")
    .select("position")
    .eq("column_id", columnId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = (lastResource?.position ?? -1) + 1;
  const faviconUrl = getFaviconUrl(url);

  const { error } = await supabase.from("resources").insert({
    column_id: columnId,
    board_id: boardId,
    added_by: user.id,
    title: title.trim(),
    url: url.trim(),
    description: description?.trim() || null,
    favicon_url: faviconUrl || null,
    tags,
    position,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/board/${boardId}`);
  return { success: true };
}

export async function editResource(
  resourceId: string,
  boardId: string,
  data: {
    title?: string;
    url?: string;
    description?: string;
    tags?: string[];
  }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const updateData: Record<string, unknown> = { ...data };
  if (data.url) {
    updateData.favicon_url = getFaviconUrl(data.url);
  }

  const { error } = await supabase
    .from("resources")
    .update(updateData)
    .eq("id", resourceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/board/${boardId}`);
  return { success: true };
}

export async function deleteResource(resourceId: string, boardId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("resources")
    .delete()
    .eq("id", resourceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/board/${boardId}`);
  return { success: true };
}

export async function toggleUpvote(resourceId: string, boardId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { data, error } = await supabase.rpc("toggle_upvote", {
    p_resource_id: resourceId,
    p_user_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/board/${boardId}`);
  return { success: true, result: data };
}

export async function updateResourcePosition(
  resourceId: string,
  newColumnId: string,
  newPosition: number,
  boardId: string
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("resources")
    .update({
      column_id: newColumnId,
      position: newPosition,
    })
    .eq("id", resourceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/board/${boardId}`);
  return { success: true };
}
