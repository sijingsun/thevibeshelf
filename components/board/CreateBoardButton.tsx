"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { createBoard } from "@/lib/actions/boards";

export function CreateBoardButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("is_public", isPublic.toString());
    const result = await createBoard(formData);
    setLoading(false);
    if (result?.error) {
      toast.error(result.error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "100px",
            fontSize: "13px",
            fontWeight: 500,
            border: "none",
            backgroundColor: "#ffffff",
            color: "#050505",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Plus style={{ width: "14px", height: "14px" }} />
          New Board
        </button>
      </DialogTrigger>
      <DialogContent
        className="rounded-2xl shadow-2xl sm:max-w-md"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#333" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Create New Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="title" style={{ color: "rgba(255,255,255,0.7)" }}>Board Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="My Dev Resources"
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
              placeholder="A curated collection of…"
              rows={3}
              className="rounded-xl text-white placeholder:text-white/30 resize-none"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#333" }}
            />
          </div>
          <div className="flex items-center justify-between py-1">
            <Label htmlFor="is_public" className="cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
              Public board
              <span className="block text-xs font-normal" style={{ color: "rgba(255,255,255,0.3)" }}>
                Visible on Explore page
              </span>
            </Label>
            <Switch
              id="is_public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              className="data-[state=checked]:bg-[#FF1F5A]"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
              style={{ backgroundColor: "transparent", borderColor: "#333" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl text-white border-0"
              style={{ backgroundColor: "#FF1F5A" }}
            >
              {loading ? "Creating…" : "Create Board"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
