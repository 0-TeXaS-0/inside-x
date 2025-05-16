"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import InterestsStep from "@/components/onboarding/interests-step"
import AvatarStep from "@/components/onboarding/avatar-step"
import PrivacyStep from "@/components/onboarding/privacy-step"
import ContentPreferencesStep from "@/components/onboarding/content-preferences-step"
import WelcomeStep from "@/components/onboarding/welcome-step"
import { AnimatedBackgroundContainer } from "@/components/ui/animated-background"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedText } from "@/components/ui/animated-text"

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isLoading, updateOnboardingStatus } = useAuth()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    interests: [],
    avatar: null,
    username: "",
    privacySettings: {
      profileVisibility: "anonymous",
      messagePermissions: "connections",
      contentVisibility: "public",
    },
    contentPreferences: {
      topics: [],
      contentTypes: [],
      languages: ["English"],
    },
  })

  const totalSteps = 5
  const progress = ((step + 1) / totalSteps) * 100

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth")
    } else if (!isLoading && user?.hasCompletedOnboarding) {
      // If user has already completed onboarding, redirect to dashboard
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      // Mark onboarding as completed before redirecting to dashboard
      updateOnboardingStatus(true)
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const updateFormData = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const steps = [
    {
      component: <WelcomeStep />,
      title: "Welcome to Inside X",
    },
    {
      component: (
        <InterestsStep
          selectedInterests={formData.interests}
          updateInterests={(interests: string[]) => updateFormData("interests", interests)}
        />
      ),
      title: "Select Your Interests",
    },
    {
      component: (
        <AvatarStep
          avatar={formData.avatar}
          username={formData.username}
          updateAvatar={(avatar: File | null) => updateFormData("avatar", avatar)}
          updateUsername={(username: string) => updateFormData("username", username)}
        />
      ),
      title: "Create Your Profile",
    },
    {
      component: (
        <PrivacyStep
          privacySettings={formData.privacySettings}
          updatePrivacySettings={(settings: typeof formData.privacySettings) => updateFormData("privacySettings", settings)}
        />
      ),
      title: "Privacy Settings",
    },
    {
      component: (
        <ContentPreferencesStep
          contentPreferences={formData.contentPreferences}
          updateContentPreferences={(prefs: typeof formData.contentPreferences) => updateFormData("contentPreferences", prefs)}
        />
      ),
      title: "Content Preferences",
    },
  ]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const [direction, setDirection] = useState(1)

  const nextStep = () => {
    setDirection(1)
    handleNext()
  }

  const prevStep = () => {
    setDirection(-1)
    handleBack()
  }

  return (
    <AnimatedBackgroundContainer
      particleCount={80}
      connectionDistance={150}
      colorScheme="purple"
      className="min-h-screen"
    >
      <div className="min-h-screen flex flex-col">
        <header className="relative z-10 border-b border-white/10 bg-black/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Inside X</h1>
              <div className="text-sm text-white/60">
                Step {step + 1} of {totalSteps}
              </div>
            </div>
            <Progress
              value={progress}
              className="h-1 mt-4 bg-white/10"
              indicatorClassName="bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </header>

        <main className="flex-1 relative z-10 container mx-auto px-4 py-8 flex flex-col">
          <motion.div
            key={`title-${step}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <AnimatedText text={steps[step].title} animation="slide" className="text-3xl font-bold" as="h2" />
          </motion.div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  {steps[step].component}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <AnimatedButton
              variant="outline"
              onClick={prevStep}
              disabled={step === 0}
              className="border-white/10 text-white hover:bg-white/10"
              glowColor="rgba(255, 255, 255, 0.2)"
            >
              Back
            </AnimatedButton>
            <AnimatedButton
              onClick={nextStep}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              glowColor="rgba(147, 51, 234, 0.5)"
            >
              {step === totalSteps - 1 ? "Get Started" : "Continue"}
            </AnimatedButton>
          </div>
        </main>
      </div>
    </AnimatedBackgroundContainer>
  )
}
