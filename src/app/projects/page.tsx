import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/data/projects"

export default function Projects() {
  return (
    <div className="max-w-5xl mx-auto py-20">

      <h1 className="text-4xl font-bold text-white mb-10">
        Projects
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>

    </div>
  )
}

