import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SidebarNavItem } from "../constants/nav-items";

type MenuItemProps = {
  item: SidebarNavItem;
  isActive?: boolean;
  onClick?: () => void;
  variant?: "main" | "bottom";
};

export const MenuItem = ({
  item,
  isActive = false,
  onClick,
  variant = "main",
}: MenuItemProps) => {
  const isMainVariant = variant === "main";
  const buttonSizeProps = isMainVariant ? { size: "icon" as const } : {};

  return (
    <Button
      variant="ghost"
      {...buttonSizeProps}
      className={cn(
        "w-full justify-start gap-3 px-[15px] py-3.5 h-auto transition-colors",
        isMainVariant
          ? "rounded-[8px] hover:bg-gray-3"
          : "rounded-lg hover:bg-gray-2",
        isMainVariant && isActive && "bg-primary hover:bg-primary"
      )}
      onClick={item.disabled ? undefined : onClick}
    >
      <item.icon
        className={cn(
          "w-5 h-5",
          isMainVariant && (isActive ? "fill-colortext-1" : "fill-colortext-2")
        )}
      />
      <span
        className={cn(
          "text-sm font-normal",
          isMainVariant
            ? isActive
              ? "text-colortext-1 font-medium"
              : "text-colortext-2"
            : "text-colortext-2 "
        )}
      >
        {item.label}
      </span>
    </Button>
  );
};
