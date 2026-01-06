"use client"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase-client"
import { Navbar } from "@/components/navbar"

const initialBookings = [
  {
    id: 1,
    carImage: "GO-RENT",
    status: "Pending",
    checkIn: "Nov 25, 2025",
    checkOut: "Nov 30, 2025",
    duration: "5 Days",
    price: "$250",
    total: "$1250.00",
    statusColor: "bg-status-pending",
  },
  {
    id: 2,
    carImage: "GO-RENT",
    status: "Confirmed",
    checkIn: "Nov 25, 2025",
    checkOut: "Nov 30, 2025",
    duration: "5 Days",
    price: "$250",
    total: "$1250.00",
    statusColor: "bg-status-confirmed",
  },
  {
    id: 3,
    carImage: "GO-RENT",
    status: "Completed",
    checkIn: "Nov 25, 2025",
    checkOut: "Nov 30, 2025",
    duration: "5 Days",
    price: "$250",
    total: "$1250.00",
    statusColor: "bg-status-completed",
  },
]

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings)
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
      setLoading(false)
    }
    checkAuth()
  }, [supabase])

  const handleCancelBooking = (id: number) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled", statusColor: "bg-status-cancelled" } : booking,
      ),
    )
  }

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus === "All") return true
    return booking.status === selectedStatus
  })

  const activeBookings = bookings.filter((b) => ["Pending", "Confirmed"].includes(b.status)).length
  const completedBookings = bookings.filter((b) => b.status === "Completed").length
  const totalSpent = bookings.length * 1250

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

      {/* Page Content */}
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
            <div className="text-sm text-muted-foreground">Total, Spent</div>
            <div className="text-3xl font-bold text-primary">${totalSpent}.00</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
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
              className={`rounded-2xl p-6 border border-border`}
              style={{
                backgroundColor:
                  booking.status === "Pending"
                    ? "#FEF3C7"
                    : booking.status === "Confirmed"
                      ? "#CFFAFE"
                      : booking.status === "Completed"
                        ? "#F3F4F6"
                        : booking.status === "Cancelled"
                          ? "#F3F4F6"
                          : "#FCE7F3",
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-muted rounded-lg w-20 h-20 flex items-center justify-center">
                  <span className="text-sm">Image</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{booking.carImage}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "Cancelled" ? "bg-white/50 text-red-600" : "bg-white/50"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Check In</div>
                  <div className="font-semibold">{booking.checkIn}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Check Out</div>
                  <div className="font-semibold">{booking.checkOut}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Duration</div>
                  <div className="font-semibold">{booking.duration}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Price per Day</div>
                  <div className="font-semibold">{booking.price}</div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mb-4">
                <div className="text-sm text-muted-foreground mb-2">Currently in progress - Return by 11/30/2025</div>
                <div className="font-bold text-lg">Total Price: {booking.total}</div>
              </div>

              {booking.status === "Pending" && (
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
      </div>
    </div>
  )
}
