import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  isReversed?: boolean
  repoUrl?: string
}

export default function ProjectCard({ title, description, isReversed = false, repoUrl }: ProjectCardProps) {
  return (
    <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}>
      <div className="w-full md:w-1/2">
        <div className="aspect-video rounded-lg overflow-hidden backdrop-blur-md bg-transparent border border-purple-500/30 shadow-[0_0_6px_rgba(0,0,0,0.2)] group hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all p-1">
          <div className="relative w-full h-full rounded-md overflow-hidden">
            <Image
              src={isReversed ? "/project2.png" : "/project1.png"}
              alt={title}
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 space-y-4 backdrop-blur-md bg-purple-900/10 p-6 rounded-lg border border-purple-500/20">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-purple-100">{description}</p>
        <div className="flex space-x-4">
          <Button
            asChild
            variant="outline"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-purple-900/20 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            <a href={repoUrl} target="_blank" rel="noopener noreferrer">
              View code
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
