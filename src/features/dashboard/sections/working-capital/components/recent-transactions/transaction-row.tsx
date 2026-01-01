import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/features/dashboard/types";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils";

type TransactionRowProps = {
  transaction: Transaction;
  showDivider: boolean;
};

export const TransactionRow = ({
  transaction,
  showDivider,
}: TransactionRowProps) => {
  const hasBgColor = transaction.amount < 0;

  return (
    <TableRow className={cn("relative h-10", !showDivider && "border-0")}>
      <TableCell className="py-2.5 w-1/4">
        <div className="flex items-center gap-3.5">
          <div
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-[5px]",
              hasBgColor && "bg-[#e4f0ff]"
            )}
          >
            <img
              className={
                hasBgColor
                  ? "w-8 h-[30px]"
                  : "w-10 h-10 rounded-[5px] object-cover"
              }
              alt={transaction.name}
              src={transaction.image}
            />
          </div>

          <div className="flex flex-col gap-[5px]">
            <div className="font-medium text-colortext-1 text-sm truncate">
              {transaction.name}
            </div>
            <div className="font-normal text-colortext-2 text-xs">
              {transaction.business}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-2.5 w-1/4 font-medium text-colortext-2 text-sm text-center">
        {transaction.type}
      </TableCell>

      <TableCell className="py-2.5 w-1/4 font-semibold text-colortext-1 text-sm text-center">
        {formatCurrency(transaction.amount, transaction.currency)}
      </TableCell>

      <TableCell className="py-2.5 w-1/4 font-medium text-colortext-2 text-sm text-center">
        {formatDate(transaction.date)}
      </TableCell>
    </TableRow>
  );
};
