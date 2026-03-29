"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const lines = [
    "> Initializing System...",
    "> Connecting to Database...",
    "> Fetching Projects...",
    "> Parsing Data...",
    "> Rendering UI..."
]

export default function TerminalLoader({ loading }: { loading: boolean }) {

    const [displayed, setDisplayed] = useState<string[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        let index = 0

        const interval = setInterval(() => {
            setDisplayed(prev => [...prev, lines[index]])
            index++

            if (index === lines.length) {
                clearInterval(interval)

                // Wait 3s → show error if still loading
                setTimeout(() => {
                    if (loading) setError(true)
                }, 900)
            }

        }, 600)

        return () => clearInterval(interval)
    }, [loading])

    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="bg-black text-green-400 font-mono p-6 rounded-lg border border-green-500/20 w-[90%] max-w-xl">

                {/* Render lines */}
                {displayed.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-sm"
                    >
                        {line}
                    </motion.p>
                ))}

                {/* Loading indicator (with cursor) */}
                {!error && (
                    <div className="flex items-center gap-1 text-sm mt-2">
                        <span className="text-green-500">{" > Loading..."}</span>

                        {/* Blinking cursor */}
                        <motion.span
                            className="w-2 h-4 bg-green-400 inline-block"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-3 flex items-center gap-1"
                    >
                        <span>{"> ERROR: Cannot connect to database"}</span>

                        {/* Red blinking cursor */}
                        <motion.span
                            className="w-2 h-4 bg-red-400 inline-block"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                    </motion.div>
                )}

            </div>
        </div>
    )
}
