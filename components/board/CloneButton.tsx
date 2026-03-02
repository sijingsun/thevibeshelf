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
            fontFamily: "var(--font-abel)",
            border: "1px solid rgba(26,25,24,0.12)",
            color: "#1A1918",
            backgroundColor: "rgba(255,255,255,0.56)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Copy style={{ width: "13px", height: "13px" }} />
          Clone Board
        </button>
      </DialogTrigger>
      <DialogContent
        className="rounded-2xl sm:max-w-sm"
        style={{
          backgroundColor: "rgba(252,246,233,0.95)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 8px 32px rgba(26,25,24,0.12)",
        }}
      >
        <DialogHeader>
          <DialogTitle
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontWeight: 400,
              fontSize: 22,
              color: "#1A1918",
            }}
          >
            Clone Board
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleClone} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label
              htmlFor="clone-title"
              style={{
                fontFamily: "var(--font-abel)",
                fontSize: 13,
                color: "#6D6C6A",
                fontWeight: 400,
              }}
            >
              New Board Title
            </Label>
            <Input
              id="clone-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="placeholder:text-[#C4C3C1]"
              style={{
                backgroundColor: "rgba(255,255,255,0.6)",
                borderColor: "rgba(26,25,24,0.15)",
                color: "#1A1918",
                fontFamily: "var(--font-abel)",
                fontSize: 14,
                borderRadius: 10,
              }}
            />
          </div>
          <p className="text-xs" style={{ color: "#9C9B99", fontFamily: "var(--font-abel)" }}>
            All columns and resources will be copied to your account.
          </p>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl hover:bg-black/5"
              style={{
                backgroundColor: "transparent",
                borderColor: "rgba(26,25,24,0.15)",
                color: "#1A1918",
                fontFamily: "var(--font-abel)",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !title.trim()}
              className="flex-1 rounded-xl border-0"
              style={{
                backgroundColor: "#1C1C1C",
                color: "#fff",
                fontFamily: "var(--font-abel)",
                fontWeight: 600,
              }}
            >
              {loading ? "Cloning…" : "Clone"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
