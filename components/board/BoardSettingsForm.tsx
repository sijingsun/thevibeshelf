"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateBoard, deleteBoard } from "@/lib/actions/boards";
import type { Board } from "@/lib/types";

interface BoardSettingsFormProps {
  board: Board;
}

export function BoardSettingsForm({ board }: BoardSettingsFormProps) {
  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description ?? "");
  const [isPublic, setIsPublic] = useState(board.is_public);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const result = await updateBoard(board.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      is_public: isPublic,
    });
    setSaving(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Board updated");
    }
  }

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteBoard(board.id);
    // On success, server redirects to /dashboard
    if (result?.error) {
      setDeleting(false);
      toast.error(result.error);
    }
  }

  return (
    <div className="space-y-8">
      {/* General Settings */}
      <form onSubmit={handleSave} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-zinc-100">General</h2>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-zinc-800 border-zinc-700 focus:border-amber-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="bg-zinc-800 border-zinc-700 focus:border-amber-400 resize-none"
            placeholder="Describe your board…"
          />
        </div>
        <div className="flex items-center justify-between py-1">
          <Label htmlFor="is_public" className="cursor-pointer">
            Public board
            <span className="block text-xs text-zinc-500 font-normal">
              Visible on Explore page
            </span>
          </Label>
          <Switch
            id="is_public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
            className="data-[state=checked]:bg-amber-400"
          />
        </div>
        <Button
          type="submit"
          disabled={saving}
          className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold"
        >
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </form>

      <Separator className="bg-zinc-800" />

      {/* Danger Zone */}
      <div className="bg-zinc-900 border border-red-900/50 rounded-xl p-6">
        <h2 className="text-base font-semibold text-red-400 mb-1">Danger Zone</h2>
        <p className="text-sm text-zinc-500 mb-4">
          Permanently delete this board and all its columns and resources.
          This action cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="border-red-800 text-red-400 hover:bg-red-900/30 hover:text-red-300 bg-transparent"
            >
              Delete Board
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-zinc-900 border-zinc-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-zinc-100">
                Delete &ldquo;{board.title}&rdquo;?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-zinc-400">
                This will permanently delete the board and all{" "}
                {board.title}&apos;s columns and resources. This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-300">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-500 text-white"
              >
                {deleting ? "Deleting…" : "Delete Board"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
