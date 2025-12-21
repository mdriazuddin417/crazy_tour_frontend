import Image from "next/image";
import Link from "next/link";
import logo from '../../assets/images/crazy_tour_logo.png';
function PublicFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div >
            <Image src={logo} alt="Logo" width={150} height={100}/>
              <p className="text-sm md:text-lg text-muted-foreground pt-3">
                Your travel is our adventure. Explore the world with Crazy Tour!
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm md:text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-lg">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm md:text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm md:text-lg">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Brahmanbaria
              <br />
              Bangladesh
              <br />
              contact@crazytour.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Crazy Tour. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default PublicFooter;
