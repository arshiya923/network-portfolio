"use client"

import { motion } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-28">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold"
      >
        Network Automation Engineer
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mt-6 max-w-xl"
      >
        I build automation tools and software for modern network
        infrastructure using Python, Linux and DevOps technologies.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-6 mt-10"
      >
        <a
          href="https://github.com"
          className="flex items-center gap-2 bg-green-500 px-6 py-2 rounded-lg text-black"
        >
          <FaGithub size={18} />
          GitHub
        </a>

        <a
          href="https://linkedin.com"
          className="flex items-center gap-2 border border-gray-600 px-6 py-2 rounded-lg"
        >
          <FaLinkedin size={18} />
          LinkedIn
        </a>
      </motion.div>

    </section>
  )
}
