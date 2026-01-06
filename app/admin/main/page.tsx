"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Car, LogOut } from "lucide-react"
import Link from "next/link"

export default function AdminMainPage() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check if admin is logged in
    const adminUser = localStorage.getItem("adminUser")
    if (!adminUser) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="font-bold text-primary">GO</span>
            </div>
            <h1 className="text-2xl font-bold">Admin GO-RENT</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage your car rental business efficiently</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manage Bookings Card */}
          <Link href="/admin/orders">
            <Card className="h-full hover:shadow-xl transition cursor-pointer border-2 border-primary/30 hover:border-primary/60">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Manage Bookings</CardTitle>
                    <CardDescription>Order management and payments</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Handle pending bookings, send payment requests, process orders, and track customer bookings with
                  multiple status management.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Manage Cars Card */}
          <Link href="/admin/cars">
            <Card className="h-full hover:shadow-xl transition cursor-pointer border-2 border-primary/30 hover:border-primary/60">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Car className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Manage Cars</CardTitle>
                    <CardDescription>Vehicles and inventory</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add car brands, manage vehicle listings, update specifications, pricing, and control visibility across
                  the platform.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Active Bookings</p>
                <p className="text-4xl font-bold text-primary">12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Total Cars</p>
                <p className="text-4xl font-bold text-primary">22</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Monthly Revenue</p>
                <p className="text-4xl font-bold text-primary">$48K</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
