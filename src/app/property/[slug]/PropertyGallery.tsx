"use client";
import Image from "next/image";
import { useState } from "react";

interface PropertyGalleryProps {
    images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
    const [activeImg, setActiveImg] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            {/* Main Image */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={images[activeImg]}
                    alt={`Property main ${activeImg}`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-3 mt-3">
                {images.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveImg(index)}
                        className={`relative w-24 h-20 rounded-lg cursor-pointer overflow-hidden border-2 ${activeImg === index ? "border-[#9b0000]" : "border-transparent"}`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
