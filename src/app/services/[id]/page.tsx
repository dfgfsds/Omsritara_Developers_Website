import ServiceLayout from "@/components/ServiceLayout";
import ServicesSidebar from "@/components/ServicesSidebar";
import FAQ from "@/components/FAQ";
import { services } from "@/data/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
    return services.map((s) => ({
        id: s.id.toString(),
    }));
}

export default async function SingleServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const service = services.find((s) => s.id === parseInt(id));

    if (!service) {
        notFound();
    }

    return (
        <>
            <div className="relative mt-14 md:mt-20 bg-gray-50 py-10 md:py-16 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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

            <ServiceLayout
                left={
                    <div className="space-y-6">
                        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                            <div className="relative h-[420px] mb-8 rounded-lg overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">
                                {service.title}
                            </h2>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: service.content,
                                }}
                            />
                        </div>
                        {service.faqs && service.faqs.length > 0 && (
                            <FAQ faqs={service.faqs} />
                        )}
                    </div>
                }
                right={<ServicesSidebar activeId={service.id} />}
            />
        </>
    );
}