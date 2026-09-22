"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(
        "https://api.omsritaradevelopers.in/enquiry",
        formData
      );

      window.dispatchEvent(new Event("contactEnquirySuccess"));

      setFormData({
        name: "",
        email: "",
        mobile: "",
      });

      setMessage("");
      toast.success("Enquiry sent successfully! Our team will contact you shortly.");
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-16 md:py-24">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9b0000]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#e29717]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Connect With Our Experts
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-serif">
            Contact <span className="text-[#e29717]">Omsritara</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/95 leading-relaxed font-normal">
            Schedule a private project visit, enquire about ongoing apartments,
            or speak directly with our senior property investment advisors.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-medium">Contact Us</span>
          </div>
        </div>
      </section>

      {/* ================= CONTACT MAIN SECTION ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-3.5 py-1.5 rounded-full mb-3">
                <Sparkles size={12} />
                Direct Communication
              </span>
              <h2 className="text-3xl font-bold text-gray-900 font-serif mb-3">
                Let&apos;s Build Your Future
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you are exploring residential investments or need guidance
                on custom construction and approvals, we are ready to assist.
              </p>
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#9b0000]/10 text-[#9b0000] flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                    Call Center & Enquiries
                  </h4>
                  <Link
                    href="tel:+917779958889"
                    className="text-base font-bold text-gray-900 hover:text-[#9b0000] transition"
                  >
                    +91 77799 58889
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e29717]/10 text-[#e29717] flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                    Official Email
                  </h4>
                  <Link
                    href="mailto:info@omsritaradevelopers.in"
                    className="text-base font-bold text-gray-900 hover:text-[#9b0000] transition break-all"
                  >
                    info@omsritaradevelopers.in
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">Prompt email response within 24 hours</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-900 text-yellow-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">
                    Head Office
                  </h4>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    Second Floor, North Side, 46 Giri Rd, T. Nagar, Chennai,
                    Tamil Nadu 600017
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/917779958889"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Right Column: Modern Luxury Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 md:p-12 border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 font-serif">
                Send an Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Fill in your contact details and our team will get back to you with brochures and pricing.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Full Name <span className="text-[#9b0000]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Anand Sundaram"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-[#9b0000]/20 focus:border-[#9b0000] outline-none transition bg-gray-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Email Address <span className="text-[#9b0000]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-[#9b0000]/20 focus:border-[#9b0000] outline-none transition bg-gray-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Mobile Number <span className="text-[#9b0000]">*</span>
                </label>
                <input
                  type="text"
                  name="mobile"
                  placeholder="10-digit phone number"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="\d{10}"
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-[#9b0000]/20 focus:border-[#9b0000] outline-none transition bg-gray-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Your Requirements / Project Preference
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Tell us what type of home or property you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-[#9b0000]/20 focus:border-[#9b0000] outline-none transition bg-gray-50/50 focus:bg-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group/btn overflow-hidden flex items-center justify-center gap-2.5 py-4 px-8 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-0.5">
                  {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
                </span>
                <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-gray-200 shadow-md h-[340px] sm:h-[420px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.671134159813!2d80.24300077454666!3d13.03782721385981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e8b1ad5b0b%3A0x7e59dbd5a73e7f87!2sFT%20Digital%20Solutions!5e0!3m2!1sen!2sin!4v1693732078925!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            title="Omsritara Developers Head Office Map"
          ></iframe>
        </div>
      </main>
    </div>
  );
}