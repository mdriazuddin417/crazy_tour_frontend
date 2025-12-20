import { Button } from "@/components/ui/button"

export function Newsletter() {
  return (
    <section className="relative  overflow-hidden bg-gradient-to-r from-teal-400 to-blue-500 py-20 md:py-32">
      <div className="absolute inset-0">
        <img src="https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339684/samples/landscapes/nature-mountains.jpg" alt="Portugal sunset" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-800/70" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <p className="text-teal-400 text-sm font-semibold mb-3 uppercase tracking-wide">Our Newsletter</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            See Portugal Through Our Lens. We Capture Nature, Culture, and All You Need to Know!
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Subscribe to receive exclusive travel tips, destination guides, and special offers delivered straight to
            your inbox.
          </p>
          <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white px-8">
            View Details
          </Button>
        </div>
      </div>
    </section>
  )
}
