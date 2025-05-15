"use client"

import { motion } from "framer-motion"
import { Camera, Shield, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Anonymous Chat",
    description:
      "Connect with others while maintaining your privacy. Our platform ensures your identity remains protected.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Camera,
    title: "Video-First Experience",
    description:
      "Share pre-recorded videos or join live sessions. Express yourself through our high-quality video platform.",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Users,
    title: "Interest-Based Matching",
    description:
      "Find your community based on shared interests. Our algorithm connects you with like-minded individuals.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
]

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Inside X?</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Our platform offers unique features designed to enhance your social experience while protecting your
            privacy.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-black/40 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 h-full">
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${feature.gradient} mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/60">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
