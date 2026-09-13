import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-[var(--color-text-muted)]">
        The page you are looking for does not exist.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to EZ Grader</Link>
      </Button>
    </div>
  );
}
