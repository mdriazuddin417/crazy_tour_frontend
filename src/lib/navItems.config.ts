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
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
                },

            ]
        },
    ]


}
export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "Tour Listings",
                href: "/guide/dashboard/listings",
                icon: "CarTaxiFront",
                roles: [UserRole.GUIDE],
            },
        ],
    }
]
export const touristNavItems: NavSection[] = [
    {
        title: "Bookings Management",
        items: [
            {
                title: "My Bookings",
                href: "/tourist/dashboard/bookings",
                icon: "BookMarked", // ✅ String
                roles: [UserRole.TOURIST],
            },
        ],
    }
];

export const adminNavItems: NavSection[] = [
    {
        title: "Management Section",
        items: [
            {
                title: "Users Management",
                href: "/admin/dashboard/users-management",
                icon: "User", // ✅ String
                roles: [UserRole.ADMIN],
            },
            {
                title: "Booking Management",
                href: "/admin/dashboard/booking-management",
                icon: "UserRoundCheck", // ✅ String
               roles: [UserRole.ADMIN],
            },
            {
                title: "Tour Listing Management",
                href: "/admin/dashboard/tourListing-management",
                icon: "MapMinus", // ✅ String
              roles: [UserRole.ADMIN],
            },
        ]
    },

]


export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
}