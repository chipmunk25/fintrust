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
          <Route
            path="employment"
            lazy={async () => {
              const { default: Dashboard } = await import(
                "./pages/employement"
              );
              return { Component: Dashboard };
            }}
          />
          <Route
            path="guarantor"
            lazy={async () => {
              const { default: Page } = await import("./pages/guarantor");
              return { Component: Page };
            }}
          />
          <Route
            path="bank"
            lazy={async () => {
              const { default: Page } = await import("./pages/bank");
              return { Component: Page };
            }}
          />
          <Route
            path="document"
            lazy={async () => {
              const { default: Page } = await import("./pages/document");
              return { Component: Page };
            }}
          />
          <Route
            path="loan"
            lazy={async () => {
              const { default: Page } = await import("./pages/loan");
              return { Component: Page };
            }}
          />{" "}
          <Route
            path="summary"
            lazy={async () => {
              const { default: Page } = await import("./pages/summary");
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
