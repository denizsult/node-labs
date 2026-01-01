import { SignIn, SignUp, Dashboard } from "@/routes/pages";
import type { LazyExoticComponent, ReactNode } from "react";

export type AppRoute = {
  path: string;
  element: LazyExoticComponent<() => ReactNode>;
  isPrivate?: boolean;
  hasLayout?: boolean;
};

export const appRoutes: AppRoute[] = [
  {
    path: "/sign-in",
    element: SignIn,
    hasLayout: false,
  },
  {
    path: "/sign-up",
    element: SignUp,
    hasLayout: false,
  },
  {
    path: "/",
    element: Dashboard,
    isPrivate: true,
    hasLayout: true,
  },
];
