import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import LatestProjects from "@/components/LatestProjects";

export default function Home() {
  return (
    <main className="bg-[#0A0F13de] min-h-screen">
        <Navbar />
        <Hero />
        <LatestProjects />
    </main>
  )
}

