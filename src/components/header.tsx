import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon, CaretDownIcon, SearchIcon } from "./icons";

export const Header = () => {
  return (
    <div className="animate-fade-in delay-[0ms]">
      <header className="flex w-full items-center justify-between">
        <h1 className=" font-semibold text-colortext-1 text-[25px]">
          Dashboard
        </h1>

        <nav className="inline-flex items-center gap-[45px]">
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon">
              <SearchIcon />
            </Button>

            <Button variant="ghost" size="icon">
              <BellIcon  />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-[215px] items-center justify-between pl-[7px] pr-[15px] py-1.5 bg-neutral-50 rounded-[100px] hover:bg-neutral-100 transition-colors h-auto"
              >
                <div className="inline-flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src="/images/header/avatar-ellipse-1.png"
                      alt="Mahfuzul Nabil"
                    />
                    <AvatarFallback className="font-semibold text-colortext-1 text-sm">
                      MN
                    </AvatarFallback>
                  </Avatar>

                  <span className=" font-semibold text-colortext-1 text-sm  ">
                    Mahfuzul Nabil
                  </span>
                </div>

                <CaretDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[215px]">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
    </div>
  );
};
