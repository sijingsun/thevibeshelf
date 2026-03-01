import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 bg-zinc-800" />
          <Skeleton className="h-4 w-16 bg-zinc-800" />
        </div>
        <Skeleton className="h-9 w-32 bg-zinc-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-40 bg-zinc-800" />
              <Skeleton className="h-4 w-4 bg-zinc-800 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full bg-zinc-800" />
            <Skeleton className="h-4 w-3/4 bg-zinc-800" />
            <div className="flex gap-4 pt-2">
              <Skeleton className="h-3 w-20 bg-zinc-800" />
              <Skeleton className="h-3 w-20 bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
