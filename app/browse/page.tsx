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
    price: "$280/day",
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
    price: "$320/day",
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
    price: "$450/day",
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
    price: "$300/day",
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
    price: "$250/day",
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
    price: "$350/day",
    shortDescription: "Luxury performance SUV with 7 seats",
    description:
      "BMW X5 offers commanding presence and exceptional comfort. Powered by a turbocharged engine, available xDrive all-wheel drive, and BMW ConnectedDrive. Spacious interior with premium materials, panoramic roof, and advanced safety features.",
    image: "/images/cars/bmw_x5.png",
  },
  {
    id: 7,
    brand: "BMW",
    model: "M8",
    type: "Coupe",
    year: 2025,
    seats: 4,
    gear: "Automatic",
    color: "Blue",
    price: "$380/day",
    shortDescription: "High-performance luxury coupe",
    description:
      "BMW M8 delivers exhilarating performance with a twin-turbocharged V8 engine producing 617 hp. 0-60 mph in 3.0 seconds with sophisticated design and premium interior. Features M Sport suspension, carbon-ceramic brakes, and cutting-edge technology.",
    image: "/images/cars/bmw_m8.jpg",
  },
  {
    id: 8,
    brand: "BMW",
    model: "M4",
    type: "Sports Car",
    year: 2024,
    seats: 4,
    gear: "Automatic",
    color: "Gray",
    price: "$400/day",
    shortDescription: "High-performance sports car with power",
    description:
      "BMW M4 is a high-performance sports car with twin-turbo V8 producing 503 hp. Delivers incredible acceleration and precision handling. Features carbon fiber accents, exclusive M design, and premium Merino leather interior.",
    image: "/images/cars/bmw_m4.jfif",
  },
  {
    id: 9,
    brand: "Lamborghini",
    model: "Huracan",
    type: "Sports Car",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Yellow",
    price: "$800/day",
    shortDescription: "Legendary supercar with iconic design",
    description:
      "Lamborghini Huracán features a naturally aspirated 5.2L V10 engine with 631 hp. 0-60 mph in 2.9 seconds with top speed of 217 mph. Offers stunning Italian design, carbon fiber construction, and thrilling driving experience.",
    image: "/images/cars/lamborghini_huracan.jpeg",
  },
  {
    id: 10,
    brand: "Lamborghini",
    model: "Urus",
    type: "SUV",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Blue",
    price: "$600/day",
    shortDescription: "World's first Super Sport Utility Vehicle",
    description:
      "Lamborghini Urus is the world's first super sport SUV with a twin-turbo V8 engine producing 657 hp. 0-60 mph in 3.6 seconds with intelligent all-wheel drive. Combines supercar performance with luxury and versatility.",
    image: "/images/cars/lamborghini_urus.jfif",
  },
  {
    id: 11,
    brand: "Lamborghini",
    model: "Revuelto",
    type: "Sports Car",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Orange",
    price: "$950/day",
    shortDescription: "Next-generation hybrid hypercar",
    description:
      "Lamborghini Revuelto is a revolutionary hybrid hypercar combining a naturally aspirated V12 with electric motors for 1,001 hp. 0-60 mph in 2.5 seconds with innovative design and sustainable performance.",
    image: "/images/cars/lamborghini_revuelto.jfif",
  },
  {
    id: 12,
    brand: "Mercedes-Benz",
    model: "C300",
    type: "Sedan",
    year: 2024,
    seats: 5,
    gear: "Automatic",
    color: "Silver",
    price: "$300/day",
    shortDescription: "Timeless luxury sedan with German engineering",
    description:
      "Mercedes-Benz C-Class features a turbocharged 2.0L engine with 255 hp. Offers refined luxury interior, MBUX infotainment system, and advanced driver assistance. Perfect balance of performance and elegance.",
    image: "/images/cars/mercedes_c_class.jpg",
  },
  {
    id: 13,
    brand: "Mercedes-Benz",
    model: "GLE",
    type: "SUV",
    year: 2025,
    seats: 7,
    gear: "Automatic",
    color: "Black",
    price: "$400/day",
    shortDescription: "Executive luxury SUV",
    description:
      "Mercedes-Benz GLE combines luxury with performance. Features available twin-turbo V8 with 603 hp, air suspension, and spacious 7-seat interior. AIRMATIC suspension and advanced 4MATIC all-wheel drive system.",
    image: "/images/cars/merceds_gle_600.jfif",
  },
  {
    id: 14,
    brand: "Mercedes-Benz",
    model: "SL",
    type: "Coupe",
    year: 2024,
    seats: 4,
    gear: "Automatic",
    color: "Red",
    price: "$550/day",
    shortDescription: "Classic roadster with retractable hardtop",
    description:
      "Mercedes-Benz SL 680 features a twin-turbo V12 engine with 711 hp. Iconic retractable hardtop, 9-speed automatic transmission, and luxurious open-air driving experience. Premium craftsmanship and advanced technology.",
    image: "/images/cars/mercedes_sl680.jfif",
  },
  {
    id: 15,
    brand: "Mercedes-Benz",
    model: "AMG GT",
    type: "Sports Car",
    year: 2025,
    seats: 2,
    gear: "Automatic",
    color: "Black",
    price: "$650/day",
    shortDescription: "High-performance AMG sports car",
    description:
      "Mercedes-AMG GT features a twin-turbo V8 engine with 577 hp and aggressive styling. 0-60 mph in 3.5 seconds with precision handling and carbon fiber components. Ultimate expression of AMG performance.",
    image: "/images/cars/mercedes_amg_gt.jpg",
  },
  {
    id: 16,
    brand: "Porsche",
    model: "GT3RS",
    type: "Sports Car",
    year: 2025,
    seats: 2,
    gear: "Automatic",
    color: "White",
    price: "$500/day",
    shortDescription: "Track-focused sports car with extreme performance",
    description:
      "Porsche 911 GT3 RS features a naturally aspirated 4.0L flat-six with 518 hp. 0-60 mph in 3.2 seconds with track-focused aerodynamics and carbon fiber wings. Ultimate track-day experience with road-legal performance.",
    image: "/images/cars/porsche_gt3rs.jpg",
  },
  {
    id: 17,
    brand: "Porsche",
    model: "Cayenne",
    type: "SUV",
    year: 2024,
    seats: 5,
    gear: "Automatic",
    color: "Gray",
    price: "$420/day",
    shortDescription: "Luxury performance SUV with sports car dynamics",
    description:
      "Porsche Cayenne combines sports car performance with luxury SUV practicality. Features turbocharged V6 with up to 541 hp, air suspension, and Porsche Stability Management. Dynamic handling and premium comfort.",
    image: "/images/cars/porsche_cayenne.jpg",
  },
  {
    id: 18,
    brand: "Porsche",
    model: "911 GTS",
    type: "Coupe",
    year: 2025,
    seats: 2,
    gear: "Automatic",
    color: "Gray",
    price: "$480/day",
    shortDescription: "Pure-bred coupe with signature Porsche handling",
    description:
      "Porsche 911 GTS features a turbocharged 3.0L flat-six with 503 hp. 0-60 mph in 3.4 seconds with legendary handling and precision. Iconic design and pure driving pleasure.",
    image: "/images/cars/porsche_911_gts.jfif",
  },
  {
    id: 19,
    brand: "Tesla",
    model: "Model S",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "White",
    price: "$320/day",
    shortDescription: "Revolutionary electric sedan with incredible acceleration",
    description:
      "Tesla Model S features dual electric motors with up to 1,020 hp. 0-60 mph in 1.99 seconds with 405-mile range and Supercharger network. Advanced autopilot and OTA software updates.",
    image: "/images/cars/tesla_model_s.jfif",
  },
  {
    id: 20,
    brand: "Tesla",
    model: "Model X",
    type: "SUV",
    year: 2024,
    seats: 7,
    gear: "Automatic",
    color: "Blue",
    price: "$350/day",
    shortDescription: "Electric SUV with gullwing doors and impressive performance",
    description:
      "Tesla Model X features dual electric motors with up to 1,020 hp and gullwing doors. Seats up to 7 with 371-mile range. Combines performance, space, and sustainability with advanced technology.",
    image: "/images/cars/tesla_model_x.jfif",
  },
  {
    id: 21,
    brand: "Tesla",
    model: "Model 3",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Silver",
    price: "$220/day",
    shortDescription: "Premium electric sedan with efficiency and style",
    description:
      "Tesla Model 3 features electric motor with up to 358 hp and 310-mile range. 0-60 mph in 5.8 seconds with minimalist interior and Supercharger access. Best-selling EV with exceptional efficiency.",
    image: "/images/cars/tesla_model_3.jfif",
  },
  {
    id: 22,
    brand: "Tesla",
    model: "Roadster",
    type: "Sports Car",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Red",
    price: "$700/day",
    shortDescription: "Futuristic electric supercar with extraordinary speed",
    description:
      "Tesla Roadster features triple electric motors with 1,000+ hp. 0-60 mph in 1.9 seconds with 620-mile range. Combines sustainable technology with hypercar performance and minimalist design.",
    image: "/images/cars/tesla_roadster.jpg",
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
