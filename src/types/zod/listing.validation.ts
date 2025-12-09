import { z } from "zod"

export const createListingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(2000),
  category: z.enum(["FOOD", "HISTORY", "ART", "ADVENTURE", "NIGHTLIFE", "SHOPPING", "PHOTOGRAPHY", "CULTURE"]),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  price: z.number().positive("Price must be positive"),
  duration: z.number().positive("Duration must be positive"),
  maxGroupSize: z.number().positive("Group size must be at least 1"),
  meetingPoint: z.string().min(5, "Meeting point is required"),
  itinerary: z.array(z.string()).min(1, "Itinerary must have at least one point"),
  // images: z.array(z.string().url("Invalid image URL")).min(1, "At least one image is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  guideId: z.string()
})

export const updateListingSchema = createListingSchema.partial()

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>
