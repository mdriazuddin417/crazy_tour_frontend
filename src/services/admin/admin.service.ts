/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"

export async function getAdminStatsService() {
  try {
    const response = await serverFetch.get("/admin/stats")
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching admin stats:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch stats",
    }
  }
}

export async function getAllUsersService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/user/all-users${queryString ? `?${queryString}` : ""}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching users:", error)
    return {
      success: false,
      data: [],
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch users",
    }
  }
}

export async function getAllListingsService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/listing${queryString ? `?${queryString}` : ""}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching listings:", error)
    return {
      success: false,
      data: [],
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch listings",
    }
  }
}

export async function getAllBookingsService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/booking${queryString ? `?${queryString}` : ""}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching bookings:", error)
    return {
      success: false,
      data: [],
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch bookings",
    }
  }
}
export async function getAllTourTypesService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/tour-type${queryString ? `?${queryString}` : ""}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching tour types:", error)
    return {
      success: false,
      data: [],
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch tour types",
    }
  }
}
export async function getAllReviewsService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/review${queryString ? `?${queryString}` : ""}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching reviews:", error)
    return {
      success: false,
      data: [],
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch reviews",
    }
  }
}
