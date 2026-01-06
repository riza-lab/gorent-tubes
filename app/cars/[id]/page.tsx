"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Heart, Share2 } from "lucide-react"

const allCars = [
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
    specs: [
      { label: "Engine", value: "2.0L Turbocharged" },
      { label: "Power", value: "261 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "5.8 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Fuel Economy", value: "32 mpg" },
      { label: "Cargo Space", value: "15.9 cu ft" },
    ],
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
    specs: [
      { label: "Engine", value: "3.0L Supercharged" },
      { label: "Power", value: "333 hp" },
      { label: "Drivetrain", value: "Quattro AWD" },
      { label: "0-60 mph", value: "5.9 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Passenger Capacity", value: "7 seats" },
      { label: "Cargo Space", value: "84 cu ft" },
    ],
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
    specs: [
      { label: "Engine", value: "5.2L V10 (Mid-mounted)" },
      { label: "Power", value: "631 hp" },
      { label: "Transmission", value: "7-speed Automatic" },
      { label: "0-60 mph", value: "3.2 seconds" },
      { label: "Top Speed", value: "205 mph" },
      { label: "Brakes", value: "Carbon-ceramic" },
      { label: "Drivetrain", value: "All-wheel Drive" },
    ],
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
    specs: [
      { label: "Engine", value: "2.0L Turbocharged" },
      { label: "Power", value: "248 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "6.1 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Seating", value: "4 passengers" },
      { label: "Top Type", value: "Convertible option" },
    ],
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
    specs: [
      { label: "Engine", value: "2.0L Turbocharged" },
      { label: "Power", value: "255 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "5.8 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Infotainment", value: "BMW iDrive" },
      { label: "Seating", value: "5 passengers" },
    ],
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
    specs: [
      { label: "Engine", value: "3.0L Turbocharged" },
      { label: "Power", value: "382 hp" },
      { label: "Drivetrain", value: "xDrive AWD" },
      { label: "0-60 mph", value: "4.7 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Seating", value: "7 passengers" },
      { label: "Cargo", value: "106.6 cu ft" },
    ],
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
    specs: [
      { label: "Engine", value: "4.4L Twin-turbo V8" },
      { label: "Power", value: "617 hp" },
      { label: "Transmission", value: "8-speed Automatic" },
      { label: "0-60 mph", value: "3.0 seconds" },
      { label: "Top Speed", value: "190 mph" },
      { label: "Brakes", value: "Carbon-ceramic" },
      { label: "Suspension", value: "M Sport" },
    ],
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
    specs: [
      { label: "Engine", value: "3.0L Twin-turbo V8" },
      { label: "Power", value: "503 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "3.8 seconds" },
      { label: "Top Speed", value: "180 mph" },
      { label: "Seating", value: "4 passengers" },
      { label: "Body", value: "Carbon fiber accents" },
    ],
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
    specs: [
      { label: "Engine", value: "5.2L V10 (NA)" },
      { label: "Power", value: "631 hp" },
      { label: "Transmission", value: "7-speed Automatic" },
      { label: "0-60 mph", value: "2.9 seconds" },
      { label: "Top Speed", value: "217 mph" },
      { label: "Material", value: "Carbon fiber" },
      { label: "Design", value: "Italian" },
    ],
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
    specs: [
      { label: "Engine", value: "4.0L Twin-turbo V8" },
      { label: "Power", value: "657 hp" },
      { label: "Transmission", value: "8-speed Automatic" },
      { label: "0-60 mph", value: "3.6 seconds" },
      { label: "Top Speed", value: "190 mph" },
      { label: "Drivetrain", value: "Intelligent AWD" },
      { label: "Seating", value: "5 passengers" },
    ],
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
    specs: [
      { label: "Engine", value: "6.5L V12 + Hybrid" },
      { label: "Power", value: "1,001 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "2.5 seconds" },
      { label: "Top Speed", value: "220+ mph" },
      { label: "EV Range", value: "43 miles" },
      { label: "Innovation", value: "First hybrid V12" },
    ],
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
    specs: [
      { label: "Engine", value: "2.0L Turbocharged" },
      { label: "Power", value: "255 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "6.2 seconds" },
      { label: "Top Speed", value: "155 mph" },
      { label: "Infotainment", value: "MBUX" },
      { label: "Seating", value: "5 passengers" },
    ],
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
    specs: [
      { label: "Engine", value: "4.0L Twin-turbo V8" },
      { label: "Power", value: "603 hp" },
      { label: "Drivetrain", value: "4MATIC AWD" },
      { label: "0-60 mph", value: "3.8 seconds" },
      { label: "Top Speed", value: "174 mph" },
      { label: "Suspension", value: "AIRMATIC" },
      { label: "Seating", value: "7 passengers" },
    ],
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
    specs: [
      { label: "Engine", value: "5.5L Twin-turbo V12" },
      { label: "Power", value: "711 hp" },
      { label: "Transmission", value: "9-speed Automatic" },
      { label: "0-60 mph", value: "3.6 seconds" },
      { label: "Top Speed", value: "193 mph" },
      { label: "Top", value: "Retractable hardtop" },
      { label: "Seating", value: "4 passengers" },
    ],
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
    specs: [
      { label: "Engine", value: "4.0L Twin-turbo V8" },
      { label: "Power", value: "577 hp" },
      { label: "Transmission", value: "Automatic" },
      { label: "0-60 mph", value: "3.5 seconds" },
      { label: "Top Speed", value: "198 mph" },
      { label: "Material", value: "Carbon fiber" },
      { label: "Design", value: "AMG Aggressive" },
    ],
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
    specs: [
      { label: "Engine", value: "4.0L Flat-six (NA)" },
      { label: "Power", value: "518 hp" },
      { label: "Transmission", value: "7-speed Manual" },
      { label: "0-60 mph", value: "3.2 seconds" },
      { label: "Top Speed", value: "198 mph" },
      { label: "Focus", value: "Track-optimized" },
      { label: "Design", value: "Carbon fiber wings" },
    ],
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
    specs: [
      { label: "Engine", value: "3.0L Turbocharged V6" },
      { label: "Power", value: "541 hp" },
      { label: "Transmission", value: "8-speed Automatic" },
      { label: "0-60 mph", value: "3.9 seconds" },
      { label: "Top Speed", value: "166 mph" },
      { label: "Suspension", value: "Air suspension" },
      { label: "Seating", value: "5 passengers" },
    ],
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
    specs: [
      { label: "Engine", value: "3.0L Turbocharged Flat-six" },
      { label: "Power", value: "503 hp" },
      { label: "Transmission", value: "8-speed Automatic" },
      { label: "0-60 mph", value: "3.4 seconds" },
      { label: "Top Speed", value: "193 mph" },
      { label: "Handling", value: "Legendary Porsche" },
      { label: "Design", value: "Iconic" },
    ],
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
    specs: [
      { label: "Powertrain", value: "Dual electric motors" },
      { label: "Power", value: "1,020 hp" },
      { label: "0-60 mph", value: "1.99 seconds" },
      { label: "Top Speed", value: "200 mph" },
      { label: "Range", value: "405 miles" },
      { label: "Charging", value: "Supercharger" },
      { label: "Autopilot", value: "Advanced" },
    ],
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
    specs: [
      { label: "Powertrain", value: "Dual electric motors" },
      { label: "Power", value: "1,020 hp" },
      { label: "0-60 mph", value: "2.5 seconds" },
      { label: "Top Speed", value: "200 mph" },
      { label: "Range", value: "371 miles" },
      { label: "Doors", value: "Gullwing" },
      { label: "Seating", value: "7 passengers" },
    ],
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
    specs: [
      { label: "Powertrain", value: "Single electric motor" },
      { label: "Power", value: "358 hp" },
      { label: "0-60 mph", value: "5.8 seconds" },
      { label: "Top Speed", value: "162 mph" },
      { label: "Range", value: "310 miles" },
      { label: "Efficiency", value: "Outstanding" },
      { label: "Design", value: "Minimalist" },
    ],
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
    specs: [
      { label: "Powertrain", value: "Triple electric motors" },
      { label: "Power", value: "1,000+ hp" },
      { label: "0-60 mph", value: "1.9 seconds" },
      { label: "Top Speed", value: "250+ mph" },
      { label: "Range", value: "620 miles" },
      { label: "Design", value: "Futuristic" },
      { label: "Category", value: "Hypercar" },
    ],
  },
]

export default function CarDetailPage() {
  const params = useParams()
  const carId = Number(params.id)
  const car = allCars.find((c) => c.id === carId)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
          <Link href="/browse">
            <Button className="bg-primary hover:bg-primary/90">Back to Browse</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/browse">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-muted-foreground">{car.type}</p>
          </div>
        </div>

        {/* Image */}
        <div className="bg-muted rounded-2xl h-96 mb-8 overflow-hidden flex items-center justify-center">
          <img
            src={car.image || "/placeholder.svg"}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Price and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 md:col-span-2">
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Daily Rate</p>
              <p className="text-5xl font-bold text-primary">{car.price}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div>
                <p className="text-muted-foreground text-sm">Year</p>
                <p className="font-semibold">{car.year}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Seats</p>
                <p className="font-semibold">{car.seats}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Transmission</p>
                <p className="font-semibold">{car.gear}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Color</p>
                <p className="font-semibold">{car.color}</p>
              </div>
            </div>

            <Link href={`/booking/${car.id}`}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6 mb-4">Book This Car</Button>
            </Link>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Heart className="w-4 h-4" />
                Favorite
              </Button>
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </Card>

          {/* Quick Specs */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Quick Specs</h3>
            <div className="space-y-3">
              {car.specs?.slice(0, 5).map((spec, i) => (
                <div key={i}>
                  <p className="text-muted-foreground text-sm">{spec.label}</p>
                  <p className="font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Full Description */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{car.description}</p>
        </Card>

        {/* Full Specifications */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Complete Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {car.specs?.map((spec, i) => (
              <div key={i} className="pb-4 border-b border-border last:border-b-0">
                <p className="text-muted-foreground text-sm mb-1">{spec.label}</p>
                <p className="font-semibold text-lg">{spec.value}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
