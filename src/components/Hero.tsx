"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Particles from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useCallback } from "react"

export default function Hero() {

    const particlesInit = useCallback(async (engine: any) => {
        await loadSlim(engine)
    }, [])

    return (
        <section className="relative flex items-center justify-center overflow-hidden h-[420px]">

            {/* particles background */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                className="absolute inset-0"
                options={{
                    background: { color: "transparent" },

                    particles: {
                        number: { value: 70 },

                        color: { value: "#22c55e" },

                        links: {
                            enable: true,
                            color: "#22c55e",
                            distance: 150,
                            opacity: 0.25,
                            width: 1
                        },

                        move: {
                            enable: true,
                            speed: 1
                        },

                        opacity: { value: 0.35 },

                        size: { value: { min: 1, max: 3 } }
                    }
                }}
            />

            <div className="relative flex items-center gap-14 z-10">

                {/* Avatar */}
                <div className="relative flex items-center justify-center">

                    {/* ring 1 */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute w-44 h-44 border border-green-500 rounded-full"
                    />

                    {/* ring 2 */}
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute w-44 h-44 border border-emerald-400 rounded-full"
                    />

                    {/* avatar frame */}
                    <div className="p-[3px] rounded-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 shadow-[0_0_30px_rgba(34,197,94,0.6)]">

                        <div className="bg-black rounded-full p-1">

                            <Image
                                src="/avatar.jpg"
                                alt="avatar"
                                width={220}
                                height={220}
                                className="rounded-full p-1.5"
                                priority
                            />

                        </div>

                    </div>

                </div>

                {/* text */}
                <div className="max-w-xl">

                    <h1 className="text-5xl font-bold text-green-400 leading-tight drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]">
                        Full Stack &
                        <br />
                        Network Engineer
                    </h1>

                    {/* neon divider */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5 }}
                        className="h-[3px] mt-5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.8)]"
                    />

                </div>

            </div>

        </section>
    )
}
