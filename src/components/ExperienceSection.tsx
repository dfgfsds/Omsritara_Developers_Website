// src/components/ExperienceSection.tsx
"use client";

import Image from "next/image";
import { Handshake, FileCheck, PhoneCall } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section className="relative bg-[#242424] text-white pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: title + cards */}
          <div className="lg:col-span-8 flex flex-col justify-end h-full">
            {/* subtitle */}
            <span className="text-sm sm:text-base uppercase tracking-wide font-semibold border w-fit border-gray-300 px-5 py-1 mb-4 rounded-full">
              Buy and Sell Properties
            </span>

            {/* title */}
            <h2 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">
              Expert Guidance for Property Transactions
            </h2>

            {/* cards + badge wrapper (relative so badge can overlap) */}
            <div className="relative mt-10">
              {/* Rotated circular badge (hidden on very small screens) */}
              <div className="hidden md:block absolute -left-14 top-12 z-30">
               <img src='/assets/content.png'/>
              </div>

              {/* Cards container (z-40 so cards appear over the image) */}
              <div className="relative z-40  md:left-35">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  {/* Card 1 */}
                  <article className="bg-[#fbf7f1] text-[#1f2937] p-8 rounded-2xl shadow-lg  min-h-[200px]">
                    <Handshake className="h-12 w-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Property Buying Consulting
                    </h3>
                    <p className="text-sm leading-relaxed">
                      Expert advice on buying flats, land, farmhouses, and
                      agricultural properties
                    </p>
                  </article>

                  {/* Card 2 */}
                  <article className="bg-[#fbf7f1] text-[#1f2937] p-8 rounded-2xl shadow-lg  min-h-[200px]">
                    <FileCheck className="h-12 w-12 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Licensing Work</h3>
                    <p className="text-sm leading-relaxed">
                      CMDA Approved, DTCA Approved – Om Sritara Developers
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: large image (moves under cards on wide screens to create overlap) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end order-first lg:order-last">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-full">
              {/* On large screens shift image left so cards appear overlapping */}
              <div className="relative lg:-ml-10">
                <Image
                  src="/assets/villa.webp"
                  alt="Architects & plans"
                  width={620}
                  height={520}
                  className="object-cover rounded-lg shadow-2xl mt-10 md:mt-0 w-full h-[340px] sm:h-[500px] lg:h-[550px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Call button */}
      {/* <a
        href="tel:+911234567890"
        className="fixed right-6 bottom-6 z-50 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3"
        aria-label="Call"
      >
        <PhoneCall className="h-5 w-5" />
        <span className="font-medium">Call</span>
      </a> */}
    </section>
  );
}
