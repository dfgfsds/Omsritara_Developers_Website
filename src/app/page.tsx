"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Sparkles,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react";
import CountUp from "react-countup";
import AppointmentModal from "@/components/AppointmentModal";
import LatestProperties from "@/components/LatestProperties";
import ServicesSlider from "@/components/ServicesSlider";
import SuccessArea from "@/components/whychoose";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* ================= 1. HERO SECTION ================= */}
      <section
        className="relative w-full min-h-[620px] md:h-[750px] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/assets/hero1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Deep luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 w-full flex flex-col items-center text-center py-12 md:py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles size={14} className="text-yellow-400" />
            Chennai&apos;s Trusted Builder & Developer
          </div>

          {/* Heading */}
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight font-serif drop-shadow-2xl">
            Buy. Sell. Build. Manage.
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-[#e29717]">
              Your Luxury Living Partner
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{ color: "#ededed" }}
            className="max-w-3xl !text-[#ededed] text-base sm:text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md font-medium"
          >
            Delivering iconic gated community apartments, luxury private villas,
            and CMDA-approved plotted developments across Chennai&apos;s prime
            growth corridors.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/properties"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-950 bg-gradient-to-r from-yellow-400 via-yellow-500 to-[#e29717] hover:from-yellow-300 hover:to-yellow-400 shadow-[0_4px_20px_rgba(226,151,23,0.4)] hover:shadow-[0_6px_25px_rgba(226,151,23,0.6)] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span>Explore Properties</span>
              <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={14} className="text-gray-950 stroke-[2.5]" />
              </span>
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Book Appointment</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Quick Trust Highlights Pill Bar */}
          <div className="mt-12 hidden sm:grid sm:grid-cols-4 gap-3 max-w-4xl w-full">
            {[
              { label: "14+ Years of Trust", icon: Award },
              { label: "120+ Landmarks", icon: Building2 },
              { label: "CMDA & DTCP Approved", icon: ShieldCheck },
              { label: "500+ Happy Families", icon: Users },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white text-xs font-semibold"
              >
                <item.icon size={15} className="text-yellow-400 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 2. ABOUT US TEASER ================= */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12 items-center">
            {/* Left Imagery: Balanced, Elegantly Framed (No Oversized Heights) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Featured Image with Fixed Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full max-h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                  <img
                    src="/assets/about-gallery1.png"
                    alt="Omsritara Landmark Architecture"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlapping Complementary Image with border */}
                <div className="absolute -bottom-8 -right-4 sm:-right-6 w-1/2 max-w-[240px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                  <img
                    src="/assets/about-gallery2.png"
                    alt="Luxury Interior Living"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Heritage Badge */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-[#9b0000] text-white p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                  <Award className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                  <div>
                    <div className="text-xl sm:text-2xl font-bold font-serif leading-none">14+ Years</div>
                    <div className="text-[11px] uppercase tracking-wider text-yellow-200 mt-0.5">Proven Trust</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story Content with Prominent, Comfortable Typography */}
            <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-3.5 py-1.5 rounded-full">
                  <Sparkles size={12} />
                  About Omsritara Developers
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-serif leading-tight">
                  Your Trusted Partner in{" "}
                  <span className="text-[#9b0000]">Chennai Real Estate</span>
                </h2>

                <p className="text-black leading-relaxed text-base sm:text-lg">
                  Omsritara Developer is a premier real estate and infrastructure
                  conglomerate delivering turnkey solutions across property
                  development, architectural construction, CMDA approvals, and
                  property management.
                </p>

                <p className="text-black leading-relaxed text-base sm:text-lg">
                  Our projects are built upon the cornerstones of strict
                  statutory compliance, transparent dealings, structural
                  integrity, and modern aesthetic elegance tailored for discerning
                  families and visionary investors.
                </p>

                {/* Trust Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                  {[
                    "100% CMDA & DTCP Approved",
                    "Transparent Legal Title Deeds",
                    "Earthquake Resistant RCC Structure",
                    "On-Time Milestone Delivery",
                  ].map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-gray-800">
                      <ShieldCheck size={18} className="text-[#9b0000] flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-md transition-all duration-300 group"
                >
                  <span>Learn More About Us</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. FEATURED PROPERTIES ================= */}
      <LatestProperties />

      {/* ================= 4. SERVICES ================= */}
      <ServicesSlider />

      {/* ================= 5. WHY CHOOSE US ================= */}
      <SuccessArea />

      {/* ================= 6. STATS & COUNTERS SECTION ================= */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white relative overflow-hidden border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                target: 14,
                suffix: "+",
                label: "Years of Heritage",
                desc: "Decades of proven excellence across Chennai",
              },
              {
                target: 120,
                suffix: "+",
                label: "Landmark Projects",
                desc: "Delivered across residential and commercial sectors",
              },
              {
                target: 30,
                suffix: "+",
                label: "Expert Engineers",
                desc: "Dedicated architects, planners & consultants",
              },
              {
                target: 500,
                suffix: "+",
                label: "Happy Families",
                desc: "Cherishing peace of mind in our communities",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/40 transition-all duration-300 text-center flex flex-col items-center justify-center hover:-translate-y-1"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-[#e29717] mb-2 font-serif">
                  <CountUp end={stat.target} duration={2.5} />
                  {stat.suffix}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                  {stat.label}
                </h4>
                <p className="text-xs text-gray-400 hidden sm:block">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. APPOINTMENT MODAL ================= */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}