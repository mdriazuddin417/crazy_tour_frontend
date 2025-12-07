// "use server"
// import { db } from "@/lib/db-mock"

// export async function getAdminStatsService() {
//   try {
//     const allUsers = db.getAllUsers()
//     const allListings = db.getAllListings()
//     const allBookings = db.getAllBookings()

//     const guides = allUsers.filter((u) => u.role === "guide")
//     const tourists = allUsers.filter((u) => u.role === "tourist")

//     return {
//       success: true,
//       data: {
//         totalUsers: allUsers.length,
//         totalGuides: guides.length,
//         totalTourists: tourists.length,
//         totalListings: allListings.length,
//         totalBookings: allBookings.length,
//         revenue: allBookings.reduce((sum, b) => sum + b.totalPrice, 0),
//       },
//     }
//   } catch (error: any) {
//     console.error("[v0] Error fetching admin stats:", error)
//     return {
//       success: false,
//       data: null,
//       error: "Failed to fetch stats",
//     }
//   }
// }

// export async function getAllUsersAdminService() {
//   try {
//     const users = db.getAllUsers()

//     return {
//       success: true,
//       data: users,
//     }
//   } catch (error: any) {
//     console.error("[v0] Error fetching users:", error)
//     return {
//       success: false,
//       data: [],
//       error: "Failed to fetch users",
//     }
//   }
// }

// export async function getAllListingsAdminService() {
//   try {
//     const allListings = db.getAllListings()

//     return {
//       success: true,
//       data: allListings,
//     }
//   } catch (error: any) {
//     console.error("[v0] Error fetching listings:", error)
//     return {
//       success: false,
//       data: [],
//       error: "Failed to fetch listings",
//     }
//   }
// }

// export async function getAllBookingsAdminService() {
//   try {
//     const bookings = db.getAllBookings()

//     return {
//       success: true,
//       data: bookings,
//     }
//   } catch (error: any) {
//     console.error("[v0] Error fetching bookings:", error)
//     return {
//       success: false,
//       data: [],
//       error: "Failed to fetch bookings",
//     }
//   }
// }

"use server"
import { db } from "@/lib/db-mock"
import type { User } from "@/lib/types"
import { UserRole } from "@/lib/types"
import crypto from "crypto"

export async function getAdminStatsService() {
  try {
    const allUsers = db.getAllUsers()
    const allListings = db.getAllListings()
    const allBookings = db.getAllBookings()

    const guides = allUsers.filter((u) => u.role === UserRole.GUIDE)
    const tourists = allUsers.filter((u) => u.role === UserRole.TOURIST)

    return {
      success: true,
      data: {
        totalUsers: allUsers.length,
        totalGuides: guides.length,
        totalTourists: tourists.length,
        totalListings: allListings.length,
        totalBookings: allBookings.length,
        revenue: allBookings.reduce((sum, b) => sum + b.totalPrice, 0),
        guideSummary: guides.map((g) => ({
          id: g.id,
          name: g.name,
          email: g.email,
          totalTours: db.getListingsByGuide(g.id).length,
          rating: g.averageRating,
        })),
      },
    }
  } catch (error: any) {
    console.error("[v0] Error fetching admin stats:", error)
    return {
      success: false,
      data: null,
      error: "Failed to fetch stats",
    }
  }
}

export async function getAllUsersAdminService() {
  try {
    const users = db.getAllUsers()
    return {
      success: true,
      data: users,
    }
  } catch (error: any) {
    console.error("[v0] Error fetching users:", error)
    return {
      success: false,
      data: [],
      error: "Failed to fetch users",
    }
  }
}

export async function getAllListingsAdminService() {
  try {
    const listings = db.getAllListings()
    return {
      success: true,
      data: listings,
    }
  } catch (error: any) {
    console.error("[v0] Error fetching listings:", error)
    return {
      success: false,
      data: [],
      error: "Failed to fetch listings",
    }
  }
}

export async function getAllBookingsAdminService() {
  try {
    const bookings = db.getAllBookings()
    return {
      success: true,
      data: bookings,
    }
  } catch (error: any) {
    console.error("[v0] Error fetching bookings:", error)
    return {
      success: false,
      data: [],
      error: "Failed to fetch bookings",
    }
  }
}

export async function createUserAdminService(data: Partial<User>) {
  try {
    const user: User = {
      id: crypto.randomUUID(),
      email: data.email!,
      name: data.name!,
      role: data.role || UserRole.TOURIST,
      languagesSpoken: data.languagesSpoken || ["English"],
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    }
    db.addUser(user)
    return { success: true, data: user }
  } catch (error: any) {
    console.error("[v0] Error creating user:", error)
    return { success: false, error: "Failed to create user" }
  }
}

export async function updateUserAdminService(userId: string, data: Partial<User>) {
  try {
    const updated = db.updateUser(userId, data)
    if (!updated) {
      return { success: false, error: "User not found" }
    }
    return { success: true, data: updated }
  } catch (error: any) {
    console.error("[v0] Error updating user:", error)
    return { success: false, error: "Failed to update user" }
  }
}

export async function deleteUserAdminService(userId: string) {
  try {
    const user = db.getUser(userId)
    if (!user) {
      return { success: false, error: "User not found" }
    }
    db.updateUser(userId, { ...user, role: UserRole.TOURIST })
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error deleting user:", error)
    return { success: false, error: "Failed to delete user" }
  }
}

export async function getGuidesAdminService() {
  try {
    const users = db.getAllUsers()
    const guides = users.filter((u) => u.role === UserRole.GUIDE)
    const guidesWithTours = guides.map((guide) => ({
      ...guide,
      tours: db.getListingsByGuide(guide.id),
      totalToursAssigned: db.getListingsByGuide(guide.id).length,
    }))
    return { success: true, data: guidesWithTours }
  } catch (error: any) {
    console.error("[v0] Error fetching guides:", error)
    return { success: false, data: [], error: "Failed to fetch guides" }
  }
}

export async function assignGuideToTourService(guideId: string, tourId: string) {
  try {
    const guide = db.getUser(guideId)
    const tour = db.getListing(tourId)

    if (!guide || guide.role !== UserRole.GUIDE) {
      return { success: false, error: "Guide not found" }
    }

    if (!tour) {
      return { success: false, error: "Tour not found" }
    }

    db.updateListing(tourId, { guideId })
    return { success: true, data: { guide, tour } }
  } catch (error: any) {
    console.error("[v0] Error assigning guide:", error)
    return { success: false, error: "Failed to assign guide" }
  }
}
