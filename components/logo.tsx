import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.7)] border border-purple-300/30">
        <span className="text-white font-bold text-lg">P</span>
      </div>
    </Link>
  )
}
