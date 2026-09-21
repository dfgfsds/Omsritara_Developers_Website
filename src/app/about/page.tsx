"use client";
import Link from "next/link";
import { CheckCircle, Home, Check, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://api.omsritaradevelopers.in/enquiry", formData);
      toast.success("Message submitted successfully!");
      setFormData({ name: "", email: "", mobile: "" });
      setMessage("");
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit message.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-16 md:py-24">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9b0000]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#e29717]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Heritage, Trust & Vision
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-serif">
            About <span className="text-[#e29717]">Omsritara Developers</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Leading Chennai&apos;s real estate development through superior
            craftsmanship, statutory compliance, and modern gated community
            living.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-medium">About Us</span>
          </div>
        </div>
      </section>

      {/* Main Story & Heritage Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Imagery: Balanced, Elegantly Framed */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Image */}
                <div className="relative aspect-[4/3] w-full max-h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                  <Image
                    src="/assets/about-gallery1.png"
                    alt="Omsritara Developers Architecture"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlapping Accent Image */}
                <div className="absolute -bottom-8 -right-4 sm:-right-6 w-1/2 max-w-[240px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block">
                  <Image
                    src="/assets/about-gallery2.png"
                    alt="Premium Living Spaces"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Heritage Badge */}
                <div className="absolute -top-5 -left-4 sm:-left-6 bg-[#9b0000] text-white p-5 rounded-2xl shadow-xl flex items-center gap-3.5 border border-white/20">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold font-serif leading-none">14+ Years</div>
                    <div className="text-xs uppercase tracking-wider text-yellow-200 mt-1 font-medium">Proven Trust</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-3.5 py-1.5 rounded-full mb-3">
                  <Sparkles size={12} />
                  Trusted Real Estate Developers
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 font-serif leading-tight">
                  Delivering Excellence in <span className="text-[#9b0000]">Every Development</span>
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                Omsritara Developers is a professionally managed real estate and infrastructure
                development firm offering end-to-end turnkey solutions across property buying and selling,
                architectural construction, plotted community development, property management, and statutory
                liaisoning & approvals.
              </p>

              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                With a steadfast commitment to delivering legally compliant, strategically planned,
                and value-oriented real estate solutions across Chennai, we ensure our clients experience
                transparent documentation, on-schedule handover, and long-term capital appreciation.
              </p>

              {/* Core Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  "CMDA & DTCP Approved Layouts",
                  "100% Verified Clean Legal Titles",
                  "Gated Communities & Luxury Villas",
                  "Dedicated Relationship Managers",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-gray-800">
                    <CheckCircle className="h-5 w-5 text-[#9b0000] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-md transition-all duration-300 group"
                >
                  <span>Get Expert Advice</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                </Link>

                <a
                  href="tel:+917779958889"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span>Talk to Consultant</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Strategic Pillars */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-4 py-1.5 rounded-full mb-3">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight">
              Comprehensive Real Estate Services Under One Roof
            </h2>
            <p className="text-base text-gray-600 mt-2">
              From land acquisition and architectural design to statutory compliance and property care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Property Buy & Sell",
                desc: "Transparent brokerage, valuation, documentation, and registration assistance.",
                icon: Home,
              },
              {
                title: "Quality Construction",
                desc: "Detailed project estimation, high-grade materials, and milestone-based delivery.",
                icon: Sparkles,
              },
              {
                title: "CMDA & DTCP Approvals",
                desc: "Statutory liaisoning, planning sanctions, building permits, and RERA filing.",
                icon: CheckCircle,
              },
              {
                title: "Property Management",
                desc: "End-to-end maintenance, tenant coordination, inspections, and rental yield care.",
                icon: ArrowUpRight,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#9b0000]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#9b0000]/10 flex items-center justify-center text-[#9b0000] mb-5">
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Process & Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Work Process */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-3.5 py-1.5 rounded-full mb-3">
                  Systematic Execution
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-serif leading-tight">
                  Our Structured Work Process
                </h2>
                <p className="text-base text-gray-600 mt-2">
                  Clarity, statutory compliance, and smooth milestone delivery at every stage.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  {
                    step: "01",
                    title: "Requirement Assessment",
                    desc: "In-depth consultation to understand budget, location preferences, and feasibility.",
                  },
                  {
                    step: "02",
                    title: "Planning & Statutory Approvals",
                    desc: "Architectural blueprint development, CMDA/DTCP sanctions, and RERA verification.",
                  },
                  {
                    step: "03",
                    title: "Quality Controlled Execution",
                    desc: "Rigorous construction supervision with structural engineering compliance.",
                  },
                  {
                    step: "04",
                    title: "Handover & Title Registration",
                    desc: "Smooth documentation, clear title registration, and formal key handover.",
                  },
                  {
                    step: "05",
                    title: "Ongoing Asset Management",
                    desc: "Comprehensive post-handover property upkeep and rental management.",
                  },
                ].map((process, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4 hover:bg-white hover:border-gray-200 transition-colors"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#9b0000] text-white font-bold text-sm flex items-center justify-center">
                      {process.step}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{process.title}</h4>
                      <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{process.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Modern Contact Enquiry Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-gray-50 to-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9b0000]">Direct Enquiry</span>
                <h3 className="text-2xl font-bold font-serif text-gray-900 mt-1">Book a Site Consultation</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Leave your details and our team will get back to you within 2 hours.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-[#9b0000] focus:ring-1 focus:ring-[#9b0000] outline-none text-sm text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-[#9b0000] focus:ring-1 focus:ring-[#9b0000] outline-none text-sm text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone / Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="\d{10}"
                    maxLength={10}
                    className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-[#9b0000] focus:ring-1 focus:ring-[#9b0000] outline-none text-sm text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Message / Project of Interest
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    name="description"
                    rows={3}
                    placeholder="Tell us about your requirement or project..."
                    className="w-full p-3.5 rounded-xl border border-gray-300 focus:border-[#9b0000] focus:ring-1 focus:ring-[#9b0000] outline-none text-sm text-gray-900 bg-white resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Consultation Request</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
