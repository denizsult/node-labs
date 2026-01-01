import { Skeleton } from "@/components/ui/skeleton";
import { CHART_HEIGHT } from "@/features/dashboard/constants";

export const LineChartSkeleton = () => {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-white"
      style={{ height: CHART_HEIGHT }}
    >
      {/* grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between px-6 py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-px w-full bg-neutral-100"
          />
        ))}
      </div>

      {/* y-axis labels */}
      <div className="absolute left-0 top-0 h-full px-3 py-4 flex flex-col justify-between">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-10" />
        ))}
      </div>

      {/* x-axis labels */}
      <div className="absolute bottom-2 left-14 right-6 flex justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-8 rounded-full" />
        ))}
      </div>

      {/* line shimmer */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 240"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="line-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="50%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>
        </defs>

        <path
          d="M0 170 L60 150 L120 160 L180 120 L240 140 L300 110 L360 120 L400 100"
          fill="none"
          stroke="url(#line-shimmer)"
          strokeWidth="3"
          strokeLinecap="round"
          className="animate-pulse"
        />

        {/* subtle area */}
        <path
          d="M0 240 L0 170 L60 150 L120 160 L180 120 L240 140 L300 110 L360 120 L400 100 L400 240 Z"
          fill="#6366f1"
          opacity="0.04"
        />
      </svg>
    </div>
  );
};
