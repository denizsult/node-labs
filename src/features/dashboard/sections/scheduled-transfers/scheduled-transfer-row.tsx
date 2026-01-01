import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { RenderIf } from "@/components/render-if";
import { formatDate } from "@/utils";
import { formatCurrency } from "@/utils/currency";
import type { ScheduledTransfer } from "@/features/dashboard/types";

type ScheduledTransferRowProps = {
  transfer: ScheduledTransfer;
  isLast: boolean;
};

export const ScheduledTransferRow = ({
  transfer,
  isLast,
}: ScheduledTransferRowProps) => {
  return (
    <div className="flex flex-col items-start gap-[15px] w-full">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-[15px]">
          <Avatar className="w-[33px] h-[33px]">
            <AvatarImage src={transfer.image} alt={transfer.name} />
            <AvatarFallback>{transfer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start gap-[7px]">
            <span className="font-semibold text-[#1b212d] text-sm">
              {transfer.name}
            </span>
            <span className="font-medium text-[#929eae] text-xs">
              {formatDate(transfer.date, true)}
            </span>
          </div>
        </div>
        <span className="font-semibold text-black text-base text-right">
          {formatCurrency(transfer.amount, transfer.currency)}
        </span>
      </div>
      <RenderIf condition={!isLast}>
        <Separator className="w-full bg-gray-1" />
      </RenderIf>
    </div>
  );
};
