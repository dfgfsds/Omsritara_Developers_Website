import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services, Service } from "@/data/services";
import BackButton from "@/components/BackButton";

// Generate static params for all service pages at build time
export async function generateStaticParams() {
    return services.map((service) => ({
        id: service.id.toString(),
    }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramId } = await params;
    const id = Number(paramId);
    const service = services.find((s) => s.id === id);

    if (!service) {
        notFound();
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
                    <BackButton />
                </div>
            </div>
        </>
    );
}
