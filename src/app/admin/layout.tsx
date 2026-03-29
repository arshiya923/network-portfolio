import { authProxy } from "@/lib/auth"

export default function AdminLayout({
children
}:{children:React.ReactNode}){

authProxy()

return children

}
