"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useAnimationFrame, useMotionValue } from "framer-motion"
import type { IconType } from "react-icons"
import {
    SiCisco,
    SiDocker,
    SiGit,
    SiJavascript,
    SiLinux,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPython,
    SiReact,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si"

export type SkillCard = {
    name: string
    icon?: string | null
    accent?: string | null
}

export const defaultSkills: SkillCard[] = [
    {
        name: "React",
        icon: "react",
        accent: "text-cyan-400",
    },
    {
        name: "Next.js",
        icon: "nextjs",
        accent: "text-fuchsia-400",
    },
    {
        name: "Linux",
        icon: "linux",
        accent: "text-sky-400",
    },
    {
        name: "Cisco",
        icon: "cisco",
        accent: "text-violet-400",
    }
]

const iconMap: Record<string, IconType> = {
    react: SiReact,
    nextjs: SiNextdotjs,
    "next.js": SiNextdotjs,
    linux: SiLinux,
    cisco: SiCisco,
    typescript: SiTypescript,
    javascript: SiJavascript,
    tailwind: SiTailwindcss,
    "tailwind css": SiTailwindcss,
    nodejs: SiNodedotjs,
    "node.js": SiNodedotjs,
    mysql: SiMysql,
    git: SiGit,
    docker: SiDocker,
    python: SiPython,
}

const accentMap: Record<string, string> = {
    react: "text-cyan-400",
    nextjs: "text-fuchsia-400",
    "next.js": "text-fuchsia-400",
    linux: "text-sky-400",
    cisco: "text-violet-400",
    typescript: "text-blue-400",
    javascript: "text-yellow-300",
    tailwind: "text-cyan-300",
    "tailwind css": "text-cyan-300",
    nodejs: "text-green-400",
    "node.js": "text-green-400",
    mysql: "text-sky-400",
    git: "text-orange-400",
    docker: "text-blue-500",
    python: "text-yellow-400",
}

function SkillSkeletonCard({ index }: { index: number }) {
    return (
        <div
            className="relative flex min-w-[220px] shrink-0 select-none items-center gap-3 overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(8,20,14,0.96),rgba(10,35,22,0.86))] px-4 py-5 md:min-w-[245px]"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.08),transparent_38%)] opacity-80" />
            <div className="relative h-16 w-16 shrink-0 rounded-2xl border border-green-400/10 bg-white/6 animate-pulse" />
            <div className="relative min-w-0 flex-1">
                <div className="mb-2 h-2 w-20 rounded-full bg-white/8 animate-pulse" />
                <div className="h-5 w-24 rounded-full bg-white/10 animate-pulse" />
                <div className="mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <span className="sr-only">Loading skill {index + 1}</span>
        </div>
    )
}

