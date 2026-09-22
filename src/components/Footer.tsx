"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Facebook,
  Instagram,
  Youtube,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import Link from "next/link";

const Footer = () => {
  const pathname = usePathname();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleFormStateChange = (e: CustomEvent) => {
      setIsFormOpen(e.detail?.isOpen ?? false);
    };

    window.addEventListener(
      "contactFormStateChange" as any,
      handleFormStateChange
    );
    return () =>
      window.removeEventListener(
        "contactFormStateChange" as any,
        handleFormStateChange
      );
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <footer className="bg-gradient-to-b from-[#8c0000] via-[#9b0000] to-[#750000] text-white relative overflow-hidden border-t border-[#e29717]/30">
      {/* ================= TOP CTA BANNER ================= */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 bg-black/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles size={12} />
              Start Your Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white leading-snug">
              Your Dream Project Awaits — Step Into Luxury Living
            </h2>
            <p style={{ color: "#b9bec3" }} className="!text-[#b9bec3] text-sm mt-2">
              Speak with our senior architects and property advisors today for
              custom layouts and site visits.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider text-gray-950 bg-gradient-to-r from-yellow-400 via-yellow-500 to-[#e29717] hover:from-yellow-300 hover:to-yellow-400 shadow-[0_4px_20px_rgba(226,151,23,0.4)] hover:shadow-[0_6px_25px_rgba(226,151,23,0.6)] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span>Get Started Today</span>
              <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={14} className="text-gray-950 stroke-[2.5]" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= FOOTER WIDGETS ================= */}
      <div className="pt-14 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Widget 1: Company Profile (Col 1-5) */}
        <div className="md:col-span-5 space-y-5">
          <Link href="/" className="inline-block">
            <div className="relative h-14 w-44">
              <Image
                src={Logo}
                alt="Omsritara Developers"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <p style={{ color: "#b9bec3" }} className="!text-[#b9bec3] text-sm leading-relaxed max-w-sm">
            Omsritara Developers is a premier Chennai real estate brand dedicated
            to constructing landmark gated communities, modern apartments, and
            luxury villas with statutory excellence.
          </p>

          {/* Compliance Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs text-yellow-300 font-semibold">
            <ShieldCheck size={16} className="text-[#e29717]" />
            <span>100% CMDA & DTCP Approved Landmarks</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.facebook.com/profile.php?id=61574589130777"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a
              href="https://www.instagram.com/omsritara_developers/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.youtube.com/@omsritaradevelopers"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Widget 2: Quick Links (Col 6-8) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-white text-base font-bold uppercase tracking-wider border-b border-[#e29717]/40 pb-2 w-fit">
            Quick Navigation
          </h4>
          <ul className="space-y-2.5 text-sm text-white/95">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Ongoing Properties", href: "/properties" },
              { label: "Landmark Projects", href: "/project" },
              { label: "Property Blog", href: "/blog" },
              { label: "Contact Us", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors hover:text-yellow-300 flex items-center gap-1.5 ${
                    isActive(link.href) ? "text-yellow-400 font-bold" : "text-white/90"
                  }`}
                >
                  <span>›</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Widget 3: Head Office & Contact (Col 9-12) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-white text-base font-bold uppercase tracking-wider border-b border-[#e29717]/40 pb-2 w-fit">
            Head Office
          </h4>

          <div className="space-y-3.5 text-sm text-white/95">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#e29717] w-5 h-5 mt-0.5 shrink-0" />
              <p style={{ color: "#b9bec3" }} className="leading-relaxed !text-[#b9bec3]">
                Second Floor, North Side, 46 Giri Rd, T. Nagar, Chennai, Tamil
                Nadu 600017
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-[#e29717] w-4 h-4 shrink-0" />
              <Link
                href="tel:+917779958889"
                className="hover:text-yellow-300 transition font-semibold text-white"
              >
                +91 77799 58889
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-[#e29717] w-4 h-4 shrink-0" />
              <Link
                href="mailto:info@omsritaradevelopers.in"
                className="hover:text-yellow-300 transition break-all text-white font-medium"
              >
                info@omsritaradevelopers.in
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT AREA ================= */}
      <div className="bg-black/25 border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-white/90">
          <p style={{ color: "#b9bec3" }} className="!text-[#b9bec3]">
            © {new Date().getFullYear()} Omsritara Developers. All Rights
            Reserved.
          </p>

          <p>
            Designed & Developed by{" "}
            <a
              href="https://ftdigitalsolutions.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 font-semibold hover:underline"
            >
              FT Digital Solutions
            </a>
          </p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="modal-sidebar-scroll-2">
        <ul>
          <li className="text-center">
            <button
              onClick={() => {
                const event = new CustomEvent("toggleContactForm");
                window.dispatchEvent(event);
              }}
              className="contact-toggle-btn group relative inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#A5291B] hover:bg-red-700 text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/20"
              aria-label="Open contact form"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </li>
        </ul>
      </div>

      <div className="modal-sidebar-scroll-1">
        <ul>
          <li className="text-center">
            <a
              href="https://wa.me/917779958889"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
              aria-label="Chat on WhatsApp"
            >
              <PhoneCall className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
