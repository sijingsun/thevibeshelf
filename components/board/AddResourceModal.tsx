"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addResource, editResource } from "@/lib/actions/resources";
import type { Resource } from "@/lib/types";

interface AddResourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnId: string;
  boardId: string;
  editingResource?: Resource | null;
  onSuccess?: () => void;
}

export function AddResourceModal({
  open,
  onOpenChange,
  columnId,
  boardId,
  editingResource,
  onSuccess,
}: AddResourceModalProps) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!editingResource;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let result;
    if (isEditing) {
      const tagsRaw = formData.get("tags") as string;
      const tags = tagsRaw
        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
      result = await editResource(editingResource.id, boardId, {
        title: formData.get("title") as string,
        url: formData.get("url") as string,
        description: (formData.get("description") as string) || undefined,
        tags,
      });
    } else {
      formData.set("column_id", columnId);
      formData.set("board_id", boardId);
      result = await addResource(formData);
    }

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(isEditing ? "Resource updated" : "Resource added");
      onOpenChange(false);
      onSuccess?.();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-2xl sm:max-w-md"
        style={{
          backgroundColor: "rgba(252,246,233,0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 8px 32px rgba(26,25,24,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 400, fontSize: 22, color: "#1A1918", letterSpacing: "-0.3px" }}>
            {isEditing ? "Edit Resource" : "Add Resource"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="url" style={{ fontFamily: "var(--font-abel)", fontSize: 13, color: "#6D6C6A", fontWeight: 400 }}>URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              defaultValue={editingResource?.url ?? ""}
              required
              className="rounded-xl placeholder:text-[#C4C3C1]"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", borderColor: "rgba(26,25,24,0.15)", color: "#1A1918", fontFamily: "var(--font-abel)", fontSize: 14 }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title" style={{ fontFamily: "var(--font-abel)", fontSize: 13, color: "#6D6C6A", fontWeight: 400 }}>Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Resource title"
              defaultValue={editingResource?.title ?? ""}
              required
              className="rounded-xl placeholder:text-[#C4C3C1]"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", borderColor: "rgba(26,25,24,0.15)", color: "#1A1918", fontFamily: "var(--font-abel)", fontSize: 14 }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description" style={{ fontFamily: "var(--font-abel)", fontSize: 13, color: "#6D6C6A", fontWeight: 400 }}>
              Description{" "}
              <span aria-hidden="true" style={{ color: "#C4C3C1", fontWeight: 400 }}>(optional)</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description…"
              defaultValue={editingResource?.description ?? ""}
              rows={2}
              className="rounded-xl placeholder:text-[#C4C3C1] resize-none"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", borderColor: "rgba(26,25,24,0.15)", color: "#1A1918", fontFamily: "var(--font-abel)", fontSize: 14 }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tags" style={{ fontFamily: "var(--font-abel)", fontSize: 13, color: "#6D6C6A", fontWeight: 400 }}>
              Tags{" "}
              <span aria-hidden="true" style={{ color: "#C4C3C1", fontWeight: 400 }}>(comma-separated)</span>
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="react, typescript, ui"
              defaultValue={editingResource?.tags?.join(", ") ?? ""}
              className="rounded-xl placeholder:text-[#C4C3C1]"
              style={{ backgroundColor: "rgba(255,255,255,0.6)", borderColor: "rgba(26,25,24,0.15)", color: "#1A1918", fontFamily: "var(--font-abel)", fontSize: 14 }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl"
              style={{ backgroundColor: "transparent", borderColor: "rgba(26,25,24,0.15)", color: "#6D6C6A", fontFamily: "var(--font-abel)", fontSize: 14 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl border-0"
              style={{ backgroundColor: "#1C1C1C", color: "#fff", fontFamily: "var(--font-abel)", fontSize: 14, fontWeight: 600 }}
            >
              {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
