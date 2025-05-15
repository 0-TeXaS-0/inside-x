import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import PricingSection from "@/components/sections/pricing-section"
import NewsletterSection from "@/components/sections/newsletter-section"
import Footer from "@/components/layout/footer"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"

export default function LandingPage() {
  return (
    <AnimatedBackgroundContainer
      particleCount={100}
      connectionDistance={150}
      colorScheme="purple"
      className="min-h-screen"
    >
      <main className="min-h-screen">
        <HeroSection badge="Inside X" title1="Anonymous" title2="Video Social" />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <NewsletterSection />
        <Footer />
      </main>
    </AnimatedBackgroundContainer>
  )
}
