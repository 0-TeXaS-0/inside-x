"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  hoverEffect?: boolean
  glowIntensity?: "low" | "medium" | "high"
  glowRadius?: number
}

export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(147, 51, 234, 0.5)", // Purple by default
  hoverEffect = true,
  glowIntensity = "medium",
  glowRadius = 150,
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const intensityMap = {
    low: 0.15,
    medium: 0.25,
    high: 0.4,
  }

  const intensity = intensityMap[glowIntensity]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !hoverEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Calculate the background gradient based on mouse position
  const getBackgroundStyle = () => {
    if (!isHovered || !hoverEffect) {
      return {}
    }

    const { x, y } = mousePosition
    const { width, height } = cardRef.current?.getBoundingClientRect() || { width: 0, height: 0 }

    return {
      background: `radial-gradient(circle ${glowRadius}px at ${x}px ${y}px, ${glowColor}, transparent)`,
      opacity: intensity,
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300",
        hoverEffect && "hover:border-white/20 hover:shadow-lg",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Glow effect layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={getBackgroundStyle()}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
