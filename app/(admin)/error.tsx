"use client";

import { useEffect } from "react";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Catches failures from the server components under (admin).
 *
 * These pages fetch through getData, which now throws rather than
 * returning an empty result set. Without this boundary a backend outage
 * would render as an empty table and look like "no records".
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-1 items-center justify-center p-8">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertTriangleIcon className="h-6 w-6 text-destructive" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Couldn&apos;t load this page
          </h2>
          <p className="text-sm text-muted-foreground">
            {error?.message ||
              "Something went wrong while fetching data from the server."}
          </p>
          {error?.digest && (
            <p className="text-xs text-muted-foreground">
              Reference: {error.digest}
            </p>
          )}
        </div>

        <Button onClick={reset} variant="outline" size="sm">
          <RefreshCwIcon className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
