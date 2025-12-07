import { z } from "zod"

export const createPaymentSchema = z.object({
  bookingId: z.string().min(1, "Booking ID is required"),
  amount: z.number().positive("Amount must be positive"),
  paymentMethod: z.string().min(1, "Payment method is required"),
})

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
