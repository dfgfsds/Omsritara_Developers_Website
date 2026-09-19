"use client";

import axios from "axios";
import { useState } from "react";

export default function EnquiryForm({ dataId }: { dataId: string }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        property: dataId,
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            await axios.post(
                "https://api.omsritaradevelopers.in/enquiry",
                formData
            );

            // Show success popup only after successful API response
            setShowSuccessPopup(true);

            // Reset form
            setFormData({
                name: "",
                email: "",
                mobile: "",
                property: dataId,
            });
        } catch (error) {
            console.log(error, "enq error msg");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Enquiry Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full rounded-2xl bg-gray-50 p-2 md:p-6"
            >
                <h2 className="mb-5 text-lg font-semibold text-gray-800">
                    Post Your Enquiry
                </h2>

                <div className="space-y-4">
                    {/* Name */}
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-[#9b0000] focus:ring-2 focus:ring-[#9b0000]/10"
                    />

                    {/* Email */}
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-[#9b0000] focus:ring-2 focus:ring-[#9b0000]/10"
                    />

                    {/* Mobile */}
                    <input
                        required
                        type="text"
                        name="mobile"
                        placeholder="Your Mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        pattern="\d{10}"
                        maxLength={10}
                        className="w-full rounded-md border border-gray-200 bg-white p-3 text-sm outline-none transition focus:border-[#9b0000] focus:ring-2 focus:ring-[#9b0000]/10"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-[#9b0000] py-3 font-medium text-white transition-all duration-300 hover:bg-[#760000] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
                    onClick={() => setShowSuccessPopup(false)}
                >
                    <div
                        className="relative w-full max-w-[450px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            animation:
                                "enquiryPopup 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    >
                        {/* Top Brand Line */}
                        <div className="h-1.5 w-full bg-[#9b0000]" />

                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setShowSuccessPopup(false)}
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900"
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 6l12 12M18 6L6 18"
                                />
                            </svg>
                        </button>

                        {/* Popup Content */}
                        <div className="px-7 pb-8 pt-10 text-center md:px-10">
                            {/* Success Icon */}
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#9b0000]/5">
                                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#9b0000] shadow-[0_12px_35px_rgba(155,0,0,0.28)]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-9 w-9 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Small Heading */}
                            <p className="mt-7 text-[11px] font-bold tracking-[3px] text-[#9b0000]">
                                ENQUIRY RECEIVED
                            </p>

                            {/* Main Heading */}
                            <h2 className="mt-3 text-[28px] font-semibold tracking-tight text-gray-900">
                                Thank You!
                            </h2>

                            {/* Description */}
                            <p className="mx-auto mt-3 max-w-[350px] text-[14px] leading-6 text-gray-500">
                                Your enquiry has been successfully submitted.
                                Our team will get in touch with you shortly.
                            </p>

                            {/* Divider */}
                            <div className="my-7 flex items-center justify-center gap-2">
                                <span className="h-px w-14 bg-gray-200" />

                                <span className="h-1.5 w-1.5 rotate-45 bg-[#9b0000]" />

                                <span className="h-px w-14 bg-gray-200" />
                            </div>

                            {/* Continue Button */}
                            <button
                                type="button"
                                onClick={() => setShowSuccessPopup(false)}
                                className="w-full rounded-xl bg-[#9b0000] py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#760000] hover:shadow-[0_12px_30px_rgba(155,0,0,0.25)]"
                            >
                                Continue Browsing
                            </button>

                            {/* Footer Text */}
                            <p className="mt-4 text-[11px] text-gray-400">
                                We appreciate your interest in Omsritara
                                Developers
                            </p>
                        </div>
                    </div>

                    {/* Popup Animation */}
                    <style jsx>{`
                        @keyframes enquiryPopup {
                            0% {
                                opacity: 0;
                                transform: translateY(35px) scale(0.94);
                            }

                            100% {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }
                    `}</style>
                </div>
            )}
        </>
    );
}