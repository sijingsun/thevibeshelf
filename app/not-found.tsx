import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl font-bold text-amber-400 mb-4">404</p>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Page not found</h1>
      <p className="text-zinc-500 text-sm mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="bg-amber-400 text-zinc-950 hover:bg-amber-300 font-semibold">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
