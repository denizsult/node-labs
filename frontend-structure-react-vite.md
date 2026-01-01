# Frontend Structure - React + Vite

## Project Overview

This document outlines the standard architecture and structure for React applications built with Vite, TypeScript, and Tailwind CSS. The project follows a feature-based architecture with clear separation of concerns. Use Barrel pattern for the files.
file and folder names should be in kebab-case.

## Technology Stack

- **Framework**: React  
- **Build Tool**: Vite  
- **Language**: TypeScript 
- **Styling**: Tailwind CSS  
- **Routing**: React Router DOM  
- **State Management**: 
  - TanStack Query (React Query) for server state
  - Zustand for client state
- **UI Components**: Shadcn/ui
- **Form Handling**: React Hook Form + Zod  
- **Charts**: React Chart.js  & Recharts

## Project Structure

```
project-root/
├── src/
│   ├── api/                    # Global API hooks and configurations
│   ├── assets/                 # Static assets (images, fonts, etc.)
│   ├── components/             # Shared/reusable components
│   │   ├── ui/                # Base UI components (e.g., shadcn/ui)
│   │   └── [common-components] # Feature-agnostic shared components
│   ├── config/                 # Configuration files (constants, env)
│   ├── features/               # Feature modules (feature-based architecture)
│   │   └── feature-name/      # Individual feature modules
│   ├── hooks/                  # Custom React hooks (global/shared)
│   ├── lib/                    # Library configurations and utilities
│   ├── providers/              # React context providers
│   ├── routes/                 # Route configuration and lazy-loaded components
│   ├── store/                  # Global state stores (Zustand)
│   ├── types/                  # TypeScript type definitions (global)
│   ├── utils/                  # Utility functions and helpers
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Application entry point
├── public/                     # Public static files
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── package.json                # Dependencies and scripts
```

## Key Architectural Patterns

### 1. Feature-Based Architecture

Each feature is self-contained in the `src/features/` directory with its own:
- Components
- API hooks
- Types/schemas
- Business logic

Example feature structure:
```
features/
  feature-name/
    ├── api/           # Feature-specific API hooks
    ├── components/    # Feature-specific components
    ├── types/         # TypeScript types/schemas for this feature
    ├── hooks/         # Feature-specific React hooks
    ├── utils/         # Feature-specific utility functions
    ├── store/         # Feature-specific Zustand store (if needed)
    ├── routes/        # Feature-specific routes (optional)
    └── index.tsx      # Main feature component/entry point
```

### 2. Routing Strategy

Routes are typically defined in `src/App.tsx` with categorization:
- **Public Routes**: Routes accessible without authentication (e.g., `/login`, `/register`)
- **Protected Routes**: Routes requiring authentication
- **Common Routes**: Utility routes (e.g., 404, catch-all)

Routes should be lazy-loaded using React's `lazy()` function for code splitting and better performance.

### 3. Authentication & Authorization

- **Authentication**: Typically handled via a custom `useAuth` hook and `AuthProvider` context
- **Route Protection**: `ProtectedRoute` component (or similar) wraps routes requiring authentication

### 4. State Management

- **Server State**: TanStack Query (React Query) for API data fetching and caching
- **Client State**: 
  - Zustand stores in `src/store/` for global client state
  - React Context for theme and auth
  - Local component state for UI-specific state

### 5. API Layer

API hooks are organized by feature in `src/features/[Feature]/api/` directories.
- Standard TanStack Query hooks (`useQuery`, `useMutation`)
- Custom wrapper hooks (e.g., `useExtendedMutation`) for consistent error handling or side effects
- Centralized HTTP client configuration (e.g., axios) in `src/lib/`

#### Example: Fetch Hook (useQuery)
File name: src/features/[Feature]/api/useGetItems.tsx
```typescript
import { api } from "@/lib/axios";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

type Payload = {
  platform: string;
  query: string;
};

type Response = {
  status: "success" | "error";
  data: Item[];
};

const getItems = async ({ 
  queryKey, 
  signal 
}: QueryFunctionContext) => {
  const [, payload] = queryKey as [string, Payload];
  
  const response = (
    await api.get(`/items/${payload.platform}`, {
      params: {
        query: payload.query,
      },
      signal,
    })
  ).data;

  return Array.isArray(response.data) ? response.data : [];
};

export const useGetItems = (payload: Payload, config = {}) => {
  return useQuery<Response["data"]>({
    queryKey: ["useGetItems", payload],
    queryFn: getItems,
    ...config,
  });
};

```

#### Example: Mutation Hook (useMutation)
File name: src/features/[Feature]/api/useAddItem.tsx

```typescript
import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";

type Payload = {
  item_id: string;
  platform: string;
};

export const addItem = async (payload: Payload) => {
  return api.post("/items", payload);
};

export const useAddItem = (config?: MutationConfig<typeof addItem>) => {
  return useExtendedMutation({
    ...config,
    mutationFn: addItem,
  });
  
};
```

### 6. Component Organization

- **Shared Components**: `src/components/` - Reusable across features
- **UI Components**: `src/components/ui/` - Base UI primitives (shadcn/ui style)
- **Feature Components**: `src/features/[Feature]/components/` - Feature-specific components

### 7. Styling Approach

- **Tailwind CSS**: Utility-first CSS framework
- **Component Variants**: Class Variance Authority (CVA) for component variants
- **Custom Components**: Shadcn/ui UI primitives styled with Tailwind

## Key Files

### Entry Points
- `src/main.tsx`: Application bootstrap, providers setup
- `src/App.tsx`: Main app component, routing configuration

### Configuration
- `vite.config.ts`: Vite build configuration, path aliases
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `src/lib/react-query.ts`: React Query configuration

### Providers
- `src/providers/auth-provider.tsx`: Authentication context
- `src/providers/query-provider.tsx`: React Query provider

### Hooks
Common hooks typically include:
- `src/hooks/use-auth.tsx`: Authentication hook
- `src/hooks/use-debounce.ts`: Debounce utility hook
- `src/hooks/use-mobile.tsx`: Mobile/responsive detection hook
- Additional custom hooks as needed by the project
 

## Path Aliases

The project uses path aliases configured in `vite.config.ts`:
- `@/` → `src/`

Example usage:
```typescript
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
```

## Build Output

Production builds are output to `dist/` directory (configured by Vite).

## Best Practices & Conventions

- **Components**: Use functional components with hooks (no class components)
- **Conditional Rendering**: Use utility components like `RenderIf` for cleaner conditional rendering
- **State Management**: 
  - Use Zustand for global client state
  - Use TanStack Query for server state
  - Use local state for component-specific UI state
- **Code Style**: All code should follow consistent naming conventions and be written in English
- **Type Safety**: Leverage TypeScript for type safety across the application

