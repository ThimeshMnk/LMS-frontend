export const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
);

export const CourseCardSkeleton = () => (
  <div className="min-w-70 max-w-[320px] rounded-3xl border border-gray-100 overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-5 space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-2/3" />
      <div className="flex gap-4 pt-4 border-t border-gray-50">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-2 w-16" />
            <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  </div>
);