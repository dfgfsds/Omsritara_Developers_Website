"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, X, Menu, ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import Logo from "../../public/assets/logo.png";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

// ... inside your component
<div className="flex items-center gap-4 text-white text-sm">
  <div className="flex items-center gap-2">
    <FaMapMarkerAlt size={14} />
    <span>No. 46, Giri Road, T. Nagar, Chennai-600 017.</span>
  </div>

  <div className="flex items-center gap-2">
    <FaPhoneAlt size={14} className="rotate-[90deg]" />
    <span>+ 91 9202 299202</span>
  </div>

  <div className="flex items-center gap-2">
    <FaEnvelope size={14} />
    <span>ambitcrest777@gmail.com</span>
  </div>
</div>
export default function Header() {
  const pathname = usePathname(); // Get current route

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    //{ name: "Properties", href: "/properties" },
    //{ name: "Project", href: "/project" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href; // Active link checker

  // Helper to close all overlays
  const closeAll = () => {
    setIsSearchOpen(false);
    setIsSidebarOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    //<header className="w-full border-b border-[#e4e4e4] bg-[#9b0000] fixed top-0 left-0 z-50">
    <header className="w-full bg-[#9b0000] fixed top-0 left-0 z-50">

      <div className="mx-auto hidden md:flex justify-between items-center px-5 md:px-10 py-2 text-white text-[14px]">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt size={14} />
          <span className="hidden sm:inline">Second Floor, North Side, 46 Giri Rd, Satyanurthy Nagar, T. Nagar, Chennai, Tamil Nadu, 600001</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="tel:+917779958889" className="flex items-center gap-2 hover:text-gray-300 transition">
            <FaPhoneAlt size={14} />
            <span className="hidden md:inline">+91 7779958889</span>
          </Link>
          <Link href="mailto:info@omsritaradevelopers.in" className="flex items-center gap-2 hover:text-gray-300 transition">
            <FaEnvelope size={14} />
            <span className="hidden md:inline">info@omsritaradevelopers.in</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex justify-between items-center px-5 md:px-10 py-3">
        {/* Logo */}
        <div className="relative z-50">
          <Link href="/" onClick={closeAll}>
            <Image src={Logo} alt="Logo" width={160} height={60} className="relative z-50" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-8 text-[15px] font-semibold uppercase text-gray-200">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className={`transition ${isActive(link.href)
                    ? "text-white border-b-2 border-yellow-500"
                    : "hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          {/*
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setIsSidebarOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="hidden md:block text-gray-200 text-xl"
          >
            <Search className="w-6 h-6 my-auto font-extrabold" />
          </button>
          */}

          {/* CTA Button */}
          {/*
          <Link
            href="/contact"
            onClick={closeAll}
            className="relative hidden sm:inline-flex items-center justify-center bg-yellow-500 text-white font-semibold uppercase rounded-full pl-6 pr-2 py-2 gap-4 group overflow-hidden"
          >
            <span className="relative z-10">GET STARTED</span>
            <span className="relative z-10 bg-[#9b0000] text-white rounded-full w-[36px] h-[36px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-6 h-6 font-extrabold" />
            </span>
            <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
          </Link>
          */}

          {/* Sidebar */}
          <button
            onClick={() => {
              setIsSidebarOpen(true);
              setIsSearchOpen(false);
              setIsMobileMenuOpen(false);
            }}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white shadow cursor-pointer"
          >
            <Menu className="text-gray-900 w-6 h-6" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(true);
              setIsSearchOpen(false);
              setIsSidebarOpen(false);
            }}
            className="lg:hidden text-gray-50 text-2xl"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#ad0202] z-[9999] flex items-center justify-center transition-all">
          <form className="w-4/5 md:w-1/2 flex relative">
            <input
              type="search"
              placeholder="Search Here..."
              className="w-full p-4 rounded-lg bg-white outline-none"
            />
            <button type="submit" className="absolute right-0 top-0 h-full w-14 bg-gray-900 text-white rounded-r-lg">
              <Search />
            </button>
          </form>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            <X />
          </button>
        </div>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-96 max-w-full h-full bg-[#a50000] p-10 z-[9999] transition-transform duration-500">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-6 right-6 text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            <X className="text-gray-900" />
          </button>
          <div className="mb-6">
            <Image src={Logo} alt="Logo" width={150} height={50} />
          </div>
          <p className="text-white mb-6">
            Om Sritara Developer is redefining the construction industry with
            innovative solutions, cutting-edge technology, and sustainable
            practices.
          </p>

          {/* Contact Info */}
          <div className="space-y-6 border-t border-b border-gray-200 py-6">
            <div>
              <span className="block text-white font-medium">Phone:</span>
              <Link href="tel:+917779958889" className="text-gray-100">
                +91 7779958889
              </Link>
            </div>
            <div>
              <span className="block text-white font-medium">Email:</span>
              <Link href="mailto:info@ftdigitalsolutions.in" className="text-gray-100">
                info@ftdigitalsolutions.in
              </Link>
            </div>
            <div>
              <span className="block text-white font-medium">Location:</span>
              <Link href="https://www.google.com/maps" className="text-gray-100">
                Second Floor, North Side, 46 Giri Rd, T. Nagar, Chennai, Tamil Nadu, 600001.
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#a50000] z-[9999] p-8 transition">
          <div className="flex justify-between items-center mb-6">
            <Image src={Logo} alt="Logo" width={140} height={50} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl bg-white w-10 h-10 rounded-full flex items-center justify-center"
            >
              <X className="text-gray-900" />
            </button>
          </div>
          <ul className="flex flex-col gap-6 text-white text-lg font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeAll}
                  className={`transition block ${isActive(link.href)
                    ? "text-yellow-400"
                    : "hover:text-gray-300"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
