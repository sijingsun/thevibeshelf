"use client";

import { Suspense, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Column } from "./Column";
import { CloneButton } from "./CloneButton";
import { ContributeButton } from "./ContributeButton";
import { updateResourcePosition } from "@/lib/actions/resources";
import type { BoardWithColumns, ColumnWithResources } from "@/lib/types";

interface KanbanBoardProps {
  board: BoardWithColumns;
  isOwner: boolean;
  isAuthenticated: boolean;
  contributeMode?: boolean;
}

export function KanbanBoard(props: KanbanBoardProps) {
  return (
    <Suspense fallback={null}>
      <KanbanBoardInner {...props} />
    </Suspense>
  );
}

function KanbanBoardInner({
  board,
  isOwner,
  isAuthenticated,
  contributeMode = false,
}: KanbanBoardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTagFilters = searchParams.get("tags")
    ? searchParams.get("tags")!.split(",").filter(Boolean)
    : [];

  const [columns, setColumns] = useState<ColumnWithResources[]>(board.columns);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const allTags = Array.from(
    new Set(
      columns.flatMap((col) => col.resources.flatMap((r) => r.tags ?? []))
    )
  ).sort();

  function toggleTagFilter(tag: string) {
    const current = new Set(activeTagFilters);
    if (current.has(tag)) {
      current.delete(tag);
    } else {
      current.add(tag);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (current.size > 0) {
      params.set("tags", Array.from(current).join(","));
    } else {
      params.delete("tags");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tags");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination, draggableId } = result;
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;

      const newColumns = columns.map((col) => ({
        ...col,
        resources: [...col.resources],
      }));

      const sourceCol = newColumns.find((c) => c.id === source.droppableId);
      const destCol = newColumns.find((c) => c.id === destination.droppableId);

      if (!sourceCol || !destCol) return;

      const [movedResource] = sourceCol.resources.splice(source.index, 1);
      destCol.resources.splice(destination.index, 0, movedResource);

      sourceCol.resources = sourceCol.resources.map((r, i) => ({
        ...r,
        position: i,
      }));
      destCol.resources = destCol.resources.map((r, i) => ({
        ...r,
        position: i,
      }));

      setColumns(newColumns);

      const result2 = await updateResourcePosition(
        draggableId,
        destination.droppableId,
        destination.index,
        board.id
      );

      if (result2?.error) {
        toast.error(result2.error);
        setColumns(board.columns);
      }
    },
    [columns, board]
  );

  return (
    <div style={{ padding: "24px 40px 64px" }}>
        {/* Board header glass panel */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            backgroundColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: 16,
            padding: "16px 20px",
            border: "0.5px solid rgba(255,255,255,0.31)",
            boxShadow: "0 2px 12px rgba(26,25,24,0.024)",
            marginBottom: 16,
          }}
        >
          {/* Left: title + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h1
              style={{
                fontFamily: "var(--font-eb-garamond)",
                fontSize: 32,
                fontWeight: 400,
                letterSpacing: "-0.5px",
                color: "#1A1918",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              {board.title}
            </h1>
            {board.description && (
              <p
                style={{
                  fontFamily: "var(--font-abel)",
                  fontSize: 14,
                  color: "#6D6C6A",
                  margin: 0,
                  lineHeight: 1.4,
                  maxWidth: 480,
                }}
              >
                {board.description}
              </p>
            )}
          </div>

          {/* Right: tag filters + controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Search input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources…"
              aria-label="Search resources"
              style={{
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 13,
                fontFamily: "var(--font-abel)",
                border: "1px solid rgba(255,255,255,0.5)",
                backgroundColor: "rgba(255,255,255,0.56)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#6D6C6A",
                outline: "none",
                width: 180,
              }}
            />

            {allTags.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {allTags.slice(0, 4).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTagFilter(tag)}
                    aria-pressed={activeTagFilters.includes(tag)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontFamily: "var(--font-abel)",
                      border: activeTagFilters.includes(tag)
                        ? "1px solid rgba(63,191,173,0.5)"
                        : "1px solid rgba(255,255,255,0.5)",
                      backgroundColor: activeTagFilters.includes(tag)
                        ? "rgba(63,191,173,0.12)"
                        : "rgba(255,255,255,0.56)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: activeTagFilters.includes(tag) ? "#3FBFAD" : "#6D6C6A",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {tag}
                  </button>
                ))}
                {activeTagFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    aria-label="Clear tag filters"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "8px 12px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontFamily: "var(--font-abel)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      backgroundColor: "rgba(255,255,255,0.56)",
                      color: "#9C9B99",
                      cursor: "pointer",
                    }}
                  >
                    <X style={{ width: 12, height: 12 }} aria-hidden="true" />
                    Clear
                  </button>
                )}
              </div>
            )}

            {contributeMode && (
              <ContributeButton boardId={board.id} isAuthenticated={isAuthenticated} />
            )}
            {!contributeMode && !isOwner && (
              <CloneButton
                boardId={board.id}
                boardTitle={board.title}
                isAuthenticated={isAuthenticated}
              />
            )}
            {isOwner && !contributeMode && (
              <a
                href={`/board/${board.id}/settings`}
                style={{
                  padding: "8px 16px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontFamily: "var(--font-abel)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  backgroundColor: "rgba(255,255,255,0.56)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  color: "#6D6C6A",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                Settings
              </a>
            )}
          </div>
        </div>

        {/* Kanban columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            {columns
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  boardId={board.id}
                  isOwner={isOwner}
                  isAuthenticated={isAuthenticated}
                  activeTagFilters={activeTagFilters}
                  searchTerm={searchTerm}
                />
              ))}
          </div>
        </DragDropContext>
    </div>
  );
}
