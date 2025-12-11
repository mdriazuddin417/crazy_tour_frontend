/* eslint-disable @typescript-eslint/no-explicit-any */
// Core type definitions for the platform
export enum UserRole {
  TOURIST = "TOURIST",
  GUIDE = "GUIDE",
  ADMIN = "ADMIN",
}


export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum TourCategory {
  FOOD = "FOOD",
  HISTORY = "HISTORY",
  ART = "ART",
  ADVENTURE = "ADVENTURE",
  NIGHTLIFE = "NIGHTLIFE",
  SHOPPING = "SHOPPING",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  CULTURE = "CULTURE",
}

// User Type
export interface IUser {
  _id: string
  id?: string
  email: string
  name: string
  profilePic?: string
  bio?: string
  role: UserRole
  languagesSpoken: string[]
  createdAt: Date
  updatedAt: Date
  // Guide specific fields
  expertise?: TourCategory[]
  dailyRate?: number
  totalToursGiven?: number
  averageRating?: number
  verified?: boolean
}

// Tour Listing
export interface TourListing {
  _id: string
  guideId: string
  title: string
  description: string
  category: TourCategory
  city: string
  country: string
  price: number
  duration: number // in hours
  maxGroupSize: number
  meetingPoint: string
  itinerary: string[]
  images: string[]
  languages: string[]
  isActive: boolean
  totalBookings: number
  averageRating: number
  createdAt: Date
  updatedAt: Date
}

// Booking
export interface Booking {
  _id?: string
  touristId: string
  guideId: string
  tourListingId: string
  status: BookingStatus
  requestedDate: Date
  groupSize: number
  totalPrice: number
  notes?: string
  paymentId?: string
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Review
export interface Review {
  _id?: string
  id?: string
  bookingId: string
  touristId: string
  guideId: string
  rating: number // 1-5
  comment: string
  createdAt?: Date
  updatedAt?: Date
}

// Payment
export interface Payment {
  id: string
  _id: string
  bookingId: string
  amount: number
  status: "PENDING" | "COMPLETED" | "FAILED"
  paymentMethod: string
  stripePaymentIntentId?: string
  createdAt: Date
  updatedAt: Date
}

// Auth Response
export interface AuthResponse {
  token: string
  user: IUser
}

// API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
