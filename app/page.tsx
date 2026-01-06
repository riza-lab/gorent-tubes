import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Crown, Zap, HeartHandshake } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/images/chatgpt-20image-20jan-202-2c-202026-2c-2003-23-16-20pm.png')`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl text-center">
          <span className="text-primary text-2xl font-bold mb-4">GO-RENT</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-balance">Experience Luxury on the Road</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 text-balance">
            Rent premium luxury vehicles for your next <span className="font-semibold">adventure</span>. From sleek
            sedans to powerful SUVs, we have perfect car for every occasion.
          </p>
          <Link href="/browse">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Browse Cars
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-balance">Why Choose GO-RENT</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Selection",
                description: "Hand-picked luxury vehicles from the world's best brands",
                icon: Crown,
              },
              {
                title: "Easy Booking",
                description: "Simple, secure, and hassle-free reservation process",
                icon: Zap,
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer service for your peace of mind",
                icon: HeartHandshake,
              },
            ].map((feature, i) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={i}
                  className="bg-background rounded-xl border border-primary p-8 flex flex-col items-center text-center"
                >
                  <div className="mb-6 p-4 bg-primary/10 rounded-full">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
