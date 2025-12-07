// Mock database - in production, use a real database like Supabase/PostgreSQL
import { type Booking, type Payment, type Review, TourCategory, type TourListing, type User, UserRole } from "./types"

class MockDatabase {
  private users: Map<string, User> = new Map()
  private listings: Map<string, TourListing> = new Map()
  private bookings: Map<string, Booking> = new Map()
  private reviews: Map<string, Review> = new Map()
  private payments: Map<string, Payment> = new Map()

  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData() {
    // Sample guides
    const guide1: User = {
      id: "guide-1",
      email: "maria@guides.com",
      name: "Maria Garcia",
      profilePic: "/guide-woman.jpg",
      bio: "Passionate about Paris history and culture with 8 years of experience",
      role: UserRole.GUIDE,
      languagesSpoken: ["English", "French", "Spanish"],
      expertise: [TourCategory.HISTORY, TourCategory.FOOD],
      dailyRate: 150,
      totalToursGiven: 342,
      averageRating: 4.8,
      verified: true,
      createdAt: new Date("2022-01-15"),
      updatedAt: new Date("2024-01-15"),
    }

    const guide2: User = {
      id: "guide-2",
      email: "Marco@guides.com",
      name: "Marco Rossi",
      profilePic: "/guide-man.jpg",
      bio: "Rome local expert - art, history, and amazing food",
      role: UserRole.GUIDE,
      languagesSpoken: ["English", "Italian"],
      expertise: [TourCategory.ART, TourCategory.HISTORY, TourCategory.FOOD],
      dailyRate: 140,
      totalToursGiven: 287,
      averageRating: 4.7,
      verified: true,
      createdAt: new Date("2021-06-20"),
      updatedAt: new Date("2024-01-15"),
    }

    // Sample tourist
    const tourist: User = {
      id: "tourist-1",
      email: "john@example.com",
      name: "John Smith",
      profilePic: "/tourist-man.jpg",
      bio: "Travel enthusiast exploring the world",
      role: UserRole.TOURIST,
      languagesSpoken: ["English"],
      createdAt: new Date("2023-06-01"),
      updatedAt: new Date("2024-01-15"),
    }

    // Admin
    const admin: User = {
      id: "admin-1",
      email: "admin@localguide.com",
      name: "Admin User",
      role: UserRole.ADMIN,
      languagesSpoken: ["English"],
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2024-01-15"),
    }

    this.users.set(guide1.id, guide1)
    this.users.set(guide2.id, guide2)
    this.users.set(tourist.id, tourist)
    this.users.set(admin.id, admin)

    // Sample listings
    const listing1: TourListing = {
      id: "listing-1",
      guideId: "guide-1",
      title: "Hidden Gems of Paris: A Local's Perspective",
      description:
        "Discover the real Paris away from the crowded tourist spots. Visit charming cafés, hidden gardens, and authentic local neighborhoods.",
      category: TourCategory.HISTORY,
      city: "Paris",
      country: "France",
      price: 89,
      duration: 4,
      maxGroupSize: 8,
      meetingPoint: "Métro Bastille",
      itinerary: [
        "Start at Marais district with its trendy galleries",
        "Visit hidden courtyards and secret passages",
        "Lunch at a local café (not included)",
        "Explore Canal Saint-Martin",
      ],
      images: ["/paris-tour.jpg"],
      languages: ["English", "French"],
      isActive: true,
      totalBookings: 156,
      averageRating: 4.9,
      createdAt: new Date("2023-03-15"),
      updatedAt: new Date("2024-01-15"),
    }

    const listing2: TourListing = {
      id: "listing-2",
      guideId: "guide-2",
      title: "Rome Food & Wine Adventure",
      description:
        "Experience authentic Roman cuisine and local wine tastings. Visit neighborhood markets and family-run restaurants.",
      category: TourCategory.FOOD,
      city: "Rome",
      country: "Italy",
      price: 95,
      duration: 5,
      maxGroupSize: 6,
      meetingPoint: "Campo de' Fiori Market",
      itinerary: [
        "Morning market tour and shopping",
        "Cooking experience at local restaurant",
        "Wine tasting session",
        "Dinner at family-run trattoria",
      ],
      images: ["/rome-food-tour.jpg"],
      languages: ["English", "Italian"],
      isActive: true,
      totalBookings: 124,
      averageRating: 4.8,
      createdAt: new Date("2023-05-10"),
      updatedAt: new Date("2024-01-15"),
    }

    this.listings.set(listing1.id, listing1)
    this.listings.set(listing2.id, listing2)
  }

