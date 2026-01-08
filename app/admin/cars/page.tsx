"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { LogOut, Plus, Edit2, Save, X } from "lucide-react"
import Link from "next/link"

const initialCars = [
  {
    id: 1,
    brand: "Audi",
    model: "A6",
    type: "Sedan",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "280",
    shortDescription: "Luxury business sedan with premium features",
    description:
      "Audi's flagship business sedan features a sleek aluminum chassis, cutting-edge LED matrix headlights, and a luxurious interior with premium leather seats. The 2.0L turbocharged engine delivers 261 hp, with available adaptive air suspension for a smooth ride. Equipped with Audi Virtual Cockpit and MMI infotainment, plus advanced driver assistance systems.",
    image: "/images/cars/audi_a6.png",
    active: true,
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
    price: "320",
    shortDescription: "Premium 7-seater luxury SUV",
    description:
      "Audi's three-row luxury SUV combines German engineering with spacious versatility. Features a 3.0L supercharged engine with 333 hp, sophisticated quattro all-wheel drive, and accommodates up to 7 passengers. Premium materials, panoramic sunroof, Bang & Olufsen sound system, and optional adaptive air suspension ensure comfort on any journey.",
    image: "/images/cars/audi_q7.png",
    active: true,
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
    price: "450",
    shortDescription: "Mid-engine supercar with 631 hp V10",
    description:
      "Audi's mid-engine supercar delivers racing performance with 631 hp from its 5.2L V10 engine. 0-60 mph in just 3.2 seconds with a top speed of 205 mph. Features carbon-ceramic brakes, four-wheel drive, and a stunning mid-mounted engine that powers an exhilarating driving experience. Hand-assembled for precision.",
    image: "/images/cars/audi_r8.png",
    active: true,
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
    price: "300",
    shortDescription: "Premium two-door coupe with sports handling",
    description:
      "A premium two-door coupe with distinctive sharp lines and dynamic handling. The 2.0L turbocharged engine produces 248 hp with available all-wheel drive. Features include a power convertible top option, leather-appointed interior, and sports suspension for engaging performance with luxury comfort.",
    image: "/images/cars/audi_a5.png",
    active: true,
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
    price: "250",
    shortDescription: "Ultimate driving machine sedan",
    description:
      "BMW 330i combines dynamic performance with luxury. Features a turbocharged 2.0L engine with 255 hp, responsive handling, and premium interior. Includes BMW iDrive infotainment system, advanced driver assistance, and ConnectedDrive features.",
    image: "/images/cars/bmw_330i.png",
    active: true,
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
    price: "350",
    shortDescription: "Luxury performance SUV with 7 seats",
    description:
      "BMW X5 offers commanding presence and exceptional comfort. Powered by a turbocharged engine, available xDrive all-wheel drive, and BMW ConnectedDrive. Spacious interior with premium materials, panoramic roof, and advanced safety features.",
    image: "/images/cars/bmw_x5.png",
    active: true,
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
    price: "380",
    shortDescription: "High-performance luxury coupe",
    description:
      "BMW M8 delivers exhilarating performance with a twin-turbocharged V8 engine producing 617 hp. 0-60 mph in 3.0 seconds with sophisticated design and premium interior. Features M Sport suspension, carbon-ceramic brakes, and cutting-edge technology.",
    image: "/images/cars/bmw_m8.jpg",
    active: true,
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
    price: "400",
    shortDescription: "High-performance sports car with power",
    description:
      "BMW M4 is a high-performance sports car with twin-turbo V8 producing 503 hp. Delivers incredible acceleration and precision handling. Features carbon fiber accents, exclusive M design, and premium Merino leather interior.",
    image: "/images/cars/bmw_m4.jfif",
    active: true,
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
    price: "800",
    shortDescription: "Legendary supercar with iconic design",
    description:
      "Lamborghini Huracán features a naturally aspirated 5.2L V10 engine with 631 hp. 0-60 mph in 2.9 seconds with top speed of 217 mph. Offers stunning Italian design, carbon fiber construction, and thrilling driving experience.",
    image: "/images/cars/lamborghini_huracan.jpeg",
    active: true,
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
    price: "600",
    shortDescription: "World's first Super Sport Utility Vehicle",
    description:
      "Lamborghini Urus is the world's first super sport SUV with a twin-turbo V8 engine producing 657 hp. 0-60 mph in 3.6 seconds with intelligent all-wheel drive. Combines supercar performance with luxury and versatility.",
    image: "/images/cars/lamborghini_urus.jfif",
    active: true,
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
    price: "950",
    shortDescription: "Next-generation hybrid hypercar",
    description:
      "Lamborghini Revuelto is a revolutionary hybrid hypercar combining a naturally aspirated V12 with electric motors for 1,001 hp. 0-60 mph in 2.5 seconds with innovative design and sustainable performance.",
    image: "/images/cars/lamborghini_revuelto.jfif",
    active: true,
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
    price: "300",
    shortDescription: "Timeless luxury sedan with German engineering",
    description:
      "Mercedes-Benz C-Class features a turbocharged 2.0L engine with 255 hp. Offers refined luxury interior, MBUX infotainment system, and advanced driver assistance. Perfect balance of performance and elegance.",
    image: "/images/cars/mercedes_c_class.jpg",
    active: true,
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
    price: "400",
    shortDescription: "Executive luxury SUV",
    description:
      "Mercedes-Benz GLE combines luxury with performance. Features available twin-turbo V8 with 603 hp, air suspension, and spacious 7-seat interior. AIRMATIC suspension and advanced 4MATIC all-wheel drive system.",
    image: "/images/cars/merceds_gle_600.jfif",
    active: true,
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
    price: "550",
    shortDescription: "Classic roadster with retractable hardtop",
    description:
      "Mercedes-Benz SL 680 features a twin-turbo V12 engine with 711 hp. Iconic retractable hardtop, 9-speed automatic transmission, and luxurious open-air driving experience. Premium craftsmanship and advanced technology.",
    image: "/images/cars/mercedes_sl680.jfif",
    active: true,
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
    price: "650",
    shortDescription: "High-performance AMG sports car",
    description:
      "Mercedes-AMG GT features a twin-turbo V8 engine with 577 hp and aggressive styling. 0-60 mph in 3.5 seconds with precision handling and carbon fiber components. Ultimate expression of AMG performance.",
    image: "/images/cars/mercedes_amg_gt.jpg",
    active: true,
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
    price: "500",
    shortDescription: "Track-focused sports car with extreme performance",
    description:
      "Porsche 911 GT3 RS features a naturally aspirated 4.0L flat-six with 518 hp. 0-60 mph in 3.2 seconds with track-focused aerodynamics and carbon fiber wings. Ultimate track-day experience with road-legal performance.",
    image: "/images/cars/porsche_gt3rs.jpg",
    active: true,
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
    price: "420",
    shortDescription: "Luxury performance SUV with sports car dynamics",
    description:
      "Porsche Cayenne combines sports car performance with luxury SUV practicality. Features turbocharged V6 with up to 541 hp, air suspension, and Porsche Stability Management. Dynamic handling and premium comfort.",
    image: "/images/cars/porsche_cayenne.jpg",
    active: true,
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
    price: "480",
    shortDescription: "Pure-bred coupe with signature Porsche handling",
    description:
      "Porsche 911 GTS features a turbocharged 3.0L flat-six with 503 hp. 0-60 mph in 3.4 seconds with legendary handling and precision. Iconic design and pure driving pleasure.",
    image: "/images/cars/porsche_911_gts.jfif",
    active: true,
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
    price: "320",
    shortDescription: "Revolutionary electric sedan with incredible acceleration",
    description:
      "Tesla Model S features dual electric motors with up to 1,020 hp. 0-60 mph in 1.99 seconds with 405-mile range and Supercharger network. Advanced autopilot and OTA software updates.",
    image: "/images/cars/tesla_model_s.jfif",
    active: true,
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
    price: "350",
    shortDescription: "Electric SUV with gullwing doors and impressive performance",
    description:
      "Tesla Model X features dual electric motors with up to 1,020 hp and gullwing doors. Seats up to 7 with 371-mile range. Combines performance, space, and sustainability with advanced technology.",
    image: "/images/cars/tesla_model_x.jfif",
    active: true,
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
    price: "220",
    shortDescription: "Premium electric sedan with efficiency and style",
    description:
      "Tesla Model 3 features electric motor with up to 358 hp and 310-mile range. 0-60 mph in 5.8 seconds with minimalist interior and Supercharger access. Best-selling EV with exceptional efficiency.",
    image: "/images/cars/tesla_model_3.jfif",
    active: true,
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
    price: "700",
    shortDescription: "Futuristic electric supercar with extraordinary speed",
    description:
      "Tesla Roadster features triple electric motors with 1,000+ hp. 0-60 mph in 1.9 seconds with 620-mile range. Combines sustainable technology with hypercar performance and minimalist design.",
    image: "/images/cars/tesla_roadster.jpg",
    active: true,
  },
]

