import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const [rows]: any = await db.query(
            "SELECT id, title, description FROM projects ORDER BY id DESC LIMIT 3"
        )

        return NextResponse.json(rows)

    } catch (error) {

        console.error("Database error:", error)

        return NextResponse.json([], { status: 500 })
    }
}
