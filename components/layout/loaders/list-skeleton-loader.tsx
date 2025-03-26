export default function ListSkeleton() {
    return (
      <div className="w-full p-5 space-y-4">
        {/* Header with title and button */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
        </div>
  
        {/* Data table skeleton */}
        <div className="rounded-md border">
          {/* Table header */}
          <div className="border-b bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 animate-pulse rounded bg-muted" />
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-5 w-48 animate-pulse rounded bg-muted" />
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
  
          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border-b px-4 py-4 last:border-0">
              <div className="flex items-center gap-4">
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  