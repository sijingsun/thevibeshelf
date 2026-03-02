"use client";

import { useState } from "react";
import Image from "next/image";
import { Draggable } from "@hello-pangea/dnd";
import { ArrowUp, MoreHorizontal, Pencil, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddResourceModal } from "./AddResourceModal";
import { deleteResource, toggleUpvote } from "@/lib/actions/resources";
import type { ResourceWithUpvote } from "@/lib/types";

interface ResourceCardProps {
  resource: ResourceWithUpvote;
  index: number;
  boardId: string;
  isOwner: boolean;
  isAuthenticated: boolean;
  isDragDisabled?: boolean;
}

const CARD_COLORS = [
  "#EA4C89", "#F59E0B", "#6E56CF", "#06B6D4",
  "#7C3AED", "#3B82F6", "#10B981", "#EF4444",
  "#3ECF8E", "#F97316", "#3FBFAD", "#E11D48",
  "#1C1C1C",
];

function getCardColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CARD_COLORS[Math.abs(hash) % CARD_COLORS.length];
}

export function ResourceCard({
  resource,
  index,
  boardId,
  isOwner,
  isAuthenticated,
  isDragDisabled = !isOwner,
}: ResourceCardProps) {
  const [upvoted, setUpvoted] = useState(resource.userUpvoted ?? false);
  const [upvoteCount, setUpvoteCount] = useState(resource.upvote_count);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [faviconError, setFaviconError] = useState(false);

  const domain = (() => {
    try {
      return new URL(resource.url).hostname.replace("www.", "");
    } catch {
      return resource.url;
    }
  })();

  const addedDate = (() => {
    try {
      const d = new Date(resource.created_at);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return null;
    }
  })();

  const cardColor = getCardColor(resource.title);
  const letterInitial = resource.title.charAt(0).toUpperCase();
  const faviconSrc =
    resource.favicon_url ??
    `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  async function handleUpvote() {
    if (!isAuthenticated) {
      toast.error("Sign in to upvote resources");
      return;
    }
    setUpvoted((prev) => !prev);
    setUpvoteCount((prev) => (upvoted ? prev - 1 : prev + 1));
    const result = await toggleUpvote(resource.id, boardId);
    if (result?.error) {
      setUpvoted((prev) => !prev);
      setUpvoteCount((prev) => (upvoted ? prev + 1 : prev - 1));
      toast.error(result.error);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    const result = await deleteResource(resource.id, boardId);
    setDeleting(false);
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Resource deleted");
      setDeleteOpen(false);
    }
  }

  return (
    <>
      <Draggable draggableId={resource.id} index={index} isDragDisabled={isDragDisabled}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              backgroundColor: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              cursor: !isDragDisabled ? (snapshot.isDragging ? "grabbing" : "grab") : "default",
              boxShadow: snapshot.isDragging
                ? "0 12px 40px rgba(26,25,24,0.18), 0 1px 0 rgba(255,255,255,0.8) inset"
                : "0 4px 24px rgba(26,25,24,0.063), 0 1px 0 rgba(255,255,255,0.5) inset",
              border: "1px solid rgba(255,255,255,0.38)",
              userSelect: "none",
            }}
          >
            {/* Top row: logo circle + title/url + menu */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Logo circle — favicon inside, letter fallback */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "100%",
                  backgroundColor: faviconError ? cardColor : "rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {!faviconError ? (
                  <Image
                    src={faviconSrc}
                    alt=""
                    width={24}
                    height={24}
                    draggable={false}
                    style={{ userSelect: "none" }}
                    onError={() => setFaviconError(true)}
                    unoptimized
                  />
                ) : (
                  <span
                    style={{
                      color: "#fff",
                      fontFamily: "var(--font-abel)",
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1,
                    }}
                  >
                    {letterInitial}
                  </span>
                )}
              </div>

              {/* Name + URL */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontFamily: "var(--font-eb-garamond)",
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#1A1918",
                    textDecoration: "none",
                    lineHeight: 1.2,
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.65";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                >
                  {resource.title}
                </a>
                <span
                  style={{
                    fontFamily: "var(--font-abel)",
                    fontSize: 11,
                    color: "#9C9B99",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {domain}
                </span>
              </div>

              {/* Owner menu */}
              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 flex-shrink-0 rounded-lg"
                      style={{ color: "#9C9B99" }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Resource options"
                    >
                      <MoreHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl w-36 p-1"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "rgba(26,25,24,0.1)",
                      boxShadow: "0 8px 24px rgba(26,25,24,0.12)",
                    }}
                  >
                    <DropdownMenuItem
                      onClick={() => setEditOpen(true)}
                      className="cursor-pointer rounded-lg hover:bg-black/5 focus:bg-black/5"
                      style={{ color: "#1A1918" }}
                    >
                      <Pencil className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer rounded-lg hover:bg-black/5 focus:bg-black/5"
                      style={{ color: "#1A1918" }}
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                        Open link
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteOpen(true)}
                      className="cursor-pointer rounded-lg hover:bg-red-50 focus:bg-red-50"
                      style={{ color: "#EF4444" }}
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-2" aria-hidden="true" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Description */}
            {resource.description && (
              <p
                style={{
                  fontFamily: "var(--font-abel)",
                  fontSize: 12,
                  color: "#6D6C6A",
                  lineHeight: 1.4,
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {resource.description}
              </p>
            )}

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {resource.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-abel)",
                      fontSize: 10,
                      fontWeight: 500,
                      padding: "3px 8px",
                      borderRadius: 100,
                      backgroundColor: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(8px)",
                      border: "0.5px solid rgba(255,255,255,0.31)",
                      color: "#6D6C6A",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer: upvote + date */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={handleUpvote}
                aria-label={upvoted ? "Remove upvote" : "Upvote"}
                aria-pressed={upvoted}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 8px",
                  borderRadius: 6,
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: upvoted ? "#3FBFAD" : "#9C9B99",
                  transition: "color 0.15s",
                }}
              >
                <ArrowUp
                  aria-hidden="true"
                  style={{
                    width: 14,
                    height: 14,
                    strokeWidth: upvoted ? 2.5 : 2,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-abel)",
                    fontSize: 11,
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {upvoteCount}
                </span>
              </button>

              {addedDate && (
                <span
                  style={{
                    fontFamily: "var(--font-abel)",
                    fontSize: 11,
                    color: "#9C9B99",
                  }}
                >
                  {addedDate}
                </span>
              )}
            </div>
          </div>
        )}
      </Draggable>

      <AddResourceModal
        open={editOpen}
        onOpenChange={setEditOpen}
        columnId={resource.column_id}
        boardId={boardId}
        editingResource={resource}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent
          className="rounded-2xl shadow-2xl"
          style={{ backgroundColor: "#fff", borderColor: "rgba(26,25,24,0.1)" }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle style={{ color: "#1A1918" }}>
              Delete resource?
            </AlertDialogTitle>
            <AlertDialogDescription style={{ color: "#6D6C6A" }}>
              &ldquo;{resource.title}&rdquo; will be permanently removed from this board.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="rounded-xl hover:bg-black/5"
              style={{
                backgroundColor: "transparent",
                borderColor: "rgba(26,25,24,0.15)",
                color: "#1A1918",
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-xl border-0"
              style={{ backgroundColor: "#EF4444", color: "#fff" }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
