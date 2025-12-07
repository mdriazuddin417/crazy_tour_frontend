""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, } from "./auth-utils";
import { UserRole } from "./types";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },
                // {
                //     title: "My Profile",
                //     href: `/profile`,
                //     icon: "User",
                //     roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                // },
                {
                    title: "Guides",
                    href: `/dashboard/guide`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },
                {
                    title: "All Tours",
                    href: `/dashboard/listings`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },
                {
                    title: "Add New Tour",
                    href: `/dashboard/listings/new`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },
                {
                    title: "All User",
                    href: `/dashboard/admin/users-management`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },
                {
                    title: "All Booking",
                    href: `/dashboard/admin/booking-management`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },
                {
                    title: "All Tour Listing",
                    href: `/dashboard/admin/tourListing-management`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },

            ]
        },

    ]
}


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    return [...commonNavItems,];
}