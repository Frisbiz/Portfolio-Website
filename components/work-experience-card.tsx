interface WorkExperienceCardProps {
  title: string
  period: string
  description: string
}

export default function WorkExperienceCard({ title, period, description }: WorkExperienceCardProps) {
  return (
    <div className="p-6 rounded-lg backdrop-blur-md bg-gradient-to-br from-purple-900/40 to-purple-800/10 border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.15)] group hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
      <div className="mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:to-fuchsia-100 transition-all">
          {title}
        </h3>
        <p className="text-purple-300 text-sm">{period}</p>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
