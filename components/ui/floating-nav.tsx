"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Video, Users, MessageCircle, User, Plus, X, Upload, Settings, BarChart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FloatingNavProps {
  activeItem?: string
}

export function FloatingNav({ activeItem }: FloatingNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const navItems = [
    { name: "home", icon: Home, label: "Home", href: "/dashboard" },
    { name: "discover", icon: Sparkles, label: "Discover", href: "/discover" },
    { name: "upload", icon: Upload, label: "Upload", href: "/upload" },
    { name: "messages", icon: MessageCircle, label: "Messages", href: "/messages" },
    { name: "analytics", icon: BarChart, label: "Analytics", href: "/analytics" },
    { name: "profile", icon: User, label: "Profile", href: "/profile" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden"
        >
          <div className="relative">
            {/* Main floating button */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-full h-14 w-14 shadow-lg ${
                isOpen
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </Button>

            {/* Navigation items */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2 shadow-lg">
                    <div className="flex flex-col gap-2">
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <Button
                            asChild
                            variant="ghost"
                            className={`w-full justify-start ${
                              activeItem === item.name ? "bg-white/10 text-purple-400" : "text-white"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <Link href={item.href}>
                              <item.icon className="h-5 w-5 mr-3" />
                              {item.label}
                            </Link>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
