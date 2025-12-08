"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { LANGUAGES, POPULAR_CITIES, TOUR_CATEGORIES } from "@/lib/constants"
import { TourCategory } from "@/lib/types"

export default function CreateListingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: TourCategory.CULTURE as TourCategory,
    city: POPULAR_CITIES[0].name,
    country: POPULAR_CITIES[0].country,
    price: "",
    duration: "",
    maxGroupSize: "",
    meetingPoint: "",
    itinerary: [""],
    languages: ["English"],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guideId: user?.id,
          ...formData,
          price: Number(formData.price),
          duration: Number(formData.duration),
          maxGroupSize: Number(formData.maxGroupSize),
          itinerary: formData.itinerary.filter((i) => i.trim()),
          isActive: true,
          images: ["/placeholder.svg?key=n9sye"],
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/dashboard/listings")
      } else {
        alert("Failed to create listing: " + data.error)
      }
    } catch (error) {
      console.error("Failed to create listing:", error)
      alert("Error creating listing")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Tour</h1>
        <p className="text-gray-600 mb-8">Share your unique tour experience with travelers</p>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Tour Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Tour Title</label>
                    <Input
                      type="text"
                      placeholder="e.g., Hidden Gems of Paris"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                    <textarea
                      placeholder="Describe your tour in detail..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as TourCategory })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Object.entries(TOUR_CATEGORIES).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Price per Person</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-600">$</span>
                        <Input
                          type="number"
                          placeholder="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Duration */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Location & Duration</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">City</label>
                      <select
                        value={formData.city}
                        onChange={(e) => {
                          const city = POPULAR_CITIES.find((c) => c.name === e.target.value)
                          setFormData({
                            ...formData,
                            city: city?.name || "",
                            country: city?.country || "",
                          })
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {POPULAR_CITIES.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}, {city.country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Duration (hours)</label>
                      <Input
                        type="number"
                        placeholder="4"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Meeting Point</label>
                    <Input
                      type="text"
                      placeholder="e.g., Eiffel Tower Main Gate"
                      value={formData.meetingPoint}
                      onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Max Group Size</label>
                    <Input
                      type="number"
                      placeholder="8"
                      value={formData.maxGroupSize}
                      onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Itinerary</h2>
                <div className="space-y-2">
                  {formData.itinerary.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-gray-600 font-bold py-2">{idx + 1}.</span>
                      <input
                        type="text"
                        placeholder={`Step ${idx + 1}`}
                        value={item}
                        onChange={(e) => {
                          const newItinerary = [...formData.itinerary]
                          newItinerary[idx] = e.target.value
                          setFormData({ ...formData, itinerary: newItinerary })
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.itinerary.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newItinerary = formData.itinerary.filter((_, i) => i !== idx)
                            setFormData({ ...formData, itinerary: newItinerary })
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, itinerary: [...formData.itinerary, ""] })}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    + Add step
                  </button>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Languages</h2>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        if (formData.languages.includes(lang)) {
                          setFormData({
                            ...formData,
                            languages: formData.languages.filter((l) => l !== lang),
                          })
                        } else {
                          setFormData({
                            ...formData,
                            languages: [...formData.languages, lang],
                          })
                        }
                      }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                        formData.languages.includes(lang)
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-6 border-t">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  {loading ? "Creating..." : "Create Tour"}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
