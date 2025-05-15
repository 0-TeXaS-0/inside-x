"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "Inside X has completely changed how I connect with others online. The anonymity gives me the freedom to be myself.",
    author: "User429",
    role: "Community Member",
    initials: "U4",
  },
  {
    quote: "The video-first approach makes conversations feel more authentic, even without revealing my identity.",
    author: "Anonymous92",
    role: "Regular User",
    initials: "A9",
  },
  {
    quote:
      "I've found an amazing community of people who share my interests. Inside X's matching algorithm is spot on!",
    author: "HiddenGem",
    role: "Premium Member",
    initials: "HG",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Community Highlights</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hear what our users have to say about their experience with Inside X.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 border border-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12"
            >
              <Quote className="w-12 h-12 text-purple-500 mb-6" />
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light italic">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4 bg-gradient-to-r from-purple-500 to-pink-500">
                  <AvatarFallback>{testimonials[current].initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{testimonials[current].author}</p>
                  <p className="text-white/60 text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full border-white/10 text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full border-white/10 text-white hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
