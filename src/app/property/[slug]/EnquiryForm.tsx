"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EnquiryForm({ dataId }: { dataId: string }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        property: dataId
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload
        try {
            const res = await axios.post(`https://api.omsritaradevelopers.in/enquiry`, formData);
            toast.success("Data submitted successfully!");
            setFormData({ name: "", email: "", mobile: "", property: dataId }); // Reset form
        } catch (error) {
            console.log(error, "enq error msg");
            toast.error("Failed to submit enquiry!");
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-gray-50  rounded-2xl md:p-6 p-2 w-full"
        >
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Post Your Enquiry
            </h2>
            <div className="space-y-4">
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#9b0000] outline-none"
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#9b0000] outline-none"
                />
                <input
                    required
                    type="text"
                    name="mobile"
                    placeholder="Your Mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="\d{10}"
                    maxLength={10}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#9b0000] outline-none"
                />
                <button
                    type="submit"
                    className="w-full bg-[#9b0000] text-white py-2 rounded-md hover:bg-red-700 transition"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
