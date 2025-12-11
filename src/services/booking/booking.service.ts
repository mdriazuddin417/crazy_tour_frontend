/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch"
import {
  createBookingSchema,
  updateBookingSchema,
  type CreateBookingInput,
  type UpdateBookingInput,
} from "@/types/zod/booking.validation"

export async function createBookingService(data: CreateBookingInput) {
  try {
    const validated = createBookingSchema.parse(data)

    console.log(validated)

    const response = await serverFetch.post("/booking/create", {
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

export async function getBookingsService(queryString?: string) {
  try {
    const response = await serverFetch.get(`/booking${queryString ? `?${queryString}` : ""}`)
    const result = await response.json();
    console.log('result',result);
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

export async function getBookingByIdService(bookingId: string) {
  try {
    const response = await serverFetch.get(`/booking/${bookingId}`)
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

export async function updateBookingService(bookingId: string, data: UpdateBookingInput) {
  try {
    const validated = updateBookingSchema.parse(data);

    console.log('validated',validated)

    const response = await serverFetch.patch(`/booking/${bookingId}`, {
      body: JSON.stringify(validated),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json();
    console.log('result',result);
    return result
  } catch (error: any) {
    console.error("Error updating booking:", error)
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update booking",
    }
  }
}
export async function deleteBookingService(bookingId: string) {
  try {
    const response = await serverFetch.delete(`/booking/${bookingId}`)
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