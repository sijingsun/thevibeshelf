import { Skeleton } from "@/components/ui/skeleton";

export default function BoardLoading() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Board header skeleton */}
      <div className="flex items-center gap-4 px-6 py-3 border-b border-zinc-800">
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-6 w-48 bg-zinc-800" />
          <Skeleton className="h-3 w-64 bg-zinc-800" />
        </div>
        <Skeleton className="h-8 w-28 bg-zinc-800" />
      </div>

      {/* Columns skeleton */}
      <div className="flex gap-4 overflow-x-auto px-6 pb-6 pt-4 flex-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-xl w-80 flex-shrink-0 p-4 space-y-3 h-[calc(100vh-160px)]"
          >
            {/* Column header */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <Skeleton className="h-4 w-32 bg-zinc-800" />
              <Skeleton className="h-4 w-6 bg-zinc-800 ml-auto" />
            </div>

            {/* Card skeletons */}
            <div className="space-y-2">
              {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map(
                (_, j) => (
                  <div
                    key={j}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 space-y-2"
                  >
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-4 bg-zinc-700 rounded-sm" />
                      <Skeleton className="h-4 flex-1 bg-zinc-700" />
                    </div>
                    <Skeleton className="h-3 w-3/4 bg-zinc-700" />
                    <Skeleton className="h-3 w-full bg-zinc-700" />
                    <div className="flex gap-1">
                      <Skeleton className="h-4 w-12 bg-zinc-700 rounded-full" />
                      <Skeleton className="h-4 w-14 bg-zinc-700 rounded-full" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
