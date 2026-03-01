"use client";

import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Plus, MoreHorizontal } from "lucide-react";
import { ResourceCard } from "./ResourceCard";
import { AddResourceModal } from "./AddResourceModal";
import type { ColumnWithResources } from "@/lib/types";

interface ColumnProps {
  column: ColumnWithResources;
  boardId: string;
  isOwner: boolean;
  isAuthenticated: boolean;
  activeTagFilters: string[];
  searchTerm?: string;
}

export function Column({
  column,
  boardId,
  isOwner,
  isAuthenticated,
  activeTagFilters,
  searchTerm = "",
}: ColumnProps) {
  const [addOpen, setAddOpen] = useState(false);

  const filteredResources = column.resources.filter((r) => {
    const matchesTags =
      activeTagFilters.length === 0 ||
      activeTagFilters.some((tag) =>
        r.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      r.title.toLowerCase().includes(term) ||
      (r.description ?? "").toLowerCase().includes(term) ||
      (r.tags ?? []).some((t) => t.toLowerCase().includes(term));
    return matchesTags && matchesSearch;
  });

  return (
    <>
      <div
        style={{
          flex: "1 1 260px",
          minWidth: 0,
          borderRadius: 16,
          backgroundColor: "rgba(255,255,255,0.31)",
          border: "1px solid rgba(255,255,255,0.25)",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Column header — blur only, no fill */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 10,
            padding: "6px 12px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "0.5px solid rgba(255,255,255,0.25)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 14,
                fontFamily: "var(--font-abel)",
                color: "#1A1918",
              }}
            >
              {column.title}
            </span>
            <span
              style={{
                fontSize: 12,
                fontFamily: "var(--font-abel)",
                color: "#9C9B99",
              }}
            >
              {filteredResources.length}
            </span>
          </div>
          <MoreHorizontal style={{ width: 16, height: 16, color: "#9C9B99" }} />
        </div>

        {/* Cards droppable area */}
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minHeight: 120,
                borderRadius: 10,
                backgroundColor: snapshot.isDraggingOver
                  ? "rgba(63,191,173,0.05)"
                  : "transparent",
                transition: "background-color 0.15s",
              }}
            >
              {filteredResources.length === 0 && !snapshot.isDraggingOver && (
                <div
                  style={{
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed rgba(26,25,24,0.12)",
                    borderRadius: 10,
                    fontSize: 12,
                    fontFamily: "var(--font-abel)",
                    color: "#9C9B99",
                  }}
                >
                  No resources
                </div>
              )}
              {filteredResources.map((resource, idx) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={idx}
                  boardId={boardId}
                  isOwner={isOwner}
                  isAuthenticated={isAuthenticated}
                  isDragDisabled={!isOwner || !!searchTerm}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Add resource button */}
        {isOwner && (
          <button
            onClick={() => setAddOpen(true)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              fontSize: 13,
              fontFamily: "var(--font-abel)",
              color: "#9C9B99",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: 8,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#6D6C6A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9C9B99")}
          >
            <Plus style={{ width: 14, height: 14 }} />
            Add resource
          </button>
        )}
      </div>

      <AddResourceModal
        open={addOpen}
        onOpenChange={setAddOpen}
        columnId={column.id}
        boardId={boardId}
      />
    </>
  );
}
