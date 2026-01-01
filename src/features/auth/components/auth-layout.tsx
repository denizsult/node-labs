import type { PropsWithChildren } from "react";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="bg-white w-full min-h-[900px] h-screen flex">
      <section className="flex-1 flex flex-col justify-center px-[135px] relative">
        <img
          className="absolute top-10 left-[135px] w-[108px] h-[30px]"
          alt="Logo"
          src="/images/auth/logo.svg"
        />

        <div className="flex flex-col gap-[25px] max-w-[404px] animate-fade-in delay-[0ms]">
          {children}
        </div>
      </section>

      <aside className="w-1/2 h-full relative overflow-hidden hidden lg:flex">
        <img
          src="/images/auth/image.png"
          alt="Authentication illustration"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />

        <div className="absolute inset-0 w-full h-full bg-foreground opacity-10" />
      </aside>
    </main>
  );
};
