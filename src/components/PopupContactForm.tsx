"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function PopupContactForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-open popup after 3 seconds on initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Handle toggle event from Footer button
    useEffect(() => {
        const handleToggle = () => {
            setIsOpen((prev) => !prev);
        };

        window.addEventListener('toggleContactForm', handleToggle);
        return () => window.removeEventListener('toggleContactForm', handleToggle);
    }, []);

    useEffect(() => {
        const event = new CustomEvent('contactFormStateChange', { detail: { isOpen } });
        window.dispatchEvent(event);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ name: "", email: "", mobile: "" });
        setMessage("");
    };

    const handleClose = () => {
        resetForm();
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post("https://api.omsritaradevelopers.in/enquiry", {
                ...formData,
                description: message,
            });
            toast.success("Message submitted successfully!");
            setFormData({ name: "", email: "", mobile: "" });
            setMessage("");
            setIsOpen(false);
        } catch (error) {
            console.error("Enquiry submission error:", error);
            toast.error("Failed to submit message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/70"
                onClick={handleClose}
            ></div>
            <div className="relative w-full max-w-[800px] max-h-[90vh] md:min-h-[440px] bg-gray-100 rounded-[20px] overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
                {/* Left Side */}
                <div className="relative w-full md:w-1/2 h-[180px] md:h-auto md:min-h-full hidden md:block">
                    <Image
                        src="https://images.pexels.com/photos/13620067/pexels-photo-13620067.jpeg"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-8">
                        <div className="bg-transparent self-start mb-2">
                            <Image
                                src="/assets/logo.png"
                                alt="Logo"
                                width={80}
                                height={80}
                                className=" w-full h-[40px] object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side*/}
                <div className="w-full md:w-1/2 pt-10 pb-8 px-6 md:pt-10 md:p-8 relative bg-gray-100 flex flex-col justify-center">
                    <button
                        onClick={handleClose}
                        className="absolute top-3.5 right-4 text-black transition-colors cursor-pointer"
                    >
                        <X size={24} />
                    </button>

                    <div className="mb-4 md:mb-6">
                        <h3 className="text-[20px] md:text-2xl font-bold text-[#9b0000]">LET'S BUILD YOUR DREAMS</h3>
                        <p className="text-black mt-1 text-[12px] md:text-sm">Fill the form below, and we'll get back to you shortly.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-[12px] md:text-sm"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-[12px] md:text-sm"
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
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-[12px] md:text-sm"
                        />

                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            name="description"
                            rows={2}
                            placeholder="Message"
                            required
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-[12px] md:text-sm resize-y min-h-[80px]"
                        />

                        <div className="flex justify-start w-full">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] cursor-pointer font-semibold uppercase rounded-full pl-4 pr-2.5 py-1.5 gap-2 group overflow-hidden text-[12px] md:text-sm disabled:opacity-50"
                            >
                                <span className="relative z-10 tracking-wide">
                                    {isSubmitting ? "SUBMITTING..." : "SEND MESSAGE"}
                                </span>
                                <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[20px] h-[20px] md:w-[30px] md:h-[30px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                                    <ArrowUpRight className="w-3.5 h-3.5 md:w-5 md:h-5 font-extrabold" />
                                </span>
                                <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
