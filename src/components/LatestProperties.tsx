"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function LatestProperties() {
    const featuredProjects = projects.slice(0, 3);

    return (
        <section className="py-10 md:py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center md:justify-between mb-8 md:mb-12 gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Featured Properties
                    </h2>

                    <Link
                        href="/project"
                        className="flex items-center gap-1.5 text-gray-900 font-semibold hover:text-[#9b0000] transition-colors group w-fit"
                    >
                        <span className="text-sm uppercase tracking-wide">View More</span>
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-45" />
                    </Link>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 overflow-x-auto scrollbar-hide"
                >
                    {featuredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-2 duration-500 flex flex-col h-full"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={project?.image}
                                    alt={project.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                <div className="absolute top-4 right-4">
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

                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
                                        {project.type}
                                    </span>
                                </div>
                            </div>

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
                                    href="#"
                                    className="w-fit mt-auto relative inline-flex items-center justify-center bg-[#9b0000] text-white font-semibold uppercase rounded-full pl-5 pr-2 py-2 gap-2 group/btn overflow-hidden"
                                >
                                    <span className="relative z-10 text-xs">View Details</span>
                                    <span className="relative z-10 bg-[#9b0000] border border-white text-white rounded-full w-[28px] h-[28px] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                    <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-500 transition-all duration-500 group-hover/btn:left-0 z-0"></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
