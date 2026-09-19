"use client";

import { useState, useEffect } from "react";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function PopupContactForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    const [message, setMessage] = useState("");

    // Open popup after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Toggle popup from other components
    useEffect(() => {
        const handleToggle = () => {
            if (showSuccessPopup) {
                setShowSuccessPopup(false);
            } else {
                setIsOpen((prev) => !prev);
            }
        };

        window.addEventListener("toggleContactForm", handleToggle);

        return () => {
            window.removeEventListener("toggleContactForm", handleToggle);
        };
    }, [showSuccessPopup]);

    // Contact page success popup trigger
    useEffect(() => {
        const handleContactSuccess = () => {
            setIsOpen(false);
            setShowSuccessPopup(true);
        };

        window.addEventListener(
            "contactEnquirySuccess",
            handleContactSuccess
        );

        return () => {
            window.removeEventListener(
                "contactEnquirySuccess",
                handleContactSuccess
            );
        };
    }, []);

    // Body scroll control
    useEffect(() => {
        const isAnyPopupOpen = isOpen || showSuccessPopup;

        const event = new CustomEvent("contactFormStateChange", {
            detail: { isOpen: isAnyPopupOpen },
        });

        window.dispatchEvent(event);

        if (isAnyPopupOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, showSuccessPopup]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            mobile: "",
        });

        setMessage("");
    };

    const handleClose = () => {
        resetForm();
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.mobile) {
            toast.error("Please fill all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            await axios.post(
                "http://localhost:5000/enquiry",
                {
                    ...formData,
                    description: message,
                }
            );

            // Close enquiry form
            setIsOpen(false);

            // Show existing success popup
            setShowSuccessPopup(true);

            // Clear form
            resetForm();
        } catch (error) {
            console.error("Enquiry submission error:", error);
            toast.error("Failed to submit message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen && !showSuccessPopup) {
        return null;
    }

    return (
        <>
            {/* ================= ENQUIRY FORM ================= */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">

                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                        onClick={handleClose}
                    />

                    {/* Main Popup */}
                    <div
                        className="
                            relative
                            w-full
                            max-w-[700px]
                            max-h-[92vh]
                            bg-gray-100
                            rounded-[18px]
                            overflow-hidden
                            shadow-2xl
                            flex
                            flex-col
                            md:flex-row
                            animate-in
                            fade-in
                            zoom-in
                            duration-300
                        "
                    >

                        {/* ================= LEFT IMAGE ================= */}
                        <div
                            className="
                                relative
                                w-full
                                md:w-[43%]
                                h-[105px]
                                md:h-[400px]
                                shrink-0
                                overflow-hidden
                            "
                        >
                            <Image
                                src="/assets/form-cover.jfif"
                                alt="Omsritara Developers"
                                fill
                                priority
                                className="object-cover"
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/20" />

                            {/* Omsritara Logo */}
                            <div
                                className="
                                    absolute
                                    top-3
                                    left-3
                                    md:top-4
                                    md:left-4
                                    z-10
                                    rounded-lg
                                    bg-black/50
                                    backdrop-blur-sm
                                    border
                                    border-white/20
                                    px-2.5
                                    py-1.5
                                "
                            >
                                <Image
                                    src="/assets/logo.png"
                                    alt="Omsritara Developers Logo"
                                    width={125}
                                    height={40}
                                    className="
                                        w-auto
                                        h-[25px]
                                        md:h-[30px]
                                        object-contain
                                    "
                                />
                            </div>
                        </div>

                        {/* ================= RIGHT FORM ================= */}
                        <div
                            className="
                                relative
                                w-full
                                md:w-[57%]
                                bg-gray-100
                                px-5
                                py-5
                                sm:px-6
                                sm:py-6
                                md:px-6
                                md:py-7
                            "
                        >

                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={handleClose}
                                className="
                                    absolute
                                    top-3
                                    right-3
                                    text-black
                                    hover:text-[#9b0000]
                                    transition-colors
                                    cursor-pointer
                                    z-20
                                "
                            >
                                <X size={21} />
                            </button>

                            {/* Heading */}
                            <div className="mb-4 md:mb-5 pr-7">
                                <h3
                                    className="
                                        text-[18px]
                                        sm:text-[20px]
                                        md:text-[21px]
                                        font-bold
                                        text-[#9b0000]
                                        leading-tight
                                    "
                                >
                                    LET'S BUILD YOUR DREAMS
                                </h3>

                                <p className="text-black mt-1 text-[11px] sm:text-xs md:text-[13px] leading-relaxed">
                                    Fill the form below, and we'll get back to you shortly.
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                className="space-y-3"
                                onSubmit={handleSubmit}
                            >

                                {/* Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        required
                                        className="
                                            w-full
                                            h-[40px]
                                            px-3
                                            rounded-md
                                            border
                                            border-gray-300
                                            bg-white
                                            text-black
                                            text-[13px]
                                            outline-none
                                            focus:border-[#9b0000]
                                            transition
                                        "
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                        className="
                                            w-full
                                            h-[40px]
                                            px-3
                                            rounded-md
                                            border
                                            border-gray-300
                                            bg-white
                                            text-black
                                            text-[13px]
                                            outline-none
                                            focus:border-[#9b0000]
                                            transition
                                        "
                                    />
                                </div>

                                {/* Mobile */}
                                <div>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Phone Number"
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        className="
                                            w-full
                                            h-[40px]
                                            px-3
                                            rounded-md
                                            border
                                            border-gray-300
                                            bg-white
                                            text-black
                                            text-[13px]
                                            outline-none
                                            focus:border-[#9b0000]
                                            transition
                                        "
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <textarea
                                        name="message"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        placeholder="Message"
                                        rows={3}
                                        required
                                        className="
                                            w-full
                                            h-[68px]
                                            px-3
                                            py-2
                                            rounded-md
                                            border
                                            border-gray-300
                                            bg-white
                                            text-black
                                            text-[13px]
                                            outline-none
                                            resize-none
                                            focus:border-[#9b0000]
                                            transition
                                        "
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="
                                        w-full
                                        h-[40px]
                                        mt-1
                                        rounded-md
                                        bg-[#9b0000]
                                        hover:bg-[#7f0000]
                                        text-white
                                        text-[12px]
                                        sm:text-[13px]
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        transition
                                        disabled:opacity-60
                                        disabled:cursor-not-allowed
                                        cursor-pointer
                                    "
                                >
                                    {isSubmitting ? (
                                        "SENDING..."
                                    ) : (
                                        <>
                                            SEND MESSAGE
                                            <ArrowUpRight size={15} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= SUCCESS POPUP ================= */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">

                    {/* Background */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                        onClick={() => setShowSuccessPopup(false)}
                    />

                    {/* Success Card */}
                    <div
                        className="
                            relative
                            w-full
                            max-w-[390px]
                            bg-white
                            rounded-[18px]
                            shadow-2xl
                            px-6
                            py-7
                            sm:px-8
                            sm:py-8
                            text-center
                            animate-in
                            fade-in
                            zoom-in
                            duration-300
                        "
                    >

                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => setShowSuccessPopup(false)}
                            className="
                                absolute
                                top-3
                                right-3
                                text-gray-500
                                hover:text-black
                                transition
                                cursor-pointer
                            "
                        >
                            <X size={20} />
                        </button>

                        {/* Logo */}
                        <div className="flex justify-center mb-4">
                            <div className="rounded-lg bg-white px-3 py-2">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Omsritara Developers"
                                    width={140}
                                    height={45}
                                    className="w-auto h-[32px] object-contain"
                                />
                            </div>
                        </div>

                        {/* Success Icon */}
                        <div className="flex justify-center mb-3">
                            <CheckCircle2
                                size={52}
                                strokeWidth={1.5}
                                className="text-[#9b0000]"
                            />
                        </div>

                        <h2 className="text-[21px] font-bold text-[#9b0000]">
                            ENQUIRY RECEIVED
                        </h2>

                        <h3 className="text-[17px] font-semibold text-black mt-2">
                            Thank You!
                        </h3>

                        <p className="text-gray-600 text-[12px] sm:text-[13px] leading-relaxed mt-2">
                            Your enquiry has been successfully submitted.
                            Our team will get back to you shortly.
                        </p>

                        <div className="w-full h-px bg-gray-200 my-5" />

                        <button
                            type="button"
                            onClick={() => setShowSuccessPopup(false)}
                            className="
                                w-full
                                h-[40px]
                                rounded-md
                                bg-[#9b0000]
                                hover:bg-[#7f0000]
                                text-white
                                text-[12px]
                                font-semibold
                                transition
                                cursor-pointer
                            "
                        >
                            CONTINUE BROWSING
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}