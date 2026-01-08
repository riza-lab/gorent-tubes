"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Check, X, LogOut } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase-client"

const statusConfig = {
  "pending-order": { label: "Pending Order", color: "bg-blue-100 text-blue-900", icon: "⏳" },
  "pending-payment": { label: "Pending Payment", color: "bg-yellow-100 text-yellow-900", icon: "💳" },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-900", icon: "✓" },
  declined: { label: "Declined", color: "bg-red-100 text-red-900", icon: "✕" },
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)
    const adminUser = localStorage.getItem("adminUser")
    if (!adminUser) {
      router.push("/admin/login")
      return
    }

    const fetchBookings = async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

      if (!error && data) {
        setOrders(data)
      }
      setLoading(false)
    }

    fetchBookings()
  }, [router, supabase])

  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  const handleAcceptOrder = async (orderId: string) => {
    const { error } = await supabase.from("bookings").update({ status: "pending-payment" }).eq("id", orderId)

    if (!error) {
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "pending-payment" } : order)))
    }
  }

  const handleDeclineOrder = async (orderId: string) => {
    const { error } = await supabase.from("bookings").update({ status: "declined" }).eq("id", orderId)

    if (!error) {
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "declined" } : order)))
    }
  }

  const handleSendPaymentEmail = async (orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    console.log(`[v0] Sending payment email to ${order?.user_email}`)

    const { error } = await supabase.from("bookings").update({ email_sent: true }).eq("id", orderId)

    if (!error) {
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, email_sent: true } : o)))
    }
  }

  const handleProcessOrder = async (orderId: string) => {
    const { error } = await supabase.from("bookings").update({ status: "accepted" }).eq("id", orderId)

    if (!error) {
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "accepted" } : order)))
    }
  }

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus.toLowerCase().replace(" ", "-"))

  if (!isClient || loading) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/main" className="flex items-center gap-3 hover:opacity-80 transition">
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
            const config = statusConfig[order.status as keyof typeof statusConfig] || statusConfig["pending-order"]
            return (
              <Card key={order.id} className={`rounded-xl border-2 p-6 transition ${config.color}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Details */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{order.car_name}</h3>
                      <p className="text-sm mt-1 font-semibold">ID: {order.id?.slice(0, 8)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground text-xs">Customer</div>
                        <div className="font-semibold">{order.user_email}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Check-in</div>
                        <div className="font-semibold">
                          {new Date(order.check_in).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Check-out</div>
                        <div className="font-semibold">
                          {new Date(order.check_out).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs">Total</div>
                        <div className="font-bold text-lg">Rp {order.total_price?.toLocaleString("id-ID")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Based on Status */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm`}>
                        {config.icon} {config.label}
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
                          disabled={order.email_sent}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <Mail className="w-4 h-4" />
                          {order.email_sent ? "Email Sent" : "Send Email for Payment"}
                        </Button>
                        <Button
                          onClick={() => handleProcessOrder(order.id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Accept Order
                        </Button>
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
            <p className="text-muted-foreground text-lg">No {selectedStatus.toLowerCase()} bookings found.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
