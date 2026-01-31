"use client";
import Link from "next/link";

export default function ProjectPage() {
    return (
        <>
            <div className="relative mt-16 md:mt-20 bg-gray-50 py-12 md:py-16 overflow-hidden">
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-30 md:opacity-40 pointer-events-none"
                ></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        <span className="text-[#9b0000]">Project </span>
                    </h1>
                    <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600 flex flex-wrap justify-center items-center gap-2">
                        <Link href="/" className="hover:text-[#9b0000] transition">Home</Link>
                        <span>&gt;</span>
                        <span className="text-gray-800 font-medium">Project</span>
                    </div>
                </div>
            </div>
        </>
    );
}
