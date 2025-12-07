/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"

export async function createPaymentService(bookingId: string) {
  try {

    const response = await serverFetch.post(`/init-payment/${bookingId}`, {
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error creating payment:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create payment",
    }
  }
}

export async function getPaymentsService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/payment${queryString ? `?${queryString}` : ""}`)
    const result = await response.json()
    return result
  } catch (error: any) {
    console.error("Error fetching payments:", error)
    return {
      success: false,
      data: [],
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to fetch payments",
    }
  }
}
