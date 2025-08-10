import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 px-5">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-40" />
        <div className="h-[1px] w-full bg-[#00000013]" />
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <div className="flex max-w-full flex-col gap-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
