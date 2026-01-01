import { StatCards } from "./components/stat-cards/stat-cards";
import { WorkingCapitalChart } from "./components/working-capital-chart/working-capital-chart";
import { RecentTransactions } from "./components/recent-transactions/recent-transactions";

export const WorkingCapitalSection = () => {
  return (
    <section className="flex flex-col items-start gap-[30px] w-full">
      <StatCards />
      <WorkingCapitalChart />
      <RecentTransactions />
    </section>
  );
};
