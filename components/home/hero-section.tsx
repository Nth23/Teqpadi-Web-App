"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden flex items-center pt-16" style={{ background: 'linear-gradient(to bottom, #3a0e6e, #2a0850)' }}>
      {/* Kente Stripe */}
      <div className="fixed top-16 left-0 right-0 h-1.5 z-40" style={{
        backgroundImage: `repeating-linear-gradient(90deg, #5b1fa8 0px, #5b1fa8 25%, #f5c800 25%, #f5c800 50%, #7c3dd6 50%, #7c3dd6 75%, #d4a800 75%, #d4a800 100%)`,
        backgroundSize: '80px 100%'
      }} />

      {/* Animated geometric shapes - background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rotating circle top right */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full border-[40px] opacity-10" 
          style={{ 
            borderColor: '#f5c800',
            animation: 'spin-slow 30s linear infinite'
          }} 
        />
        
        {/* Floating square left */}
        <div 
          className="absolute top-1/3 -left-24 w-48 h-48 opacity-5 transform rotate-45"
          style={{ 
            borderColor: 'white',
            borderWidth: '24px',
            animation: 'float 8s ease-in-out infinite'
          }} 
        />
        
        {/* Triangle bottom right */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-40 h-40 opacity-5" 
          style={{
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            background: '#f5c800',
            animation: 'float 10s ease-in-out infinite reverse'
          }} 
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 60% at 80% 20%, rgba(91, 31, 168, 0.6) 0%, transparent 70%),
                       radial-gradient(ellipse 50% 40% at 20% 80%, rgba(124, 61, 214, 0.4) 0%, transparent 60%)`
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Motto */}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              <span className="text-white">Teqpadi</span>
              <br />
              <span style={{ color: '#f5c800' }}>Your Guy</span>
            </h1>

            {/* Subheading with motto explanation */}
            <p className="text-lg text-white/80 mb-8 leading-relaxed max-w-md font-semibold">
              Any tech need, Teqpadi is your guy
            </p>
            
            <p className="text-base text-white/70 mb-8 leading-relaxed max-w-md">
              Expert repairs, fair trade-ins, and transparent pricing. We bring trusted tech services right to your doorstep across Nigeria.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                asChild
                className="text-base font-bold px-8 py-3 rounded-full transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: '#f5c800',
                  color: '#0d0a1a',
                  boxShadow: '0 4px 24px rgba(245, 200, 0, 0.3)'
                }}
              >
                <Link href="/repair" className="flex items-center gap-2">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                className="text-base font-semibold px-8 py-3 rounded-full transition-all hover:-translate-y-1"
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.35)'
                }}
              >
                <Link href="/prices">Browse Devices</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div>
                <div className="text-3xl font-black text-[#f5c800]">5K+</div>
                <div className="text-sm text-white/55">Repairs Done</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#f5c800]">98%</div>
                <div className="text-sm text-white/55">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-black text-[#f5c800]">24h</div>
                <div className="text-sm text-white/55">Turnaround</div>
              </div>
            </div>
          </div>

          {/* Right side - Phone mockup with floating cards */}
          <div className="relative hidden lg:flex justify-center items-center min-h-96">
            {/* Orb circles */}
            <div className="absolute w-96 h-96 rounded-full opacity-35" style={{
              background: 'radial-gradient(circle at 40% 40%, rgba(124, 61, 214, 0.35), rgba(58, 14, 110, 0.6))',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }} />
            
            <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed opacity-20" style={{ borderColor: 'rgba(245, 200, 0, 0.18)' }} />
            <div className="absolute w-[480px] h-[480px] rounded-full border border-solid opacity-10" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            <div className="absolute w-[540px] h-[540px] rounded-full border border-dashed opacity-15" style={{ borderColor: 'rgba(245, 200, 0, 0.18)' }} />

            {/* Phone mockup */}
            <div className="w-48 h-96 rounded-3xl border-2 overflow-hidden shadow-2xl relative z-10 flex flex-col" style={{
              background: 'linear-gradient(160deg, #1a0a2e, #2d1060)',
              borderColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
            }}>
              {/* Notch */}
              <div className="w-16 h-5 bg-[#0d0a1a] rounded-b-3xl mx-auto" />
              
              {/* Screen content */}
              <div className="flex-1 p-4 space-y-3 overflow-hidden">
                <div className="h-8 bg-white/6 rounded-xl border" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }} />
                <div className="h-6 bg-white/4 rounded-lg border" style={{ borderColor: 'rgba(255, 255, 255, 0.06)' }} />
                <div className="space-y-2 flex-1">
                  <div className="h-16 rounded-lg border" style={{
                    background: 'linear-gradient(to bottom right, rgba(245, 200, 0, 0.2), rgba(124, 61, 214, 0.2))',
                    borderColor: 'rgba(245, 200, 0, 0.2)'
                  }} />
                </div>
              </div>
              
              {/* Bottom bar */}
              <div className="bg-[#f5c800]/90 text-[#0d0a1a] text-xs font-bold py-2 text-center">
                QUOTE READY
              </div>
            </div>

            {/* Floating cards */}
            <div 
              className="absolute top-2 -left-16 p-3 rounded-lg border backdrop-blur-xl shadow-lg z-20"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                borderColor: 'rgba(255, 255, 255, 0.12)'
              }}
            >
              <div className="text-sm font-bold text-[#f5c800]">Repairs</div>
              <div className="text-xs text-white/55">All devices</div>
            </div>

            <div 
              className="absolute top-1/3 -right-16 p-3 rounded-lg border backdrop-blur-xl shadow-lg z-20"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                borderColor: 'rgba(255, 255, 255, 0.12)'
              }}
            >
              <div className="text-sm font-bold text-[#f5c800]">Trade-In</div>
              <div className="text-xs text-white/55">Best value</div>
            </div>

            <div 
              className="absolute -bottom-8 -left-12 p-3 rounded-lg border backdrop-blur-xl shadow-lg z-20"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                borderColor: 'rgba(255, 255, 255, 0.12)'
              }}
            >
              <div className="text-sm font-bold text-[#f5c800]">Trusted</div>
              <div className="text-xs text-white/55">5K+ reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/40 text-xs uppercase tracking-widest z-10">
        Scroll to explore
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent mx-auto mt-2 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-20px) rotate(45deg); }
        }
      `}</style>
    </section>
  )
}
