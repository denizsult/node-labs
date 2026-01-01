import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { appRoutes } from "@/routes/routes";
import { RequireAuth, RequireGuest } from "@/routes/guards";
import { Layout } from "@/components/layout";
import { NotFound } from "@/routes/pages";

function App() {
  const guestRoutes = appRoutes.filter((r) => !r.isPrivate);
  const privateRoutes = appRoutes.filter((r) => r.isPrivate);

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {/* GUEST ROUTES */}
          <Route element={<RequireGuest />}>
            {guestRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<RequireAuth />}>
            {/* Private + Layout */}
            <Route>
              {privateRoutes
                .filter((r) => r.hasLayout)
                .map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Layout>
                        <route.element />
                      </Layout>
                    }
                  />
                ))}
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
