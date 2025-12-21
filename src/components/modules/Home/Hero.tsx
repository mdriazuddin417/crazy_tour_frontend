"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export function Hero() {
const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }

    // Move state update to the next frame to allow the entrance animation to trigger
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);
  

  return (
    <section className="relative h-[650px] lg:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.85)" }}
          poster="https://res.cloudinary.com/dejo5rgg1/image/upload/v1765477816/c4vods8ocxn-1765477816668-testtour1-jpg.jpg.jpg"
        >
            <source src="https://res.cloudinary.com/dejo5rgg1/video/upload/v1766237371/tour_video_w4rmph.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/50 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl space-y-8">
          <div
            className={`space-y-4 transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block">
              <span className="text-teal-400 font-semibold text-sm tracking-wider uppercase animate-fade-in">
                Discover Portugal
              </span>
              <div
                className="h-0.5 bg-teal-400 mt-2 animate-width-expand"
                style={{ animation: "widthExpand 1.2s ease-out forwards" }}
              />
            </div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance transition-all duration-1000 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              The Best Trips Around Portugal Begin With Us
            </h1>

            <p
              className={`text-lg md:text-xl text-white/90 max-w-xl text-pretty leading-relaxed transition-all duration-1000 delay-300 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Experience authentic Portuguese culture, breathtaking landscapes, and unforgettable adventures with expert
              local guides.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Book A Trip Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-white/10 hover:scale-105 transition-all active:scale-95"
            >
              View Tours
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}
