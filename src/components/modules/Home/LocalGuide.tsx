import { Card, CardContent } from "@/components/ui/card";

const LocalGuide = () => {
    return (
        <div>
             <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why Choose Crazy Tour?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Authentic Experiences",
                desc: "Discover hidden gems and local culture from people who really know their city",
              },
              {
                title: "Verified Guides",
                desc: "All guides are verified and reviewed by the community for quality and safety",
              },
              { title: "Flexible Booking", desc: "Easy booking process with flexible cancellation policies" },
              {
                title: "Secure Payments",
                desc: "Your payments are secure and protected with our trusted payment gateway",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
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

export default LocalGuide;