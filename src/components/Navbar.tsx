import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center p-6 border-b border-gray-800">
      <h1 className="text-xl font-bold text-green-400">
        DevNet Portfolio
      </h1>

      <div className="flex gap-6 text-gray-300">
        <Link href="/">Home</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  )
}
