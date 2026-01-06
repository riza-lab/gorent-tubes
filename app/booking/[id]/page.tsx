// ... existing imports ...
"use client"
import { useState } from "react"
import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"


interface Car {
  id: number;
  brand: string;
  model: string;
  type: string;
  year: number;
  seats: number;
  gear: string;
  color: string;
  price: string;
  description: string;
  image: string;
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
    price: "$280/day",
    description:
      "Sophisticated luxury sedan with advanced technology and superior comfort",
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
    price: "$320/day",
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
    price: "$450/day",
    description:
      "High-performance sports car with stunning design and thrilling acceleration",
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
    price: "$300/day",
    description:
      "Stylish coupe combining elegance with dynamic driving experience",
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
    price: "$250/day",
    description:
      "Ultimate driving machine with perfect balance of luxury and performance",
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
    price: "$350/day",
    description:
      "Luxury performance SUV with commanding presence and exceptional comfort",
    image: "./images_for_v0/bmw_x5.jfif",
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
    description:
      "Premium coupe with exhilarating performance and sophisticated design",
    image: "./images_for_v0/bmw_m8.jpg",
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
    description:
      "High-performance sports car with cutting-edge technology and power",
    image: "./images_for_v0/bmw_m4.jfif",
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
    description:
      "Legendary supercar with mind-bending speed and iconic Italian design",
    image: "./images_for_v0/lamborghini_huracan.jpeg",
  },
  {
    id: 10,
    brand: "Lamborghini",
    model: "Urus",
    type: "SUV",
    year: 2025,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "$600/day",
    description:
      "World's first Super Sport Utility Vehicle with breathtaking performance",
    image: "./images_for_v0/lamborghini_urus.jfif",
  },
  {
    id: 11,
    brand: "Lamborghini",
    model: "Revuelto",
    type: "Sports Car",
    year: 2024,
    seats: 2,
    gear: "Automatic",
    color: "Red",
    price: "$950/day",
    description:
      "Next-generation hypercar with revolutionary hybrid technology and design",
    image: "./images_for_v0/lamborghini_revuelto.jfif",
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
    description:
      "Timeless luxury sedan with German engineering and refined elegance",
    image: "./images_for_v0/mercedes_c_class.jpg",
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
    description:
      "Executive SUV combining luxury, comfort, and impressive off-road capability",
    image: "./images_for_v0/merceds_gle_600.jfif",
  },
  {
    id: 14,
    brand: "Mercedes-Benz",
    model: "SL",
    type: "Coupe",
    year: 2024,
    seats: 4,
    gear: "Automatic",
    color: "White",
    price: "$550/day",
    description:
      "Classic roadster with retractable hardtop and exquisite craftsmanship",
    image: "./images_for_v0/mercedes_sl680.jfif",
  },
  {
    id: 15,
    brand: "Mercedes-Benz",
    model: "AMG GT",
    type: "Sports Car",
    year: 2025,
    seats: 2,
    gear: "Automatic",
    color: "Red",
    price: "$650/day",
    description:
      "High-performance AMG sports car with raw power and aggressive styling",
    image: "./images_for_v0/mercedes_amg_gt.jpg",
  },
  {
    id: 16,
    brand: "Porsche",
    model: "GT3RS",
    type: "Sports Car",
    year: 2025,
    seats: 2,
    gear: "Automatic",
    color: "Red",
    price: "$500/day",
    description:
      "Ultimate track-focused Porsche with extreme aerodynamics and precision handling",
    image: "./images_for_v0/porsche_gt3rs.jpg",
  },
  {
    id: 17,
    brand: "Porsche",
    model: "Cayenne",
    type: "SUV",
    year: 2024,
    seats: 5,
    gear: "Automatic",
    color: "Black",
    price: "$420/day",
    description:
      "Luxury performance SUV with sports car dynamics and premium comfort",
    image: "./images_for_v0/porsche_cayenne.jpg",
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
    description:
      "Pure-bred coupe delivering thrilling performance with signature Porsche handling",
    image: "./images_for_v0/porsche_911_gts.jfif",
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
    description:
      "Revolutionary electric sedan with incredible acceleration and range",
    image: "./images_for_v0/tesla_model_s.jfif",
  },
  {
    id: 20,
    brand: "Tesla",
    model: "Model X",
    type: "SUV",
    year: 2024,
    seats: 7,
    gear: "Automatic",
    color: "Black",
    price: "$350/day",
    description:
      "Electric SUV with impressive performance, space, and cutting-edge features",
    image: "./images_for_v0/tesla_model_x.jfif",
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
    description:
      "Premium electric sedan combining efficiency with refined performance",
    image: "./images_for_v0/tesla_model_3.jfif",
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
    description:
      "Futuristic electric supercar with extraordinary speed and innovation",
    image: "./images_for_v0/tesla_roadster.jpg",
  },
];

export default function BookingPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [car, setCar] = useState<Car | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (id) {
      const foundCar = cars.find(c => c.id === parseInt(id as string));
      setCar(foundCar || null);
    }
  }, [id]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userEmail) {
      alert("Please enter your email address");
      return;
    }
    
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const pricePerDay = parseFloat(car?.price.replace("$", "").replace("/day", "") || "0");
    const total = (pricePerDay * diffDays).toFixed(2);

    const booking = {
      id: Date.now(),
      carName: `${car?.brand} ${car?.model}`,
      checkIn: startDate,
      checkOut: endDate,
      duration: `${diffDays} Days`,
      price: car?.price,
      total: `$${total}`,
      status: "Pending",
      userEmail,
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert(`Booking confirmed! Confirmation email will be sent to ${userEmail}`);
    router.push("/browse");
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Car not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/browse" className="text-primary hover:underline mb-6 inline-block">
          {"< Back To Cars"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Car Image */}
          <div className="lg:col-span-2">
            <div className="bg-muted h-96 rounded-2xl flex items-center justify-center border border-primary overflow-hidden">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="border border-primary rounded-2xl p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Book This Car</h2>

            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-primary font-semibold mb-3">Email</label>
                <Input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="border-primary"
                  required
                />
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

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 h-12 font-semibold"
              >
                Book Now
              </Button>
            </form>
          </div>
        </div>

        {/* Car Details */}
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
  );
}
