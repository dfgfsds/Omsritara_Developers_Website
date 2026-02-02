"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { MapPin, Calendar, ArrowUpRight, CheckCircle, Building2, TrendingUp, Users } from "lucide-react";

type FilterType = "all" | "completed" | "ongoing" | "upcoming";

export default function ProjectPage() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    const filteredProjects = activeFilter === "all"
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const stats = [
        { label: "Total Projects", value: "120+", icon: Building2 },
        { label: "Completed Projects", value: projects.filter(p => p.category === "completed").length, icon: CheckCircle },
        { label: "Ongoing Projects", value: projects.filter(p => p.category === "ongoing").length, icon: TrendingUp },
        { label: "Happy Families", value: "500+", icon: Users },
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="relative mt-14 md:mt-20 bg-gray-50 py-10 md:py-16 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        <span className="text-[#9b0000]">Our Projects</span>
                    </h1>

                    <div className="mt-3 md:mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
                        <Link href="/" className="hover:text-[#9b0000] transition">
                            Home
                        </Link>
                        <span>&gt;</span>
                        <span className="text-gray-800 font-medium">Projects</span>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <section className="py-8 md:py-10 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center p-3 md:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                            >
                                <div className="flex-shrink-0 mr-3 md:mr-4">
                                    <stat.icon className="w-8 h-8 md:w-12 md:h-12 text-[#9b0000]" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                        {stat.value}
                                    </h3>
                                    <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter Tabs */}
            <section className="py-6 md:py-8 bg-white sticky border-b">
                <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
                    <div className="flex md:flex-wrap md:justify-center gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-0">
                        {[
                            { key: "all", label: "All Projects" },
                            { key: "completed", label: "Completed" },
                            { key: "ongoing", label: "Ongoing" },
                            { key: "upcoming", label: "Upcoming" }
                        ].map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key as FilterType)}
                                className={`px-6 py-2.5 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-base uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${activeFilter === filter.key
                                    ? "bg-[#9b0000] text-white scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-10 md:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-16">
                            <Building2 className="w-16 h-16 mx-auto text-gray-500 mb-4" />
                            <p className="text-xl text-gray-800">No projects found in this category</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
                                >
                                    {/* Project Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4">
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

                                        {/* Type Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-800 backdrop-blur-sm">
                                                {project.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="pt-4 pb-6 px-6 flex flex-col flex-grow">
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#9b0000] transition-colors">
                                            {project.name}
                                        </h3>

                                        <div className="flex items-center gap-[6px] text-gray-600 mb-2.5">
                                            <MapPin className="w-4 h-4 flex-shrink-0 text-[#e29717]" />
                                            <span className="text-sm">{project.location}</span>
                                        </div>

                                        <p className="text-gray-600 text-sm leading-relaxed mb-2.5 line-clamp-2">
                                            {project.description}
                                        </p>

                                        {/* Quick Stats */}
                                        <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-gray-300">
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

                                        {/* Timeline Status */}
                                        <div className="flex items-center gap-[6px] mb-2">
                                            <Calendar className="w-4 h-4 text-[#9b0000]" />
                                            <p className="text-xs text-gray-600">{project.timeline.status}</p>
                                        </div>

                                        {/* Price Range */}
                                        {project.priceRange && (
                                            <div className="mb-8">
                                                <p className="text-lg font-bold text-[#9b0000]">
                                                    {project.priceRange}
                                                </p>
                                            </div>
                                        )}

                                        {/* View Details Button */}
                                        <button className="w-full mt-auto relative inline-flex items-center justify-center bg-[#9b0000] text-white font-semibold uppercase rounded-full pl-6 pr-2 py-2 gap-3 group/btn overflow-hidden">
                                            <span className="relative z-10 text-sm">View Details</span>
                                            <span className="relative z-10 bg-[#9b0000] border border-white text-white rounded-full w-[32px] h-[32px] flex items-center justify-center transition-transform duration-300 group-hover/btn:rotate-45">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </span>
                                            <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover/btn:left-0 z-0"></span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
