"use client"

import Link from "next/link"
import { MessageCircle, Phone, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #3a0e6e 0%, #2a0850 100%)' }}>
      {/* Kente stripe */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-40" style={{
        backgroundImage: `repeating-linear-gradient(90deg, #5b1fa8 0px, #5b1fa8 25%, #f5c800 25%, #f5c800 50%, #7c3dd6 50%, #7c3dd6 75%, #d4a800 75%, #d4a800 100%)`,
        backgroundSize: '80px 100%'
      }} />

      {/* Decorative circle */}
      <div 
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(245, 200, 0, 0.4), rgba(58, 14, 110, 0.6))',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}
      />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border" style={{
            background: 'rgba(245, 200, 0, 0.12)',
            borderColor: 'rgba(245, 200, 0, 0.3)'
          }}>
            <div className="w-1 h-1 rounded-full" style={{ background: '#f5c800' }} />
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#f5c800' }}>Ready to Get Started?</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Get Your Device Fixed Today
          </h2>

          {/* Subheading */}
          <p className="text-lg mb-8 max-w-xl" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
            Stop settling for slow repairs and unfair prices. Get a free, no-obligation quote from our certified technicians in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* Primary CTA */}
            <Link
              href="/repair"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: '#f5c800',
                color: '#0d0a1a',
                boxShadow: '0 4px 24px rgba(245, 200, 0, 0.3)'
              }}
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="tel:+234805328 3754"
              className="cta-secondary-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm md:text-base transition-all hover:scale-[1.02]"
              style={{
                color: 'white',
              }}
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: '#f5c800' }}>📍 Available</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Mon-Sat, 8am-6pm WAT</div>
            </div>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: '#f5c800' }}>🚚 Free Pickup</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Same day service in Lagos</div>
            </div>
            <div>
              <div className="text-sm font-bold mb-1" style={{ color: '#f5c800' }}>✅ Guaranteed</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>90-day repair warranty</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-secondary-btn {
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: transparent;
        }
        
        .cta-secondary-btn:hover {
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </section>
  )
}
