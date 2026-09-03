"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Flame, Menu } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { AvatarDropdown } from "./AvatarDropdown";



const Navbar = () => {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);

  const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Browse Startups", href: "/startups" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Dashboard", href: `/dashboard/${user?.role}`}
];

const pathname = usePathname();

if (pathname.includes('dashboard')) {
  return null;
}

const handleSignout = async () => {
  await authClient.signOut()
  redirect('/')
};

return (
  <header className="sticky top-0 z-50 border-b border-white/10  backdrop-blur-md">
    <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <div className="h-8 w-8 rounded-md bg-[#2F6FED] flex items-center justify-center">
          <Flame size={17} className="text-[#0B1424]" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight ">
          Startup<span className="text-[#2F6FED]">Forge</span>
        </span>
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-[#9CA8BC] hover:text-black transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="/signin"
          className={`${session && "hidden"} text-sm font-medium text-[#9CA8BC] hover:text-black transition-colors px-3 py-2`}
        >
          Log in
        </a>
        <a
          href="/signup"
          className={`${session && "hidden"} text-sm font-medium text-[#0B1424] bg-[#2F6FED] hover:bg-[#4C86FF] transition-colors rounded-lg px-4 py-2`}
        >
          Get Started
        </a>

        <Button
          onClick={handleSignout}
          className={`${!session && "hidden"} text-sm font-medium text-white bg-black hover:bg-gray-700 transition-colors rounded-lg px-4 py-2 cursor-pointer`}
        >
          Log Out
        </Button>
      </div>

      {/* Mobile toggle (static, non-functional placeholder) */}
      <button className="md:hidden text-white p-2" aria-label="Open menu">
        <Menu size={22} />
      </button>
      <div className={`${!session && "hidden"}`}>
        <AvatarDropdown></AvatarDropdown>
      </div>

    </nav>
  </header>
);
};

export default Navbar;