"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from "lucide-react"
import WorkExperienceCard from "@/components/work-experience-card"
import ProjectCard from "@/components/project-card"
import Logo from "@/components/logo"
import HolographicBackground from "@/components/holographic-background"
import CursorEffect from "@/components/cursor-effect"
import SkillsSection from "@/components/skills-section"
import DarkVeil from "@/components/dark-veil"
import dynamic from "next/dynamic"
import Reveal from "@/components/reveal"
import ContactModal from "@/components/contact-modal"

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false })


export default function Home() {
  const [contactOpen, setContactOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#0A0118] text-white relative overflow-visible">
      <div className="fixed inset-0 z-0">
        <DarkVeil />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0118]/50 to-[#0A0118] pointer-events-none"></div>
      </div>

      <HolographicBackground />
      <CursorEffect />


      {/* Navigation */}
      <header className="container mx-auto py-6 px-4 relative z-10">
        <nav className="flex justify-between items-center backdrop-blur-md bg-purple-900/10 rounded-full px-6 py-3 border border-purple-500/20 pointer-events-none z-0">
          <div className="relative z-40 pointer-events-auto flex items-center space-x-6">
            <Logo />
            <div className="hidden md:flex space-x-6 pointer-events-auto">
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
              <button
                onClick={() => setContactOpen(true)}
                className="text-sm hover:text-purple-300 transition-colors"
                aria-label="Open contact modal"
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            <div className="fixed top-2 right-2 w-1/2 h-[600px] z-30 overflow-visible pointer-events-auto">
              <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
            </div>

            <div className="h-[200px] mb-8"></div>

            <div className="space-y-2 relative">
              <h1 className="text-4xl md:text-5xl font-bold leading-[1.3] md:leading-[1.25] py-1 relative overflow-visible bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] pointer-events-none z-0">
                Learning fast, shipping faster
              </h1>
            </div>
 
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto pointer-events-none z-0">
              I'm a software engineer based in California. Embracing the future with code and creativity, I specialize in
              building elegant solutions that combine form and function. My mission is to create software that makes a
              difference.
            </p>

            <div className="pt-8">
              <div id="get-in-touch-glow-target" className="relative inline-block z-50">
                <div className="flex items-center justify-center">
                    <Button onClick={() => setContactOpen(true)} className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      Get in touch
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      <div className="relative z-50">
        {/* Featured Project */}
        <section id="projects" className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-0 left-0 right-0 flex justify-center items-start -z-20 pointer-events-none">
            <div className="w-[600px] h-[600px] mt-6 rounded-full bg-gradient-to-br from-purple-700/30 to-fuchsia-700/30 blur-[120px]"></div>
          </div>

          <Reveal>
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Featured Projects
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <ProjectCard
              title="Animal Rescue Dashboard - JavaScript Web App"
              description="(HTML, CSS, JavaScript, Chart.js) Interactive dashboard visualizing rescue dog statistics by breed, age, and shelter status. Implemented dynamic Chart.js visualizations, mobile‑responsive UI, accessibility considerations, and UX tailored for shelter staff to interpret intake trends quickly."
              isReversed={false}
              repoUrl="https://github.com/Frisbiz/Rescue-Dogs-Finder-Dashboard"
            />
          </Reveal>

          <div className="mt-20">
            <Reveal variant="fade-up" delay={200}>
              <ProjectCard
                title="Travlr Getaways - Full Stack Travel App"
                description="(MEAN Stack - MongoDB, Express.js, Angular, Node.js, JWT) Full‑stack travel booking platform with dynamic trip listings, user registration, and reservations. Built RESTful APIs for destination filtering and booking workflows, implemented secure JWT authentication, and a responsive Angular admin panel styled with Tailwind CSS."
                isReversed={true}
                repoUrl="https://github.com/Frisbiz/Travlr"
              />
            </Reveal>
          </div>
        </section>

        {/* Skills Experience Section */}
        <section id="skills" className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] -z-10"></div>

          <Reveal>
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Technical Experience
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <SkillsSection />
          </Reveal>
        </section>

        {/* Work Experience */}
        <section id="work" className="container mx-auto px-4 py-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>

          <Reveal>
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Work Experience
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal variant="fade-up" delay={0}>
              <WorkExperienceCard
                title="Software Development Intern, Cita Marketplace"
                period="Sept 2024 – Dec 2024"
                description="Provided hands-on application support for the online reservation platform; diagnosed and resolved 37 critical UI issues driving a 16% reduction in user complaints; contributed to QA of booking flows, user accounts, and platform reliability; assisted with end‑user training, technical documentation, and performance reporting."
              />
            </Reveal>
            <Reveal variant="fade-up" delay={100}>
              <WorkExperienceCard
                title="Technical Mentor, NASA L’Space Academy (NPWEE)"
                period="May 2024 – Jul 2024"
                description="Mentored 40+ CS students, providing technical guidance and ensuring smooth virtual event operations; supported participants with resources and troubleshooting to foster a collaborative environment."
              />
            </Reveal>
            <Reveal variant="fade-up" delay={200}>
              <WorkExperienceCard
                title="Technical Writing Intern, NASA L’Space Academy (NPWEE)"
                period="Aug 2023 – Dec 2023"
                description="Collaborated on a comprehensive NASA technology proposal; delivered progress presentations and technical communications; managed timelines and deliverables; supported team IT needs including network access and workstation setup."
              />
            </Reveal>
            <Reveal variant="fade-up" delay={300}>
              <WorkExperienceCard
                title="President, Computer Science Club - Southern New Hampshire University"
                period="Sept 2024 – May 2025"
                description="Led officers to run bi‑weekly meetings, technical workshops, guest talks, and student-led hackathons; organized coding challenges and inclusive programming that grew membership by 40%."
              />
            </Reveal>
          </div>
        </section>

        {/* Social Links */}
        <section className="container mx-auto px-4 py-12 text-center relative">
          <div className="backdrop-blur-lg bg-purple-900/10 rounded-xl p-8 border border-purple-500/20">
            <p className="text-purple-200 mb-6">I&apos;m currently looking for new opportunities</p>
            <div className="flex justify-center space-x-4">
              <Link href="https://github.com/Frisbiz" target="_blank" aria-label="GitHub">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-purple-900/20 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/faris-m/" target="_blank" aria-label="LinkedIn">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-500/50 text-purple-300 hover:bg-purple-500/20 bg-purple-900/20 backdrop-blur-sm shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-20 text-center relative">
          <div className="backdrop-blur-lg bg-purple-900/10 rounded-xl p-12 border border-purple-500/20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Get In Touch
            </h2>
            <p className="text-purple-100 max-w-xl mx-auto mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
              vision.
            </p>
              <div className="flex items-center justify-center">
                <Button onClick={() => setContactOpen(true)} className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 border border-purple-400/20 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  Contact Me
                </Button>
              </div>
          </div>
        </section>
      </div>
      </main>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} email="fariswy@gmail.com" />

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
