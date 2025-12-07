"use server"
import { db } from "@/lib/db-mock"
import crypto from "crypto"
import type { CreateReviewInput } from "@/types/zod/review.validation"

export async function createReviewService(data: CreateReviewInput) {
  try {
    const review = {
      id: crypto.randomUUID(),
      guideId: data.guideId,
      touristId: data.touristId,
      bookingId: data.bookingId,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.addReview(review as any)

    return {
      success: true,
      data: review,
    }
  } catch (error: any) {
    console.error("[v0] Error creating review:", error)
    return {
      success: false,
      error: "Failed to create review",
    }
  }
}

export async function getReviewsByGuideService(guideId: string) {
  try {
    const reviews = db.getReviewsByGuide(guideId)

    return {
      success: true,
      data: reviews,
    }
  } catch (error: any) {
    console.error("[v0] Error fetching reviews:", error)
    return {
      success: false,
      data: [],
      error: "Failed to fetch reviews",
    }
  }
}
