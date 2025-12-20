import { Button } from "@/components/ui/button"

export function ExperiencePortugal() {
  return (
    <section className="relative h-96 overflow-hidden">
      <div className="absolute inset-0">
        <img src="/portugal-mountain-landscape-dramatic-sky.jpg" alt="Portugal mountains" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Experience the Beauty of Portugal</h2>
          <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8">
            Book A Tour
          </Button>
        </div>
      </div>
    </section>
  )
}
