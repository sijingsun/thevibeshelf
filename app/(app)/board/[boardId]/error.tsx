"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BoardError() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] text-center px-4">
      <div className="w-16 h-16 bg-zinc-900 rounded-xl flex items-center justify-center mb-4 border border-zinc-800">
        <AlertTriangle className="w-8 h-8 text-amber-400" />
      </div>
      <h1 className="text-xl font-bold text-zinc-100 mb-2">
        Board not found or private
      </h1>
      <p className="text-zinc-500 text-sm mb-6 max-w-sm">
        This board doesn&apos;t exist, has been deleted, or is set to private.
      </p>
      <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold">
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
