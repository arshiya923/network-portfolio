"use client"

import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Masonry from "react-masonry-css"
import ProjectsLoader from "@/components/ProjectsLoader"


import {
  FaNetworkWired,
  FaChartLine,
  FaShieldAlt,
  FaSearch,
  FaServer,
  FaKey
} from "react-icons/fa"
import Image from "next/image";

type Project = {
  id: number
  title: string
  description: string
  github: string
  technologies: string
  icon: string
  image: string
}

const icons: Record<string, any> = {
  FaNetworkWired,
  FaChartLine,
  FaShieldAlt,
  FaSearch,
  FaServer,
  FaKey
}

const breakpointColumnsObj = {
  default: 4,
  1024: 2,
  640: 1
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

  if (loading) return <ProjectsLoader loading={loading} />


  const projectBaseDelayTime = 0.15

  return (
      <main className="bg-[#0A0F13de] min-h-screen">
        <Navbar />

        <div className="bg-blend-hue text-white px-6 py-16">
          <div className="max-w-7xl mx-auto">

            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold mb-12 text-center"
            >
              My Projects
            </motion.h1>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-8"
                columnClassName="flex flex-col gap-8"
            >

              {projects.map((project, index) => {

                const Icon = icons[project.icon] || FaServer
                const techs = JSON.parse(project.technologies)

                return (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: projectBaseDelayTime * index
                        }}
                        whileHover={{ scale: 1.03 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-green-500 transition"
                    >
                      {
                        project.image ? <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-900/30 border border-green-500/10 mb-5">
                          <Image
                              src={project.image ? project.image : "/fallback-project.png"}
                              alt={project.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover"
                              priority={false}
                          />
                        </div> : ""
                      }

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

            </Masonry>

          </div>
        </div>
      </main>
  )
}
