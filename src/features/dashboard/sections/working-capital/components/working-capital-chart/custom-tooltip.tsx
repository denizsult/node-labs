import { useEffect } from "react";
import type { PointTooltipProps } from "@nivo/line";
import type { WorkingCapitalPoint, WorkingCapitalSeries } from "./types";
import { formatCurrency } from "@/utils";

type CustomTooltipProps = PointTooltipProps<WorkingCapitalSeries> & {
  setActivePoint: (point: WorkingCapitalPoint) => void;
  currency?: string;
};

export const CustomTooltip = ({
  point,
  setActivePoint,
  currency,
}: CustomTooltipProps) => {
  useEffect(() => {
    setActivePoint(point);
  }, [point, setActivePoint]);


  return (
    <div
      className="
        relative
        pointer-events-none
        rounded-[4px]
        bg-[#F3F6F8]
        px-3 py-1.5
        text-center
        text-[12px]
    font-medium
        text-colortext-1
        leaning-[15px]
        mb-1
      "
    >
      {formatCurrency(point.data.y, currency)}

      {/* Tooltip arrow */}
      <div
        className="
          absolute
          -bottom-1.5
          left-1/2
          -translate-x-1/2
          h-0 w-0
          border-l-[6px] border-l-transparent
          border-r-[6px] border-r-transparent
          border-t-[6px] border-t-[#F3F6F8]
        "
      />
    </div>
  );
};
 