"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    name: "Arun Prasad",
    role: "Farmland Owner",
    text: "Om Sritara Developers helped me with farmland and approved land purchases. Their expertise in licensing work and agricultural transactions is top-notch.",
  },
  {
    name: "Ramesh Kumar",
    role: "Property Investor",
    text: "Om Sritara Developers made property buying seamless. Their consulting services guided me to the perfect investment, and the licensing work was handled effortlessly.",
  },
  {
    name: "Sneha R",
    role: "Home Buyer",
    text: "Thanks to Om Sritara Developers, I secured my dream flat with CMDA approval. The entire process was transparent, and their expertise was invaluable.",
  },
];

export default function TestimonialsSlider() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 1, spacing: 8 } },
    },
  });

  // Autoplay
  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3500);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // Navigation handlers
  const prevSlide = () => instanceRef.current?.prev();
  const nextSlide = () => instanceRef.current?.next();

  return (
    <section className="bg-white py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-3 sm:px-4 py-1 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-gray-900">
              Client Experiences with <br className="hidden sm:block" />
              Om Sritara Developers
            </h2>
          </div>

          {/* Top-right arrows (hide on mobile) */}
          <div className="hidden md:flex gap-3 items-center">
            <button
              aria-label="Previous testimonials"
              onClick={prevSlide}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
            <button
              aria-label="Next testimonials"
              onClick={nextSlide}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((t, i) => (
            <div key={i} className="keen-slider__slide px-2 sm:px-4">
              <article className="bg-white border border-gray-100 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition">
                {/* Avatar + Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm">
                    {t.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {t.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>

                {/* Testimonial */}
                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-5">
                  {t.text}
                </p>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <svg
                      key={idx}
                      viewBox="0 0 20 20"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500"
                      fill="currentColor"
                    >
                      <path d="M10 1.5l2.6 5.27 5.82.84-4.21 4.11.99 5.78L10 15.77 4.8 18.5l.99-5.78L1.58 8.61l5.82-.84L10 1.5z" />
                    </svg>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
