"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
FaServer,
FaLock,
FaDatabase,
FaNetworkWired
} from "react-icons/fa"

type Project = {
id:number
title:string
description:string
github:string
technologies:string
icon:string
image:string
}

const icons:any={
FaServer,
FaLock,
FaDatabase,
FaNetworkWired
}

export default function AdminPage(){

const router = useRouter()

const [projects,setProjects] = useState<Project[]>([])
const [editing,setEditing] = useState<Project|null>(null)

const [form,setForm] = useState({
title:"",
description:"",
github:"",
technologies:"",
icon:"FaServer",
image:""
})

const [page,setPage] = useState(1)

const perPage = 5

// fetch projects

const fetchProjects = async ()=>{

const res = await fetch("/api/projects")

const data = await res.json()

setProjects(data)

}

useEffect(()=>{

fetchProjects()

},[])

// logout

const logout = async ()=>{

await fetch("/api/logout",{
method:"POST"
})

router.push("/login")

}

// submit

const handleSubmit = async (e:any)=>{

e.preventDefault()

await fetch("/api/projects",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

...form,

technologies:JSON.stringify(
form.technologies.split(",")
)

})

})

resetForm()

fetchProjects()

}

// update

const updateProject = async (e:any)=>{

e.preventDefault()

await fetch("/api/projects",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id:editing?.id,

...form,

technologies:JSON.stringify(
form.technologies.split(",")
)

})

})

setEditing(null)

resetForm()

fetchProjects()

}

// delete

const deleteProject = async(id:number)=>{

await fetch(`/api/projects?id=${id}`,{

method:"DELETE"

})

fetchProjects()

}

// upload image

const uploadImage = async(file:File)=>{

const formData = new FormData()

formData.append("file",file)

const res = await fetch("/api/upload",{

method:"POST",

body:formData

})

const data = await res.json()

setForm({...form,image:data.path})

}

// reset form

const resetForm = ()=>{

setForm({

title:"",

description:"",

github:"",

technologies:"",

icon:"FaServer",

image:""

})

}

// edit

const openEdit = (p:Project)=>{

setEditing(p)

setForm({

title:p.title,

description:p.description,

github:p.github,

technologies:JSON.parse(p.technologies).join(","),

icon:p.icon,

image:p.image

})

}

// icon preview

const IconPreview = icons[form.icon]

// pagination

const paginated = projects.slice(

(page-1)*perPage,

page*perPage

)

return(

<div className="min-h-screen bg-black text-white p-10">

<div className="max-w-6xl mx-auto space-y-10">

{/* HEADER */}

<div className="flex justify-between items-center">

<h1 className="text-4xl font-bold">

Admin Dashboard

</h1>

<button
onClick={logout}
className="bg-red-500 px-4 py-2 rounded"
>

Logout

</button>

</div>

{/* FORM */}

<div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

<h2 className="text-xl mb-4">

{editing ? "Edit Project" : "Add Project"}

</h2>

<form
onSubmit={editing?updateProject:handleSubmit}
className="grid md:grid-cols-2 gap-4"
>

<input
placeholder="Title"
className="bg-zinc-800 p-3 rounded"
value={form.title}
onChange={(e)=>setForm({...form,title:e.target.value})}
/>

<input
placeholder="Github URL"
className="bg-zinc-800 p-3 rounded"
value={form.github}
onChange={(e)=>setForm({...form,github:e.target.value})}
/>

<input
placeholder="Technologies (react,node)"
className="bg-zinc-800 p-3 rounded"
value={form.technologies}
onChange={(e)=>setForm({...form,technologies:e.target.value})}
/>

<select
value={form.icon}
onChange={(e)=>setForm({...form,icon:e.target.value})}
className="bg-zinc-800 p-3 rounded"
>

<option value="FaServer">Server</option>
<option value="FaLock">Security</option>
<option value="FaDatabase">Database</option>
<option value="FaNetworkWired">Network</option>

</select>

<textarea
placeholder="Description"
className="bg-zinc-800 p-3 rounded md:col-span-2"
value={form.description}
onChange={(e)=>setForm({...form,description:e.target.value})}
/>

{/* IMAGE */}

<div className="md:col-span-2 flex items-center gap-4">

<input
type="file"
onChange={(e)=>{

const file = e.target.files?.[0]

if(file) uploadImage(file)

}}
/>

{form.image &&(

<img
src={form.image}
className="w-24 h-16 object-cover rounded"
/>

)}

</div>

{/* BUTTON */}

<div className="md:col-span-2 flex items-center gap-4">

{IconPreview && <IconPreview size={28}/>}

<button className="bg-green-500 text-black px-4 py-2 rounded">

{editing ? "Update Project" : "Add Project"}

</button>

</div>

</form>

</div>

{/* TABLE */}

<div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">

<h2 className="text-xl mb-4">

Projects

</h2>

<table className="w-full text-left">

<thead className="border-b border-zinc-700">

<tr>

<th className="p-2">Image</th>

<th className="p-2">Title</th>

<th className="p-2">Tech</th>

<th className="p-2">Actions</th>

</tr>

</thead>

<tbody>

{paginated.map((p)=>{

const Icon = icons[p.icon]

return(

<tr
key={p.id}
className="border-b border-zinc-800"
>

<td className="p-2">

{p.image &&(

<img
src={p.image}
className="w-16 h-10 object-cover rounded"
/>

)}

</td>

<td className="p-2 flex items-center gap-2">

{Icon && <Icon/>}

{p.title}

</td>

<td className="p-2 text-gray-400">

{JSON.parse(p.technologies).join(", ")}

</td>

<td className="p-2 space-x-2">

<button
onClick={()=>openEdit(p)}
className="bg-yellow-500 px-3 py-1 rounded"
>

Edit

</button>

<button
onClick={()=>deleteProject(p.id)}
className="bg-red-500 px-3 py-1 rounded"
>

Delete

</button>

</td>

</tr>

)

})}

</tbody>

</table>

{/* PAGINATION */}

<div className="flex gap-2 mt-6">

{Array.from({

length:Math.ceil(
projects.length/perPage
)

}).map((_,i)=>(

<button
key={i}
onClick={()=>setPage(i+1)}
className={`px-3 py-1 rounded ${
page===i+1
?"bg-green-500 text-black"
:"bg-zinc-700"
}`}
>

{i+1}

</button>

))}

</div>

</div>

</div>

</div>

)

}
