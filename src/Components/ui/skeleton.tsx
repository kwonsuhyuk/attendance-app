import { cn } from "@/util/cn.util";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function SkeletonCommute() {
  return (
    <Skeleton className="flex min-h-[250px] flex-col gap-4 md:flex-row md:gap-6 md:p-3"></Skeleton>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export function NoticeCardSkeleton() {
  return (
    <div className="self-start rounded-md border border-white-border bg-white-card-bg p-5 shadow-md dark:border-dark-border dark:bg-dark-card-bg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
      <Skeleton className="my-4 h-4 w-5/6" />
      <Skeleton className="mt-2 h-3 w-24" />
    </div>
  );
}

export function LogoSkeleton() {
  return <Skeleton className="h-[80px] w-[80px] rounded-full" />;
}
