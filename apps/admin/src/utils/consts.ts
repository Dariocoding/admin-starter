import { ValidRol, ValidRoles } from "@teslo/interfaces";
import React from "react";
import { settingsPages } from "@/app/config/config";
import dayjs from "dayjs";

export const APP_NAME = "Teslo";
export const APP_PHONE = "042105012";
export const APP_EMAIL = "teslo@teslo.com";
export const DAY_DURATION = 86400000;
export const API_URL = "/api";
export const PF = API_URL + "/files";

export const breakpoints = {
  mobile: 0,
  sm: 640,
  md: 748,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const formatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
  style: "currency",
  currency: "USD",
});

export interface PageProps {
  path: string;
  authoritys: ValidRol[] | "*";
  component: React.MemoExoticComponent<React.LazyExoticComponent<React.FunctionComponent<any>>>;
  fnPath?(query: string | number): string;
}

export const protectedRoutes = {
  dashboard: {
    path: "/dashboard",
    component: React.memo(React.lazy(() => import("@/app/dashboard"))),
    authoritys: "*",
  } as PageProps,
  users: {
    path: "/users",
    component: React.memo(React.lazy(() => import("@/app/users"))),
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
  } as PageProps,
  viewUser: {
    path: "/users/:id",
    component: React.memo(React.lazy(() => import("@/app/users/ViewUser"))),
    fnPath: (id: string) => `/users/${id}`,
    authoritys: [ValidRoles.ADMIN, ValidRoles.SUPER_USER],
  } as PageProps,

  profile: {
    path: "/profile",
    component: React.memo(React.lazy(() => import("@/app/profile"))),
    authoritys: "*",
  } as PageProps,

  ...settingsPages,
};

export const publicRoutes = {
  home: {
    path: "/",
    component: React.memo(React.lazy(() => import("@/app/login"))),
    authoritys: "*",
  } as PageProps,
  recoverPassword: {
    path: "/recover/password/:token/:iduser",
    component: React.memo(React.lazy(() => import("@/app/recover/password"))),
    authoritys: "*",
  } as PageProps,
  verifyEmailSent: {
    path: "/verify/email",
    component: React.memo(React.lazy(() => import("@/app/verify/emailSent"))),
    authoritys: "*",
  } as PageProps,
};

export const validPaths = {
  ...protectedRoutes,
  ...publicRoutes,
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const firstDayOfMonth = () => {
  return dayjs(new Date())
    .set("seconds", 0)
    .set("minutes", 0)
    .set("hours", 0)
    .set("date", 1)
    .set("milliseconds", 0)
    .toDate();
};
