"use client"

import { useEffect, useRef } from "react"

export default function HolographicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid parameters
    const gridSize = 40
    const gridSpacing = 80
    const gridOpacity = 0.15

    // Animation parameters
    let animationFrame: number
    let time = 0

    // Draw holographic grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8,
      )
      gradient.addColorStop(0, "rgba(76, 29, 149, 0.15)")
      gradient.addColorStop(0.5, "rgba(49, 16, 96, 0.1)")
      gradient.addColorStop(1, "rgba(10, 1, 24, 0.05)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal lines
      for (let y = 0; y < canvas.height + gridSpacing; y += gridSpacing) {
        const yOffset = (Math.sin(time / 2000 + y / 200) * gridSpacing) / 4

        ctx.beginPath()
        ctx.moveTo(0, y + yOffset)
        ctx.lineTo(canvas.width, y + yOffset)

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        gradient.addColorStop(0, `rgba(168, 85, 247, ${gridOpacity * 0.5})`)
        gradient.addColorStop(0.5, `rgba(217, 70, 239, ${gridOpacity})`)
        gradient.addColorStop(1, `rgba(168, 85, 247, ${gridOpacity * 0.5})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw vertical lines
      for (let x = 0; x < canvas.width + gridSpacing; x += gridSpacing) {
        const xOffset = (Math.sin(time / 2000 + x / 200) * gridSpacing) / 4

        ctx.beginPath()
        ctx.moveTo(x + xOffset, 0)
        ctx.lineTo(x + xOffset, canvas.height)

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(168, 85, 247, ${gridOpacity * 0.5})`)
        gradient.addColorStop(0.5, `rgba(217, 70, 239, ${gridOpacity})`)
        gradient.addColorStop(1, `rgba(168, 85, 247, ${gridOpacity * 0.5})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw floating particles
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        const x = ((Math.sin(time / 1000 + i * 0.5) + 1) * canvas.width) / 2
        const y = ((Math.cos(time / 1200 + i * 0.7) + 1) * canvas.height) / 2
        const size = Math.sin(time / 1000 + i) * 2 + 3

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size)
        gradient.addColorStop(0, "rgba(217, 70, 239, 0.8)")
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)")

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Glow spots disabled for testing.
      // To re-enable, restore the previous glow drawing loop above.

      time += 16
      animationFrame = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
