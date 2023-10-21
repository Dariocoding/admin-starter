import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store";
import { PageProps, publicRoutes, validPaths } from "@/utils";
import Loader from "../ui/Loader";

const publicRoutesStr = Object.keys(publicRoutes).map((key) => {
  const route = publicRoutes[key] as PageProps;
  return route.path;
});

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuthStore();
  const location = useLocation();

  if (loading) return <Loader loading={true} />;

  if (!authenticated && !loading) {
    if (publicRoutesStr.includes(location.pathname)) return <Outlet />;
    return <Navigate to={validPaths.home.path} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
