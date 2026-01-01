import type { Point } from "@nivo/line";

export type WorkingCapitalSeries = {
  id: "income" | "expenses";
  color: string;
  data: ReadonlyArray<{
    x: string;
    y: number;
  }>;
};

export type WorkingCapitalPoint = Point<WorkingCapitalSeries>;
