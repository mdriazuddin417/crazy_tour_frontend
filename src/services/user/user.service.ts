/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"

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
export async function getUserByIdService(userId: string) {
  console.log('userId',userId);
  try {
    const response = await serverFetch.get(`/user/${userId}`)
    const result = await response.json();
    console.log('result',result);
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

export async function updateUserService(userId: string, data:any) {
  try {

    const response = await serverFetch.patch(`/user/${userId}`, {
      body: JSON.stringify(data),
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