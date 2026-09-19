"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  Menu,
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import Logo from "../../public/assets/logo.png";
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Properties", href: "/properties" },
    { name: "Projects", href: "/project" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full relative z-50 font-sans shadow-md">
      {/* ================= 1. TOP UTILITY BAR ================= */}
      <div className="bg-[#7d0000] border-b border-white/10 text-white text-xs py-2 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left: Location & Approvals */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-200">
              <MapPin size={13} className="text-[#e29717] flex-shrink-0" />
              <span className="hidden sm:inline">
                46 Giri Rd, T. Nagar, Chennai, Tamil Nadu 600017
              </span>
              <span className="sm:hidden">T. Nagar, Chennai</span>
            </div>

            <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/10 text-yellow-300 border border-white/15">
              <Sparkles size={11} />
              CMDA & DTCP Approved
            </span>
          </div>

          {/* Right: Contact & Quick Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="tel:+917779958889"
              className="flex items-center gap-1.5 text-gray-200 hover:text-yellow-300 transition-colors font-medium"
            >
              <Phone size={12} className="text-[#e29717]" />
              <span className="font-semibold">+91 77799 58889</span>
            </Link>

            <Link
              href="mailto:info@omsritaradevelopers.in"
              className="hidden md:flex items-center gap-1.5 text-gray-200 hover:text-yellow-300 transition-colors font-medium"
            >
              <Mail size={12} className="text-[#e29717]" />
              <span>info@omsritaradevelopers.in</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN NAVIGATION BAR ================= */}
      <div className="bg-gradient-to-r from-[#8e0000] via-[#9b0000] to-[#8e0000] border-b border-[#e29717]/30 px-4 sm:px-6 lg:px-10 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={closeAll}
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-12 w-36 sm:h-14 sm:w-44">
              <Image
                src={Logo}
                alt="Omsritara Developers"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8 text-[13.5px] font-bold uppercase tracking-wider">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeAll}
                      className={`relative py-1.5 transition-all duration-300 ${
                        active
                          ? "text-yellow-300 font-extrabold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-yellow-400 after:to-[#e29717] after:rounded-full"
                          : "text-white/90 hover:text-yellow-300 after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-yellow-400 after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions: CTA & Sidebar Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Luxury CTA Button: Enquire Now */}
            <Link
              href="/contact"
              onClick={closeAll}
              className="relative hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-gray-950 bg-gradient-to-r from-yellow-400 via-yellow-500 to-[#e29717] hover:from-yellow-300 hover:to-yellow-400 shadow-[0_4px_16px_rgba(226,151,23,0.3)] hover:shadow-[0_6px_22px_rgba(226,151,23,0.5)] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span>Enquire Now</span>
              <span className="w-5 h-5 rounded-full bg-black/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={13} className="text-gray-950 stroke-[2.5]" />
              </span>
            </Link>

            {/* Side Info Drawer Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Sidebar"
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300 cursor-pointer shadow-sm hover:scale-105"
            >
              <Menu size={18} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3. DESKTOP SIDEBAR DRAWER ================= */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500"
          />

          {/* Drawer Panel */}
          <aside className="absolute top-0 right-0 w-96 max-w-[85vw] h-full bg-[#8c0000] text-white p-8 sm:p-10 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-white/15">
            <div>
              {/* Close Button */}
              <div className="flex justify-between items-center mb-8">
                <div className="relative h-12 w-36">
                  <Image
                    src={Logo}
                    alt="Omsritara"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Bio */}
              <p className="text-gray-200 text-sm leading-relaxed mb-8">
                Om Sritara Developers is redefining Chennai&apos;s real estate
                landscape with visionary architecture, CMDA-approved gated
                communities, and luxury living spaces.
              </p>

              {/* Contact Information */}
              <div className="space-y-5 border-t border-white/15 pt-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-yellow-400 font-bold block mb-1">
                    Head Office
                  </span>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    Second Floor, North Side, 46 Giri Rd, T. Nagar, Chennai,
                    Tamil Nadu 600017.
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-yellow-400 font-bold block mb-1">
                    Call Us Directly
                  </span>
                  <Link
                    href="tel:+917779958889"
                    className="text-sm font-semibold text-white hover:text-yellow-300 transition"
                  >
                    +91 77799 58889
                  </Link>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-yellow-400 font-bold block mb-1">
                    Official Email
                  </span>
                  <Link
                    href="mailto:info@omsritaradevelopers.in"
                    className="text-xs text-gray-200 hover:text-yellow-300 transition"
                  >
                    info@omsritaradevelopers.in
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom CTA in Drawer */}
            <div className="pt-8 border-t border-white/15">
              <Link
                href="/contact"
                onClick={closeAll}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <span>Schedule Site Visit</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* ================= 4. MOBILE DRAWER MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Mobile Panel */}
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-[#8f0000] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-white/15">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center pb-6 border-b border-white/15 mb-6">
                <div className="relative h-10 w-32">
                  <Image
                    src={Logo}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeAll}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition ${
                          active
                            ? "bg-white/15 text-yellow-300"
                            : "text-gray-100 hover:bg-white/10"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight size={15} className="opacity-60" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-white/15 space-y-3">
              <Link
                href="/contact"
                onClick={closeAll}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-[#e29717] text-gray-950 font-bold text-xs uppercase tracking-wider shadow-md"
              >
                <span>Enquire Now</span>
                <ArrowUpRight size={14} />
              </Link>

              <Link
                href="tel:+917779958889"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition"
              >
                <Phone size={13} className="text-yellow-400" />
                <span>Call +91 77799 58889</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