export default function ManageCarsPage() {
  const [cars, setCars] = useState(initialCars)
  const [brands, setBrands] = useState(["Audi", "BMW", "Lamborghini", "Mercedes-Benz", "Porsche", "Tesla"])
  const [showBrandDialog, setShowBrandDialog] = useState(false)
  const [newBrand, setNewBrand] = useState("")
  const [editingCarId, setEditingCarId] = useState<number | null>(null)
  const [editFormData, setEditFormData] = useState<any>(null)
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

  const handleAddBrand = () => {
    if (newBrand.trim() && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand])
      setNewBrand("")
      setShowBrandDialog(false)
    }
  }

  const handleEditCar = (car: any) => {
    setEditingCarId(car.id)
    setEditFormData({ ...car })
  }

  const handleSaveEdit = (carId: number) => {
    setCars(cars.map((car) => (car.id === carId ? editFormData : car)))
    setEditingCarId(null)
    setEditFormData(null)
  }

  const handleCancelEdit = () => {
    setEditingCarId(null)
    setEditFormData(null)
  }

  const handleToggleActive = (carId: number) => {
    if (editingCarId === carId && editFormData) {
      setEditFormData({ ...editFormData, active: !editFormData.active })
    } else {
      setCars(cars.map((car) => (car.id === carId ? { ...car, active: !car.active } : car)))
    }
  }

  const activeCars = cars.filter((c) => c.active).length

  if (!isClient) return null

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

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Manage Cars</h2>
          <p className="text-muted-foreground mt-2">Add brands, manage vehicles, and control visibility</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 rounded-xl p-6">
            <div className="text-sm text-muted-foreground font-medium">Total Cars</div>
            <div className="text-3xl font-bold text-foreground mt-2">{cars.length}</div>
          </div>
          <div className="bg-green-100 rounded-xl p-6">
            <div className="text-sm text-muted-foreground font-medium">Active</div>
            <div className="text-3xl font-bold text-foreground mt-2">{activeCars}</div>
          </div>
          <div className="bg-purple-100 rounded-xl p-6">
            <div className="text-sm text-muted-foreground font-medium">Brands</div>
            <div className="text-3xl font-bold text-foreground mt-2">{brands.length}</div>
          </div>
        </div>

        {/* Add Brand Section */}
        <div className="mb-8 p-6 border border-primary rounded-xl bg-primary/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Car Brands</h3>
            <Button
              onClick={() => setShowBrandDialog(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <div
                key={brand}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Add Brand Dialog */}
        <Dialog open={showBrandDialog} onOpenChange={setShowBrandDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Car Brand</DialogTitle>
              <DialogDescription>Enter the name of the car brand you want to add</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <Input
                placeholder="e.g., Ferrari, Rolls-Royce, McLaren"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddBrand()
                }}
              />
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setShowBrandDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBrand} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Add Brand
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cars List */}
        <h3 className="text-2xl font-bold mb-6">Car Listings</h3>
        <div className="space-y-4">
          {cars.map((car) => (
            <Card
              key={car.id}
              className={`p-6 border-2 transition ${editingCarId === car.id ? "border-primary bg-primary/5" : "border-border"}`}
            >
              {editingCarId === car.id && editFormData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Brand</label>
                      <select
                        value={editFormData.brand}
                        onChange={(e) => setEditFormData({ ...editFormData, brand: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm mt-1"
                      >
                        {brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Model</label>
                      <Input
                        value={editFormData.model}
                        onChange={(e) => setEditFormData({ ...editFormData, model: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <select
                        value={editFormData.type}
                        onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm mt-1"
                      >
                        <option>Sedan</option>
                        <option>SUV</option>
                        <option>Sports Car</option>
                        <option>Coupe</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Price per Day ($)</label>
                      <Input
                        type="number"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Year</label>
                      <Input
                        type="number"
                        value={editFormData.year}
                        onChange={(e) => setEditFormData({ ...editFormData, year: Number.parseInt(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Seats</label>
                      <Input
                        type="number"
                        value={editFormData.seats}
                        onChange={(e) => setEditFormData({ ...editFormData, seats: Number.parseInt(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Gear</label>
                      <select
                        value={editFormData.gear}
                        onChange={(e) => setEditFormData({ ...editFormData, gear: e.target.value })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm mt-1"
                      >
                        <option>Automatic</option>
                        <option>Manual</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Color</label>
                      <Input
                        value={editFormData.color}
                        onChange={(e) => setEditFormData({ ...editFormData, color: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Short Description</label>
                    <Input
                      value={editFormData.shortDescription}
                      onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Description</label>
                    <textarea
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Status</label>
                      <Switch checked={editFormData.active} onCheckedChange={() => handleToggleActive(car.id)} />
                      <span className="text-sm text-muted-foreground">
                        {editFormData.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-4">
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleSaveEdit(car.id)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="text-lg font-bold">
                        {car.brand} {car.model}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Switch checked={car.active} onCheckedChange={() => handleToggleActive(car.id)} />
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            car.active ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {car.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{car.shortDescription}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Type:</span> {car.type}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price:</span> ${car.price}/day
                      </div>
                      <div>
                        <span className="text-muted-foreground">Year:</span> {car.year}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Seats:</span> {car.seats}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gear:</span> {car.gear}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Color:</span> {car.color}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEditCar(car)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
