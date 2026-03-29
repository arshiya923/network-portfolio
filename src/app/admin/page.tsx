import { authProxy } from "@/lib/auth"
import db from "@/lib/db"
import AdminClient from "./AdminClient"

export default async function AdminPage() {
    authProxy()   // جلوگیری از دسترسی غیرمجاز

    const [projects] = await db.query("SELECT * FROM projects")

    return <AdminClient initialProjects={projects} />
}
