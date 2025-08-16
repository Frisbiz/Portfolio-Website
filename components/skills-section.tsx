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
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: "JS", description: "Dynamic web programming" },
        { name: "Python", icon: "🐍", description: "Versatile programming language" },
        { name: "C#", icon: "C#", description: "Object-oriented programming" },
        { name: "Java", icon: "☕", description: "Enterprise application development" },
        { name: "SQL", icon: "🗃️", description: "Database query language" },
        { name: "TypeScript", icon: "TS", description: "Type-safe JavaScript" },
        { name: "HTML", icon: "🌐", description: "Web markup language" },
        { name: "CSS", icon: "🎨", description: "Styling and layout" },
        { name: "PHP", icon: "🐘", description: "Server-side scripting" },
        { name: "Go", icon: "🔷", description: "Efficient systems programming" },
      ],
    },
    {
      title: "Frameworks & Technologies",
      skills: [
        { name: "React", icon: "⚛️", description: "Modern UI development" },
        { name: "Angular", icon: "🅰️", description: "Full-featured web framework" },
        { name: "Node.js", icon: "🟢", description: "Server-side JavaScript" },
        { name: "Express", icon: "E", description: "Web application framework" },
        { name: "RESTful APIs", icon: "🔗", description: "Web service architecture" },
        { name: "Microservices", icon: "🔧", description: "Distributed system architecture" },
        { name: "Next.js", icon: "▲", description: "React production framework" },
        { name: "Vue.js", icon: "💚", description: "Progressive JavaScript framework" },
        { name: "Spring Boot", icon: "🍃", description: "Java application framework" },
        { name: ".NET", icon: "🔵", description: "Microsoft development platform" },
      ],
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: "📝", description: "Version control system" },
        { name: "MongoDB", icon: "🍃", description: "NoSQL database" },
        { name: "Jira", icon: "📋", description: "Project management tool" },
        { name: "Microsoft Teams", icon: "👥", description: "Collaboration platform" },
        { name: "Zoom", icon: "📹", description: "Video conferencing" },
        { name: "Docker", icon: "🐳", description: "Containerization platform" },
        { name: "AWS", icon: "☁️", description: "Cloud computing platform" },
        { name: "Jenkins", icon: "🔨", description: "CI/CD automation server" },
        { name: "Postman", icon: "📮", description: "API development tool" },
        { name: "VS Code", icon: "💻", description: "Code editor and IDE" },
      ],
    },
    {
      title: "Technical Skills",
      skills: [
        { name: "Full-Stack Development", icon: "🏗️", description: "End-to-end application development" },
        { name: "Secure Coding", icon: "🔒", description: "Security-focused development" },
        { name: "Data Protection", icon: "🛡️", description: "Privacy and security compliance" },
        { name: "System Monitoring", icon: "📊", description: "Performance and health tracking" },
        { name: "Testing & QA", icon: "✅", description: "Quality assurance processes" },
        { name: "ETL Processes", icon: "🔄", description: "Data extraction and transformation" },
        { name: "Algorithms", icon: "🧮", description: "Problem-solving methodologies" },
        { name: "Data Structures", icon: "📚", description: "Efficient data organization" },
        { name: "Encryption", icon: "🔐", description: "Data security techniques" },
        { name: "Network Troubleshooting", icon: "🌐", description: "Network diagnostics and repair" },
      ],
    },
  ]

  const softSkills: Skill[] = [
    { name: "Technical Writing", icon: "📝", description: "Clear documentation and communication" },
    { name: "Agile/Scrum", icon: "🔄", description: "Collaborative development methodology" },
    { name: "Communication", icon: "💬", description: "Effective interpersonal skills" },
    { name: "Technical Training", icon: "🎓", description: "Knowledge transfer and mentoring" },
    { name: "User Support", icon: "🤝", description: "Customer service and assistance" },
    { name: "Root Cause Analysis", icon: "🔍", description: "Problem identification and resolution" },
    { name: "Diagnostics", icon: "🩺", description: "System analysis and troubleshooting" },
    { name: "SDLC", icon: "♻️", description: "Software development lifecycle management" },
  ]

  return (
    <div className="space-y-16">
      {/* Technical Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="space-y-6"
          >
            {/* Category Title */}
            <h3 className="text-xl font-bold text-center bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
              {category.title}
            </h3>

            {/* Skills in Column */}
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  className="group relative"
                >
                  <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/40 to-purple-800/10 border border-purple-500/30 rounded-lg p-3 flex items-center space-x-3 group-hover:border-purple-400/60 transition-all duration-300 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-105">
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-sm font-bold shadow-[0_0_10px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 flex-shrink-0">
                      <span className="text-white text-xs">{skill.icon}</span>
                    </div>

                    {/* Skill Name */}
                    <h4 className="text-sm font-semibold bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:to-fuchsia-100 transition-all duration-300 leading-tight">
                      {skill.name}
                    </h4>

                    {/* Floating glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-purple-900/90 backdrop-blur-md border border-purple-500/50 rounded-lg text-xs text-purple-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20">
                    {skill.description}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-purple-500/50" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl font-bold text-center bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent"
        >
          Soft Skills & Methodologies
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {softSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
              className="group relative"
            >
              <div className="backdrop-blur-md bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-500/20 rounded-lg p-4 text-center group-hover:border-purple-400/50 transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_16px_rgba(168,85,247,0.2)] group-hover:scale-105">
                {/* Icon */}
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-purple-500/80 to-fuchsia-500/80 flex items-center justify-center text-lg shadow-[0_0_8px_rgba(168,85,247,0.3)] group-hover:shadow-[0_0_12px_rgba(168,85,247,0.5)] transition-all duration-300">
                  <span className="text-white text-sm">{skill.icon}</span>
                </div>

                {/* Skill Name */}
                <h4 className="text-sm font-medium bg-gradient-to-r from-purple-200 to-fuchsia-200 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:to-fuchsia-100 transition-all duration-300 leading-tight">
                  {skill.name}
                </h4>

                {/* Floating glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/3 to-fuchsia-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-purple-900/90 backdrop-blur-md border border-purple-500/50 rounded-lg text-xs text-purple-100 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20">
                {skill.description}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-purple-500/50" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
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
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
