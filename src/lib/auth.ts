import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt from "jsonwebtoken"

// کلید JWT — بهتره در ENV ذخیره بشه
const SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY"

// این تابع باید فقط در SERVER COMPONENT ها یا SERVER ACTION ها اجرا شود
export async function authProxy() {
  // گرفتن کوکی‌ها — روش صحیح
  const cookieStore = await cookies()

  // گرفتن JWT
  const token = cookieStore.get("token")?.value

  // اگر تـوکـن موجود نباشد → هدایت به صفحه login
  if (!token) {
    redirect("/login")
  } 

  try {
    // اعتبارسنجی JWT
    const decoded = jwt.verify(token, SECRET)

    // اگر نیاز به اطلاعات یوزر باشد:
    return decoded

  } catch (err) {
    // اگر JWT خراب یا منقضی باشد
    redirect("/login")
  }
}
