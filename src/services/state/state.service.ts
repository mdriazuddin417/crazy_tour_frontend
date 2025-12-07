/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch"

export async function getBookingStatsService() {
  try {
    const response = await serverFetch.get(`/stats/booking`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching booking:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch booking",
    }
  }
}
export async function getPaymentStatsService() {
  try {
    const response = await serverFetch.get(`/stats/payment`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching booking:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch booking",
    }
  }
}
export async function getUserStatsService() {
  try {
    const response = await serverFetch.get(`/stats/user`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching booking:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch booking",
    }
  }
}
export async function getListingStatsService() {
  try {
    const response = await serverFetch.get(`/stats/listing`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching listing:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch listing",
    }
  }
}