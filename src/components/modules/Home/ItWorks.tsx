import { Card, CardContent } from "@/components/ui/card";
const ItWorks = () => {
  return (
    <div>
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Browse Tours",
                desc: "Explore thousands of unique experiences led by local experts",
              },
              {
                num: "2",
                title: "Book Your Experience",
                desc: "Choose your preferred date and group size, then book instantly",
              },
              {
                num: "3",
                title: "Enjoy & Review",
                desc: "Experience authentic local culture and share your feedback",
              },
            ].map((item) => (
              <Card key={item.num} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-teal-600 mb-4">
                    {item.num}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItWorks;
