"use client"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-client"
import { Navbar } from "@/components/navbar"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)

      if (authUser) {
        const { data, error } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_email", authUser.email)
          .order("created_at", { ascending: false })

        if (!error && data) {
          setBookings(data)
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [supabase])

  const handleCancelBooking = async (bookingId: string) => {
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", bookingId)

    if (!error) {
      setBookings(bookings.map((b) => (b.id === bookingId ? { ...b, status: "cancelled" } : b)))
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus === "All") return true
    return booking.status === selectedStatus.toLowerCase().replace(" ", "-")
  })

  const activeBookings = bookings.filter((b) =>
    ["pending-order", "pending-payment", "accepted"].includes(b.status),
  ).length
  const completedBookings = bookings.filter((b) => b.status === "completed").length
  const totalSpent = bookings.reduce((sum, b) => sum + (b.total_price || 0), 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Empty className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 min-h-[60vh]">
            <EmptyHeader>
              <EmptyTitle className="text-2xl md:text-3xl">My Bookings</EmptyTitle>
              <EmptyDescription className="text-base md:text-lg mt-4">
                Login or make an account to book some cool cars and flex the book history on socials
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button onClick={() => router.push("/login")} className="w-full md:w-auto px-8 py-3 text-lg">
                Login or Sign Up
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-8">View and manage your luxury car reservations</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-primary/10 rounded-xl p-6">
            <div className="text-sm text-muted-foreground">Active Bookings</div>
            <div className="text-3xl font-bold text-primary">{activeBookings}</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-6">
            <div className="text-sm text-muted-foreground">Completed</div>
            <div className="text-3xl font-bold text-primary">{completedBookings}</div>
          </div>
          <div className="bg-primary/10 rounded-xl p-6">
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="text-3xl font-bold text-primary">Rp {totalSpent.toLocaleString("id-ID")}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Pending-Order", "Pending-Payment", "Accepted", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "border border-primary text-primary hover:bg-primary/10"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-2xl p-6 border border-border"
              style={{
                backgroundColor:
                  booking.status === "pending-order"
                    ? "#FEF3C7"
                    : booking.status === "pending-payment"
                      ? "#CFFAFE"
                      : booking.status === "accepted"
                        ? "#D1FAE5"
                        : booking.status === "completed"
                          ? "#F3F4F6"
                          : "#F3F4F6",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-muted rounded-lg w-20 h-20 flex items-center justify-center font-semibold">
                  {booking.car_name?.split(" ")[0]}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{booking.car_name}</h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/50">
                    {booking.status?.replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Check In</div>
                  <div className="font-semibold">
                    {new Date(booking.check_in).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Check Out</div>
                  <div className="font-semibold">
                    {new Date(booking.check_out).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Duration</div>
                  <div className="font-semibold">{booking.duration_days} Days</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Price per Day</div>
                  <div className="font-semibold">Rp {booking.price_per_day?.toLocaleString("id-ID")}</div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mb-4">
                <div className="font-bold text-lg">Total Price: Rp {booking.total_price?.toLocaleString("id-ID")}</div>
              </div>

              {booking.status === "pending-order" && (
                <Button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Cancel Booking
                </Button>
              )}
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  )
}
