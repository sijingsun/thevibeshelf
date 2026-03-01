"use client";

import { useRouter } from "next/navigation";
import { GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContributeButtonProps {
  boardId: string;
  isAuthenticated: boolean;
}

export function ContributeButton({ boardId, isAuthenticated }: ContributeButtonProps) {
  const router = useRouter();

  function handleContribute() {
    if (!isAuthenticated) {
      router.push(`/login?next=/contribute/${boardId}`);
    } else {
      router.push(`/contribute/${boardId}`);
    }
  }

  return (
    <Button
      onClick={handleContribute}
      className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold gap-2"
    >
      <GitFork className="w-4 h-4" />
      Contribute
    </Button>
  );
}
