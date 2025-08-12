import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import WorkExperienceCard from "@/components/work-experience-card"
import ProjectCard from "@/components/project-card"
import Logo from "@/components/logo"
import HolographicBackground from "@/components/holographic-background"
import CursorEffect from "@/components/cursor-effect"
import SkillsSection from "@/components/skills-section"
import ProfilePicture from "@/components/profile-picture"
import DarkVeil from "@/components/dark-veil"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0118] text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <DarkVeil />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0118]/50 to-[#0A0118] pointer-events-none"></div>
      </div>

      <HolographicBackground />
      <CursorEffect />

      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 relative z-10">
        <nav className="flex justify-between items-center backdrop-blur-md bg-purple-900/10 rounded-full px-6 py-3 border border-purple-500/20">
          <Logo />
          <div className="hidden md:flex space-x-6">
            <Link href="#home" className="text-sm hover:text-purple-300 transition-colors">
              Home
            </Link>
            <Link href="#projects" className="text-sm hover:text-purple-300 transition-colors">
              Projects
            </Link>
            <Link href="#skills" className="text-sm hover:text-purple-300 transition-colors">
              Skills
            </Link>
            <Link href="#work" className="text-sm hover:text-purple-300 transition-colors">
              Work
            </Link>
            <Link href="#contact" className="text-sm hover:text-purple-300 transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-6 relative">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-600/30 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-fuchsia-600/30 rounded-full blur-[100px]"></div>

            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <ProfilePicture />
            </div>

            <div className="space-y-2 relative">
              <p className="text-purple-300">Judges a book by</p>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                The Cover
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mt-12 text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              I&apos;m a Software Engineer
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              I am based in a beautiful location. Embracing the future with code and creativity, I specialize in
              building elegant solutions that combine form and function. My mission is to create software that makes a
              difference and achieves business goals.
            </p>

            <div className="pt-8">
              <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                Get in touch
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Project */}
        <section id="projects" className="container mx-auto px-4 py-20 relative">
          <div className="absolute inset-0 flex justify-center items-center -z-10">
            <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-purple-700/30 to-fuchsia-700/30 blur-[120px]"></div>
          </div>

          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            Featured Project
          </h2>

          <ProjectCard
            title="AI-Powered Analytics Dashboard"
            description="A comprehensive analytics platform that leverages machine learning to provide actionable insights from complex data sets. Built with React, Node.js, and TensorFlow.js, this project demonstrates my ability to create intuitive interfaces for complex data visualization."
            isReversed={false}
          />

          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Example Project
            </h2>
            <ProjectCard
              title="E-commerce Platform Redesign"
              description="Complete overhaul of an e-commerce platform serving over 50,000 monthly users. Implemented modern UI/UX principles, optimized for mobile, and integrated with multiple payment gateways. The redesign resulted in a 25% increase in conversion rates and improved customer satisfaction scores."
              isReversed={true}
            />
          </div>
        </section>

        {/* Skills Experience Section */}
        <section id="skills" className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] -z-10"></div>

          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            Technical Experience
          </h2>

          <SkillsSection />
        </section>

        {/* Work Experience */}
        <section id="work" className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            Work Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WorkExperienceCard
              title="CTO at Acme Corp"
              period="2020 - Present"
              description="Led the technical strategy and development of cloud-native applications, resulting in 40% improved performance and scalability."
            />
            <WorkExperienceCard
              title="Lead Developer at TechStart"
              period="2018 - 2020"
              description="Managed a team of 8 developers building a SaaS platform that acquired over 10,000 users in its first year."
            />
            <WorkExperienceCard
              title="Senior Engineer at DevCo"
              period="2016 - 2018"
              description="Architected and implemented microservices infrastructure that reduced deployment time by 60%."
            />
            <WorkExperienceCard
              title="Software Developer at CodeLabs"
              period="2014 - 2016"
              description="Developed front-end components and contributed to core libraries used across multiple product lines."
            />
          </div>
        </section>

        {/* Social Links */}
        <section className="container mx-auto px-4 py-12 text-center relative">
          <div className="backdrop-blur-lg bg-purple-900/10 rounded-xl p-8 border border-purple-500/20">
            <p className="text-purple-200 mb-6">I&apos;m currently looking for new opportunities</p>
            <div className="flex justify-center space-x-4">
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-purple-900/20 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-purple-900/20 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-purple-900/20 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-20 text-center relative">
          <div className="backdrop-blur-lg bg-purple-900/10 rounded-xl p-12 border border-purple-500/20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Get In Touch
            </h2>
            <p className="text-purple-100 max-w-xl mx-auto mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
              vision.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Contact Me
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-purple-800/50 mt-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo />
          <p className="text-purple-300/70 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
