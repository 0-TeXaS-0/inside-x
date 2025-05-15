"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ComponentProps<typeof Button> {
  glowColor?: string
  hoverScale?: number
  animateOnClick?: boolean
}

export function AnimatedButton({
  children,
  className,
  glowColor = "rgba(147, 51, 234, 0.5)", // Purple by default
  hoverScale = 1.03,
  animateOnClick = true,
  ...props
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: hoverScale }}
      whileTap={animateOnClick ? { scale: 0.97 } : undefined}
      className="relative"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 blur-md transition-opacity duration-300"
        style={{ backgroundColor: glowColor }}
        animate={{ opacity: isPressed ? 0.7 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <Button
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity hover:after:opacity-20",
          "after:bg-gradient-to-r after:from-white/20 after:to-transparent",
          className,
        )}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
}
