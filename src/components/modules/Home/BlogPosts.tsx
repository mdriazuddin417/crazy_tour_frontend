import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"

const posts = [
  {
    image: "/portugal-hiking-mountain-trail.jpg",
    date: "Dec 15, 2024",
    category: "Adventure",
    title: "10 Must-Try Hiking Trails in Portugal",
    excerpt: "Explore the most scenic hiking routes",
  },
  {
    image: "/portugal-coastal-cliffs-ocean.jpg",
    date: "Dec 12, 2024",
    category: "Travel Guide",
    title: "Discovering Portugal's Hidden Beaches",
    excerpt: "Your guide to secret coastal gems",
  },
  {
    image: "/portugal-historic-architecture.jpg",
    date: "Dec 10, 2024",
    category: "Culture",
    title: "The Historic Architecture of Lisbon",
    excerpt: "A journey through centuries of history",
  },
  {
    image: "/portugal-waterfall-nature.jpg",
    date: "Dec 8, 2024",
    category: "Nature",
    title: "5 Breathtaking Waterfalls You Must Visit",
    excerpt: "Natural wonders of Portugal",
  },
]

export function BlogPosts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">Latest Blog Posts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {posts.map((post, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded-full">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-800 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm">{post.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8">View All Blogs</Button>
        </div>
      </div>
    </section>
  )
}
