import { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RenderIf } from "@/components/render-if";
import { useGetWorkingCapital } from "@/features/dashboard/api";
import {
  CHART_COLORS,
  CHART_HEIGHT,
  CHART_MARGIN,
  CHART_THEME,
} from "@/features/dashboard/constants";
import { CrosshairOverlay } from "./crosshair-overlay";
import { CustomTooltip } from "./custom-tooltip";
import type { WorkingCapitalPoint, WorkingCapitalSeries } from "./types";
import { LineChartSkeleton } from "./chart-skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CustomBottomAxios } from "./custom-bottom-axis";

const LEGEND_ITEMS: Array<{
  id: WorkingCapitalSeries["id"];
  label: string;
  color: string;
}> = [
  {
    id: "income",
    label: "Income",
    color: CHART_COLORS.income,
  },
  {
    id: "expenses",
    label: "Expenses",
    color: CHART_COLORS.expenses,
  },
];

export const WorkingCapitalChart = () => {
  const [period, setPeriod] = useState("last7Days");
  const [visibility, setVisibility] = useState<
    Record<WorkingCapitalSeries["id"], boolean>
  >({
    income: true,
    expenses: true,
  });
  const [activePoint, setActivePoint] = useState<WorkingCapitalPoint>();
  const { data: workingCapital, isLoading } = useGetWorkingCapital({ period });

  // Transform data for chart
  const chartData = useMemo(
    () =>
      workingCapital?.data?.map((p) => ({
        date: p.month,
        income: p.income,
        expenses: p.expense,
      })) ?? [],
    [workingCapital]
  );

  // Format data for Nivo
  const nivoData = useMemo<WorkingCapitalSeries[]>(
    () => [
      {
        id: "income",
        color: CHART_COLORS.income,
        data: chartData.map((d) => ({
          x: d.date,
          y: d.income,
        })),
      },
      {
        id: "expenses",
        color: CHART_COLORS.expenses,
        data: chartData.map((d) => ({
          x: d.date,
          y: d.expenses,
        })),
      },
    ],
    [chartData]
  );

  const toggleSeriesVisibility = (id: WorkingCapitalSeries["id"]) => {
    setVisibility((v) => ({ ...v, [id]: !v[id] }));
  };

  const visibleData = useMemo(
    () => nivoData.filter((s) => visibility[s.id]),
    [nivoData, visibility]
  );

  const handleMouseLeave = () => {
    setActivePoint(undefined);
  };

  const formatYAxis = (value: number | string) => {
    const numericValue = typeof value === "number" ? value : parseFloat(value);
    return `${Math.round(numericValue / 1000)}K`;
  };

  return (
    <Card className="w-full bg-white rounded-[10px] border border-neutral-100">
      <CardHeader className="pb-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <CardTitle className="text-lg font-semibold">
            Working Capital
          </CardTitle>

          <div className="flex flex-wrap justify-between items-center gap-20">
            <div className="flex items-center gap-3">
              {LEGEND_ITEMS.map((item) => {
                const isHidden = !visibility[item.id];
                const isActive = activePoint?.seriesId === item.id;

                return (
                  <Button
                    key={item.id}
                    variant={"ghost"}
                    onClick={() => toggleSeriesVisibility(item.id)}
                    className="flex items-center gap-3 rounded-md px-2 py-1 text-xs font-normal  leading-[15px] transition-colors hover:bg-gray-50"
                    aria-pressed={!isHidden}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: isHidden ? "#d1d5db" : item.color,
                      }}
                    />
                    <span
                      className={cn(
                        isHidden
                          ? "text-gray-400"
                          : isActive
                          ? "text-text-1"
                          : "text-text-2"
                      )}
                    >
                      {item.label}
                    </span>
                  </Button>
                );
              })}
            </div>

            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[140px] h-9 bg-gray-100 rounded-md border-none shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7Days">Last 7 days</SelectItem>
                <SelectItem value="last14Days">Last 14 days</SelectItem>
                <SelectItem value="last30Days">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-2">
        <RenderIf condition={isLoading}>
          <LineChartSkeleton />
        </RenderIf>

        <RenderIf condition={!isLoading && chartData.length > 0}>
          <div
            style={{ height: `${CHART_HEIGHT}px`, position: "relative" }}
            onMouseLeave={handleMouseLeave}
          >
            <CrosshairOverlay activePoint={activePoint} />

            <ResponsiveLine<WorkingCapitalSeries>
              data={visibleData}
              margin={CHART_MARGIN}
              xScale={{ type: "point" }}
              yScale={{ type: "linear" }}
              curve="monotoneX"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 12,
                renderTick: (props) => (
                  <CustomBottomAxios tick={props} activePoint={activePoint} />
                ),
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 72,
                format: formatYAxis,
                tickValues: 4,
              }}
              colors={({ id }) => CHART_COLORS[id as keyof typeof CHART_COLORS]}
              lineWidth={2}
              pointSize={0}
              enableGridY={false}
              useMesh={true}
              enableSlices={false}
              enableCrosshair={false}
              tooltip={(props) => (
                <CustomTooltip
                  {...props}
                  setActivePoint={setActivePoint}
                  currency={workingCapital?.currency}
                />
              )}
              theme={CHART_THEME}
              legends={[]}
            />
          </div>
        </RenderIf>
      </CardContent>
    </Card>
  );
};
