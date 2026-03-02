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

  const cardStyle = {
    backgroundColor: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.5)",
    boxShadow: "0 4px 24px rgba(26,25,24,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
    borderRadius: 16,
    padding: 24,
  };

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderColor: "rgba(26,25,24,0.15)",
    color: "#1A1918",
    fontFamily: "var(--font-abel)",
    fontSize: 14,
    borderRadius: 10,
  };

  const labelStyle = {
    fontFamily: "var(--font-abel)",
    fontSize: 13,
    color: "#6D6C6A",
    fontWeight: 400,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* General Settings */}
      <form onSubmit={handleSave} style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: 16 }}>
        <h2 style={{ fontFamily: "var(--font-abel)", fontSize: 15, fontWeight: 600, color: "#1A1918", margin: 0 }}>General</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label htmlFor="title" style={labelStyle}>Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="placeholder:text-[#C4C3C1]"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Label htmlFor="description" style={labelStyle}>Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe your board…"
            className="resize-none placeholder:text-[#C4C3C1]"
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0" }}>
          <Label htmlFor="is_public" style={{ ...labelStyle, cursor: "pointer" }}>
            Public board
            <span style={{ display: "block", fontSize: 12, color: "#9C9B99", fontWeight: 400 }}>
              Visible on Explore page
            </span>
          </Label>
          <Switch
            id="is_public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={saving}
            style={{ backgroundColor: "#1C1C1C", color: "#fff", fontFamily: "var(--font-abel)", fontSize: 14, fontWeight: 600, borderRadius: 10, border: "none" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </form>

      <Separator style={{ backgroundColor: "rgba(26,25,24,0.08)" }} />

      {/* Danger Zone */}
      <div style={{ ...cardStyle, border: "1px solid rgba(239,68,68,0.2)" }}>
        <h2 style={{ fontFamily: "var(--font-abel)", fontSize: 15, fontWeight: 600, color: "#EF4444", marginBottom: 6 }}>Danger Zone</h2>
        <p style={{ fontFamily: "var(--font-abel)", fontSize: 13, color: "#9C9B99", marginBottom: 16 }}>
          Permanently delete this board and all its columns and resources. This action cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              style={{ borderColor: "rgba(239,68,68,0.3)", color: "#EF4444", backgroundColor: "transparent", fontFamily: "var(--font-abel)", fontSize: 13, borderRadius: 10 }}
            >
              Delete Board
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            className="rounded-2xl"
            style={{ backgroundColor: "rgba(252,246,233,0.95)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 8px 32px rgba(26,25,24,0.12)" }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 400, fontSize: 22, color: "#1A1918" }}>
                Delete &ldquo;{board.title}&rdquo;?
              </AlertDialogTitle>
              <AlertDialogDescription style={{ fontFamily: "var(--font-abel)", fontSize: 13, color: "#6D6C6A" }}>
                This will permanently delete the board and all its columns and resources. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="rounded-xl hover:bg-black/5"
                style={{ backgroundColor: "transparent", borderColor: "rgba(26,25,24,0.15)", color: "#1A1918", fontFamily: "var(--font-abel)" }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl border-0"
                style={{ backgroundColor: "#EF4444", color: "#fff", fontFamily: "var(--font-abel)", fontWeight: 600 }}
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
