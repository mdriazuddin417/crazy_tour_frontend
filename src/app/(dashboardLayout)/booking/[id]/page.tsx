"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Booking, IUser, Payment, TourListing, } from "@/lib/types"
import { AlertCircle, Calendar, CheckCircle, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [id, setId] = useState<string>("")
  const [booking, setBooking] = useState<Booking | null>(null)
  const [listing, setListing] = useState<TourListing | null>(null)
  const [guide, setGuide] = useState<IUser | null>(null)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { id: paramId } = await params
      setId(paramId)

      try {
        const bookingRes = await fetch(`/api/bookings/${paramId}`)
        const bookingData = await bookingRes.json()

        if (bookingData.success) {
          setBooking(bookingData.data)

          // Fetch listing
          const listingRes = await fetch(`/api/listings/${bookingData.data.tourListingId}`)
          const listingData = await listingRes.json()
          if (listingData.success) {
            setListing(listingData.data)

            // Fetch guide
            const guideRes = await fetch(`/api/users/${listingData.data.guideId}`)
            const guideData = await guideRes.json()
            if (guideData.success) {
              setGuide(guideData.data)
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [params])

  const handlePayment = async () => {
    if (!booking) return

    try {
      setPaying(true)

      // Create payment
      const paymentRes = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          bookingId: booking._id,
          amount: booking.totalPrice,
          paymentMethod: "card",
        }),
      })

      const paymentData = await paymentRes.json()

      if (paymentData.success) {
        setPayment(paymentData.data)

        // Complete payment (in real app, this would integrate with Stripe)
        const completeRes = await fetch("/api/payments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "complete",
            paymentId: paymentData.data.id,
            stripePaymentIntentId: "pi_demo_" + Date.now(),
          }),
        })

        const completeData = await completeRes.json()

        if (completeData.success) {
          // Refresh booking
          const refreshRes = await fetch(`/api/bookings/${booking._id}`)
          const refreshData = await refreshRes.json()
          if (refreshData.success) {
            setBooking(refreshData.data)
            setPayment(completeData.data)
          }
        }
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed")
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!booking || !listing) {
    return <div className="min-h-screen flex items-center justify-center">Booking not found</div>
  }

  const isPending = booking.status === "PENDING"
  const isConfirmed = booking.status === "CONFIRMED"
  const isPaid = payment?.status === "COMPLETED" || booking.paymentId

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          ← Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Info */}
            <Card>
              <CardHeader>
                <CardTitle>Tour Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-bold text-lg text-gray-900">{listing.title}</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {listing.city}, {listing.country}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(booking.requestedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    {booking.groupSize} {booking.groupSize === 1 ? "person" : "people"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Guide Info */}
            {guide && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/profile/${guide._id}`} className="flex items-center gap-3 hover:text-blue-600">
                    <div className="w-12 h-12 bg-gray-300 rounded-full" />
                    <div>
                      <p className="font-bold text-gray-900">{guide.name}</p>
                      <p className="text-sm text-gray-600">{guide.bio}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Status Info */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  {isPending && <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />}
                  {isConfirmed && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
                  <div>
                    <p className="font-medium text-gray-900">
                      {isPending && "Awaiting Guide Confirmation"}
                      {isConfirmed && "Booking Confirmed"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {isPending && "Your request has been sent to the guide. They will confirm within 24 hours."}
                      {isConfirmed && "Your booking is confirmed! Get ready for an amazing experience."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Price Summary */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Price Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      ${listing.price} × {booking.groupSize}
                    </span>
                    <span className="font-medium">${booking.totalPrice}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${booking.totalPrice}</span>
                </div>

                {/* Payment Status */}
                <div className="pt-4 border-t space-y-3">
                  {isPaid ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Payment Completed</p>
                        <p className="text-xs text-green-700">Payment ID: {payment?.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 text-center">
                        {isPending ? "You won't be charged until the guide confirms" : "Ready to complete your booking"}
                      </p>
                      {isConfirmed && !isPaid && (
                        <Button
                          onClick={handlePayment}
                          disabled={paying}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          {paying ? "Processing..." : "Pay Now"}
                        </Button>
                      )}
                    </>
                  )}
                </div>

                <p className="text-xs text-gray-500 text-center">
                  You&apos;ll receive a confirmation email with all details
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
