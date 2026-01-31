"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { services, Service } from "@/data/services";

export default function ServiceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [service, setService] = useState<Service | null>(null);

    useEffect(() => {
        const id = Number(params.id);
        const found = services.find((s) => s.id === id);
        if (!found) {
            router.push("/");
        } else {
            setService(found);
        }
    }, [params.id, router]);

    if (!service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-screen bg-white">
                <Loader2 className="w-12 h-12 text-[#9b0000] animate-spin mb-4" />
                <div className="text-lg font-semibold text-gray-700 animate-pulse">
                    Loading Service Details...
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative mt-14 md:mt-20 bg-gray-50 py-10 md:py-16 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        <span className="text-[#9b0000]">Service Details </span>
                    </h1>

                    <div className="mt-3 md:mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
                        <Link href="/" className="hover:text-[#9b0000] transition">
                            Home
                        </Link>
                        <span>&gt;</span>
                        <span className="text-gray-800 font-medium">Service Details </span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="text-sm text-gray-600 mb-5 md:mb-6 flex gap-2 items-center">
                    <Link href="/" className="hover:text-red-800">Home</Link>
                    <span>&gt;</span>
                    <span className="text-gray-800 font-medium">{service.title}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-5 md:mb-6">{service.title}</h1>

                <div className="relative w-full h-80 mb-6">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                <div
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: service.content }}
                ></div>

                <div className="mt-5 md:mt-6">
                    <button
                        onClick={() => router.back()}
                        className="inline-block px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition cursor-pointer"
                    >
                        Back
                    </button>
                </div>
            </div>
        </>
    );
}
