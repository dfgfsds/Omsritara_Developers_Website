"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ProgressBar = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Title & Percentage */}
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-gray-800 text-base sm:text-lg font-medium">{title}</h6>
        <span className="text-gray-800 font-semibold">
          {inView && <CountUp start={0} end={value} duration={2} />}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`h-2 rounded-full ${color}`}
        ></motion.div>
      </div>
    </div>
  );
};

export default function SuccessArea() {
  return (
    <div className="success__area py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-4 py-1.5 rounded-full mb-4">
            Why Choose Omsritara Developers
          </span>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-serif my-5 leading-tight">
            Your Trusted Partner for <span className="text-[#9b0000]">End-to-End</span> Real Estate
          </h3>

          <p className="text-black leading-relaxed text-base sm:text-lg md:text-xl">
            Omsritara Developers is your premier destination for integrated real estate solutions.
            We specialize in <strong className="text-gray-950 font-semibold">buying and selling properties</strong> with complete transparency,
            and crafting architectural excellence through <strong className="text-gray-950 font-semibold">high-quality construction</strong> and
            <strong className="text-gray-950 font-semibold"> strategic plotted developments</strong>. Beyond building, we provide expert
            <strong className="text-gray-950 font-semibold"> property management</strong> and handle all <strong className="text-gray-950 font-semibold">liaisoning and statutory approvals</strong>,
            ensuring a hassle-free journey from clear titles to your dream home.
          </p>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-10 text-left">
            {[
              {
                title: "100% CMDA & DTCP",
                desc: "Every layout and flat is strictly verified and approved.",
              },
              {
                title: "Clear Legal Titles",
                desc: "Rigorous legal vetting ensuring 100% peace of mind.",
              },
              {
                title: "Turnkey Execution",
                desc: "From architectural planning to timely handover.",
              },
              {
                title: "Asset Management",
                desc: "Ongoing maintenance and maximum rental yields.",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-gray-50 border border-gray-100/90 shadow-sm hover:border-[#9b0000]/30 hover:bg-white transition-all duration-300"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#9b0000] mb-3" />
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1.5">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-lg shadow-red-950/20 transition-all duration-300 hover:-translate-y-0.5 group"
            >
              <span>Get Free Expert Consultation</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
