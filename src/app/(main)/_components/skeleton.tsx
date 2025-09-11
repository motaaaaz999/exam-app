import { Skeleton } from "@/components/ui/skeleton";

type SkeletonGridProps = {
  cols?: number; //columns
  count?: number; // Number of skeletons
};

export function ExamQuestionSkeleton({
  // Default configs
  cols = 3,
  count = 6,
}: SkeletonGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${cols} gap-4 w-full mt-6`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="space-y-6 p-6 border rounded-2xl bg-white shadow-sm w-full"
        >
          {/* Title / Header */}
          <Skeleton className="h-6 w-3/4" />

          {/* Content (like options or text) */}
          <div className="space-y-3">
            {[...Array(3)].map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>

          {/* Button / Action */}
          <Skeleton className="h-10 w-1/3" />
        </div>
      ))}
    </div>
  );
}
