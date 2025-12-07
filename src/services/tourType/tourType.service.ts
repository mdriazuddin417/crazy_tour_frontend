/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"
import {
  createTourTypeZodSchema,
  updateTourTypeZodSchema,
  type CreateTourTypeInput,
  type UpdateTourTypeInput,
} from "@/types/zod/tourType.validation"
export async function createTourTypeService(data: CreateTourTypeInput) {
  try {
    const validated = createTourTypeZodSchema.parse(data)

    const response = await serverFetch.post("/tour-type/create", {
      body: JSON.stringify(validated),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error creating booking:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create booking",
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

export async function getTourTypeByIdService(tourTypeId: string) {
  try {
    const response = await serverFetch.get(`/tour-type/${tourTypeId}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching tour type:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch tour type",
    }
  }
}

export async function updateTourTypeService(tourTypeId: string, data: UpdateTourTypeInput) {
  try {
    const validated = updateTourTypeZodSchema.parse(data)

    const response = await serverFetch.patch(`/tour-type/${tourTypeId }`, {
      body: JSON.stringify(validated),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error updating tour type:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update tour type",
    }
  }
}
export async function deleteTourTypeService(tourTypeId: string) {
  try {
    const response = await serverFetch.delete(`/tour-type/${tourTypeId}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching tour type:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch tour type",
    }
  }
}