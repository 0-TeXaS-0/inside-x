"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  staggerChildren?: number
  animation?: "fade" | "slide" | "bounce" | "wave" | "glitch"
  color?: string
  as?: React.ElementType
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
  animation = "fade",
  color = "text-white",
  as: Component = "span",
}: AnimatedTextProps) {
  const controls = useAnimation()
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (!rendered) {
      controls.start("visible")
      setRendered(true)
    }
  }, [controls, rendered])

  // Split text into words and characters
  const words = text.split(" ")

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const getCharacterVariants = () => {
    switch (animation) {
      case "slide":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration, ease: [0.2, 0.65, 0.3, 0.9] },
          },
        }
      case "bounce":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 10, duration },
          },
        }
      case "wave":
        return {
          hidden: { y: 0, opacity: 1 },
          visible: (i: number) => ({
            y: [0, -10, 0],
            opacity: 1,
            transition: {
              delay: i * staggerChildren,
              duration: duration * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 5,
              ease: "easeInOut",
            },
          }),
        }
      case "glitch":
        return {
          hidden: { opacity: 1 },
          visible: (i: number) => ({
            opacity: [1, 0.8, 1],
            x: [0, i % 2 === 0 ? 2 : -2, 0],
            y: [0, i % 3 === 0 ? 1 : -1, 0],
            transition: {
              delay: i * staggerChildren,
              duration: duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 5 + Math.random() * 5,
              ease: "easeInOut",
            },
          }),
        }
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration },
          },
        }
    }
  }

  const characterVariants = getCharacterVariants()

  return (
    <Component className={cn("inline-block", color, className)}>
      <motion.span
        className="inline-block whitespace-pre-wrap"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        viewport={{ once }}
      >
        {words.map((word, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`char-${charIndex}`}
                className="inline-block"
                variants={characterVariants}
                custom={wordIndex * 100 + charIndex}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && " "}
          </span>
        ))}
      </motion.span>
    </Component>
  )
}
