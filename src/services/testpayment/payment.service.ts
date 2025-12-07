"use server"
import { db } from "@/lib/db-mock"
import crypto from "crypto"
import type { CreatePaymentInput } from "@/types/zod/payment.validation"
import { PaymentStatus } from "@/lib/types"

export async function createPaymentService(data: CreatePaymentInput) {
  try {
    const booking = db.getBooking(data.bookingId)

    if (!booking) {
      return {
        success: false,
        error: "Booking not found",
      }
    }

    const payment = {
      id: crypto.randomUUID(),
      bookingId: data.bookingId,
      touristId: booking.touristId,
      guideId: booking.guideId,
      amount: booking.totalPrice,
      status: PaymentStatus.COMPLETED,
      paymentMethod: data.paymentMethod || "card",
      transactionId: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    db.addPayment(payment as any)

    // Update booking status to confirmed
    db.updateBooking(data.bookingId, {
      status: "confirmed",
      updatedAt: new Date(),
    })

    return {
      success: true,
      data: payment,
    }
  } catch (error: any) {
    console.error("[v0] Error creating payment:", error)
    return {
      success: false,
      error: "Failed to create payment",
    }
  }
}
