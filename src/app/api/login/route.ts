import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const ADMIN_USER = "admin"
const ADMIN_PASS = "123456"

export async function POST(req:Request){

const {username,password} = await req.json()

if(
username !== ADMIN_USER ||
password !== ADMIN_PASS
){

return NextResponse.json(
{message:"Invalid credentials"},
{status:401}
)

}

const token = jwt.sign(

{username},

"MY_SECRET_KEY",

{expiresIn:"1d"}

)

const response = NextResponse.json(
{message:"Login successful"}
)

response.cookies.set("token",token,{

httpOnly:true,
secure:false,
path:"/",
maxAge:60*60*24

})

return response

}
