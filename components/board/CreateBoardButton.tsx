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
          <Plus style={{ width: "14px", height: "14px" }} aria-hidden="true" />
          New Board
        </button>
      </DialogTrigger>
      <DialogContent
        className="rounded-2xl sm:max-w-md"
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
            Create New Board
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="cb-title" style={labelStyle}>Board Title</Label>
            <Input
              id="cb-title"
              name="title"
              placeholder="My Dev Resources"
              required
              className="placeholder:text-[#C4C3C1]"
              style={inputStyle}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cb-description" style={labelStyle}>
              Description{" "}
              <span aria-hidden="true" style={{ color: "#C4C3C1", fontWeight: 400 }}>(optional)</span>
            </Label>
            <Textarea
              id="cb-description"
              name="description"
              placeholder="A curated collection of…"
              rows={3}
              className="placeholder:text-[#C4C3C1] resize-none"
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0" }}>
            <Label htmlFor="cb-is_public" style={{ ...labelStyle, cursor: "pointer" }}>
              Public board
              <span style={{ display: "block", fontSize: 12, color: "#9C9B99", fontWeight: 400 }}>
                Visible on Explore page
              </span>
            </Label>
            <Switch
              id="cb-is_public"
              checked={isPublic}
              onCheckedChange={setIsPublic}
            />
          </div>
          <div className="flex gap-3 pt-2">
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
                fontSize: 14,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl border-0"
              style={{
                backgroundColor: "#1C1C1C",
                color: "#fff",
                fontFamily: "var(--font-abel)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {loading ? "Creating…" : "Create Board"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
