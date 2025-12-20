export function Statistics() {
  const stats = [
    { value: "1.5M", label: "Happy Customers" },
    { value: "117", label: "Destinations" },
    { value: "231", label: "Hotels" },
    { value: "6K", label: "Tour Packages" },
  ]

  return (
    <section className="relative h-64 overflow-hidden my-5">
      <div className="absolute inset-0">
        <img src="https://res.cloudinary.com/dejo5rgg1/image/upload/v1748339684/samples/landscapes/nature-mountains.jpg" alt="Portugal coast" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/50" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
