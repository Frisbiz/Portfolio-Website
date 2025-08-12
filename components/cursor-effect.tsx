"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorPosition {
  x: number
  y: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number
}

export default function CursorEffect() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isClient, setIsClient] = useState(false)
  const particleIdRef = useRef(0)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    setIsClient(true)

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = target.closest('button, a, [role="button"]') !== null
      setIsHovering(isInteractive)

      // Create particles on movement
      if (Math.random() < 0.3) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 60,
          maxLife: 60,
          size: Math.random() * 3 + 1,
          hue: Math.random() * 60 + 270, // Purple to pink range
        }

        setParticles((prev) => [...prev, newParticle].slice(-50)) // Keep max 50 particles
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsHovering(false)
    }

    // Particle animation loop
    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter((particle) => particle.life > 0),
      )

      animationFrameRef.current = requestAnimationFrame(animateParticles)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseleave", handleMouseLeave)
    animateParticles()

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  if (!isClient) return null

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-40"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: particle.life / particle.maxLife,
              scale: (particle.life / particle.maxLife) * 0.5 + 0.5,
            }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
            }}
          >
            <div
              className="w-full h-full rounded-full blur-sm"
              style={{
                background: `hsl(${particle.hue}, 80%, 60%)`,
                boxShadow: `0 0 ${particle.size * 2}px hsl(${particle.hue}, 80%, 60%)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor with multiple layers */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.1,
          scale: { duration: 0.2 },
        }}
      >
        <div className="relative w-10 h-10">
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
            }}
          />

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-1 rounded-full border border-fuchsia-400/80"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Inner core */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]" />

          {/* Holographic glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
            animate={{
              width: isHovering ? "60px" : "40px",
              height: isHovering ? "60px" : "40px",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.2) 50%, transparent 100%)",
            }}
          />

          {/* Orbiting dots */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-300"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "0 0",
              }}
              animate={{
                rotate: angle + 360,
                x: Math.cos((angle * Math.PI) / 180) * 15 - 2,
                y: Math.sin((angle * Math.PI) / 180) * 15 - 2,
              }}
              transition={{
                rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                x: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Large background glow that follows cursor */}
      <motion.div
        className="fixed pointer-events-none z-20"
        animate={{
          x: position.x - 100,
          y: position.y - 100,
          opacity: isVisible ? (isHovering ? 0.4 : 0.2) : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.8 }}
      >
        <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-3xl" />
      </motion.div>

      {/* Trailing light effect */}
      <motion.div
        className="fixed pointer-events-none z-30"
        animate={{
          x: position.x - 75,
          y: position.y - 75,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 80, mass: 1.2 }}
      >
        <div
          className="w-[150px] h-[150px] rounded-full blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(168, 85, 247, 0.1), rgba(217, 70, 239, 0.2), rgba(168, 85, 247, 0.1))",
          }}
        />
      </motion.div>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-45"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: 2,
              opacity: 0,
              x: position.x - 25,
              y: position.y - 25,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-[50px] h-[50px] rounded-full border-2 border-purple-400/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
