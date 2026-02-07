"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ServicesSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    cssEase: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
    pauseOnHover: true,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section className="pb-10 md:pb-16 bg-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs md:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-900">
            Expert Property Solutions
          </h2>
        </div>

        {/* Slider */}
        <div className="w-full">
          <Slider {...settings} className="service-slider">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="px-3">
                  <div className="bg-white rounded-[20px] p-6 h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-9 h-9 rounded-lg bg-transparent flex items-center justify-center flex-shrink-0">
                        {IconComponent && <IconComponent className="w-7 h-7 text-[#9b0000]" />}
                      </div>
                      <h3 className="font-bold text-[20px] text-gray-900">
                        {service.title}
                      </h3>
                    </div>

                    <div className="relative mb-5">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={400}
                        height={176}
                        className="h-44 w-full object-cover rounded-[10px]"
                      />
                    </div>

                    <p className="text-[16px] text-gray-500 mb-6 line-clamp-2">
                      {service.description}
                    </p>

                    <Link href={`/services/${service.id}`} className="flex items-center group gap-3">
                      <span className="relative z-10 bg-[#9b0000] border border-white text-white rounded-full w-[36px] h-[36px] flex items-center justify-center transition-transform duration-300 group-hover:bg-yellow-400 group-hover:text-[#9b0000] group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5 font-extrabold" />
                      </span>
                      <span className="text-[16px] font-semibold text-gray-900">View Details</span>
                    </Link>

                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
}
