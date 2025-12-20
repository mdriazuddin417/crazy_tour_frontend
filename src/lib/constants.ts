// Constants for the application
export const API_BASE_URL = "/api"

export const TOUR_CATEGORIES = {
  FOOD: { label: "Food & Dining", icon: "🍽️" },
  HISTORY: { label: "History & Heritage", icon: "🏛️" },
  ART: { label: "Art & Culture", icon: "🎨" },
  ADVENTURE: { label: "Adventure", icon: "🧗" },
  NIGHTLIFE: { label: "Nightlife", icon: "🌙" },
  SHOPPING: { label: "Shopping", icon: "🛍️" },
  PHOTOGRAPHY: { label: "Photography", icon: "📸" },
  CULTURE: { label: "Local Culture", icon: "🌍" },
}

export const POPULAR_CITIES = [
  { name: "Paris", country: "France", image: "/paris-city.jpg" },
  { name: "Tokyo", country: "Japan", image: "/tokyo-city.jpg" },
  { name: "Barcelona", country: "Spain", image: "/barcelona-city.jpg" },
  { name: "New York", country: "USA", image: "/vibrant-nyc-street.png" },
  { name: "Bangkok", country: "Thailand", image: "/bangkok-city.jpg" },
  { name: "Rome", country: "Italy", image: "/rome-city.jpg" },
]

export const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Chinese",
  "Arabic",
  "Russian",
]

export const BOOKING_STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  COMPLETED: "bg-teal-100 text-teal-800",
  CANCELLED: "bg-red-100 text-red-800",
}
