"use client"

import { useState } from "react"

interface CopyEmailButtonProps {
  email: string
}

export default function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // Fallback: open plain-text view if clipboard API fails
      window.open(`data:text/plain,${encodeURIComponent(email)}`, "_blank", "noopener")
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy email"
      className="ml-3 inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-purple-900/20 border border-purple-500/20 text-purple-200 hover:bg-purple-800/30 transition"
    >
      {copied ? "Copied!" : "Copy email"}
    </button>
  )
}
