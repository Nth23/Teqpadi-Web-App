"use client"

import { useState, useEffect } from "react"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  content: string
  rating: number
  avatar?: string
}

// Fallback testimonials in case API fails
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Adebayo Okonkwo",
    content: "Teqpadi fixed my iPhone screen in just 2 hours! The quality is amazing and prices are fair. Highly recommended!",
    rating: 5,
  },
  {
    id: "2",
    name: "Chidinma Eze",
    content: "I traded in my old Samsung and got a great deal on a new iPhone. The process was smooth and the staff were very helpful.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emmanuel Nwosu",
    content: "Best tech repair shop in Nigeria! They diagnosed my laptop issue quickly and the repair was perfect. Will definitely come back.",
    rating: 5,
  },
  {
    id: "4",
    name: "Fatima Mensah",
    content: "The trade-in calculator on their website helped me understand exactly what my device was worth. No surprises!",
    rating: 4,
  },
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)

  useEffect(() => {
    fetch("/api/testimonials?featured=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials)
        }
      })
      .catch(() => {
        // Use fallback testimonials on error
      })
  }, [])

  return (
    <section className="py-20 md:py-32" style={{ background: 'linear-gradient(to bottom, #f7f4ef, #faf8f3)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border" style={{
            background: 'rgba(91, 31, 168, 0.08)',
            borderColor: 'rgba(91, 31, 168, 0.2)'
          }}>
            <div className="w-1 h-1 rounded-full" style={{ background: '#5b1fa8' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#5b1fa8' }}>Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black max-w-2xl mx-auto mb-4" style={{ color: '#0d0a1a' }}>
            Loved by Nigerians
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b6480' }}>
            Real stories from real customers who trust Teqpadi.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 md:p-10 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'white',
                borderColor: 'rgba(91, 31, 168, 0.12)',
                boxShadow: '0 8px 40px rgba(91, 31, 168, 0.08)'
              }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 mb-4" style={{ color: '#f5c800' }} />

              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: '#f5c800' }}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#0d0a1a' }}>
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(91, 31, 168, 0.08)' }}>
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: 'linear-gradient(to bottom right, #5b1fa8, #7c3dd6)' }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold" style={{ color: '#0d0a1a' }}>
                    {testimonial.name}
                  </div>
                  <div className="text-xs" style={{ color: '#6b6480' }}>
                    Verified Customer
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
