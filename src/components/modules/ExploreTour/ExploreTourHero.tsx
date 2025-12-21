"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Clock, MapPin, Star, Tag, Users } from "lucide-react"
import { useEffect, useState } from "react"

const tours = [
  {
    id: 1,
    title: "Porto Wine Valley Experience",
    location: "Porto & Douro Valley",
    image: "/porto-douro-valley-vineyards.jpg",
    originalPrice: 299,
    discountPrice: 199,
    discount: 33,
    duration: "3 Days",
    maxMembers: 12,
    offer: "Summer Special",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 243,
  },
  {
    id: 2,
    title: "Lisbon Cultural Heritage Tour",
    location: "Lisbon & Sintra",
    image: "/lisbon-historic-tram-streets.jpg",
    originalPrice: 249,
    discountPrice: 179,
    discount: 28,
    duration: "2 Days",
    maxMembers: 15,
    offer: "Limited Time",
    badge: "Popular",
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 3,
    title: "Algarve Coastal Adventure",
    location: "Algarve Coast",
    image: "/algarve-golden-beaches-cliffs.jpg",
    originalPrice: 349,
    discountPrice: 249,
    discount: 29,
    duration: "4 Days",
    maxMembers: 10,
    offer: "Hot Deal",
    badge: "Featured",
    rating: 5.0,
    reviews: 156,
  },
  {
    id: 4,
    title: "Azores Island Paradise",
    location: "Azores Islands",
    image: "/azores-volcanic-lakes-landscape.jpg",
    originalPrice: 499,
    discountPrice: 399,
    discount: 20,
    duration: "5 Days",
    maxMembers: 8,
    offer: "Early Bird",
    badge: "Exclusive",
    rating: 4.9,
    reviews: 98,
  },
]

export function ExploreTourHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tours.length)
    }, 6000) // Increased to 6 seconds for better readability

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleSlideChange = (newIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(newIndex)
    setTimeout(() => setIsAnimating(false), 700)
  }

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % tours.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + tours.length) % tours.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    if (index === currentSlide) return
    handleSlideChange(index)
    setIsAutoPlaying(false)
  }

  const currentTour = tours[currentSlide]

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-0 h-full flex items-center">
        <div className="flex md:flex-row flex-col  justify-between  w-full items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                <span className="text-teal-400 font-semibold text-sm tracking-wide uppercase">Discover Portugal</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] text-balance"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${currentSlide * 0.1}s backwards`,
                }}
              >
                The Best Trips Around <span className="text-teal-400">Portugal</span> Begin With Us
              </h1>

              <p
                className="text-lg lg:text-xl text-white/90 leading-relaxed text-pretty"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${0.2 + currentSlide * 0.1}s backwards`,
                }}
              >
                Embark on unforgettable journeys with exclusive deals and expert local guides. Experience authentic
                Portugal like never before.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-4"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.4 + currentSlide * 0.1}s backwards`,
              }}
            >
              <Button
                size="lg"
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-base lg:text-lg font-semibold shadow-2xl shadow-teal-500/30 transition-all hover:scale-105 hover:shadow-teal-500/50 rounded-lg"
              >
                Explore Tours
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 backdrop-blur-sm px-8 py-6 text-base lg:text-lg font-semibold transition-all hover:scale-105 rounded-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative pr-10 md:flex hidden">
            <Card
              className={`lg:w-[480px] sm:w-[350px] w-full overflow-hidden border-0 py-0 shadow-2xl bg-white transform transition-all duration-700 ${
                isAnimating ? "scale-[85%] opacity-90" : "scale-90 opacity-100"
              }`}
            >
              {/* Tour Image */}
              <div className="relative h-56 lg:h-64 overflow-hidden group">
                <img
                  src={currentTour.image || "/placeholder.svg"}
                  alt={currentTour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-white/95 backdrop-blur-sm text-teal-600 px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                    <Tag className="w-3 h-3" />
                    {currentTour.offer}
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-xl">
                  {currentTour.discount}% OFF
                </div>

                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-slate-900">{currentTour.rating}</span>
                  <span className="text-slate-500 text-sm">({currentTour.reviews})</span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Title & Location */}
                <div className="space-y-2">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">{currentTour.title}</h3>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4 text-teal-500" />
                    <span className="text-sm font-medium">{currentTour.location}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Duration</p>
                      <p className="text-sm font-bold text-slate-900">{currentTour.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                      <Users className="w-5 h-5 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Max Group</p>
                      <p className="text-sm font-bold text-slate-900">{currentTour.maxMembers} People</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                        Price Per Person
                      </p>
                      <div className="flex items-baseline gap-3">
                        <p className="text-4xl font-bold text-teal-600">${currentTour.discountPrice}</p>
                        <p className="text-xl text-slate-400 line-through font-medium">${currentTour.originalPrice}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                        Save ${currentTour.originalPrice - currentTour.discountPrice}
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg font-bold shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/40 rounded-lg">
                    Book This Tour Now
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 lg:p-4 rounded-full transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-white/20 group z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 lg:p-4 rounded-full transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl border border-white/20 group z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

        <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {tours.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "w-10 lg:w-12 h-2 bg-teal-500 rounded-full shadow-lg shadow-teal-500/50"
                  : "w-2 h-2 bg-white/40 rounded-full hover:bg-white/70 hover:scale-125"
              } disabled:cursor-not-allowed`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
