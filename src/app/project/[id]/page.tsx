"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import {
    MapPin,
    Calendar,
    CheckCircle,
    Building2,
    ArrowLeft,
    Phone,
    Mail,
    Maximize,
    Layers,
    Info,
    Download,
    ArrowRight,
    ArrowUpRight
} from "lucide-react";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        params.then((resolvedParams) => {
            setId(resolvedParams.id);
        });
    }, [params]);

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
            </div>
        );
    }

    const project = projects.find((p) => p.id === id);

    if (!project) {
        return notFound();
    }

    return (
        <main className="bg-white min-h-screen font-sans">
            {/* 1. Grounded Corporate Hero */}
            <section className="relative h-[55vh] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-black/5" />

                {/* Back Link Overlay */}
                <div className="absolute top-8 left-4 md:left-12 z-20">
                    <Link
                        href="/project"
                        className="inline-flex items-center text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-widest transition-all"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Portfolio
                    </Link>
                </div>
            </section>

            {/* 2. Floating Info Card & Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
                <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 rounded-lg border border-gray-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-[#9b0000] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded">
                                    {project.category}
                                </span>
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 border border-gray-200 rounded">
                                    {project.type}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
                                {project.name}
                            </h1>
                            <div className="flex items-center text-gray-500 font-medium">
                                <MapPin className="w-5 h-5 mr-2 text-[#9b0000]" />
                                {project.location}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="flex-1 md:flex-none bg-[#9b0000] text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-widest transition-all hover:bg-[#800000] flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Enquire
                            </button>
                            <button className="flex-1 md:flex-none border border-gray-900 text-gray-900 px-8 py-4 rounded font-bold text-sm uppercase tracking-widest transition-all hover:bg-gray-50 flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> brochure
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Main Content Architecture */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

                        {/* Narrative Column */}
                        <div className="lg:col-span-8">
                            <div className="mb-20">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-1 bg-[#9b0000]" />
                                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">Architectural Narrative</h2>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-8 leading-snug">
                                    Crafting environments that define excellence in modern construction.
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed font-normal mb-8">
                                    {project.description}
                                </p>
                            </div>

                            <div className="mb-20">
                                <h4 className="text-xl font-bold text-gray-900 mb-10 pb-4 border-b border-gray-100 flex items-center gap-3">
                                    <Info className="w-5 h-5 text-[#9b0000]" />
                                    Core Project Highlights
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {project.features.map((feature, index) => (
                                        <div key={index} className="flex items-center py-4 border-b border-gray-50 group">
                                            <div className="w-2 h-2 rounded-full bg-gray-300 mr-4 group-hover:bg-[#9b0000] transition-colors" />
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detailed Technical Specifications */}
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-10 pb-4 border-b border-gray-100 flex items-center gap-3">
                                    <Layers className="w-5 h-5 text-[#9b0000]" />
                                    Technical Data Matrix
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="bg-gray-50 p-8 rounded-lg">
                                        <Maximize className="w-6 h-6 text-gray-400 mb-6" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Coverage</p>
                                        <p className="text-xl font-bold text-gray-900">{project.specifications.area}</p>
                                    </div>
                                    <div className="bg-gray-50 p-8 rounded-lg">
                                        <Building2 className="w-6 h-6 text-gray-400 mb-6" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Inventory</p>
                                        <p className="text-xl font-bold text-gray-900">{project.specifications.units}</p>
                                    </div>
                                    <div className="bg-gray-50 p-8 rounded-lg">
                                        <ArrowUpRight className="w-6 h-6 text-gray-400 mb-6" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Level Count</p>
                                        <p className="text-xl font-bold text-gray-900">{project.specifications.floors || "Multiple"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Snapshot Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-12 space-y-8">
                                <div className="bg-[#fcfcfc] border border-gray-100 p-10 rounded-lg shadow-sm">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#9b0000] mb-8">Executive Summary</h4>

                                    <div className="space-y-8">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Pricing Structure</p>
                                            <p className="text-2xl font-bold text-gray-900">{project.priceRange}</p>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm font-semibold text-gray-600">Status</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">{project.timeline.status}</span>
                                            </div>
                                            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm font-semibold text-gray-600">Compliance</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Fully Approved</span>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Link href="tel:+917779958889" className="w-full bg-gray-900 text-white py-5 rounded font-bold uppercase tracking-widest text-xs text-center transition-all hover:bg-black block">
                                                Request Site Visit
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Trust Card */}
                                <div className="p-8 bg-gray-50 border border-gray-100 rounded-lg">
                                    <p className="text-xs font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Premium Amenities
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.specifications.amenities?.slice(0, 6).map((item, i) => (
                                            <span key={i} className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded uppercase tracking-wider">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* 4. Global Contact Hub */}
            <section className="bg-gray-50 py-24 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h5 className="text-xs font-bold uppercase tracking-[0.5em] text-[#9b0000] mb-6">Investment Inquiries</h5>
                    <h6 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-12">
                        Partner with Omsritara for your next landmark address.
                    </h6>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="tel:+917779958889" className="flex items-center gap-3 px-10 py-5 bg-[#9b0000] text-white rounded font-bold uppercase tracking-widest text-xs hover:bg-[#800000] transition-all">
                            <Phone className="w-4 h-4" /> Call Advisor
                        </Link>
                        <Link href="mailto:info@omsritaradevelopers.in" className="flex items-center gap-3 px-10 py-5 bg-white border border-gray-900 text-gray-900 rounded font-bold uppercase tracking-widest text-xs hover:bg-gray-900 hover:text-white transition-all">
                            <Mail className="w-4 h-4" /> Official Email
                        </Link>
                    </div>
                    <div className="mt-16 text-gray-400 text-xs font-medium uppercase tracking-[0.3em]">
                        Experience Clarity. Experience Excellence.
                    </div>
                </div>
            </section>
        </main>
    );
}
