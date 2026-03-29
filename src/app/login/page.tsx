"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage(){

const router = useRouter()

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")

const handleLogin = async (e:any)=>{

e.preventDefault()

setError("")

try{

const res = await fetch("/api/login",{

method:"POST",

credentials:"include",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
username,
password
})

})

if(res.ok){

router.push("/admin")

}else{

const data = await res.json()
setError(data.message || "Login failed")

}

}catch(err){

setError("Server error")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-black text-white">

<form
onSubmit={handleLogin}
className="bg-zinc-900 p-8 rounded-xl w-[350px] space-y-4 border border-zinc-800"
>

<h1 className="text-2xl font-bold text-center">

Admin Login

</h1>

<input
type="text"
placeholder="Username"
className="w-full p-3 rounded bg-zinc-800"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full p-3 rounded bg-zinc-800"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

{error && (
<p className="text-red-400 text-sm">
{error}
</p>
)}

<button
className="w-full bg-green-500 text-black py-3 rounded font-bold"
>

Login

</button>

</form>

</div>

)

}
