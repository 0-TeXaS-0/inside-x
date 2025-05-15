"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

interface Connection {
  from: number
  to: number
  alpha: number
}

export function AnimatedBackground({
  particleCount = 80,
  connectionDistance = 150,
  colorScheme = "purple",
  interactive = true,
  density = 1,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const animationRef = useRef<number>(null)
  const [isHovering, setIsHovering] = useState(false)
  const particlesRef = useRef(particles) // Move useRef here

  // Generate color based on scheme
  const getColor = () => {
    switch (colorScheme) {
      case "purple":
        return `rgba(${128 + Math.random() * 50}, ${0 + Math.random() * 50}, ${255 - Math.random() * 50}, 0.8)`
      case "pink":
        return `rgba(${255 - Math.random() * 50}, ${0 + Math.random() * 50}, ${128 + Math.random() * 50}, 0.8)`
      case "blue":
        return `rgba(${0 + Math.random() * 50}, ${128 + Math.random() * 50}, ${255 - Math.random() * 50}, 0.8)`
      case "green":
        return `rgba(${0 + Math.random() * 50}, ${255 - Math.random() * 50}, ${128 + Math.random() * 50}, 0.8)`
      case "rainbow":
        return `hsla(${Math.random() * 360}, 70%, 60%, 0.8)`
      default:
        return `rgba(${128 + Math.random() * 50}, ${0 + Math.random() * 50}, ${255 - Math.random() * 50}, 0.8)`
    }
  }

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })

        // Adjust particle count based on screen size and density
        const adjustedCount = Math.floor(((particleCount * (width * height)) / (1920 * 1080)) * density)

        // Create particles
        const newParticles: Particle[] = []
        for (let i = 0; i < adjustedCount; i++) {
          newParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: getColor(),
            alpha: Math.random() * 0.5 + 0.1,
          })
        }
        setParticles(newParticles)
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particleCount, density])

  // Handle mouse movement
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", handleMouseMove)
    containerRef.current?.addEventListener("mouseenter", handleMouseEnter)
    containerRef.current?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseenter", handleMouseEnter)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [interactive])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Use refs to store mutable values that don't need to trigger re-renders
    particlesRef.current = particles

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update particles
      const updatedParticles = [...particlesRef.current]
      for (let i = 0; i < updatedParticles.length; i++) {
        const p = updatedParticles[i]

        // Move particles
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > dimensions.width) p.speedX *= -1
        if (p.y < 0 || p.y > dimensions.height) p.speedY *= -1

        // Mouse interaction
        if (interactive && isHovering) {
          const dx = mousePosition.x - p.x
          const dy = mousePosition.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Repel particles from cursor
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 500
            p.speedX -= Math.cos(angle) * force
            p.speedY -= Math.sin(angle) * force

            // Limit speed
            const speed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY)
            if (speed > 2) {
              p.speedX = (p.speedX / speed) * 2
              p.speedY = (p.speedY / speed) * 2
            }
          }
        }
      }

      // Draw particle
      for (let i = 0; i < updatedParticles.length; i++) {
        const p = updatedParticles[i]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      }

      // Find connections
      const newConnections = []
      for (let i = 0; i < updatedParticles.length; i++) {
        for (let j = i + 1; j < updatedParticles.length; j++) {
          const dx = updatedParticles[i].x - updatedParticles[j].x
          const dy = updatedParticles[i].y - updatedParticles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            newConnections.push({
              from: i,
              to: j,
              alpha: 1 - distance / connectionDistance,
            })
          }
        }
      }

      // Draw connections
      for (const conn of newConnections) {
        const p1 = updatedParticles[conn.from]
        const p2 = updatedParticles[conn.to]

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle =
          colorScheme === "rainbow"
            ? `hsla(${(p1.color.match(/\d+/) || ["0"])[0]}, 70%, 60%, ${conn.alpha * 0.2})`
            : `rgba(${
                colorScheme === "purple"
                  ? "128, 0, 255"
                  : colorScheme === "pink"
                    ? "255, 0, 128"
                    : colorScheme === "blue"
                      ? "0, 128, 255"
                      : "0, 255, 128"
              }, ${conn.alpha * 0.2})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Update the particles state only once per animation frame
      // and only if they've actually changed
      particlesRef.current = updatedParticles

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, mousePosition, connectionDistance, colorScheme, interactive, isHovering, particles])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="absolute inset-0" />
    </div>
  )
}

export function AnimatedBackgroundContainer({
  children,
  className = "",
  particleCount = 80,
  connectionDistance = 150,
  colorScheme = "purple",
  interactive = true,
  density = 1,
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedBackground
        particleCount={particleCount}
        connectionDistance={connectionDistance}
        colorScheme={colorScheme}
        interactive={interactive}
        density={density}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
