"use client"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase-client"
import { Navbar } from "@/components/navbar"

const mockCars = [
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
    shortDescription: "Luxury business sedan with premium features",
    description:
      "Audi's flagship business sedan features a sleek aluminum chassis, cutting-edge LED matrix headlights, and a luxurious interior with premium leather seats. The 2.0L turbocharged engine delivers 261 hp, with available adaptive air suspension for a smooth ride. Equipped with Audi Virtual Cockpit and MMI infotainment, plus advanced driver assistance systems.",
    image: "/images/cars/audi_a6.png",
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
    shortDescription: "Premium 7-seater luxury SUV",
    description:
      "Audi's three-row luxury SUV combines German engineering with spacious versatility. Features a 3.0L supercharged engine with 333 hp, sophisticated quattro all-wheel drive, and accommodates up to 7 passengers. Premium materials, panoramic sunroof, Bang & Olufsen sound system, and optional adaptive air suspension ensure comfort on any journey.",
    image: "/images/cars/audi_q7.png",
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
    shortDescription: "Mid-engine supercar with 631 hp V10",
    description:
      "Audi's mid-engine supercar delivers racing performance with 631 hp from its 5.2L V10 engine. 0-60 mph in just 3.2 seconds with a top speed of 205 mph. Features carbon-ceramic brakes, four-wheel drive, and a stunning mid-mounted engine that powers an exhilarating driving experience. Hand-assembled for precision.",
    image: "/images/cars/audi_r8.png",
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
    shortDescription: "Premium two-door coupe with sports handling",
    description:
      "A premium two-door coupe with distinctive sharp lines and dynamic handling. The 2.0L turbocharged engine produces 248 hp with available all-wheel drive. Features include a power convertible top option, leather-appointed interior, and sports suspension for engaging performance with luxury comfort.",
    image: "/images/cars/audi_a5.png",
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
    shortDescription: "Ultimate driving machine sedan",
    description:
      "BMW 330i combines dynamic performance with luxury. Features a turbocharged 2.0L engine with 255 hp, responsive handling, and premium interior. Includes BMW iDrive infotainment system, advanced driver assistance, and ConnectedDrive features.",
    image: "/images/cars/bmw_330i.png",
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
    shortDescription: "Luxury performance SUV with 7 seats",
    description:
      "BMW X5 offers commanding presence and exceptional comfort. Powered by a turbocharged engine, available xDrive all-wheel drive, and BMW ConnectedDrive. Spacious interior with premium materials, panoramic roof, and advanced safety features.",
    image: "/images/cars/bmw_x5.png",
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
    shortDescription: "Performance coupe with M Sport power",
    description:
      "BMW M440i xDrive combines luxury with exhilarating performance. Powered by a turbocharged 3.0L engine with 382 hp and xDrive intelligent all-wheel drive. Features adaptive M suspension, M sport brakes, and premium interior with performance credentials.",
    image: "/images/cars/bmw_m440i.png",
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
    shortDescription: "All-electric luxury sedan with 300+ mile range",
    description:
      "BMW i7 reimagines luxury with all-electric performance. Features up to 320 miles of range, ultra-fast charging, and a serene, premium interior with innovative technology. Advanced driver assistance, panoramic roof, and premium sound system deliver the ultimate luxury experience.",
    image: "/images/cars/bmw_i7.png",
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
    shortDescription: "Executive luxury sedan with cutting-edge technology",
    description:
      "Mercedes-Benz C-Class sets the standard for compact executive sedans. Features MBUX infotainment, turbocharged engine, advanced driver assistance systems, and luxurious interior with premium materials. Combines elegance with performance.",
    image: "/images/cars/mercedes_c_class.png",
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
    shortDescription: "Crown jewel of Mercedes luxury sedans",
    description:
      "Mercedes-Benz S-Class represents the pinnacle of automotive luxury. Features advanced MBUX system, quad-zone climate control, premium sound system, and technological innovations. Provides an ultra-smooth ride with cutting-edge safety features.",
    image: "/images/cars/mercedes_s_class.png",
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
    shortDescription: "Premium mid-size luxury SUV with powerful performance",
    description:
      "Mercedes-Benz GLE combines luxury SUV capability with powerful performance. Features a turbocharged engine, optional all-wheel drive, spacious interior for 7 passengers, and premium amenities including panoramic roof.",
    image: "/images/cars/mercedes_gle.png",
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
    shortDescription: "Iconic SUV with extreme performance",
    description:
      "Mercedes-AMG G63 is an iconic luxury SUV with legendary performance. Features a 4.0L twin-turbo engine with 585 hp, advanced all-wheel drive, and commanding presence. Premium interior with performance-focused engineering.",
    image: "/images/cars/mercedes_amg_g63.png",
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
    shortDescription: "All-electric sedan with up to 358 miles range",
    description:
      "Tesla Model 3 combines performance with zero-emission driving. Features up to 358 miles of range, Supercharger network access, and innovative autopilot capabilities. Minimal maintenance with impressive acceleration and responsive handling.",
    image: "/images/cars/tesla_model_3.png",
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
    shortDescription: "Premium electric sedan with 405 miles range",
    description:
      "Tesla Model S is the flagship electric sedan offering up to 405 miles of range. Features tri-motor performance, innovative interior with 17-inch display, and advanced autopilot technology.",
    image: "/images/cars/tesla_model_s.png",
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
    shortDescription: "Electric SUV with signature falcon-wing doors",
    description:
      "Tesla Model X combines SUV practicality with stunning falcon-wing doors. Seats up to 7 passengers, offers up to 371 miles of range, and features advanced autopilot with impressive acceleration.",
    image: "/images/cars/tesla_model_x.png",
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
    shortDescription: "Compact electric SUV with up to 330 miles range",
    description:
      "Tesla Model Y is the best-selling electric SUV offering versatility and performance. With up to 330 miles of range, quick acceleration, and advanced technology, it redefines the compact SUV segment.",
    image: "/images/cars/tesla_model_y.png",
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
    shortDescription: "Iconic sports car with 450+ hp performance",
    description:
      "Porsche 911 is an icon of automotive engineering. Features a turbocharged 3.0L engine with over 450 hp, precise handling, and timeless design. Combines daily usability with thrilling performance.",
    image: "/images/cars/porsche_911.png",
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
    shortDescription: "Performance SUV with sporty engineering",
    description:
      "Porsche Cayenne brings sports car dynamics to an SUV package. Features turbocharged engine options, air suspension, and premium interior. Offers thrilling performance with practical SUV versatility.",
    image: "/images/cars/porsche_cayenne.png",
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
    shortDescription: "Mid-engine supercar with 610 hp V10",
    description:
      "Lamborghini Huracán combines cutting-edge technology with raw supercar performance. Features a 5.2L V10 engine with 610 hp, distinctive Italian design, and advanced all-wheel drive. Pure adrenaline-inducing driving experience.",
    image: "/images/cars/lamborghini_huracan.png",
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
    shortDescription: "Twin-turbo V8 supercar with 710 hp",
    description:
      "Ferrari F8 Tributo honors the legendary Ferrari V8 engine. Features a 3.9L twin-turbo V8 with 710 hp, stunning Pininfarina design, and advanced aerodynamics. Exceptional performance and handling.",
    image: "/images/cars/ferrari_f8_tributo.png",
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
    shortDescription: "Ultra-luxury bespoke sedan with ultimate comfort",
    description:
      "Rolls-Royce Phantom represents the absolute pinnacle of luxury. Features a silent cabin, whisper-soft ride, bespoke interior, and the iconic Spirit of Ecstasy. Customizable to individual preferences.",
    image: "/images/cars/rolls_royce_phantom.png",
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
    shortDescription: "Ultra-luxurious grand tourer with 12-cylinder power",
    description:
      "Bentley Continental GT combines British luxury with continental touring comfort. Features a 6.0L turbocharged W12 engine, handcrafted interior with premium materials, and advanced technology.",
    image: "/images/cars/bentley_continental_gt.png",
  },
]

