# Case Study Dashboard

This project is a dashboard built with a feature-based structure inspired by Bulletproof React.

## Tech Stack
- TanStack Query: data fetching and cache layer (`src/lib/react-query.ts`, `src/providers/query-provider.tsx`)
- Nivo Chart: visualization for `working-capital` chart components
- shadcn + Tailwind: core UI kit and styling
- Zustand: global state management (`src/store`)
- React Hook Form + Zod: forms with schema-safe validation (`src/features/auth/components/forms`, `src/features/auth/validation-schemas`)
- Sonner: toast notifications (`src/lib/toast.ts`, `src/hooks/use-extended-mutation.tsx`, `src/lib/axios.ts`)
- SVGR Rollup: SVG icon/component generation

## Utilities
- Currency formatting: `src/utils/currency.ts`
- Date formatting: `src/utils/date.ts`

## Architecture Notes
- Feature-based structure inspired by Bulletproof React (auth, dashboard domains).
- Auth config is interceptor-driven; token attach, 401 refresh, and logout flow live in `src/lib/axios.ts`. Session expiry notifies the user with a toast.
- Mutations can show dynamic toasts via `onSuccessMessage` / `onErrorMessage` and refetch data via `refetchQueries` in `useExtendedMutation`.
- ErrorBoundary Provider (`src/providers/error-boundary-provider.tsx`) wraps the app at the root (`src/main.tsx`); `ErrorPage` (`src/components/error-page.tsx`) is the default fallback.
- Shared UI/layout pieces live under `src/components`; feature-specific components under `src/features`.
- A mobile-menu sidebar was added for better mobile UX.

## File Structure (summary)
```
src/
|-- components/
|   |-- icons/
|   |-- sidebar/
|   |   |-- constants/
|   |   `-- partials/
|   `-- ui/
|-- features/
|   |-- auth/
|   |   |-- api/
|   |   |-- components/
|   |   |   `-- forms/
|   |   |-- pages/
|   |   `-- validation-schemas/
|   `-- dashboard/
|       |-- api/
|       |-- constants/
|       |-- pages/
|       `-- sections/
|           |-- scheduled-transfers/
|           `-- working-capital/
|               `-- components/
|                   |-- recent-transactions/
|                   |-- stat-cards/
|                   `-- working-capital-chart/
|-- hooks/
|-- lib/
|-- providers/
|-- routes/
|-- store/
`-- utils/
```
