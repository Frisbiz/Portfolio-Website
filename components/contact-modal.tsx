"use client"

import { useEffect, useState } from "react"
import { Copy, X } from "lucide-react"

interface ContactModalProps {
  open: boolean
  onClose: () => void
  email: string
}

export default function ContactModal({ open, onClose, email }: ContactModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  async function handleCopy(e?: React.MouseEvent) {
    e?.stopPropagation()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`data:text/plain,${encodeURIComponent(email)}`, "_blank", "noopener")
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-auto"
      onClick={(e) => {
        // close when clicking backdrop
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[9998]" />

      <div className="relative z-[10000] max-w-sm w-full mx-auto">
        <div className="backdrop-blur-lg bg-purple-900/90 border border-purple-500/20 rounded-xl p-6 shadow-xl">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              Contact
            </h3>
            <button
              onClick={onClose}
              aria-label="Close"
              className="ml-4 inline-flex items-center justify-center p-1 rounded-md text-purple-200 hover:bg-purple-800/30 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-3">
            <span className="text-sm text-purple-100 select-all">{email}</span>
            <button
              onClick={handleCopy}
              aria-label="Copy email"
              className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-purple-900/20 border border-purple-500/20 text-purple-200 hover:bg-purple-800/30 transition"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
