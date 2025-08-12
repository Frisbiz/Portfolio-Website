"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  icon: string
  description: string
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: "⚛️", description: "Modern UI development" },
        { name: "Next.js", icon: "N", description: "Full-stack React framework" },
        { name: "TypeScript", icon: "TS", description: "Type-safe JavaScript" },
        { name: "TailwindCSS", icon: "🌊", description: "Utility-first CSS framework" },
        { name: "Vue.js", icon: "V", description: "Progressive JavaScript framework" },
        { name: "Redux", icon: "🔄", description: "State management library" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: "🟢", description: "Server-side JavaScript" },
        { name: "Python", icon: "🐍", description: "Versatile programming language" },
        { name: "GraphQL", icon: "◼️", description: "Query language for APIs" },
        { name: "Express", icon: "E", description: "Web application framework" },
        { name: "MongoDB", icon: "🍃", description: "NoSQL database" },
        { name: "PostgreSQL", icon: "🐘", description: "Relational database" },
      ],
    },
    {
      title: "Tools & Design",
      skills: [
        { name: "AWS", icon: "☁️", description: "Cloud computing platform" },
        { name: "Docker", icon: "🐳", description: "Containerization platform" },
        { name: "Git", icon: "📝", description: "Version control system" },
        { name: "Figma", icon: "🎨", description: "Design and prototyping tool" },
        { name: "VS Code", icon: "💻", description: "Code editor" },
        { name: "Postman", icon: "📮", description: "API testing tool" },
      ],
    },
  ]

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="space-y-6"
          >
            {/* Category Title */}
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
              {category.title}
            </h3>

            {/* Skills in Column */}
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                  className="group relative"
                >
                  <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/40 to-purple-800/10 border border-purple-500/30 rounded-lg p-4 flex items-center space-x-4 group-hover:border-purple-400/60 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-105">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-lg font-bold shadow-[0_0_10px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 flex-shrink-0">
                      <span className="text-white">{skill.icon}</span>
                    </div>

                    {/* Skill Name */}
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:to-fuchsia-100 transition-all duration-300">
                      {skill.name}
                    </h4>

                    {/* Floating glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-purple-900/90 backdrop-blur-md border border-purple-500/50 rounded-lg text-sm text-purple-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20">
                    {skill.description}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-purple-500/50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
