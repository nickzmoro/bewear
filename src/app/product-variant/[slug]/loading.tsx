import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 px-5">
      <Skeleton className="relative h-[380px] w-full rounded-3xl" />

      <div>
        <Skeleton className="mb-3 h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-28" />
        <div className="flex w-[100px] items-center justify-between rounded-lg border p-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-6 rounded" />
          <Skeleton className="h-5 w-5 rounded" />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <Skeleton className="h-10 w-full rounded-full" />
        <Skeleton className="h-10 w-full rounded-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <div className="mb-10 flex flex-col gap-5">
        <div className="h-[1px] w-full bg-[#0000001f]" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-64" />
          <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <Skeleton className="h-40 w-36 flex-shrink-0 rounded-2xl" />
            <Skeleton className="h-40 w-36 flex-shrink-0 rounded-2xl" />
            <Skeleton className="h-40 w-36 flex-shrink-0 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
