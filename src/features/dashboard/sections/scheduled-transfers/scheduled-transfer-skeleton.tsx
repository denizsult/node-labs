import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const ScheduledTransferSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-[15px] w-full">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <Skeleton className="w-[33px] h-[33px] rounded-full" />
          <div className="flex flex-col items-start gap-[7px]">
            <Skeleton className="w-[120px] h-4" />
            <Skeleton className="w-[100px] h-3" />
          </div>
        </div>
        <Skeleton className="w-[80px] h-5" />
      </div>
      <Separator className="w-full" />
    </div>
  );
};
