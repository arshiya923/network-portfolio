"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  FaNetworkWired,
  FaChartLine,
  FaShieldAlt,
  FaSearch,
  FaServer,
  FaKey
} from "react-icons/fa"

type Project = {
  id: number
  title: string
  description: string
  github: string
  technologies: string
  icon: string
}

const icons: Record<string, any> = {
  FaNetworkWired,
  FaChartLine,
  FaShieldAlt,
  FaSearch,
  FaServer,
  FaKey
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading projects...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-12 text-center">
          My Projects
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {

            const Icon = icons[project.icon] || FaServer
            const techs = JSON.parse(project.technologies)

            return (
              <motion.div
                key={project.id}

                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}

                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(34,197,94,0.4)"
                }}

                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 transition"
              >

                <h2 className="text-xl font-semibold mb-3 flex items-center gap-3">
                  <Icon className="text-green-400 text-lg" />
                  {project.title}
                </h2>

                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {techs.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="text-sm bg-green-500/10 text-green-400 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.github}
                  target="_blank"
                  className="text-green-400 hover:text-green-300"
                >
                  View on GitHub →
                </a>

              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
