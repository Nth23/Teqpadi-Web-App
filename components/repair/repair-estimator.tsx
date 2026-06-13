"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Search, Smartphone, Laptop, Gamepad2, 
  ChevronRight, Wrench, Clock, ArrowRight,
  Monitor, Battery, Plug, Volume2, Camera, Droplets, Code, Cpu, Keyboard, MousePointer, Fan, Disc3, Gamepad, MonitorPlay
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn, formatCurrency } from "@/lib/utils"

interface Device {
  id: string
  model: string
  category: string
  brand_name: string
}

interface RepairService {
  id: string
  name: string
  description: string
  icon: string
  category: string
}

interface RepairCost {
  id: string
  min_cost: number
  max_cost: number
  estimated_time: string
  service_name: string
  service_description: string
  icon: string
  service_id: string
}

const categoryTabs = [
  { id: "phone", label: "Phones", icon: Smartphone },
  { id: "laptop", label: "Laptops", icon: Laptop },
  { id: "console", label: "Consoles", icon: Gamepad2 },
]

const iconMap: Record<string, typeof Wrench> = {
  smartphone: Monitor,
  "battery-full": Battery,
  plug: Plug,
  "volume-2": Volume2,
  camera: Camera,
  droplets: Droplets,
  code: Code,
  cpu: Cpu,
  keyboard: Keyboard,
  "mouse-pointer": MousePointer,
  fan: Fan,
  disc: Disc3,
  "gamepad-2": Gamepad,
  monitor: MonitorPlay,
}

export function RepairEstimator() {
  const [selectedCategory, setSelectedCategory] = useState("phone")
  const [searchQuery, setSearchQuery] = useState("")
  const [devices, setDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [repairCosts, setRepairCosts] = useState<RepairCost[]>([])
  const [selectedRepairs, setSelectedRepairs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch devices when category changes
  useEffect(() => {
    setSelectedDevice(null)
    setRepairCosts([])
    setSelectedRepairs([])

    if (searchQuery) {
      setLoading(true)
      fetch(`/api/devices?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setDevices(data.devices || []))
        .catch(() => setDevices([]))
        .finally(() => setLoading(false))
    } else {
      setLoading(true)
      fetch(`/api/devices?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setDevices(data.devices || []))
        .catch(() => setDevices([]))
        .finally(() => setLoading(false))
    }
  }, [selectedCategory, searchQuery])

  // Fetch repair costs when device is selected
  useEffect(() => {
    if (selectedDevice) {
      setLoading(true)
      fetch(`/api/repair-costs?deviceId=${selectedDevice.id}`)
        .then((res) => res.json())
        .then((data) => setRepairCosts(data.costs || []))
        .catch(() => setRepairCosts([]))
        .finally(() => setLoading(false))
    }
  }, [selectedDevice])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSearchQuery("")
  }

  const toggleRepairSelection = (serviceId: string) => {
    setSelectedRepairs((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const selectedRepairDetails = repairCosts.filter((cost) =>
    selectedRepairs.includes(cost.service_id)
  )

  const totalMinCost = selectedRepairDetails.reduce((sum, cost) => sum + cost.min_cost, 0)
  const totalMaxCost = selectedRepairDetails.reduce((sum, cost) => sum + cost.max_cost, 0)

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categoryTabs.map((category) => {
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
          placeholder="Search for your device..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-base rounded-full border-2 focus:border-primary"
        />
      </div>

      {/* Main Content */}
      {selectedDevice ? (
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedDevice(null)
              setSelectedRepairs([])
            }}
            className="mb-6 -ml-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to devices
          </Button>

          {/* Selected Device */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{selectedDevice.brand_name}</p>
                  <h2 className="text-xl font-bold text-foreground">{selectedDevice.model}</h2>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Repair Services */}
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Repair Services</h3>
          
          {repairCosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {repairCosts.map((cost) => {
                const IconComponent = iconMap[cost.icon] || Wrench
                const isSelected = selectedRepairs.includes(cost.service_id)
                
                return (
                  <Card
                    key={cost.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200",
                      isSelected
                        ? "border-primary ring-2 ring-primary/20"
                        : "hover:border-primary/20"
                    )}
                    onClick={() => toggleRepairSelection(cost.service_id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground mb-1">{cost.service_name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{cost.service_description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-foreground">
                              {cost.min_cost === cost.max_cost
                                ? formatCurrency(cost.min_cost)
                                : `${formatCurrency(cost.min_cost)} - ${formatCurrency(cost.max_cost)}`}
                            </div>
                            {cost.estimated_time && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                {cost.estimated_time}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card className="mb-8 border-dashed border-2">
              <CardContent className="p-8 text-center">
                <Wrench className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  No repair services available for this device yet.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full"
                >
                  <Link href="/contact">
                    Get a Custom Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quote Summary */}
          {selectedRepairs.length > 0 && (
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="text-primary-foreground/70 text-sm mb-1">
                      Estimated Total ({selectedRepairs.length} service{selectedRepairs.length > 1 ? "s" : ""})
                    </p>
                    <p className="text-3xl font-bold">
                      {totalMinCost === totalMaxCost
                        ? formatCurrency(totalMinCost)
                        : `${formatCurrency(totalMinCost)} - ${formatCurrency(totalMaxCost)}`}
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="rounded-full gap-2 w-full md:w-auto"
                  >
                    <Link href={`/contact?device=${encodeURIComponent(selectedDevice.model)}&brand=${encodeURIComponent(selectedDevice.brand_name)}&services=${selectedRepairs.join(",")}`}>
                      Book Repair
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        // Device Selection
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
            Select Your Device
          </h3>
          
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
                  device.category === "laptop" ? Laptop : Gamepad2
                
                return (
                  <Card
                    key={device.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary/20 hover:scale-[1.02]"
                    onClick={() => setSelectedDevice(device)}
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <CategoryIcon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{device.brand_name}</p>
                      <h3 className="font-semibold text-foreground">{device.model}</h3>
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
                    : "No devices found. Try selecting a different category."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