  // User methods
  addUser(user: User) {
    this.users.set(user.id, user)
  }

  getUser(id: string) {
    return this.users.get(id)
  }

  updateUser(id: string, data: Partial<User>) {
    const user = this.users.get(id)
    if (user) {
      const updated = { ...user, ...data, updatedAt: new Date() }
      this.users.set(id, updated)
      return updated
    }
    return null
  }

  findUserByEmail(email: string) {
    return Array.from(this.users.values()).find((u) => u.email === email)
  }

  getAllUsers() {
    return Array.from(this.users.values())
  }

  // Listing methods
  addListing(listing: TourListing) {
    this.listings.set(listing.id, listing)
  }

  getListing(id: string) {
    return this.listings.get(id)
  }

  updateListing(id: string, data: Partial<TourListing>) {
    const listing = this.listings.get(id)
    if (listing) {
      const updated = { ...listing, ...data, updatedAt: new Date() }
      this.listings.set(id, updated)
      return updated
    }
    return null
  }

  deleteListing(id: string) {
    return this.listings.delete(id)
  }

  getListingsByGuide(guideId: string) {
    return Array.from(this.listings.values()).filter((l) => l.guideId === guideId)
  }

  searchListings(filters: {
    city?: string
    category?: TourCategory
    language?: string
    minPrice?: number
    maxPrice?: number
  }) {
    return Array.from(this.listings.values()).filter((listing) => {
      if (!listing.isActive) return false
      if (filters.city && listing.city.toLowerCase() !== filters.city.toLowerCase()) return false
      if (filters.category && listing.category !== filters.category) return false
      if (filters.language && !listing.languages.includes(filters.language)) return false
      if (filters.minPrice && listing.price < filters.minPrice) return false
      if (filters.maxPrice && listing.price > filters.maxPrice) return false
      return true
    })
  }

  getAllListings() {
    return Array.from(this.listings.values()).filter((l) => l.isActive)
  }

  // Booking methods
  addBooking(booking: Booking) {
    this.bookings.set(booking.id, booking)
  }

  getBooking(id: string) {
    return this.bookings.get(id)
  }

  updateBooking(id: string, data: Partial<Booking>) {
    const booking = this.bookings.get(id)
    if (booking) {
      const updated = { ...booking, ...data, updatedAt: new Date() }
      this.bookings.set(id, updated)
      return updated
    }
    return null
  }

  getBookingsByTourist(touristId: string) {
    return Array.from(this.bookings.values()).filter((b) => b.touristId === touristId)
  }

  getBookingsByGuide(guideId: string) {
    return Array.from(this.bookings.values()).filter((b) => b.guideId === guideId)
  }

  getAllBookings() {
    return Array.from(this.bookings.values())
  }

  // Review methods
  addReview(review: Review) {
    this.reviews.set(review.id, review)
  }

  getReviewsByGuide(guideId: string) {
    return Array.from(this.reviews.values()).filter((r) => r.guideId === guideId)
  }

  // Payment methods
  addPayment(payment: Payment) {
    this.payments.set(payment.id, payment)
  }

  getPayment(id: string) {
    return this.payments.get(id)
  }

  updatePayment(id: string, data: Partial<Payment>) {
    const payment = this.payments.get(id)
    if (payment) {
      const updated = { ...payment, ...data, updatedAt: new Date() }
      this.payments.set(id, updated)
      return updated
    }
    return null
  }
}

// Singleton instance
export const db = new MockDatabase()
