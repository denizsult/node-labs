import { lazy } from "react";

export const SignIn = lazy(() =>
  import("@/features/auth/pages").then((module) => ({ 
    default: module.SignIn 
  }))
);

export const SignUp = lazy(() =>
  import("@/features/auth/pages").then((module) => ({ 
    default: module.SignUp 
  }))
);

export const Dashboard = lazy(() =>
  import("@/features/dashboard/pages/dashboard").then((module) => ({ 
    default: module.Dashboard 
  }))
);

export const NotFound = lazy(() =>
  import("@/components/not-found").then((module) => ({ 
    default: module.NotFound 
  }))
);