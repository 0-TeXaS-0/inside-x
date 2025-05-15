"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Get started with basic features",
    features: ["Anonymous video chat", "Basic sticker packs", "Join public rooms", "Limited interest matching"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "Everything in Free, plus more",
    features: [
      "Unlimited video chats",
      "All sticker packs included",
      "Create private rooms",
      "Advanced interest matching",
      "No ads experience",
      "Priority support",
    ],
    cta: "Upgrade Now",
    popular: true,
  },
]

export default function PricingSection() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Choose Your Plan</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Select the plan that best fits your needs and start connecting anonymously today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card
                className={`h-full ${
                  plan.popular
                    ? "bg-gradient-to-b from-purple-900/40 to-black border-purple-500/50"
                    : "bg-black/40 border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline text-white">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-xl text-white/60">{plan.period}</span>}
                  </div>
                  <CardDescription className="mt-2 text-white/60">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
