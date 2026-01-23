"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

export default function AppointmentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    try {
      await axios.post("https://api.omsritaradevelopers.in/enquiry", formData);
      toast.success("Enquiry submitted successfully!");
      setFormData({ name: "", mobile: "", email: "", }); // Reset form
      onClose(); // Close modal if needed
    } catch (error) {
      console.error("Enquiry error:", error);
      toast.error("Failed to submit enquiry.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl z-20"
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left Section (Desktop Only) */}
              <div
                className="hidden md:block relative"
                style={{
                  backgroundImage:
                    "url('https://www.casagrand.co.in/wp-content/uploads/2025/03/Villa-16-Dusk-scaled.jpg?ver=1.211')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">
                    Om Sritara Developers
                  </h2>
                  <p className="text-sm opacity-90">
                    Building your dream properties with trust and quality.
                  </p>
                </div>
              </div>

              {/* Right Section with Form */}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  Book an Appointment
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Phone Number"
                    value={formData.mobile}
                    pattern="\d{10}"
                    maxLength={10}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />

                  <button
                    type="submit"
                    className="flex justify-center gap-2 items-center shadow-xl text-base sm:text-lg text-amber-50 bg-red-800 backdrop-blur-md lg:font-semibold px-4 py-2 overflow-hidden border-2 rounded-full group"
                  >
                    Appointment
                    <svg
                      className="w-6 h-6 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 text-gray-50 ease-linear duration-300 rounded-full border border-gray-100 p-1 sm:p-2 rotate-45"
                      viewBox="0 0 16 19"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        className="fill-gray-100 group-hover:fill-gray-800"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
