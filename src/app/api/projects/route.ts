import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {

  const [rows] = await db.query(
    "SELECT * FROM projects ORDER BY created_at DESC"
  )

  return NextResponse.json(rows)
}


export async function POST(req: Request) {

  const body = await req.json()

  const { title, description, github, technologies, image } = body

  await db.query(
      "INSERT INTO projects (title, description, github, technologies, image) VALUES (?, ?, ?, ?, ?)",
      [
        title,
        description,
        github,
        JSON.stringify(technologies),
        image
      ]
  )

  return NextResponse.json({
    message: "Project created"
  })
}

