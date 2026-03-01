"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Layers, FileText, Globe, Lock } from "lucide-react";
import type { BoardWithCounts } from "@/lib/types";

interface BoardCardProps {
  board: BoardWithCounts;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link href={`/board/${board.id}`} className="block group">
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: "16px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: "0 4px 20px rgba(26,25,24,0.07), 0 1px 0 rgba(255,255,255,0.6) inset",
          border: "1px solid rgba(255,255,255,0.4)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 8px 32px rgba(26,25,24,0.12), 0 1px 0 rgba(255,255,255,0.6) inset";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 20px rgba(26,25,24,0.07), 0 1px 0 rgba(255,255,255,0.6) inset";
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <h3
            style={{
              fontFamily: "var(--font-eb-garamond)",
              fontSize: "20px",
              fontWeight: 400,
              color: "#1A1918",
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
            }}
          >
            {board.title}
          </h3>
          {board.is_public ? (
            <Globe style={{ width: "15px", height: "15px", color: "#9C9B99", flexShrink: 0, marginTop: "3px" }} />
          ) : (
            <Lock style={{ width: "15px", height: "15px", color: "#9C9B99", flexShrink: 0, marginTop: "3px" }} />
          )}
        </div>

        {board.description && (
          <p
            style={{
              fontFamily: "var(--font-abel)",
              fontSize: "13px",
              color: "#6D6C6A",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {board.description}
          </p>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingTop: "12px",
            borderTop: "1px solid rgba(26,25,24,0.07)",
            marginTop: "auto",
          }}
        >
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "11px", color: "#9C9B99", fontFamily: "var(--font-abel)" }}
          >
            <Layers style={{ width: "12px", height: "12px" }} />
            {board.column_count ?? 0}
          </span>
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "11px", color: "#9C9B99", fontFamily: "var(--font-abel)" }}
          >
            <FileText style={{ width: "12px", height: "12px" }} />
            {board.resource_count ?? 0}
          </span>
          <span
            style={{ marginLeft: "auto", fontSize: "11px", color: "#9C9B99", fontFamily: "var(--font-abel)" }}
          >
            {formatDistanceToNow(new Date(board.updated_at), { addSuffix: true })}
          </span>
        </div>
      </div>
    </Link>
  );
}
