"use client"

import Link from "next/link"
import { Wrench, ArrowLeftRight, Tag, Truck } from "lucide-react"

const services = [
  {
    icon: Wrench,
    title: "Device Repairs",
    description: "Expert repair services for phones, laptops, and gaming consoles. Screens, batteries, charging ports, and more.",
    href: "/repair",
  },
  {
    icon: ArrowLeftRight,
    title: "Trade-In Program",
    description: "Get the best value for your old devices. Instant quotes and fair prices for all conditions.",
    href: "/trade-in",
  },
  {
    icon: Tag,
    title: "Price Checker",
    description: "Know exactly what your device is worth in any condition, anytime.",
    href: "/prices",
  },
  {
    icon: Truck,
    title: "Home Pickup",
    description: "Too busy to visit? We come to you. Free pickup and delivery in Lagos.",
    href: "/contact",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 md:py-32" style={{ background: 'linear-gradient(to bottom, #f7f4ef, #faf8f3)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: '#0d0a1a' }}>
            Everything Your Device Needs
          </h2>
        </div>

        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link key={service.title} href={service.href} className="group">
                <div 
                  className="p-8 md:p-10 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col"
                  style={{
                    background: 'white',
                    borderColor: 'rgba(91, 31, 168, 0.12)',
                    boxShadow: '0 8px 40px rgba(91, 31, 168, 0.08)'
                  }}
                >
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(to bottom right, #5b1fa8, #7c3dd6)',
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black mb-3" style={{ color: '#0d0a1a' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed flex-grow mb-4" style={{ color: '#6b6480' }}>
                    {service.description}
                  </p>

                  {/* Link indicator */}
                  <div className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#f5c800' }}>
                    Learn more
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Features row */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t" style={{ borderColor: 'rgba(91, 31, 168, 0.1)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl font-black mb-2" style={{ color: '#f5c800' }}>5K+</div>
              <div className="text-sm font-semibold" style={{ color: '#6b6480' }}>Devices Repaired</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2" style={{ color: '#f5c800' }}>98%</div>
              <div className="text-sm font-semibold" style={{ color: '#6b6480' }}>Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2" style={{ color: '#f5c800' }}>24h</div>
              <div className="text-sm font-semibold" style={{ color: '#6b6480' }}>Average Turnaround</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
