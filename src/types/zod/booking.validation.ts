import { z } from "zod"

export const createBookingSchema = z.object({
  tourListingId: z.string().min(1, "Tour listing ID is required"),
  requestedDate: z.string().datetime("Invalid date format"),
  groupSize: z.number().positive("Group size must be at least 1"),
  notes: z.string().max(500).optional(),
  touristId: z.string().min(1, "Tourist ID is required"),
  guideId: z.string().min(1, "Guide ID is required"),
  totalPrice: z.number().nonnegative("Total price cannot be negative"),
})

export const updateBookingSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]),
})

export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>
