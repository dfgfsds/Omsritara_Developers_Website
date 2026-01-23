// app/components/Hero.tsx
"use client";
import { Facebook, Instagram, Youtube, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos.mp4" type="video/mp4" />
        </video>
        {/* Red overlay */}
        <div className="absolute inset-0 bg-red-900 bg-opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 lg:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl">
          Om Sritara <br />
          Construction & Development
        </h1>

        <div className="mt-8 flex items-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition">
            Appointment
          </button>
        </div>
      </div>

      {/* Bulldozer Image */}
      <div className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 z-10">
        <img src="/buldrozer.png" alt="Bulldozer" className="w-full" />
      </div>

      {/* Social Icons */}
      <div className="hidden md:flex flex-col gap-4 fixed right-4 top-1/3 z-20">
        <a
          href="#"
          className="bg-red-700 text-white p-3 rounded-md hover:bg-red-800 transition"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="bg-red-700 text-white p-3 rounded-md hover:bg-red-800 transition"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="bg-red-700 text-white p-3 rounded-md hover:bg-red-800 transition"
        >
          <Youtube className="w-5 h-5" />
        </a>
      </div>

      {/* Call Button */}
      <a
        href="tel:+919876543210"
        className="fixed bottom-6 right-6 z-30 bg-red-700 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-red-800 transition"
      >
        <Phone className="w-5 h-5" />
        <span className="hidden sm:inline">Call</span>
      </a>
    </section>
  );
}
