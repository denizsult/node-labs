import {  useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LogoIcon } from "@/components/icons";
import { useLogout } from "@/features/auth/api/use-logout";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { bottomNavItems, mainNavItems } from "./constants/nav-items";
import { MenuItem } from "./partials/menu-item";
import { usePageStore } from "@/store/page-store";

type SidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

export const Sidebar = ({ className, onNavigate }: SidebarProps) => {
  const setPageTitle = usePageStore((state) => state.setTitle);
  const { mutateAsync: logoutMutation } = useLogout();
  const { setUser, setToken } = useAuth();
  const { pathname } = useLocation();

  const activeId = useMemo(
    () => (pathname === "/" ? "dashboard" : pathname.split("/")[1]),
    [pathname]
  );

  const handleLogout = async () => {
    await logoutMutation(undefined);
    setUser(null);
    setToken(null);
    window.location.href = "/sign-in";
  };

  const handleNavigate = (nextId?: string) => {
    onNavigate?.();
    const menu = [...mainNavItems, ...bottomNavItems];
    const targetId = nextId ?? activeId;
    const activePage = menu.find((item) => item.id === targetId)?.label;

    if (activePage) {
      setPageTitle(activePage);
    }
  };

  return (
    <div
      className={cn(
        "h-screen animate-fade-in delay-[200ms] flex-shrink-0 sticky top-0 w-[250px]",
        className
      )}
    >
      <aside className="flex flex-col h-full justify-between pt-[30px] pb-[100px] px-[25px] bg-gray-1">
        <LogoIcon className="h-[30px] w-fit " />

        <div className="flex flex-col justify-between flex-1 mt-8">
          <nav className="flex flex-col gap-0.5">
            {mainNavItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={item.id === activeId}
                variant="main"
                onClick={() => handleNavigate(item.id)}
              />
            ))}
          </nav>

          <nav className="flex flex-col gap-0.5">
            {bottomNavItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={() => {
                  if (item.id === "logout") {
                    handleLogout();
                  }
                  handleNavigate(item.id);
                  }}
                variant="bottom"
              />
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
