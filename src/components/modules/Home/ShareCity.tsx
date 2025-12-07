import { Button } from "@/components/ui/button";
import Link from "next/link";
const ShareCity = () => {
    return (
        <div>
            <section className="px-4 py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Share Your City?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Start earning by sharing your passion and local expertise with travelers around the world.
          </p>
          <Link href="/register?role=guide">
            <Button size="lg" variant="secondary" className="px-8">
              Become a Guide Today
            </Button>
          </Link>
        </div>
      </section>
        </div>
    );
};

export default ShareCity;