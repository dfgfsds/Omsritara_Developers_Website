"use client";

import { useEffect, useState } from "react";

import {
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface Property {
    _id: string;
    name: string;
    image_url?: string[];
}

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

export default function PropertyDetail({ slug }: { slug?: string }) {
    const [images, setImages] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const currentSlug =
                    slug ||
                    window.location.pathname.split("/").filter(Boolean).pop();

                const response = await fetch(
                    "https://api.omsritaradevelopers.in/property"
                );

                const data = await response.json();

                const properties: Property[] = Array.isArray(data?.result)
                    ? data.result
                    : [];

                const property = properties.find(
                    (item) => slugify(item.name) === currentSlug
                );

                if (property?.image_url?.length) {
                    const validImages = property.image_url.map((image) =>
                        image.replace(
                            "https://api.omsritaradevelopers.in",
                            "https://api.omsritaradevelopers.in"
                        )
                    );

                    setImages(validImages);
                }
            } catch (error) {
                console.error("Failed to fetch property images:", error);
            }
        };

        fetchProperty();
    }, [slug]);

    if (!images.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="w-full h-64 sm:h-80 rounded-2xl bg-gray-100 flex items-center justify-center border border-gray-200">
                    <p className="text-gray-500 font-medium text-sm">No images available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            {/* ---------- GALLERY (BALANCED LUXURY SIZING) ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                {/* Main Featured Image */}
                <div
                    onClick={() => {
                        setOpen(true);
                        setCurrent(0);
                    }}
                    className="lg:col-span-2 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative h-72 sm:h-80 md:h-[400px] cursor-pointer group"
                >
                    <img
                        src={images[0]}
                        alt="Property"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                            Click to View Gallery
                        </span>
                    </div>
                </div>

                {/* Right Side 2-row Grid */}
                <div className="grid grid-rows-2 gap-4 h-72 sm:h-80 md:h-[400px]">
                    <div
                        onClick={() => {
                            setOpen(true);
                            setCurrent(1);
                        }}
                        className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative h-full cursor-pointer group"
                    >
                        <img
                            src={images[1] || images[0]}
                            alt="Property"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div
                            onClick={() => {
                                setOpen(true);
                                setCurrent(2);
                            }}
                            className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative h-full cursor-pointer group"
                        >
                            <img
                                src={images[2] || images[0]}
                                alt="Property"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* SHOW ALL */}
                        <div
                            onClick={() => {
                                setOpen(true);
                                setCurrent(0);
                            }}
                            className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full cursor-pointer group"
                        >
                            <img
                                src={images[3] || images[0]}
                                alt="Property"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center group-hover:bg-black/70 transition-colors">
                                <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider text-center px-2">
                                    + View All ({images.length})
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
                                prev === 0
                                    ? images.length - 1
                                    : prev - 1
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
                            alt="Property"
                            className="w-full h-[75vh] object-contain rounded-lg"
                        />
                    </div>

                    {/* Right */}
                    <button
                        onClick={() =>
                            setCurrent((prev) =>
                                prev === images.length - 1
                                    ? 0
                                    : prev + 1
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