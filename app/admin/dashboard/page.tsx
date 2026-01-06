"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const mockOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    car: "BMW 3 Series",
    checkIn: "Dec 1, 2025",
    checkOut: "Dec 5, 2025",
    status: "Pending",
    total: "$1250.00",
    days: 5,
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    car: "Mercedes C-Class",
    checkIn: "Dec 2, 2025",
    checkOut: "Dec 7, 2025",
    status: "Pending",
    total: "$1500.00",
    days: 5,
  },
  {
    id: "ORD-003",
    customerName: "Robert Johnson",
    customerEmail: "robert@example.com",
    car: "Audi A6",
    checkIn: "Nov 28, 2025",
    checkOut: "Dec 2, 2025",
    status: "Accepted",
    total: "$1120.00",
    days: 4,
  },
]

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedStatus, setSelectedStatus] = useState("All")
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

  const handleAccept = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "Accepted" } : order)))
    // Send confirmation email to user
    console.log("[v0] Sending confirmation email to:", orders.find((o) => o.id === orderId)?.customerEmail)
  }

  const handleDecline = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "Declined" } : order)))
    console.log("[v0] Sending decline notification to:", orders.find((o) => o.id === orderId)?.customerEmail)
  }

  const filteredOrders = selectedStatus === "All" ? orders : orders.filter((order) => order.status === selectedStatus)

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-admin-blue text-admin-blue-foreground">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">GO-RENT Admin</h1>
          <Button
            onClick={handleLogout}
            className="border-admin-blue-foreground text-admin-blue-foreground hover:bg-admin-blue-foreground/10 bg-transparent"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-2">Order Management</h2>
        <p className="text-muted-foreground mb-8">Review and manage car rental bookings</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, color: "bg-blue-100" },
            { label: "Pending", value: orders.filter((o) => o.status === "Pending").length, color: "bg-yellow-100" },
            { label: "Accepted", value: orders.filter((o) => o.status === "Accepted").length, color: "bg-green-100" },
            { label: "Declined", value: orders.filter((o) => o.status === "Declined").length, color: "bg-red-100" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-xl p-6`}>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              <div className="text-3xl font-bold text-foreground mt-2">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Pending", "Accepted", "Declined"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedStatus === status
                  ? "bg-admin-blue text-admin-blue-foreground"
                  : "border border-border hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className={`rounded-xl border-2 p-6 transition ${
                order.status === "Pending"
                  ? "border-yellow-300 bg-yellow-50"
                  : order.status === "Accepted"
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Order Details */}
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground">{order.id}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{order.car}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Customer</div>
                      <div className="font-semibold">{order.customerName}</div>
                      <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Check-in</div>
                      <div className="font-semibold">{order.checkIn}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Check-out</div>
                      <div className="font-semibold">{order.checkOut}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total</div>
                      <div className="font-bold text-lg">{order.total}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 justify-center">
                  <div className="text-sm">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-200 text-yellow-900"
                          : order.status === "Accepted"
                            ? "bg-green-200 text-green-900"
                            : "bg-red-200 text-red-900"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {order.status === "Pending" && (
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleAccept(order.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        Accept Order
                      </Button>
                      <Button
                        onClick={() => handleDecline(order.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold"
                      >
                        Decline Order
                      </Button>
                    </div>
                  )}

                  {order.status === "Accepted" && (
                    <div className="text-sm bg-green-100 text-green-900 p-3 rounded-lg text-center font-semibold">
                      ✓ Confirmation sent to customer
                    </div>
                  )}

                  {order.status === "Declined" && (
                    <div className="text-sm bg-red-100 text-red-900 p-3 rounded-lg text-center font-semibold">
                      ✗ Decline notification sent
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