export default function BrowseCarsPage() {
  const [selectedBrand, setSelectedBrand] = useState("All Brands")
  const [selectedType, setSelectedType] = useState("All Type")
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    setIsClient(true)
    const checkAuth = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)
    }
    checkAuth()
  }, [supabase])

  const handleBookClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      setShowLoginDialog(true)
    }
  }

  const filteredCars = mockCars.filter((car) => {
    const brandMatch = selectedBrand === "All Brands" || car.brand === selectedBrand
    const typeMatch = selectedType === "All Type" || car.type === selectedType
    return brandMatch && typeMatch
  })

  const uniqueBrands = Array.from(new Set(mockCars.map((car) => car.brand)))
  const uniqueTypes = Array.from(new Set(mockCars.map((car) => car.type)))

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2">Browse Our Fleet</h1>
          <p className="text-primary-foreground/90">Choose from our premium collection of luxury vehicles</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Brand Filter */}
          <div>
            <h3 className="font-bold text-lg mb-3">Brands</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBrand("All Brands")}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedBrand === "All Brands"
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
              >
                All Brands
              </button>
              {uniqueBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedBrand === brand
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <h3 className="font-bold text-lg mb-3">Car Type</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType("All Type")}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedType === "All Type"
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
              >
                All Type
              </button>
              {uniqueTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground"
                      : "border border-primary text-primary hover:bg-primary/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="border border-primary rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-muted h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{car.type}</p>
                  <p className="text-muted-foreground text-sm mb-4">{car.shortDescription}</p>

                  <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                    <div className="flex gap-2 items-center">
                      <span className="text-lg">📅</span>
                      <span>{car.year}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-lg">👥</span>
                      <span>{car.seats} seats</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Price per day</div>
                      <div className="text-2xl font-bold text-primary">{car.price}</div>
                    </div>
                    {user ? (
                      <Link href={`/booking/${car.id}`}>
                        <Button className="bg-primary hover:bg-primary/90">Book Now</Button>
                      </Link>
                    ) : (
                      <Button onClick={handleBookClick} className="bg-primary hover:bg-primary/90">
                        Book Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No cars match your filters.</p>
          </div>
        )}
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            <p className="text-muted-foreground">
              You haven't logged in yet. Do it to book some cool cars! If you haven't then make an account.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90">Login or Sign Up</Button>
              </Link>
              <Button variant="outline" onClick={() => setShowLoginDialog(false)} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
