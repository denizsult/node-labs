import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RenderIf } from "@/components/render-if";
import { useGetRecentTransactions } from "@/features/dashboard/api";
import { EmptyState } from "./empty-state";
import { TransactionRow } from "./transaction-row";
import { TransactionSkeleton } from "./transaction-skeleton";

export const RecentTransactions = () => {
  const { data: transactionsData, isLoading } = useGetRecentTransactions({
    limit: 3,
  });
  const transactions = transactionsData?.transactions || [];

  return (
    <Card className="w-full bg-text-colorpure-white rounded-[10px] border border-solid border-neutral-100 animate-fade-in delay-[400ms]">
      
      <CardContent className="flex flex-col items-start justify-center gap-1 p-5 pt-3 pb-1">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-lg text-colortext-1">
            Recent Transaction
          </h2>

          <Button
            variant="ghost"
            className="h-auto flex text-secondary items-center gap-1.5 p-0 hover:bg-transparent transition-colors"
          >
            <span className="text-sm  text-secondary">
              View All
            </span>
            <ChevronRightIcon className="w-[18px] h-[18px] stroke-secondary" />
          </Button>
        </div>

        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">NAME/BUSINESS</TableHead>
              <TableHead className="w-1/4 text-center">TYPE</TableHead>
              <TableHead className="w-1/4 text-center">AMOUNT</TableHead>
              <TableHead className="w-1/4 text-center">DATE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <RenderIf condition={isLoading}>
              {Array.from({ length: 3 }).map((_, index) => (
                <TransactionSkeleton key={index} />
              ))}
            </RenderIf>

            <RenderIf condition={!isLoading && transactions.length > 0}>
              {transactions.map((transaction, index) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  showDivider={index < transactions.length - 1}
                />
              ))}
            </RenderIf>
          </TableBody>
        </Table>

        <RenderIf condition={!isLoading && transactions.length === 0}>
          <EmptyState />
        </RenderIf>
      </CardContent>
    </Card>
  );
};
