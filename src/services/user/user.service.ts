/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"
import { updateUserSchema, type UpdateUserInput } from "@/types/zod/user.validation"

export async function getUserInfo() {
  try {
    const response = await serverFetch.get(`/user/me`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch user",
    }
  }
}

export async function updateUserService(userId: string, data: UpdateUserInput) {
  try {
    const validated = updateUserSchema.parse(data)

    const response = await serverFetch.patch(`/user/${userId}`, {
      body: JSON.stringify(validated),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error updating user:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update user",
    }
  }
}

export async function deleteUserService(userId: string) {
  try {
    const response = await serverFetch.delete(`/user/${userId}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching user:", error)
    return {
      success: false,
      data: null,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch user",
    }
  }
}