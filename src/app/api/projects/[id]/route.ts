import { NextResponse } from "next/server"
import db from "@/lib/db"


export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    await db.query("DELETE FROM projects WHERE id = ?", [id])

    return Response.json({ success: true })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const Params = await  params;
        const id = Number(Params.id);

        const body = await req.json();

        let { title, description, github, technologies, icon, image } = body;

        // Normalize undefined values
        if (!title) title = "";
        if (!description) description = "";
        if (!github) github = "";
        if (!technologies) technologies = "";
        if (!icon) icon = "";

        // Load old image if empty
        if (!image || image === "") {
            const [rows]: any = await db.query("SELECT image FROM projects WHERE id=?", [id]);
            image = rows?.[0]?.image || "";
        }

        const result = await db.query(
            `
      UPDATE projects
      SET title=?, description=?, github=?, technologies=?, icon=?, image=?
      WHERE id=?
      `,
            [title, description, github, technologies, icon, image, id]
        );

        return NextResponse.json({
            id,
            title,
            description,
            github,
            technologies,
            icon,
            image
        });

    } catch (error: any) {
        console.log("UPDATE ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}