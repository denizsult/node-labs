import type { ComponentType, SVGProps } from "react";
import {
  DashboardIcon,
  HelpIcon,
  InvoicesIcon,
  LogoutIcon,
  MyWalletsIcon,
  SettingsIcon,
  TransactionsIcon,
} from "@/components/icons";

export type SidebarNavItem = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

export const mainNavItems: SidebarNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
    disabled: false,
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: TransactionsIcon,
    disabled: true,
  },
  {
    id: "invoices",
    label: "Invoices",
    icon: InvoicesIcon,
    disabled: true,
  },
  {
    id: "my-wallets",
    label: "My Wallets",
    icon: MyWalletsIcon,
    disabled: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    disabled: true,
  },
];

export const bottomNavItems: SidebarNavItem[] = [
  {
    id: "help",
    label: "Help",
    icon: HelpIcon,
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogoutIcon,
  },
];
