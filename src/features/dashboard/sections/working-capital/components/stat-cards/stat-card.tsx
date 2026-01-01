import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FinancialAmount } from "@/features/dashboard/types";
import { formatCurrency } from "@/utils/currency";
import type { StatCardConfig } from "./config";

type StatCardProps = {
  config: StatCardConfig;
  amount?: FinancialAmount;
  delayClass?: string;
};

export const StatCard = ({ config, amount, delayClass }: StatCardProps) => {
  const formattedValue = amount
    ? formatCurrency(amount.amount, amount.currency)
    : "";

  return (
    <Card
      className={cn(config.bgColor, "border-0 rounded-[10px] ", delayClass)}
    >
      <CardContent className="flex items-center gap-[15px] p-6">
        <img className="w-[42px] h-[42px]" alt="Icon" src={config.icon} />
        <div className="flex flex-col items-start gap-2.5">
          <div
            className={cn("font-normal text-sm", config.labelColor)}
          >
            {config.label}
          </div>
          <div
            className={cn(" font-bold text-2xl", config.textColor)}
          >
            {formattedValue}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
