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

  const { title, description, github, technologies } = body

  await db.query(
    "INSERT INTO projects (title, description, github, technologies) VALUES (?, ?, ?, ?)",
    [title, description, github, JSON.stringify(technologies)]
  )

  return NextResponse.json({
    message: "Project created"
  })
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  await db.query("DELETE FROM projects WHERE id = ?", [id])

  return Response.json({ success: true })
}

export async function PUT(req: Request) {
  const body = await req.json()

  const { id, title, description, github, technologies, icon, image } = body

  await db.query(
    `UPDATE projects 
     SET title=?, description=?, github=?, technologies=?, icon=?, image=? 
     WHERE id=?`,
    [title, description, github, technologies, icon, image, id]
  )

  return Response.json({ success: true })
}
