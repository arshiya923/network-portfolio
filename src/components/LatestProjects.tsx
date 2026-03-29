"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
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
        <section className="py-10 px-6 max-w-6xl mx-auto">

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
                    <ProjectCard key={p.id} project={p} />
                ))}

                {!loading && projects.length === 0 && (
                    <>
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                        <ProjectSkeleton />
                    </>
                )}

            </div>

            {/* View All Projects Button */}
            <div className="flex justify-center mt-12">

                <Link
                    href="/projects"
                    className="px-6 py-3 rounded-lg border border-green-500 text-green-400 hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                >
                    View All Projects →
                </Link>

            </div>

        </section>
    )
}
