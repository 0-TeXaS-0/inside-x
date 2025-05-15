"use client"

import { motion } from "framer-motion"
import { UserCircle, Video, Heart, MessageCircle } from "lucide-react"

const steps = [
  {
    icon: UserCircle,
    title: "Create Your Profile",
    description: "Sign up and create your anonymous profile with interests and preferences.",
    color: "bg-purple-500",
  },
  {
    icon: Heart,
    title: "Match With Others",
    description: "Our algorithm connects you with people who share your interests.",
    color: "bg-pink-500",
  },
  {
    icon: Video,
    title: "Join Video Chats",
    description: "Participate in live video sessions or watch pre-recorded content.",
    color: "bg-violet-500",
  },
  {
    icon: MessageCircle,
    title: "Build Connections",
    description: "Form meaningful connections while maintaining your anonymity.",
    color: "bg-fuchsia-500",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Getting started with Inside X is easy. Follow these simple steps to begin your anonymous social journey.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/10 hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>

              <div className="my-6 md:my-0 relative">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center z-10 relative`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="w-full md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
