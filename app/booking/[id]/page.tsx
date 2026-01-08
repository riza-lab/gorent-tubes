"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { createClient } from "@/lib/supabase-client"

interface Car {
  id: number
  brand: string
  model: string
  type: string
  year: number
  seats: number
  gear: string
  color: string
  price: string
  description: string
  image: string
}

interface FormData {
  startDate: string
  endDate: string
}

const cars: Car[] = [
  {
    id: 1,
    brand: "Audi",
    model: "A6",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 4.200.000/hari",
    description: "Sophisticated luxury sedan with advanced technology and superior comfort",
    image: "./images_for_v0/audi_a6.jfif",
  },
  {
    id: 2,
    brand: "Audi",
    model: "Q7",
    type: "SUV",
    year: 2025,
    seats: 7,
    gear: "Automatic",
    color: "Silver",
    price: "Rp 4.800.000/hari",
    description: "Premium SUV with spacious interior and powerful performance",
    image: "./images_for_v0/audi_q7.jfif",
  },
  {
    id: 3,
    brand: "Audi",
    model: "R8",
    type: "Sports Car",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Red",
    price: "Rp 6.750.000/hari",
    description: "High-performance sports car with stunning design and thrilling acceleration",
    image: "./images_for_v0/audi_r8.jpg",
  },
  {
    id: 4,
    brand: "Audi",
    model: "A5",
    type: "Coupe",
    year: 2025,
    seats: 4,
    gear: "Automatic",
    color: "Gray",
    price: "Rp 4.500.000/hari",
    description: "Stylish coupe combining elegance with dynamic driving experience",
    image: "./images_for_v0/audi_a5.jfif",
  },
  {
    id: 5,
    brand: "BMW",
    model: "330i",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 3.750.000/hari",
    description: "Ultimate driving machine with perfect balance of luxury and performance",
    image: "./images_for_v0/bmw_330i.jfif",
  },
  {
    id: 6,
    brand: "BMW",
    model: "X5",
    type: "SUV",
    year: 2024,
    seats: 7,
    gear: "Automatic",
    color: "White",
    price: "Rp 5.250.000/hari",
    description: "Luxury performance SUV with commanding presence and exceptional comfort",
    image: "./images_for_v0/bmw_x5.jfif",
  },
  {
    id: 7,
    brand: "BMW",
    model: "M440i",
    type: "Coupe",
    year: 2025,
    seats: 4,
    gear: "Automatic",
    color: "Blue",
    price: "Rp 4.800.000/hari",
    description: "Performance coupe with M Sport power and precision handling",
    image: "./images_for_v0/bmw_m440i.jfif",
  },
  {
    id: 8,
    brand: "BMW",
    model: "i7",
    type: "Luxury Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "White",
    price: "Rp 5.400.000/hari",
    description: "Revolutionary electric luxury sedan with premium comfort and technology",
    image: "./images_for_v0/bmw_i7.jfif",
  },
  {
    id: 9,
    brand: "Mercedes-Benz",
    model: "C-Class",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Silver",
    price: "Rp 4.200.000/hari",
    description: "Executive luxury sedan with cutting-edge technology and performance",
    image: "./images_for_v0/mercedes_c_class.jfif",
  },
  {
    id: 10,
    brand: "Mercedes-Benz",
    model: "S-Class",
    type: "Luxury Sedan",
    year: 2024,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 7.500.000/hari",
    description: "Ultimate luxury sedan with innovative features and supreme comfort",
    image: "./images_for_v0/mercedes_s_class.jfif",
  },
  {
    id: 11,
    brand: "Mercedes-Benz",
    model: "GLE",
    type: "SUV",
    year: 2025,
    seats: 7,
    gear: "Automatic",
    color: "Gray",
    price: "Rp 6.000.000/hari",
    description: "Premium luxury SUV with powerful engine and spacious interior",
    image: "./images_for_v0/mercedes_gle.jfif",
  },
  {
    id: 12,
    brand: "Mercedes-Benz",
    model: "AMG G63",
    type: "SUV",
    year: 2024,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 7.800.000/hari",
    description: "Iconic performance SUV with legendary engine and rugged luxury",
    image: "./images_for_v0/mercedes_amg_g63.jfif",
  },
  {
    id: 13,
    brand: "Tesla",
    model: "Model 3",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 3.000.000/hari",
    description: "Electric sedan with impressive range and advanced autopilot features",
    image: "./images_for_v0/tesla_model_3.jfif",
  },
  {
    id: 14,
    brand: "Tesla",
    model: "Model S",
    type: "Luxury Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Silver",
    price: "Rp 4.500.000/hari",
    description: "Premium electric sedan with exceptional range and performance",
    image: "./images_for_v0/tesla_model_s.jfif",
  },
  {
    id: 15,
    brand: "Tesla",
    model: "Model X",
    type: "SUV",
    year: 2025,
    seats: 7,
    gear: "Automatic",
    color: "White",
    price: "Rp 5.400.000/hari",
    description: "Electric SUV with signature falcon-wing doors and superb performance",
    image: "./images_for_v0/tesla_model_x.jfif",
  },
  {
    id: 16,
    brand: "Tesla",
    model: "Model Y",
    type: "SUV",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Red",
    price: "Rp 3.750.000/hari",
    description: "Compact electric SUV with versatility and advanced technology",
    image: "./images_for_v0/tesla_model_y.jfif",
  },
  {
    id: 17,
    brand: "Porsche",
    model: "911",
    type: "Sports Car",
    year: 2024,
    seats: 4,
    gear: "Automatic",
    color: "Yellow",
    price: "Rp 6.300.000/hari",
    description: "Legendary sports car with iconic design and thrilling performance",
    image: "./images_for_v0/porsche_911.jfif",
  },
  {
    id: 18,
    brand: "Porsche",
    model: "Cayenne",
    type: "SUV",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 5.700.000/hari",
    description: "Performance SUV combining Porsche dynamics with luxury comfort",
    image: "./images_for_v0/porsche_cayenne.jfif",
  },
  {
    id: 19,
    brand: "Lamborghini",
    model: "Huracan",
    type: "Supercar",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Orange",
    price: "Rp 9.000.000/hari",
    description: "Mid-engine supercar with explosive performance and Italian design",
    image: "./images_for_v0/lamborghini_huracan.jfif",
  },
  {
    id: 20,
    brand: "Ferrari",
    model: "F8 Tributo",
    type: "Supercar",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Red",
    price: "Rp 9.600.000/hari",
    description: "Twin-turbo supercar with iconic Ferrari heritage and thrilling power",
    image: "./images_for_v0/ferrari_f8_tributo.jfif",
  },
  {
    id: 21,
    brand: "Rolls-Royce",
    model: "Phantom",
    type: "Luxury Sedan",
    year: 2024,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "Rp 12.000.000/hari",
    description: "Ultra-luxury bespoke sedan representing ultimate automotive refinement",
    image: "./images_for_v0/rolls_royce_phantom.jfif",
  },
  {
    id: 22,
    brand: "Bentley",
    model: "Continental GT",
    type: "Grand Tourer",
    year: 2025,
    seats: 4,
    gear: "Automatic",
    color: "Silver",
    price: "Rp 7.200.000/hari",
    description: "Ultra-luxurious grand tourer with handcrafted interior and power",
    image: "./images_for_v0/bentley_continental_gt.jfif",
  },
]

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const supabase = createClient()

  const [car, setCar] = useState<Car | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [pricePerDay, setPricePerDay] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user?.email) {
        setUserEmail(data.user.email)
      }
    }
    getUser()
  }, [supabase.auth])

  useEffect(() => {
    if (id) {
      const foundCar = cars.find((c) => c.id === Number.parseInt(id as string))
      setCar(foundCar || null)
      if (foundCar) {
        const priceString = foundCar.price.replace(/[^\d]/g, "")
        setPricePerDay(Number.parseInt(priceString) || 0)
      }
    }
  }, [id])

  useEffect(() => {
    if (startDate && endDate && pricePerDay) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setTotalPrice(pricePerDay * diffDays)
    }
  }, [startDate, endDate, pricePerDay])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userEmail) {
      alert("Please log in to book a car")
      return
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates")
      return
    }

    setLoading(true)

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    try {
      const { data, error } = await supabase.from("bookings").insert([
        {
          user_email: userEmail,
          car_id: car?.id,
          car_name: `${car?.brand} ${car?.model}`,
          car_price: car?.price,
          price_per_day: pricePerDay,
          check_in: startDate,
          check_out: endDate,
          duration_days: diffDays,
          total_price: totalPrice,
          status: "pending-order",
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error("[v0] Booking error:", error)
        alert("Error creating booking. Please try again.")
        setLoading(false)
        return
      }

      alert(`Booking confirmed! Confirmation email will be sent to ${userEmail}`)
      setLoading(false)
      router.push("/bookings")
    } catch (err) {
      console.error("[v0] Booking error:", err)
      alert("Error creating booking. Please try again.")
      setLoading(false)
    }
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Car not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/browse" className="text-primary hover:underline mb-6 inline-block">
          {"< Back To Cars"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-muted h-96 rounded-2xl flex items-center justify-center border border-primary overflow-hidden">
              <img
                src={car.image || "/placeholder.svg"}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                }}
              />
            </div>
          </div>

          <div className="border border-primary rounded-2xl p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Book This Car</h2>

            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-primary font-semibold mb-3">Price Per Day</label>
                <div className="bg-primary/10 border border-primary rounded-lg p-3">
                  <span className="text-lg font-bold text-primary">{car.price}</span>
                </div>
              </div>

              <div>
                <label className="block text-primary font-semibold mb-3">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-3">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border-primary"
                  required
                />
              </div>

              {totalPrice > 0 && (
                <div>
                  <label className="block text-primary font-semibold mb-3">Total Price</label>
                  <div className="bg-primary/20 border border-primary rounded-lg p-3">
                    <span className="text-lg font-bold text-primary">Rp {totalPrice.toLocaleString("id-ID")}</span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.ceil(
                        Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-12 font-semibold disabled:opacity-50"
                disabled={loading || !userEmail}
              >
                {loading ? "Booking..." : "Book Now"}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border border-primary rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6">{`${car.brand} ${car.model}`}</h3>
          <p className="text-muted-foreground mb-6">{car.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Year", value: car.year },
              { label: "Seats", value: car.seats },
              { label: "Transmission", value: car.gear },
              { label: "Color", value: car.color },
            ].map((spec, i) => (
              <div key={i} className="bg-primary/20 rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">{spec.label}</div>
                <div className="font-bold text-lg">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
