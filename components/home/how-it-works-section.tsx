"use client"

import { Search, MessageSquare, Wrench, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Select Device",
    description: "Choose your device type and model. Get instant pricing.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Describe Issue",
    description: "Tell us what's wrong. We provide accurate estimates.",
  },
  {
    number: "03",
    icon: Wrench,
    title: "We Repair It",
    description: "Our technicians get to work immediately.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Get It Back",
    description: "Receive your device with 90-day warranty.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-32 relative" style={{ background: '#0d0a1a' }}>
      {/* Kente stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{
        backgroundImage: `repeating-linear-gradient(90deg, #5b1fa8 0px, #5b1fa8 25%, #f5c800 25%, #f5c800 50%, #7c3dd6 50%, #7c3dd6 75%, #d4a800 75%, #d4a800 100%)`,
        backgroundSize: '80px 100%'
      }} />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border" style={{
            background: 'rgba(245, 200, 0, 0.12)',
            borderColor: 'rgba(245, 200, 0, 0.3)'
          }}>
            <div className="w-1 h-1 rounded-full" style={{ background: '#f5c800' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f5c800' }}>Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Simple, Fast Process
          </h2>
          <p className="text-lg mt-4" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Four simple steps to get your device fixed and back in your hands.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1" style={{
            background: 'linear-gradient(to right, #5b1fa8 0%, #5b1fa8 20%, #f5c800 40%, #f5c800 60%, #7c3dd6 80%, #d4a800 100%)',
            backgroundSize: '100% 100%'
          }} />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                <div className="flex flex-col h-full">
                  {/* Step badge */}
                  <div className="relative mb-8 z-20">
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group hover:scale-110 transition-transform"
                      style={{
                        background: 'linear-gradient(to bottom right, #5b1fa8, #7c3dd6)',
                        boxShadow: '0 0 0 6px rgba(13, 10, 26, 1), 0 8px 20px rgba(91, 31, 168, 0.3)'
                      }}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f5c800' }}>
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-black text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.55)' }}>
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile arrow */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-6">
                      <svg className="w-5 h-5" style={{ color: '#f5c800' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-20 p-8 md:p-12 rounded-2xl border-2 text-center" style={{
          background: 'linear-gradient(to bottom right, rgba(91, 31, 168, 0.15), rgba(124, 61, 214, 0.08))',
          borderColor: 'rgba(245, 200, 0, 0.25)'
        }}>
          <p className="text-lg font-bold text-white mb-2">
            Most repairs done within 24 hours
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Free pickup available in Lagos. No hidden charges, transparent pricing.
          </p>
        </div>
      </div>
    </section>
  )
}
