export const CHART_HEIGHT = 225;
export const CHART_MARGIN = { top: 24, right: 24, bottom: 36, left: 100 };
export const CHART_COLORS = {   
  income: "#16a34a",
  expenses: "#a3e635",
  marker: "#5243AA",
  grid: "#eef2f7",
  axis: "#9ca3af",
};

export const CHART_THEME = {
  axis: {
    domain: {
      line: {
        stroke: "transparent",
      },
    },
    ticks: {
      line: {
        stroke: "transparent",
      },
      text: {
        fill: CHART_COLORS.axis,
        fontSize: 12,
      },
    },
  },
  grid: {
    line: {
      stroke: CHART_COLORS.grid,
      strokeWidth: 1,
    },
  },
  crosshair: {
    line: {
      stroke: "transparent",
    },
  },
};