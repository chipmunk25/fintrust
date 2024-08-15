import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AuthLayout from "./components/layouts/auth";

import Layout from "./components/layouts";

import PortalLayout from "./components/layouts/portal";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/*" element={<PortalLayout />}>
          <Route
            index
            lazy={async () => {
              const { default: Page } = await import("./pages/person");
              return { Component: Page };
            }}
          />
          <Route
            path="financial"
            lazy={async () => {
              const { default: Page } = await import("./pages/financial");
              return { Component: Page };
            }}
          />
        </Route>

        <Route path="" element={<AuthLayout />}>
          <Route
            path="login"
            lazy={async () => {
              const { default: Page } = await import("./pages/auth/signin");
              return { Component: Page };
            }}
          />
          <Route
            path="signup"
            lazy={async () => {
              const { default: Page } = await import("./pages/auth/signup");
              return { Component: Page };
            }}
          />
        </Route>
      </Route>
    </>
  )
);
export default rootRoutes;
