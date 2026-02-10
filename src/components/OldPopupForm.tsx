"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function PopupContactForm() {
    const [isOpen, setIsOpen] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-open popup after 5 seconds on initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Element;

            if (formRef.current && formRef.current.contains(target)) {
                return;
            }
            if (target.closest && target.closest('.contact-toggle-btn')) {
                return;
            }

            setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isOpen]);

    // Listen for toggle event from Footer button
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
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <>
            <div ref={formRef} className="fixed bottom-6 right-[90px] z-[9998] w-[90vw] sm:w-[350px]">
                <div className="bg-gray-200 px-4 sm:px-5 py-5 rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.4)]">
                    <h3 className="text-xl font-bold text-[#9b0000] mb-6 text-center uppercase tracking-wide">Get In Touch</h3>
                    <form className="space-y-2.5" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm"
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
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm"
                        />

                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            name="description"
                            rows={2}
                            placeholder="Message"
                            required
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm resize-none"
                        />

                        <div className="flex justify-center w-full">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative inline-flex items-center justify-center bg-[#9b0000] text-white cursor-pointer font-semibold uppercase rounded-full pl-4 pr-2 py-1.5 gap-3 group overflow-hidden text-sm disabled:opacity-50"
                            >
                                <span className="relative z-10">
                                    {isSubmitting ? "SUBMITTING..." : "GET STARTED"}
                                </span>
                                <span className="relative z-10 bg-[#9b0000] border border-white text-white rounded-full w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                                    <ArrowUpRight className="w-5 h-5 font-extrabold" />
                                </span>
                                <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
