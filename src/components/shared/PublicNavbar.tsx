import { IUser } from "@/lib/types";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from '../../assets/images/crazy_tour_logo.png';
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";

const PublicNavbar = async () => {
  const userInfo = (await getUserInfo()) as IUser;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Tour Explorer" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // console.log({userInfo});

  if (userInfo?.role === "TOURIST") {
    navItems.push({ href: "/tourist/dashboard", label: "Dashboard" });
  } else if (userInfo?.role === "GUIDE") {
    navItems.push({ href: "/guide/dashboard", label: "Dashboard" });
  } else if (userInfo?.role === "ADMIN") {
    navItems.push({ href: "/admin/dashboard", label: "Dashboard" });
  }

  const accessToken = await getCookie("accessToken");

  return (
    <header className="sticky top-0 z-50 w-full   backdrop-blur   overflow-hidden">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 ">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={200} className="ml-[-17px]"/>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-xl font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button size={'lg'} className="text-xl h-[50px] w-[130px]">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  <Link href="/login" className="text-lg font-medium">
                    <Button size={'lg'}>Login</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
