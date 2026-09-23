"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  ArrowUpRight,
  Building2,
  Sparkles,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { projects, Project } from "@/data/projects";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

type CategoryFilter = "all" | "ongoing" | "completed" | "upcoming";

const PropertyCardImage = ({ project }: { project: Project }) => {
  const [swiperInstance, setSwiperInstance] =
    useState<SwiperType | null>(null);

  const images = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];

  return (
    <div
      className="relative h-60 overflow-hidden cursor-pointer group/img"
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
          delay: 2400,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={images.length > 1}
        nested={true}
        onInit={(swiper) => {
          swiper.autoplay.stop();
        }}
        className="w-full h-full inner-property-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`${project.name} - ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-108"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none z-[5]" />

      {/* Top Left: Actual Project Type from data */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-gray-800 shadow-sm backdrop-blur-md flex items-center gap-1">
          <Building2 size={11} className="text-[#9b0000]" />
          {project.type}
        </span>
      </div>

      {/* Top Right: Actual Category from data */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${
            project.category === "completed"
              ? "bg-emerald-600 text-white"
              : project.category === "ongoing"
              ? "bg-[#9b0000] text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {project.category}
        </span>
      </div>
    </div>
  );
};

export default function LatestProperties() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <section className="py-14 md:py-20 bg-gray-50/90 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9b0000]/10 text-[#9b0000] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={12} />
              Featured Developments
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ongoing & Landmark <span className="text-[#9b0000]">Projects</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Explore our verified real estate developments, ongoing constructions, and handed-over landmarks in Chennai.
            </p>
          </div>

          <Link
            href="/project"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-sm hover:shadow transition-all duration-300 group cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>

        {/* Dynamic Category Filter Tabs based on projects.ts data */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {[
            { key: "all", label: "All Developments", count: projects.length },
            {
              key: "ongoing",
              label: "Ongoing Projects",
              count: projects.filter((p) => p.category === "ongoing").length,
            },
            {
              key: "completed",
              label: "Completed Landmarks",
              count: projects.filter((p) => p.category === "completed").length,
            },
            {
              key: "upcoming",
              label: "Upcoming Launches",
              count: projects.filter((p) => p.category === "upcoming").length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as CategoryFilter)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? "bg-[#9b0000] text-white shadow-md shadow-red-950/20"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Swiper Slider with Actual Project Data */}
        <div className="w-full">
          <Swiper
            key={activeTab}
            modules={[Autoplay]}
            spaceBetween={28}
            slidesPerView={1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            loop={filteredProjects.length > 2}
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
                spaceBetween: 28,
              },
            }}
            className="pb-5 main-properties-swiper"
          >
            {filteredProjects.map((project) => {
              // Extract real approval from actual features if available
              const approvalFeature = project.features.find(
                (f) =>
                  f.toLowerCase().includes("cmda") ||
                  f.toLowerCase().includes("dtcp")
              );

              // Use actual units from data, or actual type if units is not specified
              const unitText = project.specifications.units || project.type;

              // Use actual price if present, else actual timeline status
              const priceText =
                project.priceRange || project.timeline.status || "Price on Request";

              return (
                <SwiperSlide key={project.id} className="!h-auto">
                  <article className="minpost_project group bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full">
                    {/* DAC TOP: Project Name & Location from actual data */}
                    <div className="projtitle p-5 pb-3.5 border-b border-gray-100 flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-[#9b0000] transition-colors line-clamp-1">
                          <Link href={`/project/${project.id}`}>
                            {project.name}
                          </Link>
                        </h3>

                        {approvalFeature && (
                          <span className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-[#e29717] border border-amber-200/60">
                            {approvalFeature}
                          </span>
                        )}
                      </div>

                      <div className="projlocation flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <MapPin
                          size={13}
                          className="text-[#e29717] flex-shrink-0"
                        />
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>

                    {/* DAC MIDDLE: Image Frame */}
                    <div className="projimage">
                      <PropertyCardImage project={project} />
                    </div>

                    {/* DAC BOTTOM: Actual description + Actual specs + CTA */}
                    <div className="projcon p-5 pt-4 flex flex-col flex-grow justify-between gap-4">
                      {/* Actual Project Description */}
                      <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Actual Specifications Divider Row */}
                      <div className="py-2.5 px-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-center text-xs font-semibold text-gray-700">
                        {/* 1. Actual Units/Type */}
                        <div className="flex-1 truncate uppercase tracking-tight text-gray-800">
                          {unitText}
                        </div>

                        <div className="text-gray-300 px-1 font-normal">|</div>

                        {/* 2. Actual Price or Timeline */}
                        <div className="flex-1 truncate text-gray-900 font-bold">
                          {priceText}
                        </div>

                        {/* 3. Actual Area if present in data */}
                        {project.specifications.area && (
                          <>
                            <div className="text-gray-300 px-1 font-normal">|</div>
                            <div className="flex-1 truncate text-gray-600">
                              {project.specifications.area}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Actual Timeline Status from data */}
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <Calendar size={13} className="text-[#9b0000] flex-shrink-0" />
                        <span className="truncate">{project.timeline.status}</span>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/project/${project.id}`}
                        className="w-full relative group/btn overflow-hidden flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-sm transition-all duration-300 mt-auto"
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-0.5">
                          Experience the home
                        </span>
                        <span className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                          <ArrowUpRight className="w-3 h-3 text-white" />
                        </span>
                      </Link>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