export default function Skills({
    initialSkills,
    showSkeleton = false
}: {
    initialSkills: SkillCard[]
    showSkeleton?: boolean
}) {
    const viewportRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const autoScrollPausedRef = useRef(false)
    const dragStartOffsetRef = useRef(0)
    const offsetRef = useRef(0)
    const activeIndexRef = useRef(0)
    const x = useMotionValue(0)
    const direction = 1
    const [singleSetWidth, setSingleSetWidth] = useState(0)
    const [cardSpan, setCardSpan] = useState(0)
    const [shineTick, setShineTick] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)
    const skills = initialSkills.length > 0 ? initialSkills : defaultSkills
    const loopedSkills = useMemo(() => [...skills, ...skills, ...skills], [])
    const skeletonItems = useMemo(() => Array.from({ length: 4 }), [])

    useEffect(() => {
        const track = trackRef.current

        if (!track) {
            return
        }

        const updateWidth = () => {
            const children = Array.from(track.children).slice(0, skills.length) as HTMLDivElement[]
            const totalWidth = children.reduce((sum, child) => sum + child.offsetWidth, 0)
            const totalGap = Math.max(children.length - 1, 0) * 16
            setSingleSetWidth(totalWidth + totalGap)
            if (children[0]) {
                setCardSpan(children[0].offsetWidth + 16)
            }
        }

        updateWidth()

        const observer = new ResizeObserver(() => updateWidth())
        observer.observe(track)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!singleSetWidth) {
            return
        }

        offsetRef.current = singleSetWidth
        x.set(-singleSetWidth)
    }, [singleSetWidth, x])

    useEffect(() => {
        const interval = window.setInterval(() => {
            setShineTick((value) => value + 1)
        }, 1500)

        return () => window.clearInterval(interval)
    }, [])

    useAnimationFrame((_, delta) => {
        if (autoScrollPausedRef.current || !singleSetWidth) {
            return
        }

        const speed = 0.035
        offsetRef.current += delta * speed * direction

        if (offsetRef.current >= singleSetWidth * 2) {
            offsetRef.current -= singleSetWidth
        } else if (offsetRef.current < singleSetWidth) {
            offsetRef.current += singleSetWidth
        }

        x.set(-offsetRef.current)

        if (viewportRef.current && cardSpan) {
            const viewportCenter = viewportRef.current.offsetWidth / 2
            const centered = (offsetRef.current + viewportCenter - cardSpan / 2) / cardSpan
            const nearestIndex = Math.round(centered)
            const normalizedIndex = ((nearestIndex % skills.length) + skills.length) % skills.length

            if (activeIndexRef.current !== normalizedIndex) {
                activeIndexRef.current = normalizedIndex
                setActiveIndex(normalizedIndex)
            }
        }
    })

    return (
        <section className="px-6">
            <div className="max-w-6xl mx-auto px-6 md:px-10">
                {showSkeleton ? (
                    <div className="overflow-x-hidden overflow-y-visible px-2 pb-5 pt-4">
                        <div className="flex w-max gap-4">
                            {skeletonItems.map((_, index) => (
                                <SkillSkeletonCard key={index} index={index} />
                            ))}
                        </div>
                    </div>
                ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
                    className="relative"
                >
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#07110c] via-[#07110c]/80 to-transparent md:w-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#07110c] via-[#07110c]/80 to-transparent md:w-20" />

                    <div
                        ref={viewportRef}
                        className="overflow-x-hidden overflow-y-visible px-2 pb-5 pt-4 cursor-grab select-none active:cursor-grabbing touch-pan-y"
                    >
                        <motion.div
                            style={{ x }}
                            ref={trackRef}
                            className="flex w-max gap-4"
                            onPanStart={() => {
                                autoScrollPausedRef.current = true
                                dragStartOffsetRef.current = offsetRef.current
                            }}
                            onPan={(_, info) => {
                                if (!singleSetWidth) {
                                    return
                                }

                                let nextOffset = dragStartOffsetRef.current - info.offset.x

                                while (nextOffset >= singleSetWidth * 2) {
                                    nextOffset -= singleSetWidth
                                }

                                while (nextOffset < singleSetWidth) {
                                    nextOffset += singleSetWidth
                                }

                                offsetRef.current = nextOffset
                                x.set(-nextOffset)
                            }}
                            onPanEnd={() => {
                                if (!singleSetWidth) {
                                    autoScrollPausedRef.current = false
                                    return
                                }

                                let nextOffset = offsetRef.current

                                while (nextOffset >= singleSetWidth * 2) {
                                    nextOffset -= singleSetWidth
                                }

                                while (nextOffset < singleSetWidth) {
                                    nextOffset += singleSetWidth
                                }

                                offsetRef.current = nextOffset
                                x.set(-nextOffset)
                                autoScrollPausedRef.current = false
                            }}
                        >
                            {loopedSkills.map(({ name, icon, accent }, index) => {
                                const iconKey = (icon ?? name).toLowerCase()
                                const Icon = iconMap[iconKey] ?? SiReact
                                const accentClass = accent ?? accentMap[iconKey] ?? "text-green-400"

                                return (
                                <motion.div
                                    key={`${name}-${index}`}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{
                                        duration: 0.35,
                                        ease: "easeOut",
                                        delay: (index % skills.length) * 0.06,
                                    }}
                                    animate={{
                                        scale: index % skills.length === activeIndex ? 1.06 : 1,
                                        y: index % skills.length === activeIndex ? -4 : 0,
                                    }}
                                    className={`group relative flex min-w-[220px] shrink-0 select-none items-center gap-3 overflow-hidden rounded-[28px] border bg-[linear-gradient(135deg,rgba(8,20,14,0.96),rgba(10,35,22,0.86))] px-4 py-5 transition duration-300 hover:-translate-y-1 md:min-w-[245px] ${
                                        index % skills.length === activeIndex
                                            ? "border-green-300/50"
                                            : "border-white/10 hover:border-green-400/30"
                                    }`}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.14),transparent_38%)] opacity-80" />
                                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-green-400/20 bg-black/25 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                                        <motion.div
                                            key={`${index}-${shineTick}`}
                                            initial={{ x: "-140%", opacity: 0 }}
                                            animate={{ x: "140%", opacity: [0, 0.9, 0] }}
                                            transition={{ duration: 0.7, ease: "easeInOut" }}
                                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.28)_50%,transparent_80%)]"
                                        />
                                        <Icon className={`relative text-4xl ${accentClass}`} />
                                    </div>
                                    <div className="relative min-w-0 flex-1">
                                        <p className="mb-1 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-green-500/70">
                                            Core Skill
                                        </p>
                                        <h3 className="text-base font-semibold text-white md:text-lg">
                                            {name}
                                        </h3>
                                        <div className="mt-3 h-[2px] w-16 rounded-full bg-gradient-to-r from-green-400 via-emerald-300 to-transparent" />
                                    </div>
                                </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </motion.div>
                )}
            </div>
        </section>
    )
}
