import type { PropsWithChildren } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-text-colorpure-white min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col p-10 pt-8 gap-6">
        <Header />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
