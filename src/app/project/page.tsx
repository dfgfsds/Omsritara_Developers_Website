"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  CheckCircle,
  Building2,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { Project } from "@/data/projects";

type FilterType = "all" | "completed" | "ongoing" | "upcoming";

const PropertyCardImage = ({ project }: { project: Project }) => {
  const [swiperInstance, setSwiperInstance] =
    useState<SwiperType | null>(null);

  const images = project.gallery || [project.image];

  return (
    <div
      className="relative h-64 overflow-hidden cursor-pointer group/img"
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
          delay: 2200,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
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
                alt={`${project.name} - ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-108"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-[5]" />

      {/* Top Left: Type Badge */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-sm backdrop-blur-md flex items-center gap-1">
          <Building2 size={12} className="text-[#9b0000]" />
          {project.type}
        </span>
      </div>

      {/* Top Right: Status Badge */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span
          className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
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

export default function ProjectPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const stats = [
    { label: "Total Projects", value: "120+", icon: Building2 },
    {
      label: "Completed Projects",
      value: projects.filter((p) => p.category === "completed").length,
      icon: CheckCircle,
    },
    {
      label: "Ongoing Projects",
      value: projects.filter((p) => p.category === "ongoing").length,
      icon: TrendingUp,
    },
    { label: "Happy Families", value: "500+", icon: Users },
  ];

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-16 md:py-24">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9b0000]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#e29717]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Masterpiece Landmarks
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-serif">
            Our Landmark <span className="text-[#e29717]">Projects</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Discover Omsritara&apos;s signature ongoing, upcoming, and completed
            residential developments across Chennai&apos;s premier addresses.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-medium">Projects</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center p-4 rounded-2xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#9b0000]/10 flex items-center justify-center flex-shrink-0 mr-3.5">
                  <stat.icon className="w-6 h-6 text-[#9b0000]" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto scrollbar-hide pb-2 md:pb-0">
            {[
              { key: "all", label: "All Projects" },
              { key: "ongoing", label: "Ongoing" },
              { key: "upcoming", label: "Upcoming" },
              { key: "completed", label: "Completed" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as FilterType)}
                className={`px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 whitespace-nowrap flex-shrink-0 cursor-pointer ${
                  activeFilter === filter.key
                    ? "bg-[#9b0000] text-white shadow-md shadow-red-950/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid (DAC Developers Style) */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-3" />
              <p className="text-lg font-bold text-gray-800">
                No projects found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {filteredProjects.map((project) => {
                const isVilla = project.type
                  .toLowerCase()
                  .includes("villa");
                const configText =
                  project.specifications.units ||
                  (isVilla ? "3 & 4 BHK VILLA" : "2 & 3 BHK APARTMENTS");

                return (
                  <article
                    key={project.id}
                    className="minpost_project group bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
                  >
                    {/* DAC TOP HEADER: Title & Location */}
                    <div className="projtitle p-5 pb-3.5 border-b border-gray-100/80">
                      <h3 className="text-lg sm:text-xl font-bold font-serif text-gray-900 leading-snug group-hover:text-[#9b0000] transition-colors line-clamp-1">
                        <Link href={`/project/${project.id}`}>
                          {project.name}
                        </Link>
                      </h3>

                      <div className="projlocation flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-medium">
                        <MapPin
                          size={14}
                          className="text-[#e29717] flex-shrink-0"
                        />
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>

                    {/* DAC MIDDLE: Prominent Image Banner */}
                    <div className="projimage">
                      <PropertyCardImage project={project} />
                    </div>

                    {/* DAC BOTTOM CONTENT: Catchy Tagline + Specs + CTA */}
                    <div className="projcon p-5 pt-4 flex flex-col flex-grow justify-between gap-4">
                      {/* Short Description */}
                      <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Specs Divider Row (DAC Style) */}
                      <div className="py-2.5 px-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-center text-xs font-semibold text-gray-700">
                        <div className="flex-1 truncate uppercase tracking-tight">
                          {configText}
                        </div>
                        {project.priceRange && (
                          <>
                            <div className="text-gray-300 px-1 font-normal">
                              |
                            </div>
                            <div className="flex-1 truncate text-[#9b0000] font-bold">
                              {project.priceRange}
                            </div>
                          </>
                        )}
                        {project.specifications.area && (
                          <>
                            <div className="text-gray-300 px-1 font-normal">
                              |
                            </div>
                            <div className="flex-1 truncate text-gray-600">
                              {project.specifications.area}
                            </div>
                          </>
                        )}
                      </div>

                      {/* DAC Experience the Home CTA */}
                      <Link
                        href={`/project/${project.id}`}
                        className="w-full relative group/btn overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-sm hover:shadow-md transition-all duration-300 mt-auto"
                      >
                        <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-0.5">
                          Experience the home
                        </span>
                        <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
