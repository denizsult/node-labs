import type { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useSidebarStore } from "@/store/sidebar-store";
import { RenderIf } from "./render-if";

export const Layout = ({ children }: PropsWithChildren) => {
  const isMobileSidebarOpen = useSidebarStore((state) => state.isOpen);
  const closeMobileSidebar = useSidebarStore((state) => state.close);

  return (
    <div className="bg-text-colorpure-white min-h-screen flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <RenderIf condition={isMobileSidebarOpen}>
        <div
          className="fixed inset-0 z-50 flex lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeMobileSidebar}
          />
          <div
            className="relative h-full w-[250px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Sidebar className="shadow-2xl" onNavigate={closeMobileSidebar} />
          </div>
        </div>
      </RenderIf>

      <div className="flex-1 flex flex-col p-10 pt-8 gap-6">
        <Header />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
