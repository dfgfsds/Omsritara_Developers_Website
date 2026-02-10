"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight, Calendar, ArrowUpRight, } from "lucide-react";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { projects, Project } from "@/data/projects";

type FilterType = "all" | "completed" | "ongoing" | "upcoming";

const PropertyCardImage = ({ project }: { project: Project }) => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <div
            className="relative h-60 overflow-hidden cursor-pointer"
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
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase backdrop-blur-md ${project.category === "completed"
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

const ITEMS_PER_PAGE = 4;

export default function PropertiesPage() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [currentPage, setCurrentPage] = useState(1);

    // FILTER
    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    // PAGINATION LOGIC
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProjects = filteredProjects.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);

    return (
        <main className="max-w-7xl mx-auto px-4 py-10 mt-10 md:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-10 font-nunito">

            {/* ================= CONTENT ================= */}
            <section className="lg:col-span-2 order-2 lg:order-1">

                {/* Filter Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { key: "all", label: "All Property" },
                            { key: "completed", label: "For Sale" },
                            { key: "ongoing", label: "For Rent" },
                        ].map((item) => (
                            <button
                                key={item.key}
                                onClick={() => setActiveFilter(item.key as FilterType)}
                                className={`relative px-6 py-2 rounded font-medium transition
                                ${activeFilter === item.key
                                        ? "bg-[#9b0000] text-white after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:border-l-8 after:border-r-8 after:border-t-8 after:border-l-transparent after:border-r-transparent after:border-t-[#9b0000]"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <select className="border border-gray-200 px-4 py-2 rounded text-sm">
                        <option>Sort by Newest</option>
                        <option>Low to High</option>
                        <option>High to Low</option>
                    </select>
                </div>

                {/* PROPERTY GRID */}
                <div className="grid md:grid-cols-2 gap-8 auto-rows-fr">
                    {paginatedProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col h-full shadow-sm"
                        >
                            {/* Image */}
                            <PropertyCardImage project={project} />

                            {/* Content */}
                            <div className="pt-4 pb-6 px-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#9b0000] transition">
                                    {project.name}
                                </h3>

                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                    <MapPin size={16} className="text-[#e29717]" />
                                    <span className="text-sm">{project.location}</span>
                                </div>

                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex items-center gap-2 mb-3">
                                    <Calendar size={16} className="text-[#9b0000]" />
                                    <span className="text-xs text-gray-600">
                                        {project.timeline.status}
                                    </span>
                                </div>

                                {project.priceRange && (
                                    <p className="text-lg font-bold text-[#9b0000] mb-4">
                                        {project.priceRange}
                                    </p>
                                )}

                                <Link
                                    href={`/project/${project.id}`}
                                    className="w-fit mt-auto relative inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-1.5 gap-[10px] group/btn overflow-hidden"
                                >
                                    <span className="relative z-10 text-sm">View Details</span>
                                    <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[32px] h-[32px] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
                                        <ArrowUpRight className="w-5 h-5 font-extrabold" />
                                    </span>
                                    <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover/btn:left-0 z-0"></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ================= PAGINATION ================= */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-10">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded border disabled:opacity-50 cursor-pointer"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 cursor-pointer rounded-full font-semibold
                                ${currentPage === i + 1
                                        ? "bg-[#9b0000] text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setCurrentPage((p) => Math.min(p + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded border disabled:opacity-50 cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                )}

            </section>

            {/* ================= SIDEBAR ================= */}

            <aside className="space-y-8 order-1 lg:order-2">

                {/* ================= ADVANCE SEARCH ================= */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Advance search</h3>
                    <p className="text-sm font-medium mb-3">Filter</p>

                    <div className="space-y-4">
                        <select className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm">
                            <option>Property Status</option>
                        </select>

                        <select className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm">
                            <option>Apartment</option>
                        </select>

                        <select className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm">
                            <option>Max Rooms</option>
                        </select>

                        <div className="grid grid-cols-2 gap-4">
                            <select className="border border-gray-200 rounded-md px-4 py-3 text-sm">
                                <option>Bed</option>
                            </select>
                            <select className="border border-gray-200 rounded-md px-4 py-3 text-sm">
                                <option>Bath</option>
                            </select>
                        </div>

                        <select className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm">
                            <option>Agencies</option>
                        </select>

                        {/* Price */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Price:</span>
                                <span className="font-medium">$2500 - $8000</span>
                            </div>
                            <input type="range" className="w-full accent-[#9b0000]" />
                        </div>

                        {/* Area */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Area:</span>
                                <span className="font-medium">2500 - 6000 sq ft</span>
                            </div>
                            <input type="range" className="w-full accent-[#9b0000]" />
                        </div>

                        <button className="w-full bg-[#9b0000] hover:bg-[#9b0000] text-white py-4 rounded-full font-semibold shadow-md transition">
                            Search
                        </button>
                    </div>
                </div>

                {/* ================= CATEGORY ================= */}
                <div className="bg-white rounded-xl shadow-sm p-6 hidden md:block">
                    <h3 className="text-lg font-semibold mb-4">Category</h3>

                    <ul className="space-y-3 text-sm text-gray-700">
                        {["Apartment", "Villa", "Family House", "Town House", "Offices", "Duplexes"].map(
                            (item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-2 hover:text-orange-500 cursor-pointer transition"
                                >
                                    <ChevronRight size={14} />
                                    {item}()
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* ================= CONTACT INFO ================= */}
                <div className="bg-white rounded-xl shadow-sm p-6 hidden md:block">
                    <h3 className="text-lg font-semibold mb-4">Contact Info</h3>

                    <ul className="space-y-4 text-sm text-gray-700">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-[#9b0000] mt-0.5" />
                            <span>A-32, Albany, Newyork.</span>
                        </li>

                        <li className="flex items-start gap-3">
                            <Phone size={18} className="text-[#9b0000] mt-0.5" />
                            <span>(+066) 518 - 457 - 5181</span>
                        </li>

                        <li className="flex items-start gap-3">
                            <Mail size={18} className="text-[#9b0000] mt-0.5" />
                            <span>Contact@gmail.com</span>
                        </li>
                    </ul>
                </div>

            </aside>


        </main>
    );
}