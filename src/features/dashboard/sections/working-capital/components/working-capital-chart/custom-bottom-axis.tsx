import type { AxisTickProps } from "@nivo/axes";
import type { WorkingCapitalPoint } from "./types";
import { cn } from "@/lib/utils";

export const CustomBottomAxios = ({
  tick,
  activePoint,
}: {
  tick: AxisTickProps<string>;
  activePoint?: WorkingCapitalPoint;
}) => {
  const isActive = tick.x === activePoint?.x;

  return (
    <g transform={`translate(${tick.x}, ${tick.y + 25})`}>
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        className={cn(isActive ? "fill-colortext-1 font-semibold" : "fill-colortext-2")}
        style={{
          fontSize: 12,
          transition: "all 0.15s ease",
          marginTop: 100,
        }}
      >
        {tick.value}
      </text>
    </g>
  );
};
