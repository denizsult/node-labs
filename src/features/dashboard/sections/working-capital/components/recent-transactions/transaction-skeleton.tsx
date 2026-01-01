import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const TransactionSkeleton = () => {
  return (
    <TableRow className="h-10">
      <TableCell className="py-2.5 w-1/4">
        <div className="flex items-center gap-3.5">
          <Skeleton className="w-10 h-10 rounded-[5px]" />
          <div className="flex flex-col gap-[5px]">
            <Skeleton className="w-[120px] h-4" />
            <Skeleton className="w-[100px] h-3" />
          </div>
        </div>
      </TableCell>
      <TableCell className="py-2.5 w-1/4">
        <div className="flex justify-center">
          <Skeleton className="w-[60px] h-4" />
        </div>
      </TableCell>
      <TableCell className="py-2.5 w-1/4">
        <div className="flex justify-center">
          <Skeleton className="w-[80px] h-4" />
        </div>
      </TableCell>
      <TableCell className="py-2.5 w-1/4">
        <div className="flex justify-center">
          <Skeleton className="w-[90px] h-4" />
        </div>
      </TableCell>
    </TableRow>
  );
};
