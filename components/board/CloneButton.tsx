"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy } from "lucide-react";
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
import { cloneBoard } from "@/lib/actions/boards";

interface CloneButtonProps {
  boardId: string;
  boardTitle: string;
  isAuthenticated: boolean;
}

export function CloneButton({
  boardId,
  boardTitle,
  isAuthenticated,
}: CloneButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(`${boardTitle} (clone)`);

  async function handleClone(e: React.FormEvent) {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const result = await cloneBoard(boardId, title);
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else if (result?.boardId) {
      toast.success("Board cloned successfully!");
      setOpen(false);
      router.push(`/board/${result.boardId}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          style={{
            padding: "8px 14px",
            borderRadius: "100px",
            fontSize: "13px",
            border: "1px solid #333",
            color: "rgba(255,255,255,0.7)",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#666")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
        >
          <Copy style={{ width: "13px", height: "13px" }} />
          Clone Board
        </button>
      </DialogTrigger>
      <DialogContent
        className="rounded-2xl shadow-2xl sm:max-w-sm"
        style={{ backgroundColor: "#1A1A1A", borderColor: "#333" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Clone Board</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleClone} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="clone-title" style={{ color: "rgba(255,255,255,0.7)" }}>New Board Title</Label>
            <Input
              id="clone-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-xl text-white"
              style={{ backgroundColor: "#0a0a0a", borderColor: "#333" }}
            />
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            All columns and resources will be copied to your account.
          </p>
          <div className="flex gap-3">
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
              disabled={loading || !title.trim()}
              className="flex-1 rounded-xl text-white font-semibold border-0"
              style={{ backgroundColor: "#FF1F5A" }}
            >
              {loading ? "Cloning…" : "Clone"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
