"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Check, X, LogOut } from "lucide-react"
import Link from "next/link"

const mockOrders = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    car: "BMW 330i",
    checkIn: "Dec 1, 2025",
    checkOut: "Dec 5, 2025",
    status: "pending-order",
    total: "$1250.00",
    days: 5,
    emailSent: false,
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    car: "Mercedes C-Class",
    checkIn: "Dec 2, 2025",
    checkOut: "Dec 7, 2025",
    status: "pending-payment",
    total: "$1500.00",
    days: 5,
    emailSent: true,
  },
  {
    id: "ORD-003",
    customerName: "Robert Johnson",
    customerEmail: "robert@example.com",
    car: "Audi A6",
    checkIn: "Nov 28, 2025",
    checkOut: "Dec 2, 2025",
    status: "accepted",
    total: "$1120.00",
    days: 4,
    emailSent: true,
  },
  {
    id: "ORD-004",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    car: "Porsche 911 GTS",
    checkIn: "Dec 10, 2025",
    checkOut: "Dec 12, 2025",
    status: "declined",
    total: "$960.00",
    days: 2,
    emailSent: false,
  },
]

const statusConfig = {
  "pending-order": { label: "Pending Order", color: "bg-blue-100 text-blue-900", icon: "⏳" },
  "pending-payment": { label: "Pending Payment", color: "bg-yellow-100 text-yellow-900", icon: "💳" },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-900", icon: "✓" },
  declined: { label: "Declined", color: "bg-red-100 text-red-900", icon: "✕" },
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    const adminUser = localStorage.getItem("adminUser")
    if (!adminUser) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "pending-payment" } : order)))
    console.log("[v0] Order accepted, moved to pending payment:", orderId)
  }

  const handleDeclineOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "declined" } : order)))
    console.log("[v0] Order declined:", orderId)
  }

  const handleSendPaymentEmail = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, emailSent: true } : order)))
    const order = orders.find((o) => o.id === orderId)
    console.log("[v0] Payment email sent to:", order?.customerEmail)
  }

  const handleProcessOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "accepted" } : order)))
    console.log("[v0] Order processed and accepted:", orderId)
  }

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus.toLowerCase().replace(" ", "-"))

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary">GO</span>
              </div>
              <h1 className="text-2xl font-bold">Admin GO-RENT</h1>
            </Link>
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Manage Bookings</h2>
          <p className="text-muted-foreground mt-2">Handle orders, payments, and customer bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length, color: "bg-blue-100" },
            {
              label: "Pending Order",
              value: orders.filter((o) => o.status === "pending-order").length,
              color: "bg-blue-100",
            },
            {
              label: "Pending Payment",
              value: orders.filter((o) => o.status === "pending-payment").length,
              color: "bg-yellow-100",
            },
            { label: "Accepted", value: orders.filter((o) => o.status === "accepted").length, color: "bg-green-100" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-xl p-4 md:p-6`}>
              <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mt-2">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Pending Order", "Pending Payment", "Accepted", "Declined"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedStatus === status ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusConfig_info = statusConfig[order.status as keyof typeof statusConfig]
            return (
              <Card key={order.id} className={`rounded-xl border-2 p-6 transition ${statusConfig_info.color}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Details */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{order.id}</h3>
                      <p className="text-sm mt-1 font-semibold">{order.car}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Customer</div>
                        <div className="font-semibold">{order.customerName}</div>
                        <div className="text-xs">{order.customerEmail}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Check-in</div>
                        <div className="font-semibold">{order.checkIn}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Check-out</div>
                        <div className="font-semibold">{order.checkOut}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Total</div>
                        <div className="font-bold text-lg">{order.total}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Based on Status */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm`}>
                        {statusConfig_info.icon} {statusConfig_info.label}
                      </span>
                    </div>

                    {order.status === "pending-order" && (
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Accept Order
                        </Button>
                        <Button
                          onClick={() => handleDeclineOrder(order.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Decline Order
                        </Button>
                      </div>
                    )}

                    {order.status === "pending-payment" && (
                      <div className="flex flex-col gap-3">
                        <Button
                          onClick={() => handleSendPaymentEmail(order.id)}
                          disabled={order.emailSent}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Mail className="w-4 h-4" />
                          {order.emailSent ? "Email Sent" : "Send Email for Payment"}
                        </Button>
                        {order.emailSent && (
                          <Button
                            onClick={() => handleProcessOrder(order.id)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Process Order
                          </Button>
                        )}
                      </div>
                    )}

                    {order.status === "accepted" && (
                      <div className="text-sm bg-green-200 p-3 rounded-lg text-center font-semibold">
                        Order Confirmed
                      </div>
                    )}

                    {order.status === "declined" && (
                      <div className="text-sm bg-red-200 p-3 rounded-lg text-center font-semibold">Order Declined</div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-lg">No {selectedStatus.toLowerCase()} orders found.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
