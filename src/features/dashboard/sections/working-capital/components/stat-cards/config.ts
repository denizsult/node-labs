import type { FinancialSummary } from "@/features/dashboard/types";

export type StatCardKey = keyof Pick<
  FinancialSummary,
  "totalBalance" | "totalExpense" | "totalSavings"
>;

export type StatCardConfig = {
  icon: string;
  label: string;
  key: StatCardKey;
  bgColor: string;
  textColor: string;
  labelColor: string;
};

export const statCardConfigs: StatCardConfig[] = [
  {
    icon: "/images/working-capital/icon.png",
    label: "Total balance",
    key: "totalBalance",
    bgColor: "bg-darkish-colorkey-black",
    textColor: "text-white",
    labelColor: "text-[#929eae]",
  },
  {
    icon: "/images/working-capital/icon-1.png",
    label: "Total spending",
    key: "totalExpense",
    bgColor: "bg-gray-2",
    textColor: "text-colortext-1",
    labelColor: "text-colortext-2",
  },
  {
    icon: "/images/working-capital/icon-2.png",
    label: "Total saved",
    key: "totalSavings",
    bgColor: "bg-gray-2",
    textColor: "text-colortext-1",
    labelColor: "text-colortext-2",
  },
];
