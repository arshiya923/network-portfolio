"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type Project = {
  id: number | string;
  title: string;
  description: string;
  image?: string | null;
  technologies?: string | string[] | null;
};

export default function ProjectCard({ project }: { project: Project }) {
  const { id, title, description, image, technologies } = project;

  let techList: string[] = [];
  try {
    techList =
        typeof technologies === "string"
            ? JSON.parse(technologies)
            : (technologies ?? []);
  } catch {
    techList = Array.isArray(technologies) ? technologies : [];
  }
  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.03, y: -6 }}
          className="
        relative
        p-6
        rounded-2xl
        bg-white/5
        backdrop-blur-md
        border border-green-500/20
        shadow-[0_0_20px_rgba(34,197,94,0.15)]
        hover:shadow-[0_0_35px_rgba(34,197,94,0.35)]
        transition
        overflow-hidden
      "
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 blur-3xl rounded-full" />

        {/* IMAGE */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-neutral-900/30 border border-green-500/10">
          <Image
              src={image ? image : "/fallback-project.png"}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
              priority={false}
          />
        </div>

        <h3 className="text-xl font-semibold text-green-400 mt-5 mb-2">
          {title}
        </h3>

        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* TECHNOLOGIES */}
        {techList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {techList.slice(0, 6).map((t, i) => (
                  <span
                      key={`${t}-${i}`}
                      className="
                text-xs
                px-2
                py-1
                rounded-md
                bg-green-500/10
                text-green-300
                border border-green-500/20
              "
                  >
              {t}
            </span>
              ))}
            </div>
        )}

        <Link
            href={`/projects/${id}`}
            className="
          inline-block
          px-4
          py-2
          text-sm
          rounded-lg
          border border-green-500/40
          text-green-400
          hover:bg-green-500/10
          transition
        "
        >
          View Project
        </Link>
      </motion.div>
  );
}
