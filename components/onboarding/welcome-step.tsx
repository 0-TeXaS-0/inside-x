"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Video, Users, Sparkles } from "lucide-react"

export default function WelcomeStep() {
  const features = [
    {
      icon: Shield,
      title: "Anonymous Interactions",
      description: "Connect with others while keeping your identity private",
      color: "bg-purple-500",
    },
    {
      icon: Video,
      title: "Video-First Experience",
      description: "Express yourself through live and recorded videos",
      color: "bg-pink-500",
    },
    {
      icon: Users,
      title: "Find Your Community",
      description: "Connect with like-minded people based on shared interests",
      color: "bg-violet-500",
    },
    {
      icon: Sparkles,
      title: "Unique Expression",
      description: "Use stickers and effects to enhance your communication",
      color: "bg-fuchsia-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto flex items-center justify-center">
          <span className="text-4xl">X</span>
        </div>
      </motion.div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-4"
      >
        Welcome to a new social experience
      </motion.h3>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-white/60 mb-8 max-w-lg mx-auto"
      >
        Inside X is an anonymous video-first platform where you can express yourself freely and connect with others
        based on shared interests. Let's set up your experience.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 flex items-start">
                <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mr-4`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
