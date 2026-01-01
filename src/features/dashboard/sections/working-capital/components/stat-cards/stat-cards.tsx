import { RenderIf } from "@/components/render-if";
import { useGetFinancialSummary } from "@/features/dashboard/api";
import { StatCard } from "./stat-card";
import { StatCardSkeleton } from "./stat-card-skeleton";
import { statCardConfigs } from "./config";

export const StatCards = () => {
  const { data: summary, isLoading } = useGetFinancialSummary();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-[25px] w-full flex-wrap>">
      <RenderIf condition={isLoading}>
        {statCardConfigs.map((config) => (
          <StatCardSkeleton key={config.key} bgColor={config.bgColor} />
        ))}
      </RenderIf>

      <RenderIf condition={!isLoading && !!summary}>
        {statCardConfigs.map((config, index) => {
          const delayClass = `animate-fade-in delay-[${100 * index}ms]`;
          const amount = summary?.[config.key];

          return (
            <StatCard
              key={config.key}
              config={config}
              amount={amount}
              delayClass={delayClass}
            />
          );
        })}
      </RenderIf>
    </div>
  );
};
