"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const PropertyCardImage = ({ project }: { project: Project }) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <div
            className="relative h-56 overflow-hidden cursor-pointer"
            onMouseEnter={() => {
                if (swiperInstance && swiperInstance.autoplay) {
                    swiperInstance.autoplay.start();
                }
            }}
            onMouseLeave={() => {
                if (swiperInstance) {
                    swiperInstance.autoplay.stop();
                    swiperInstance.slideTo(0);
                }
            }}
        >
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                onSwiper={setSwiperInstance}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                speed={1200}
                loop={true}
                nested={true}
                onInit={(swiper) => {
                    swiper.autoplay.stop();
                }}
                className="w-full h-full inner-property-swiper"
            >
                {(project.gallery || [project.image]).map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={img}
                                alt={`${project.name} - ${index}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-[5]"></div>

            <div className="absolute top-4 right-4 z-10">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md ${project.category === "completed"
                        ? "bg-green-500/90 text-white"
                        : project.category === "ongoing"
                            ? "bg-yellow-500/90 text-white"
                            : "bg-blue-500/90 text-white"
                        }`}
                >
                    {project.category}
                </span>
            </div>

            <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
                    {project.type}
                </span>
            </div>
        </div>
    );
};

export default function LatestProperties() {
    return (
        <section className="py-10 md:py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center md:justify-between mb-8 md:mb-12 gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Featured Properties
                    </h2>

                    <Link
                        href="/properties"
                        className="flex items-center gap-1.5 text-gray-900 font-semibold hover:text-[#9b0000] transition-colors group w-fit"
                    >
                        <span className="text-sm uppercase tracking-wide">View More</span>
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-45" />
                    </Link>
                </div>

                <div className="w-full">
                    <Swiper
                        modules={[Autoplay]}
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
                                spaceBetween: 24,
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
                        className="pb-5 main-properties-swiper"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project.id} className="!h-auto">
                                <div
                                    className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full border border-gray-100 hover:-translate-y-2"
                                >
                                    <PropertyCardImage project={project} />

                                    <div className="pt-4 pb-5 px-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#9b0000] transition-colors line-clamp-1">
                                            {project.name}
                                        </h3>

                                        <div className="flex items-center gap-1.5 text-gray-600 mb-2">
                                            <MapPin className="w-4 h-4 flex-shrink-0 text-[#e29717]" />
                                            <span className="text-sm line-clamp-1">{project.location}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                                            {project.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-gray-200">
                                            {project.specifications.area && (
                                                <div>
                                                    <p className="text-xs text-gray-500">Area</p>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {project.specifications.area}
                                                    </p>
                                                </div>
                                            )}
                                            {project.specifications.units && (
                                                <div>
                                                    <p className="text-xs text-gray-500">Units</p>
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {project.specifications.units}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5 mb-2">
                                            <Calendar className="w-4 h-4 text-[#9b0000]" />
                                            <p className="text-xs text-gray-600">{project.timeline.status}</p>
                                        </div>

                                        {project.priceRange && (
                                            <div className="mb-3">
                                                <p className="text-base font-bold text-[#9b0000]">
                                                    {project.priceRange}
                                                </p>
                                            </div>
                                        )}

                                        <Link
                                            href={`/project/${project.id}`}
                                            className="w-fit mt-auto relative inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-4 pr-3 py-1.5 gap-2 group/btn overflow-hidden"
                                        >
                                            <span className="relative z-10 tracking-wide text-xs">View Details</span>
                                            <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[28px] h-[28px] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </span>
                                            <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover/btn:left-0 z-0"></span>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
