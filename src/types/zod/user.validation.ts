import { z } from "zod"

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  profilePic: z.string().url("Invalid URL").optional(),
  languagesSpoken: z.array(z.string()).optional(),
  expertise: z.array(z.string()).optional(),
  dailyRate: z.number().positive("Daily rate must be positive").optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>
