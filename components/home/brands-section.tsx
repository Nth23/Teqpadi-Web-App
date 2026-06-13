"use client"

import { useEffect, useState } from "react"
import { Smartphone, Laptop, Gamepad2, Watch, Tablet, Headphones } from "lucide-react"

const brandLogos = [
  { name: "Apple", icon: Smartphone },
  { name: "Samsung", icon: Smartphone },
  { name: "Google", icon: Smartphone },
  { name: "OnePlus", icon: Smartphone },
  { name: "Sony", icon: Gamepad2 },
  { name: "Microsoft", icon: Gamepad2 },
  { name: "Nintendo", icon: Gamepad2 },
  { name: "HP", icon: Laptop },
  { name: "Dell", icon: Laptop },
  { name: "Lenovo", icon: Laptop },
  { name: "ASUS", icon: Laptop },
  { name: "Xiaomi", icon: Smartphone },
]

export function BrandsSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
          We Service All Major Brands
        </p>
        
        {/* Infinite scroll animation */}
        <div className="relative">
          <div className="flex animate-scroll-x gap-12">
            {[...brandLogos, ...brandLogos].map((brand, index) => {
              const Icon = brand.icon
              return (
                <div
                  key={`${brand.name}-${index}`}
                  className="flex items-center gap-3 flex-shrink-0 px-6 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-lg font-medium text-muted-foreground whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
