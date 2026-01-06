"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

export default function AdminPage() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/admin/login")
        return
      }

      // Redirect to admin main page
      router.push("/admin/main")
    }

    checkAdmin()
  }, [router, supabase])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Loading...</p>
    </div>
  )
}
