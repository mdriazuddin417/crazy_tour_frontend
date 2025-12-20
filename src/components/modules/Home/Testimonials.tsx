'use client'
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import React from "react";

const testimonials = [
  {
    name: "Anna Durmon",
    role: "Travel Enthusiast",
    image:
      "https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339690/samples/smile.jpg",
    rating: 5,
    text: "The tour was absolutely incredible! Every detail was perfectly planned, and our guide was knowledgeable and friendly. Portugal exceeded all expectations.",
  },
  {
    name: "Carlos Silva",
    role: "Adventure Seeker",
    image:
      "https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339690/samples/smile.jpg",
    rating: 5,
    text: "I've traveled extensively, but this Portugal experience stands out. The landscapes, culture, and hospitality made it unforgettable. Highly recommend!",
  },
  {
    name: "Maria Santos",
    role: "Culture Lover",
    image:
      "https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339690/samples/smile.jpg",
    rating: 5,
    text: "From the coastal villages to historic cities, every moment was magical. The team made sure we experienced the authentic Portugal. Five stars!",
  },
  {
    name: "Carlos Silva",
    role: "Adventure Seeker",
    image:
      "https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339690/samples/smile.jpg",
    rating: 5,
    text: "I've traveled extensively, but this Portugal experience stands out. The landscapes, culture, and hospitality made it unforgettable. Highly recommend!",
  },
  {
    name: "Maria Santos",
    role: "Culture Lover",
    image:
      "https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339690/samples/smile.jpg",
    rating: 5,
    text: "From the coastal villages to historic cities, every moment was magical. The team made sure we experienced the authentic Portugal. Five stars!",
  },
];

export function Testimonials() {
  // Initialize the plugin
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  return (
    <section className="py-20 bg-white ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Testimonials</h2>

        <Carousel
          plugins={[plugin.current]}
          className="w-full "
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent >
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="p-6 bg-slate-700 text-white h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-300">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed italic">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-5" />
            <CarouselNext className="-right-5" />
          </div>
        </Carousel>
{/* 
        <div className="text-center">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8">
            View All Testimonials
          </Button>
        </div> */}
      </div>
    </section>
  )
}