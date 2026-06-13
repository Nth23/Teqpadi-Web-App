"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Smartphone, 
  Laptop, 
  Gamepad2, 
  Check, 
  X, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  Phone,
  Clock
} from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

interface Brand {
  id: string
  name: string
}

interface Device {
  id: string
  brand_id: string
  model: string
  category: string
  storage_options: string[]
  brand_name?: string
}

interface PriceInfo {
  trade_in_value: number
  price: number
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const categories = [
  { id: "phone", label: "Phones", icon: Smartphone },
  { id: "laptop", label: "Laptops", icon: Laptop },
  { id: "console", label: "Consoles", icon: Gamepad2 },
]

const conditions = [
  { 
    id: "like_new", 
    label: "Like New", 
    description: "Flawless condition, no scratches or damage",
    multiplier: 1
  },
  { 
    id: "good", 
    label: "Good", 
    description: "Minor scratches, fully functional",
    multiplier: 0.85
  },
  { 
    id: "fair", 
    label: "Fair", 
    description: "Visible wear, all features work",
    multiplier: 0.7
  },
  { 
    id: "poor", 
    label: "Poor", 
    description: "Significant damage but powers on",
    multiplier: 0.5
  },
]

export function TradeInCalculator() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedDevice, setSelectedDevice] = useState<string>("")
  const [selectedStorage, setSelectedStorage] = useState<string>("")
  const [selectedCondition, setSelectedCondition] = useState<string>("")
  const [tradeInValue, setTradeInValue] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const { data: brandsData, isLoading: brandsLoading } = useSWR<{ brands: Brand[] }>("/api/brands", fetcher)
  const brands = brandsData?.brands || []
  
  const { data: devicesData, isLoading: devicesLoading } = useSWR<{ devices: Device[] }>(
    selectedCategory && selectedBrand 
      ? `/api/devices?category=${selectedCategory}&brandId=${selectedBrand}` 
      : null,
    fetcher
  )
  const devices = devicesData?.devices || []

  const currentDevice = devices?.find(d => d.id === selectedDevice)

  // Reset dependent selections when parent changes
  useEffect(() => {
    setSelectedBrand("")
    setSelectedDevice("")
    setSelectedStorage("")
    setSelectedCondition("")
    setTradeInValue(null)
  }, [selectedCategory])

  useEffect(() => {
    setSelectedDevice("")
    setSelectedStorage("")
    setSelectedCondition("")
    setTradeInValue(null)
  }, [selectedBrand])

  useEffect(() => {
    setSelectedStorage("")
    setSelectedCondition("")
    setTradeInValue(null)
  }, [selectedDevice])

  useEffect(() => {
    setSelectedCondition("")
    setTradeInValue(null)
  }, [selectedStorage])

  useEffect(() => {
    setTradeInValue(null)
  }, [selectedCondition])

  const calculateTradeIn = async () => {
    if (!selectedDevice || !selectedStorage || !selectedCondition) return

    setIsCalculating(true)
    
    try {
      const res = await fetch(
        `/api/prices?deviceId=${selectedDevice}&storage=${selectedStorage}&condition=${selectedCondition}`
      )
      const data = await res.json()
      
      if (data.prices && data.prices.length > 0) {
        setTradeInValue(data.prices[0].trade_in_value)
      } else {
        // Calculate estimated value if no exact match
        const conditionMultiplier = conditions.find(c => c.id === selectedCondition)?.multiplier || 0.7
        const baseValue = 300000 // Base value in Naira
        setTradeInValue(Math.round(baseValue * conditionMultiplier))
      }
      setStep(2)
    } catch (error) {
      console.error("Error calculating trade-in:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  const resetCalculator = () => {
    setStep(1)
    setSelectedCategory("")
    setSelectedBrand("")
    setSelectedDevice("")
    setSelectedStorage("")
    setSelectedCondition("")
    setTradeInValue(null)
  }

  const isFormComplete = selectedCategory && selectedBrand && selectedDevice && selectedStorage && selectedCondition

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 shadow-lg">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl md:text-2xl">Calculate Your Trade-In Value</CardTitle>
                <CardDescription>
                  Select your device details to get an instant quote
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Device Type</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                          selectedCategory === category.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <category.icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{category.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Instant Quotes by Category */}
                <AnimatePresence>
                  {selectedCategory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-4 border-t border-border"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <Label className="text-base font-medium">Quick Estimates</Label>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {conditions.slice(0, 3).map((condition) => {
                          const baseValue = selectedCategory === "phone" ? 350 : selectedCategory === "laptop" ? 600 : 450
                          const estimatedValue = Math.round(baseValue * condition.multiplier * 1000)
                          return (
                            <div
                              key={condition.id}
                              className="p-3 rounded-lg bg-muted/50 border border-border/50"
                            >
                              <p className="text-xs font-medium text-muted-foreground mb-1">{condition.label}</p>
                              <p className="text-lg font-bold text-primary">₦{estimatedValue.toLocaleString()}</p>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Brand Selection */}
                <AnimatePresence>
                  {selectedCategory && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <Label className="text-base font-medium">Brand</Label>
                      {brandsLoading ? (
                        <Skeleton className="h-10 w-full" />
                      ) : (
                        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands?.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Device Selection */}
                <AnimatePresence>
                  {selectedBrand && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <Label className="text-base font-medium">Device Model</Label>
                      {devicesLoading ? (
                        <Skeleton className="h-10 w-full" />
                      ) : devices && devices.length > 0 ? (
                        <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select device" />
                          </SelectTrigger>
                          <SelectContent>
                            {devices.map((device) => (
                              <SelectItem key={device.id} value={device.id}>
                                {device.model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-muted-foreground text-sm py-2">
                          No devices found for this selection
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Storage Selection */}
                <AnimatePresence>
                  {currentDevice && currentDevice.storage_options?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <Label className="text-base font-medium">Storage Capacity</Label>
                      <div className="flex flex-wrap gap-2">
                        {currentDevice.storage_options.map((storage) => (
                          <button
                            key={storage}
                            onClick={() => setSelectedStorage(storage)}
                            className={cn(
                              "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                              selectedStorage === storage
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            {storage}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Condition Selection */}
                <AnimatePresence>
                  {selectedStorage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <Label className="text-base font-medium">Device Condition</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {conditions.map((condition) => (
                          <button
                            key={condition.id}
                            onClick={() => setSelectedCondition(condition.id)}
                            className={cn(
                              "flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all",
                              selectedCondition === condition.id
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <span className="font-medium text-foreground">{condition.label}</span>
                            <span className="text-xs text-muted-foreground mt-1">
                              {condition.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Calculate Button */}
                <AnimatePresence>
                  {isFormComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <Button
                        onClick={calculateTradeIn}
                        disabled={isCalculating}
                        className="w-full h-14 text-lg gap-2"
                        size="lg"
                      >
                        {isCalculating ? (
                          <>
                            <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Calculating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-5 w-5" />
                            Get My Trade-In Value
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="h-10 w-10" />
                </motion.div>
                <h2 className="text-xl font-semibold mb-2">Your Trade-In Value</h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  {formatCurrency(tradeInValue || 0)}
                </motion.div>
              </div>
              
              <CardContent className="p-6 space-y-6">
                {/* Device Summary */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Device Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device</span>
                      <span className="font-medium">{currentDevice?.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">{selectedStorage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Condition</span>
                      <span className="font-medium capitalize">{selectedCondition?.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>

                {/* Info Notice */}
                <div className="flex gap-3 p-4 bg-amber-500/10 rounded-xl text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    This is an estimated value. Final trade-in amount may vary after physical inspection of your device.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={resetCalculator} className="h-12">
                    <X className="h-4 w-4 mr-2" />
                    Start Over
                  </Button>
                  <Button asChild className="h-12">
                    <a href="/contact">
                      <Phone className="h-4 w-4 mr-2" />
                      Book Trade-In
                    </a>
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quick Process</p>
                      <p className="text-xs text-muted-foreground">15-30 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instant Payment</p>
                      <p className="text-xs text-muted-foreground">Cash or credit</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
