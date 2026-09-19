"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ServicesSlider() {
  return (
    <section className="pb-10 md:pb-16 bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#9b0000]/10 text-[#9b0000] px-4 py-1.5 rounded-full mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">
            Expert Property <span className="text-[#9b0000]">Solutions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-600 mt-2">
            Comprehensive turnkey property, construction, liaisoning, and asset management services.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="services-swiper"
          >
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <SwiperSlide key={service.id}>
                  <div className="bg-white rounded-3xl p-7 h-full border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-[#9b0000]/10 flex items-center justify-center flex-shrink-0">
                          {IconComponent && <IconComponent className="w-6 h-6 text-[#9b0000]" />}
                        </div>
                        <h3 className="font-bold text-xl text-gray-900">
                          {service.title}
                        </h3>
                      </div>

                      <div className="relative mb-5 overflow-hidden rounded-2xl aspect-[16/9] shadow-sm">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <p className="text-base text-gray-700 leading-relaxed mb-6 line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    <Link href={`/services/${service.id}`} className="flex items-center group gap-3 pt-2">
                      <span className="relative z-10 bg-[#9b0000] text-white rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:bg-yellow-400 group-hover:text-[#9b0000] group-hover:rotate-45 shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                      <span className="text-sm font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#9b0000] transition-colors">
                        View Details
                      </span>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
