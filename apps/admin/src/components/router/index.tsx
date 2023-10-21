import * as React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { PageProps, protectedRoutes, validPaths, publicRoutes } from "@/utils";
import Loader from "../ui/Loader";
import AppRoute from "./AppRoute";
import AuthorityCheck from "../AuthorityCheck";
import PublicProtectedRoute from "./PublicProtectedRoute";

const DashboardLayout = React.lazy(() => import("@/layouts/DashboardLayout"));

interface IAppRouterProps {}

const keysProtectRoutes = Object.keys(protectedRoutes);
const keysPublicRouters = Object.keys(publicRoutes);

const AppRouter: React.FunctionComponent<IAppRouterProps> = (props) => {
  const {} = props;
  const router = useLocation();
  if (router.pathname.indexOf("/api") === 0) {
    return <div />;
  }

  return (
    <React.Suspense fallback={<Loader loading />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          {keysProtectRoutes.map(renderRouteDashboard)}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>

        <Route element={<PublicProtectedRoute />}>{keysPublicRouters.map(renderRouteApp)}</Route>
      </Routes>
    </React.Suspense>
  );
};

const renderRouteApp = (key: string, idx: number) => {
  const route: PageProps = publicRoutes[key];
  return (
    <Route
      key={key.toUpperCase() + idx}
      path={route.path}
      element={<AppRoute component={route.component} />}
    />
  );
};

const renderRouteDashboard = (key: string, idx: number) => {
  const route: PageProps = protectedRoutes[key];
  return (
    <Route
      key={key + idx}
      path={route.path}
      element={
        <AuthorityCheck
          validRoles={route.authoritys}
          redirectOnNotValidRol={validPaths.dashboard.path}
        >
          <DashboardLayout>
            <AppRoute component={route.component} />
          </DashboardLayout>
        </AuthorityCheck>
      }
    />
  );
};

export default AppRouter;
