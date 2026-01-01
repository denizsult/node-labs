import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RenderIf } from "@/components/render-if";
import { useGetScheduledTransfers } from "../../api/use-get-scheduled-transfers";
import { ScheduledTransfersCardStack } from "./scheduled-transfers-card-stack";
import { ScheduledTransferRow } from "./scheduled-transfer-row";
import { ScheduledTransferSkeleton } from "./scheduled-transfer-skeleton";

export const ScheduledTransfersSection = () => {
  const { data: scheduledTransfers, isLoading } = useGetScheduledTransfers();
  const transfers = scheduledTransfers?.transfers || [];

  return (
    <section className="flex flex-col items-center lg:items-start gap-[30px] w-full lg:max-w-[354px]">
      <ScheduledTransfersCardStack />

      <div className="flex flex-col items-start gap-[25px] w-full">
        <header className="flex w-full items-center justify-between">
          <h2 className="font-semibold text-lg text-colortext-1">
            Scheduled Transfers
          </h2>
          <Button
            variant="ghost"
            className="h-auto text-secondary flex items-center gap-1.5 p-0 hover:bg-transparent transition-colors"
          >
            <span className="text-sm  text-secondary ">
              View All
            </span>
            <ChevronRightIcon className="w-[18px] h-[18px] stroke-secondary  " />
          </Button>
        </header>

        <div className="flex flex-col items-start gap-3 w-full">
          <RenderIf condition={isLoading}>
            {Array.from({ length: 4 }).map((_, index) => (
              <ScheduledTransferSkeleton key={index} />
            ))}
          </RenderIf>

          <RenderIf condition={!isLoading && transfers.length > 0}>
            {transfers.map((transfer, index) => (
              <ScheduledTransferRow
                key={transfer.id}
                transfer={transfer}
                isLast={index === transfers.length - 1}
              />
            ))}
          </RenderIf>

          <RenderIf condition={!isLoading && transfers.length === 0}>
            <div className="w-full text-center py-4 text-sm text-muted-foreground">
              No scheduled transfers
            </div>
          </RenderIf>
        </div>
      </div>
    </section>
  );
};
