export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-24">
      <h1 className="text-5xl font-bold text-white">
        Network Automation Engineer
      </h1>

      <p className="text-gray-400 mt-6 max-w-xl">
        I build software and automation tools for modern
        network infrastructure using Python, Linux and DevOps tools.
      </p>

      <div className="flex gap-4 mt-8">
        <a
          href="https://github.com"
          className="bg-green-500 text-black px-6 py-2 rounded-lg"
        >
          GitHub
        </a>

        <a
          href="/projects"
          className="border border-gray-600 px-6 py-2 rounded-lg"
        >
          Projects
        </a>
      </div>
    </section>
  )
}
