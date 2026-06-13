import { HeroSection } from "@/components/home/hero-section"
import { ServicesSection } from "@/components/home/services-section"
import { BrandsSection } from "@/components/home/brands-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
