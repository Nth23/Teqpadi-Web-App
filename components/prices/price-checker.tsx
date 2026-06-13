"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, Smartphone, Laptop, Gamepad2, Package, ChevronRight, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn, formatCurrency, getConditionLabel, getConditionColor } from "@/lib/utils"
import { getDeviceImage } from "@/lib/device-images"

interface Brand {
  id: string
  name: string
}

interface Device {
  id: string
  model: string
  category: string
  storage_options: string[]
  brand_name: string
  brand_id: string
  release_year: number
}

interface Price {
  id: string
  storage: string
  condition: string
  price: number
  trade_in_value: number
}

const categories = [
  { id: "phone", label: "Phones", icon: Smartphone },
  { id: "laptop", label: "Laptops", icon: Laptop },
  { id: "console", label: "Consoles", icon: Gamepad2 },
  { id: "all", label: "All Devices", icon: Package },
]

export function PriceChecker() {
  const [selectedCategory, setSelectedCategory] = useState("phone")
  const [searchQuery, setSearchQuery] = useState("")
  const [brands, setBrands] = useState<Brand[]>([])
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [prices, setPrices] = useState<Price[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch brands on mount
  useEffect(() => {
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.brands || []))
      .catch(() => setBrands([]))
  }, [])

  // Fetch devices when category or brand changes
  useEffect(() => {
    setSelectedDevice(null)
    setPrices([])
    
    if (searchQuery) {
      setLoading(true)
      fetch(`/api/devices?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setDevices(data.devices || []))
        .catch(() => setDevices([]))
        .finally(() => setLoading(false))
    } else if (selectedBrand) {
      setLoading(true)
      const categoryParam = selectedCategory !== "all" ? `&category=${selectedCategory}` : ""
      fetch(`/api/devices?brandId=${selectedBrand}${categoryParam}`)
        .then((res) => res.json())
        .then((data) => setDevices(data.devices || []))
        .catch(() => setDevices([]))
        .finally(() => setLoading(false))
    } else if (selectedCategory !== "all") {
      setLoading(true)
      fetch(`/api/devices?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setDevices(data.devices || []))
        .catch(() => setDevices([]))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      fetch("/api/devices")
        .then((res) => res.json())
        .then((data) => setDevices(data.devices || []))
        .catch(() => setDevices([]))
        .finally(() => setLoading(false))
    }
  }, [selectedCategory, selectedBrand, searchQuery])

  // Fetch prices when device is selected
  useEffect(() => {
    if (selectedDevice) {
      setLoading(true)
      fetch(`/api/prices?deviceId=${selectedDevice.id}`)
        .then((res) => res.json())
        .then((data) => setPrices(data.prices || []))
        .catch(() => setPrices([]))
        .finally(() => setLoading(false))
    }
  }, [selectedDevice])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedBrand(null)
    setSearchQuery("")
  }

  const filteredBrands = brands.filter((brand) => {
    if (selectedCategory === "all") return true
    // Filter brands based on available devices in category
    return true // For now, show all brands
  })

  // Group prices by storage
  const pricesByStorage = prices.reduce((acc, price) => {
    if (!acc[price.storage]) {
      acc[price.storage] = []
    }
    acc[price.storage].push(price)
    return acc
  }, {} as Record<string, Price[]>)

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = selectedCategory === category.id
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for any device..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setSelectedBrand(null)
          }}
          className="pl-12 h-14 text-base rounded-full border-2 focus:border-primary"
        />
      </div>

      {/* Main Content */}
      {selectedDevice ? (
        // Device Price Details
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedDevice(null)}
            className="mb-6 -ml-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to devices
          </Button>

          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{selectedDevice.brand_name}</p>
                  <h2 className="text-2xl font-bold text-foreground">{selectedDevice.model}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedDevice.release_year} • {selectedDevice.category.charAt(0).toUpperCase() + selectedDevice.category.slice(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prices by Storage */}
          {Object.keys(pricesByStorage).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(pricesByStorage).map(([storage, storagePrices]) => (
                <div key={storage}>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{storage}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {storagePrices.map((price) => (
                      <Card key={price.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className={cn("px-4 py-2", getConditionColor(price.condition))}>
                            <span className="text-sm font-medium text-foreground">
                              {getConditionLabel(price.condition)}
                            </span>
                          </div>
                          <div className="p-4 space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">Market Price</p>
                              <p className="text-2xl font-bold text-foreground">
                                {formatCurrency(price.price)}
                              </p>
                            </div>
                            <div className="pt-3 border-t border-border">
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">Trade-In Value</p>
                              <p className="text-lg font-semibold text-primary">
                                {formatCurrency(price.trade_in_value)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No pricing information available for this device yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        // Brand and Device Selection
        <div className="space-y-8">
          {/* Brand Filter */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedBrand(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  !selectedBrand
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                All Brands
              </button>
              {filteredBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    selectedBrand === brand.id
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          )}

          {/* Devices Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-12 bg-muted rounded-lg mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : devices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {devices.map((device) => {
                const CategoryIcon = 
                  device.category === "phone" ? Smartphone :
                  device.category === "laptop" ? Laptop :
                  device.category === "console" ? Gamepad2 : Package
                
                const deviceImage = getDeviceImage(device.model)
                
                return (
                  <Card
                    key={device.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/20 hover:scale-[1.02] overflow-hidden"
                    onClick={() => setSelectedDevice(device)}
                  >
                    <CardContent className="p-0">
                      {/* Device Image */}
                      <div className="relative w-full h-40 bg-muted flex items-center justify-center overflow-hidden">
                        <Image
                          src={deviceImage}
                          alt={device.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {/* Device Info */}
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">{device.brand_name}</p>
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{device.model}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{device.release_year}</span>
                          {device.storage_options && device.storage_options.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{device.storage_options.join(", ")}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No devices found for "${searchQuery}"`
                    : "No devices found. Try selecting a different category or brand."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
