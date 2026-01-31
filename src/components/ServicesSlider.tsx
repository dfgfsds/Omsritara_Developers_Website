"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesSlider() {
  return (
    <section className="py-10 md:py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs md:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-900">
            Expert Property Solutions
          </h2>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-10 md:gap-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              {/* Text Side */}
              <div className={`text-left ${index % 2 === 0 ? "md:order-2" : ""}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  <Link href={`/services/${service.id}`} className="hover:text-[#e29717] transition-colors">
                    {service.title}
                  </Link>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-3">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 text-[15px] font-bold uppercase text-gray-900 hover:text-[#e29717] transition-colors mt-auto"
                >
                  Read More <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image Side */}
              <div
                className={`relative h-[300px] w-full rounded-2xl overflow-hidden ${index % 2 === 0 ? "md:order-1" : ""
                  }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
