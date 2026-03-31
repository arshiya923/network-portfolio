import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import LatestProjects from "@/components/LatestProjects";
import Skills, { defaultSkills, type SkillCard } from "@/components/Skills";
import db from "@/lib/db";

export const dynamic = "force-dynamic"

type SkillRow = {
  id?: number
  name?: string | null
  icon?: string | null
  accent?: string | null
  sort_order?: number | null
  is_active?: number | null
}

export default async function Home() {
  let skills: SkillCard[] = defaultSkills
  let showSkillSkeleton = false

  try {
    const [rows] = await db.query(
      "SELECT name, icon, accent FROM skills WHERE is_active = 1 ORDER BY sort_order ASC, id ASC"
    )
    const parsedRows = rows as SkillRow[]

    if (parsedRows.length > 0) {
      skills = parsedRows
        .filter((row) => Boolean(row.name))
        .map((row) => ({
          name: row.name ?? "",
          icon: row.icon ?? null,
          accent: row.accent ?? null,
        }))
    }
  } catch {
    skills = []
    showSkillSkeleton = true
  }

  return (
    <main className="bg-[#0A0F13de] min-h-screen">
        <Navbar />
        <Hero />
        <Skills initialSkills={skills} showSkeleton={showSkillSkeleton} />
        <LatestProjects />
    </main>
  )
}
