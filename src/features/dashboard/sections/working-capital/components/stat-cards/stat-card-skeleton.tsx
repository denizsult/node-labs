import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StatCardSkeletonProps = {
  bgColor: string;
};

export const StatCardSkeleton = ({ bgColor }: StatCardSkeletonProps) => {
  return (
    <Card className={cn(bgColor, "border-0 rounded-[10px]")}>
      <CardContent className="flex items-center gap-[15px] p-6">
        <Skeleton className="w-[42px] h-[42px] rounded" />
        <div className="flex flex-col items-start gap-2.5">
          <Skeleton className="w-[125px] h-4" />
          <Skeleton className="w-[100px] h-8" />
        </div>
      </CardContent>
    </Card>
  );
};
