"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function ProfilePicture() {
  return (
    <div className="relative">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{
          background:
            "conic-gradient(from 0deg, rgba(168, 85, 247, 0.8), rgba(217, 70, 239, 0.8), rgba(168, 85, 247, 0.8))",
          padding: "2px",
        }}
      >
        <div className="w-full h-full rounded-full bg-[#0A0118]" />
      </motion.div>

      {/* Middle pulsing glow */}
      <motion.div
        className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 blur-md"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Profile picture container */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-purple-400/50 backdrop-blur-sm bg-gradient-to-br from-purple-900/40 to-purple-800/10 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        <Image
          src="/profile-placeholder.png"
          alt="Profile Picture"
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-fuchsia-900/20" />

        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-full shadow-inner shadow-purple-500/20" />
      </div>

      {/* Floating particles around profile */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-300/60"
          style={{
            left: "50%",
            top: "50%",
            transformOrigin: "0 0",
          }}
          animate={{
            rotate: angle + 360,
            x: Math.cos((angle * Math.PI) / 180) * 80 - 2,
            y: Math.sin((angle * Math.PI) / 180) * 80 - 2,
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            x: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            y: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.3 },
          }}
        />
      ))}
    </div>
  )
}
