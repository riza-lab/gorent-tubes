"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase-client"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isAdminRoute = pathname?.startsWith("/admin")
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data } = await supabase.auth.getSession()
        if (data?.session?.user) {
          setUser(data.session.user)
        }
      } catch (err) {
        console.error("Error checking session:", err)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [pathname])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setShowDropdown(false)
      router.push("/login")
    } catch (err) {
      console.error("Error logging out:", err)
    }
  }

  return (
    <header className="border-b border-border sticky top-0 bg-background z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          GO-RENT
        </Link>

        {/* Navigation - Hidden on admin routes */}
        {!isAdminRoute && (
          <nav className="hidden md:flex gap-12 items-center">
            <Link
              href="/browse"
              className={`text-sm font-medium transition ${
                pathname === "/browse" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
              }`}
            >
              Browse Cars
            </Link>
            <Link
              href="/bookings"
              className={`text-sm font-medium transition ${
                pathname === "/bookings" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
              }`}
            >
              My Bookings
            </Link>
          </nav>
        )}

        {/* Right side buttons */}
        <div className="flex gap-2 items-center relative">
          {!isAdminRoute && (
            <>
              {!loading && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="px-4 py-2 rounded-full border border-primary text-sm font-medium text-foreground hover:bg-primary/10 transition flex items-center gap-2"
                  >
                    {user.email}
                    <span className={`transition ${showDropdown ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-background border border-primary rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-primary text-sm text-muted-foreground">{user.email}</div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-primary/10 transition text-foreground"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login / Sign in
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}
