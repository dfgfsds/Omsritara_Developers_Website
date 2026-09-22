"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const validImages =
    Array.isArray(images) && images.length > 0
      ? images
      : ["/assets/about-gallery1.png"];

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActiveImg((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    },
    [validImages.length]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActiveImg((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    },
    [validImages.length]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  return (
    <div className="w-full">
      {/* ================= FULL VIEW MAIN IMAGE (NO SIDE GAPS) ================= */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="group relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden bg-gray-950 cursor-pointer select-none"
      >
        <Image
          src={validImages[activeImg]}
          alt={`Property image ${activeImg + 1}`}
          fill
          priority
          unoptimized
          sizes="(max-width: 768px) 100vw, 1280px"
          className="object-cover transition-transform duration-700 group-hover:scale-102"
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

        {/* Counter Badge (Top Left) */}
        <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold shadow-sm">
          {activeImg + 1} / {validImages.length} Photos
        </div>

        {/* Enlarge Hint Badge (Top Right) */}
        <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium transition group-hover:scale-105 shadow-sm">
          <Maximize2 size={13} />
          <span>Full View</span>
        </div>

        {/* Prev / Next Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition sm:opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition sm:opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* ================= THUMBNAILS STRIP ================= */}
      {validImages.length > 1 && (
        <div className="px-4 sm:px-6 py-3.5 bg-gray-50/80 border-b border-gray-100 flex gap-2.5 sm:gap-3 overflow-x-auto scrollbar-thin">
          {validImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImg(index)}
              className={`relative flex-shrink-0 w-20 sm:w-28 h-14 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                activeImg === index
                  ? "border-[#9b0000] ring-2 ring-[#9b0000]/30 scale-102"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* ================= FULLSCREEN LIGHTBOX MODAL ================= */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm sm:text-base font-semibold">
              Photo {activeImg + 1} of {validImages.length}
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Close image viewer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Main Stage Image */}
          <div
            className="relative flex-1 w-full my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-6xl max-h-[78vh]">
              <Image
                src={validImages[activeImg]}
                alt={`Full preview ${activeImg + 1}`}
                fill
                unoptimized
                priority
                className="object-contain select-none"
              />
            </div>

            {/* Lightbox Arrows */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition shadow-lg cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition shadow-lg cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails in Modal */}
          {validImages.length > 1 && (
            <div
              className="flex justify-center gap-2 overflow-x-auto py-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              {validImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImg(index)}
                  className={`relative flex-shrink-0 w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImg === index
                      ? "border-yellow-400 scale-110"
                      : "border-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${index + 1}`}
                    fill
                    unoptimized
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
