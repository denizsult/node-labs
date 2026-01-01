import {
  CHART_COLORS,
  CHART_HEIGHT,
  CHART_MARGIN,
} from "@/features/dashboard/constants";
import type { WorkingCapitalPoint } from "./types";
type CrosshairOverlayProps = { activePoint?: WorkingCapitalPoint };
export const CrosshairOverlay = ({ activePoint }: CrosshairOverlayProps) => {
  if (!activePoint) return null;

  const crosshairX = activePoint.x - 22 + CHART_MARGIN.left;
  const crosshairY = CHART_MARGIN.top;
  const crosshairHeight = CHART_HEIGHT - CHART_MARGIN.top - CHART_MARGIN.bottom;
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <defs>
        <linearGradient id="crosshairGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAFBFE" stopOpacity={0} />
          <stop offset="100%" stopColor="#F2F6FC" stopOpacity={1} />
        </linearGradient>
      </defs>
      {/* Gradient background */}
      <rect
        x={crosshairX}
        y={crosshairY}
        width={44}
        height={crosshairHeight}
        fill="url(#crosshairGradient)"
        rx={12}
        ry={12}
        opacity={1}
      />
      {/* Active marker */}
      <circle
        cx={activePoint.x + CHART_MARGIN.left}
        cy={activePoint.y + CHART_MARGIN.top}
        r={6}
        fill={CHART_COLORS.marker}
        stroke="#fff"
        strokeWidth={2}
      />
    </svg>
  );
};
