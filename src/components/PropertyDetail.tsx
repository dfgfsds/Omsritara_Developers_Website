"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    Share2,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function PropertyDetail() {
    const images = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea",
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b",
        "https://images.unsplash.com/photo-1600585154208-7c9cfa1f2c29",
        "https://images.unsplash.com/photo-1600585154341-1c8b8c6a1a2b",
        "https://images.unsplash.com/photo-1600585154352-2d8cfa1f2c99",
        "https://images.unsplash.com/photo-1600585154360-4f2cfa1f2c88",
        "https://images.unsplash.com/photo-1600585154370-8cfa1f2c77",
        "https://images.unsplash.com/photo-1600585154380-1f2cfa1f2c66",
    ];

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">

            {/* ---------- GALLERY ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">

                <div className="lg:col-span-2 rounded-xl overflow-hidden">
                    <img src={images[0]} className="w-full h-full object-cover" />
                </div>

                <div className="grid grid-rows-2 gap-4">

                    <div className="rounded-xl overflow-hidden">
                        <img src={images[1]} className="w-full h-full object-cover" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-xl overflow-hidden">
                            <img src={images[2]} className="w-full h-full object-cover" />
                        </div>

                        {/* SHOW ALL */}
                        <div
                            onClick={() => {
                                setOpen(true);
                                setCurrent(0);
                            }}
                            className="relative rounded-xl overflow-hidden cursor-pointer"
                        >
                            <img src={images[3]} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold text-center">
                                    Show all
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            {/* ---------- POPUP SLIDER ---------- */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

                    {/* Close */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-5 right-5 text-white"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Left */}
                    <button
                        onClick={() =>
                            setCurrent((prev) =>
                                prev === 0 ? images.length - 1 : prev - 1
                            )
                        }
                        className="absolute left-4 text-white"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    {/* Image */}
                    <div className="max-w-5xl w-full px-4">
                        <img
                            src={images[current]}
                            className="w-full h-[75vh] object-contain rounded-lg"
                        />
                    </div>

                    {/* Right */}
                    <button
                        onClick={() =>
                            setCurrent((prev) =>
                                prev === images.length - 1 ? 0 : prev + 1
                            )
                        }
                        className="absolute right-4 text-white"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                </div>
            )}
        </div>
    );
}