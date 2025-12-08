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

    // return [
    //     {
    //         items: [
    //             {
    //                 title: "Dashboard",
    //                 href: defaultDashboard,
    //                 icon: "LayoutDashboard",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },
    //             {
    //                 title: "Guides",
    //                 href: `/dashboard/guide`,
    //                 icon: "User",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },
    //             {
    //                 title: "All Tours",
    //                 href: `/dashboard/listings`,
    //                 icon: "User",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },
    //             {
    //                 title: "Add New Tour",
    //                 href: `/dashboard/listings/new`,
    //                 icon: "User",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },
    //             {
    //                 title: "All User",
    //                 href: `/dashboard/admin/users-management`,
    //                 icon: "User",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },
    //             {
    //                 title: "All Booking",
    //                 href: `/dashboard/admin/booking-management`,
    //                 icon: "User",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },
    //             {
    //                 title: "All Tour Listing",
    //                 href: `/dashboard/admin/tourListing-management`,
    //                 icon: "User",
    //                 roles: [UserRole.TOURIST, UserRole.GUIDE, UserRole.ADMIN],
    //             },

    //         ]
    //     },

    // ]
}
export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "Tour Listings",
                href: "/guide/dashboard/listings",
                icon: "Calendar", 
                badge: "3",
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
                title: "Tour Listings",
                href: "/tourist/dashboard/bookings",
                icon: "Calendar", 
                badge: "3",
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
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Booking Management",
                href: "/admin/dashboard/booking-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Tour Listing Management",
                href: "/admin/dashboard/tourListing-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
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