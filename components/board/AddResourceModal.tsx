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
        className="rounded-2xl shadow-2xl sm:max-w-md"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#333" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEditing ? "Edit Resource" : "Add Resource"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="url" style={{ color: "rgba(255,255,255,0.7)" }}>URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              defaultValue={editingResource?.url ?? ""}
              required
              className="rounded-xl text-white placeholder:text-white/30 font-mono text-sm"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#333" }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" style={{ color: "rgba(255,255,255,0.7)" }}>Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Resource title"
              defaultValue={editingResource?.title ?? ""}
              required
              className="rounded-xl text-white placeholder:text-white/30"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#333" }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" style={{ color: "rgba(255,255,255,0.7)" }}>
              Description{" "}
              <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description…"
              defaultValue={editingResource?.description ?? ""}
              rows={2}
              className="rounded-xl text-white placeholder:text-white/30 resize-none"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#333" }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" style={{ color: "rgba(255,255,255,0.7)" }}>
              Tags{" "}
              <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(comma-separated)</span>
            </Label>
            <Input
              id="tags"
              name="tags"
              placeholder="react, typescript, ui"
              defaultValue={editingResource?.tags?.join(", ") ?? ""}
              className="rounded-xl text-white placeholder:text-white/30"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#333" }}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
              style={{ backgroundColor: "transparent", borderColor: "#333" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl text-white font-semibold border-0"
              style={{ backgroundColor: "#FF1F5A" }}
            >
              {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
