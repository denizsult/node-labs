import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner"
import { ErrorBoundaryProvider } from "@/providers/error-boundary-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundaryProvider>
      <Toaster position="top-right" />
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundaryProvider>
  </StrictMode>
);
