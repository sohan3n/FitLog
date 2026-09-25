"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

const links = [
  { name: "Workouts", href: "/" },
  { name: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();

  const planCount = 0;
  const savedCount = 0;

  return (
    <div className="navbar bg-base-100 border-b border-white/10 px-4 md:px-8 py-3">
      {/* Mobile Menu & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden mr-2">
            <FiMenu className="text-2xl text-white" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 gap-2">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`rounded-full px-5 py-2 transition-colors ${
                    pathname === link.href ? "bg-[#ccff00]/10 text-[#ccff00]" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-wider text-white uppercase">
          <Image src="/nav-logo.png" alt="FitLog Logo" width={100} height={80} className="object-contain" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`rounded-full px-5 py-2 transition-colors ${
                  pathname === link.href ? "bg-[#ccff00]/10 text-[#ccff00]" : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right-Side Badges */}
      <div className="navbar-end flex gap-4 md:gap-6 items-center">
        <Link href="/my-plan" className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
          <span className="hidden sm:inline text-gray-300">Plan</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-black text-xs font-bold">{planCount}</span>
        </Link>
        <Link href="/my-plan" className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
          <span className="hidden sm:inline text-gray-300">Saved</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-600 text-white text-xs font-bold">{savedCount}</span>
        </Link>
      </div>
    </div>
  );
}