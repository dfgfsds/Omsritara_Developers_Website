"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [message, setMessage] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://api.omsritaradevelopers.in/enquiry", formData);
      toast.success("Message submitted successfully!");
      setFormData({ name: "", email: "", mobile: "" });
      setMessage('')
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit message.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative mt-16 md:mt-20 bg-gray-50 py-12 md:py-16 overflow-hidden">
        <div
          className="hidden absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-30 md:opacity-40 pointer-events-none"
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-[#9b0000]">Contact </span>
            <span className="text-gray-800">Us</span>
          </h1>
          <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600 flex flex-wrap justify-center items-center gap-2">
            <Link href="/" className="hover:text-[#9b0000] transition">Home</Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <span className="text-xs md:text-sm uppercase tracking-wide bg-gray-100 px-4 py-1 rounded-full">
                Contact Us
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-4 mb-6 ">
                Get In Touch
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                We’re here to assist you! Please reach out with any questions, feedback, or project inquiries.
              </p>

              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-red-800 shrink-0" />
                <p className="text-gray-700 font-medium text-sm md:text-base">
                  <span className="text-lg md:text-xl text-gray-900 block mb-1">Phone:</span>
                  +91 7779958889
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-red-800 shrink-0" />
                <p className="text-gray-700 font-medium text-sm md:text-base break-words">
                  <span className="text-lg md:text-xl text-gray-900 block mb-1">Email Address:</span>
                  info@omsritaradevelopers.in
                </p>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-red-800 shrink-0" />
                <p className="text-gray-700 font-medium text-sm md:text-base">
                  <span className="text-lg md:text-xl text-gray-900 block mb-1">Location:</span>
                  Second Floor, North Side, 46 Giri Rd, Satyanurthy Nagar, <br />
                  T. Nagar, Chennai, Tamil Nadu, 600001
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-100 px-4 sm:px-6 md:px-12 py-10 md:py-14 rounded-xl shadow-md">
              <form className="space-y-4" onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="\d{10}"
                  maxLength={10}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
                />


                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  name="description"
                  rows={4}
                  placeholder="Message"
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
                ></textarea>

                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center bg-yellow-500 text-white font-semibold uppercase rounded-full pl-6 pr-2 py-2 gap-4 group overflow-hidden text-sm md:text-base"
                >
                  <span className="relative z-10">GET STARTED</span>
                  <span className="relative z-10 bg-[#9b0000] text-white rounded-full w-[36px] h-[36px] md:w-[40px] md:h-[40px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-6 h-6 md:w-7 md:h-7 font-extrabold" />
                  </span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
                </button>
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-10 md:mt-12 h-[300px] sm:h-[400px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.671134159813!2d80.24300077454666!3d13.03782721385981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266e8b1ad5b0b%3A0x7e59dbd5a73e7f87!2sFT%20Digital%20Solutions!5e0!3m2!1sen!2sin!4v1693732078925!5m2!1sen!2sin"
              className="w-full h-full rounded-lg shadow-md"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
