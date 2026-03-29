type Props = {
  title: string
  description: string
  tech: string[]
  github: string
}

export default function ProjectCard({
  title,
  description,
  tech,
  github
}: Props) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 hover:border-green-400 transition">

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {tech.map((t, i) => (
          <span
            key={i}
            className="text-xs bg-gray-800 px-2 py-1 rounded"
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={github}
        className="text-green-400 mt-4 block"
      >
        View Code →
      </a>
    </div>
  )
}
