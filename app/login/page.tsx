// ... existing imports ...
"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const supabase = createClient()

      // Check if this is the admin account (dummy account, no auth)
      if (email === "drunxxvn@gmail.com" && password === "pukig4r1T") {
        // Store admin session in localStorage
        localStorage.setItem("adminUser", JSON.stringify({ email, role: "admin" }))
        router.push("/admin")
        return
      }

      // For regular users, use Supabase auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (data) {
        router.push("/browse")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">GO-RENT</h1>
          <p className="text-muted-foreground">Luxury Car Rental Service</p>
        </div>

        <div className="border border-primary rounded-2xl p-8 bg-background">
          <h2 className="text-3xl font-semibold text-primary mb-8">Login</h2>

          {error && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-6 text-sm">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-primary focus:border-primary"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-primary focus:border-primary"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary hover:underline font-semibold">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
