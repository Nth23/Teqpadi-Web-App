"use client"

import { TradeInCalculator } from "@/components/trade-in/trade-in-calculator"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Footer } from "@/components/layout/footer"
import { motion } from "framer-motion"
import { ArrowLeftRight, Shield, Zap, BadgeCheck } from "lucide-react"

export default function TradeInPage() {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Quote",
      description: "Get your device value in seconds"
    },
    {
      icon: Shield,
      title: "Best Prices",
      description: "We offer competitive trade-in values"
    },
    {
      icon: BadgeCheck,
      title: "Easy Process",
      description: "Simple 3-step trade-in process"
    }
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 md:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Trade Your Old Device for Cash or Credit
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                Get instant quotes for your devices. Trade in for cash or use your credit towards a new purchase.
              </p>
              
              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">{benefit.title}</h3>
                    <p className="text-xs text-muted-foreground hidden md:block">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Calculator Section */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <TradeInCalculator />
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How Trade-In Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "1", title: "Get Your Quote", description: "Select your device and condition to get an instant trade-in value" },
                { step: "2", title: "Bring Your Device", description: "Visit our shop or schedule a pickup for your device" },
                { step: "3", title: "Get Paid", description: "Receive cash or store credit once we verify your device" }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <BottomNav />
    </div>
  )
}
