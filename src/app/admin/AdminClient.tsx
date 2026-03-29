"use client"

import { QueryResult } from "mysql2"
import { useState } from "react"

export default function AdminClient({ initialProjects }: { initialProjects: QueryResult }) {

  const [projects, setProjects] = useState(initialProjects)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    github: "",
    technologies: "",
    icon: "",
    image: ""
  })

  // --------------------------
  //    HANDLE FORM CHANGE
  // --------------------------
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // --------------------------
  //       UPLOAD IMAGE
  // --------------------------
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    setForm({ ...form, image: data.url })
  }

  // --------------------------
  //       SAVE PROJECT
  // --------------------------
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

      const newProject = await res.json()
      setProjects([newProject, ...projects])
    }

    // EDIT
    if (isEditing && form.id) {
      const res = await fetch(`/api/projects/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const updated = await res.json()

      setProjects(projects.map(p => p.id === updated.id ? updated : p))
    }

    resetForm()
  }

  // --------------------------
  //       DELETE PROJECT
  // --------------------------
  const handleDelete = async (id: number) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    setProjects(projects.filter(p => p.id !== id))
  }

  // --------------------------
  //        EDIT PROJECT
  // --------------------------
  const startEdit = (p: any) => {
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
  }

  // --------------------------
  //        RESET FORM
  // --------------------------
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


  return (
    <div className="min-h-screen p-8 bg-black text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Admin Panel</h1>

        <button
          onClick={async () => {
            await fetch("/api/logout", { method: "POST" })
            window.location.href = "/login"
          }}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-zinc-900 p-6 rounded-xl mb-10">

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Project" : "Add New Project"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input name="title" placeholder="Title" className="p-3 bg-zinc-800 rounded"
            value={form.title} onChange={handleChange} />

          <input name="github" placeholder="GitHub URL" className="p-3 bg-zinc-800 rounded"
            value={form.github} onChange={handleChange} />

          <input name="technologies" placeholder="Technologies (comma)" className="p-3 bg-zinc-800 rounded"
            value={form.technologies} onChange={handleChange} />

          <input name="icon" placeholder="Icon name (e.g. FaReact)" className="p-3 bg-zinc-800 rounded"
            value={form.icon} onChange={handleChange} />

          <textarea name="description" placeholder="Description"
            className="p-3 bg-zinc-800 rounded col-span-2 h-28"
            value={form.description}
            onChange={handleChange}
          />

          {/* IMAGE UPLOAD */}
          <div className="col-span-2">
            <input type="file" onChange={handleImageUpload} />
            {form.image && (
              <img src={form.image} className="w-32 mt-3 rounded" />
            )}
          </div>

        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSave}
            className="bg-green-500 px-6 py-3 rounded font-bold text-black"
          >
            {isEditing ? "Update" : "Add Project"}
          </button>

          {isEditing && (
            <button
              onClick={resetForm}
              className="bg-gray-600 px-6 py-3 rounded"
            >
              Cancel
            </button>
          )}
        </div>

      </div>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {projects.map(p => (
          <div key={p.id} className="bg-zinc-900 p-6 rounded-xl">

            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{p.description}</p>

            {p.image && (
              <img src={p.image} className="rounded mb-4" />
            )}

            <div className="flex gap-3">

              <button
                onClick={() => startEdit(p)}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}
