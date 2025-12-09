/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"
import {
  updateListingSchema,
  type UpdateListingInput
} from "@/types/zod/listing.validation"

export async function createListingService(formData: FormData) {
  try {
    // FormData is already prepared with 'data' and 'files' fields
    // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
    const response = await serverFetch.post("/listing/create", {
      body: formData,
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error creating listing:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create listing",
    }
  }
}

export async function getListingsService(queryString?: string) {
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

export async function getListingByIdService(listingId: string) {
  try {
    const response = await serverFetch.get(`/listing/${listingId}`)
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

export async function updateListingService(listingId: string, data: UpdateListingInput) {
  try {
    const validated = updateListingSchema.parse(data)

    const response = await serverFetch.patch(`/listing/${listingId}`, {
      body: JSON.stringify(validated),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error updating listing:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update listing",
    }
  }
}

export async function deleteListingService(listingId: string) {
  try {
    const response = await serverFetch.delete(`/listing/${listingId}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error deleting listing:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete listing",
    }
  }
}
