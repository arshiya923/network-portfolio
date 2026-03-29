"use client"

import { useEffect, useState } from "react"
import ProjectCard from "./ProjectCard"
import ProjectSkeleton from "./ProjectSkeleton"

export default function LatestProjects() {

    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        fetch("/api/projects/latest")
            .then(res => res.json())
            .then(data => {
                setProjects(data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })

    }, [])

    return (
        <section className="py-24 px-6 max-w-6xl mx-auto">

            <h2 className="text-3xl font-bold text-green-400 mb-12">
                Latest Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

                {loading && (
                    <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                    </>
                )}

                {!loading && projects.map((p: any) => (
                    <ProjectCard
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        description={p.description}
                    />
                ))}

                {!loading && projects.length === 0 && (
                    <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                    </>
                )}

            </div>

        </section>
    )
}
