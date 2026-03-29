import { authProxy } from "@/lib/auth"
import db from "@/lib/db"
import AdminClient from "./AdminClient"

export default async function AdminPage() {
    await authProxy()   // جلوگیری از دسترسی غیرمجاز

    const [projects] = await db.query("SELECT * FROM projects ORDER BY created_at DESC")

    return <AdminClient initialProjects={projects} />
}
