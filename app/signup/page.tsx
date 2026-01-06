// ... existing imports ...
"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-client"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (data) {
        router.push("/login")
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
          <h2 className="text-3xl font-semibold text-primary mb-8">Create Account</h2>

          {error && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-6 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                name="fullName"
                placeholder="Fullname"
                value={formData.fullName}
                onChange={handleChange}
                className="border-primary focus:border-primary"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="border-primary focus:border-primary"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border-primary focus:border-primary"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Repeat Password</label>
              <Input
                type="password"
                name="repeatPassword"
                placeholder="RepeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="border-primary focus:border-primary"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
