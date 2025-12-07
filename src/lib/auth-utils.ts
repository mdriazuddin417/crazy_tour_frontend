import { UserRole } from "./types";

// exact : ["/my-profile", "settings"]
//   patterns: [/^\/dashboard/, /^\/patient/], // Routes starting with /dashboard/* /patient/*
export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [], // [/password/change-password, /password/reset-password => /password/*]
}


export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}




export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === UserRole.ADMIN) {
        return "/dashboard/admin";
    }
    if (role === UserRole.TOURIST) {
        return "/dashboard/tourist";
    }
    if (role === UserRole.GUIDE) {
        return "/dashboard/guide";
    }
    return "/dashboard";
}



export { UserRole };

