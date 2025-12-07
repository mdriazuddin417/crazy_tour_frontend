/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"
import { createReviewSchema, type CreateReviewInput } from "@/types/zod/review.validation"

export async function createReviewService(data: CreateReviewInput) {
  try {
    const validated = createReviewSchema.parse(data)

    const response = await serverFetch.post("/review", {
      body: JSON.stringify(validated),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error creating review:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create review",
    }
  }
}

export async function getReviewsService(queryString?: string) {
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

export async function getReviewByGuidIdService(guideId: string) {  
  try {
    const response = await serverFetch.get(`/review/guide/${guideId}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching review:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch review",
    }
  }
}
export async function getReviewByTouristIdService(touristId: string) {  
  try {
    const response = await serverFetch.get(`/review/tourist/${touristId}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching review:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch review",
    }
  }
}