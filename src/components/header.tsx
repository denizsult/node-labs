import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, CaretDownIcon, SearchIcon } from "./icons";
import { useSidebarStore } from "@/store/sidebar-store";
import { useLogout } from "@/features/auth";
import { useAuth } from "@/providers";

export const Header = () => {
  const {mutateAsync:logoutMutation} = useLogout()
  const {setToken, setUser} = useAuth()
  const onOpenMobileSidebar = useSidebarStore((state) => state.open);

  const handleLogout = async () => {
    await logoutMutation(undefined);
    setUser(null);
    setToken(null);
    window.location.href = "/sign-in";
  };
  return (
    <div className="animate-fade-in delay-[0ms]">
      <header className="flex w-full items-center justify-between gap-3 sm:gap-6 min-w-0">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onOpenMobileSidebar}
          >
            <span className="sr-only">Open sidebar</span>
            <span className="flex flex-col items-center justify-center gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-colortext-1" />
              <span className="block h-0.5 w-5 rounded-full bg-colortext-1" />
              <span className="block h-0.5 w-5 rounded-full bg-colortext-1" />
            </span>
          </Button>

          <h1 className=" font-semibold text-colortext-1 text-[25px]">
            Dashboard
          </h1>
        </div>

        <nav className="flex items-center gap-2 sm:gap-[45px] min-w-0">
          <div className="hidden sm:flex items-center gap-2 sm:gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 sm:w-10 sm:h-10"
            >
              <SearchIcon />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 sm:w-10 sm:h-10"
            >
              <BellIcon />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex min-w-0 max-w-[215px] sm:w-[215px] items-center justify-between px-2 py-1 sm:pl-[7px] sm:pr-[15px] sm:py-1.5 bg-neutral-50 rounded-[100px] hover:bg-neutral-100 transition-colors h-auto"
              >
                <div className="inline-flex items-center gap-2 sm:gap-3 min-w-0">
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src="/images/header/avatar-ellipse-1.png"
                      alt="Mahfuzul Nabil"
                    />
                    <AvatarFallback className="font-semibold text-colortext-1 text-sm">
                      MN
                    </AvatarFallback>
                  </Avatar>

                  <span className="hidden sm:inline font-semibold text-colortext-1 text-sm truncate">
                    Mahfuzul Nabil
                  </span>
                </div>

                <CaretDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[215px]">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
    </div>
  );
};
