"use client"

import { useState } from "react"

type Project = {
  id: number
  title: string
  description: string
  github: string
  technologies: string
  icon: string
  image: string
}

export default function AdminClient({ initialProjects }: { initialProjects: Project[] }) {

  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isEditing, setIsEditing] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)

  const [form, setForm] = useState({
    id: null as number | null,
    title: "",
    description: "",
    github: "",
    technologies: "",
    icon: "",
    image: ""
  })

  const handleChange = (e: any) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // ===========================
  // IMAGE UPLOAD
  // ===========================
  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoadingImage(true)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()

    setForm(prev => ({ ...prev, image: data.url }))
    setLoadingImage(false)
  }

  // ===========================
  // CREATE / UPDATE
  // ===========================
  const handleSave = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      github: form.github,
      technologies: form.technologies,
      icon: form.icon,
      image: form.image
    }

    // CREATE
    if (!isEditing) {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const created = await res.json()
      setProjects(prev => [created, ...prev])
      resetForm()
      return
    }

    // UPDATE
    if (isEditing && form.id) {

      console.log(JSON.stringify(payload))
      const res = await fetch(`/api/projects/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const response = await res.json()

      // API returns: { message: "", updated: {...} }
      const updated = {
        ...response,
        id: form.id,
        image: response.image || form.image
      };

      setProjects(prev =>
          prev.map(p => (p.id === form.id ? updated : p))
      )

      resetForm()
    }
  }

  // ===========================
  // DELETE
  // ===========================
  const handleDelete = async (id: number) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  // ===========================
  // START EDIT
  // ===========================
  const startEdit = (p: Project) => {

    setForm({
      id: p.id,
      title: p.title,
      description: p.description,
      github: p.github,
      technologies: p.technologies,
      icon: p.icon,
      image: p.image
    })

    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ===========================
  // RESET FORM
  // ===========================
  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      github: "",
      technologies: "",
      icon: "",
      image: ""
    })
    setIsEditing(false)
  }

  // ===========================
  // RENDER
  // ===========================
  return (
      <div className="min-h-screen bg-black text-white p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-green-400">Admin Panel</h1>

          <button
              onClick={async () => {
                await fetch("/api/logout", { method: "POST" })
                window.location.href = "/login"
              }}
              className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* FORM */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl mb-12">

          <h2 className="text-xl font-semibold mb-6 text-green-400">
            {isEditing ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input name="title" placeholder="Title" className="p-3 bg-zinc-800 rounded-lg" value={form.title} onChange={handleChange} />

            <input name="github" placeholder="GitHub URL" className="p-3 bg-zinc-800 rounded-lg" value={form.github} onChange={handleChange} />

            <input name="technologies" placeholder="Technologies" className="p-3 bg-zinc-800 rounded-lg" value={form.technologies} onChange={handleChange} />

            <input name="icon" placeholder="Icon" className="p-3 bg-zinc-800 rounded-lg" value={form.icon} onChange={handleChange} />

            <textarea name="description" placeholder="Description" className="p-3 bg-zinc-800 rounded-lg col-span-2 h-28" value={form.description} onChange={handleChange} />

            {/* IMAGE UPLOAD */}
            <div className="col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">Project Image</label>

              <input type="file" onChange={handleImageUpload} />

              {loadingImage && <p className="text-yellow-400 text-sm mt-2">Uploading...</p>}

              {form.image && (
                  <img src={form.image} className="w-40 mt-3 rounded-lg border border-zinc-700" />
              )}
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-6 flex gap-4">

            <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold"
            >
              {isEditing ? "Update" : "Add Project"}
            </button>

            {isEditing && (
                <button onClick={resetForm} className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg">
                  Cancel
                </button>
            )}

          </div>

        </div>

        {/* PROJECT LIST */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map(p => (
              <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

                {p.image && (
                    <img src={p.image} className="w-full h-44 object-cover" />
                )}

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{p.description}</p>

                  <div className="flex gap-3">
                    <button onClick={() => startEdit(p)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                      Edit
                    </button>

                    <button onClick={() => handleDelete(p.id)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                      Delete
                    </button>
                  </div>
                </div>

              </div>
          ))}
        </div>

      </div>
  )
}
