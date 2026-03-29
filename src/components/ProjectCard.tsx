"use client"

import { motion } from "framer-motion"

export default function ProjectCard({ title, description }: any) {

  return (
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 border border-green-400/20 rounded-xl p-6"
      >
        <h3 className="text-green-400 text-xl mb-3">
          {title}
        </h3>

        <p className="text-gray-400">
          {description}
        </p>

      </motion.div>
  )
}
