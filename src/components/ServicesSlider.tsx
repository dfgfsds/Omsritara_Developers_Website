"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Multi Store Construction",
    description: "We verify specialized layout plans for high-rise multi-store buildings, ensuring structural integrity, aesthetic appeal, and functional efficiency for commercial and residential complexes.",
    image: "/assets/land/image-03.webp",
    link: "#",
  },
  {
    id: 2,
    title: "Individual House Construction",
    description: "Build your dream home with our customized construction services. From initial design to final handover, we focus on quality materials, modern architecture, and personal preferences.",
    image: "/assets/land/image-04.webp",
    link: "#",
  },
  {
    id: 3,
    title: "Plotted Development",
    description: "Premium plotted  developments in strategic locations, offering excellent investment opportunities with crystal clear titles and well-planned infrastructure.",
    image: "/assets/land/image-01.webp",
    link: "#",
  },
  {
    id: 4,
    title: "Buy/Sell Property",
    description: "Seamless property transactions with our expert guidance. Whether buying your first home or selling an asset, we ensure transparent deals and the best market value.",
    image: "/assets/land/image-02.webp",
    link: "#",
  },
  {
    id: 5,
    title: "Liasioning and Approvals",
    image:
      "https://cdn.prod.website-files.com/676e863e8c931682a197e8a2/684687bf92e867ed8283e099_how-to-get-out-of-a-commercial-lease-business-guide-2025.webp",
    description: "We handle all necessary government liaisoning and approvals to ensure your project complies with regulations.",
    link: "#",
  },
];

export default function ServicesSlider() {
  return (
    <section className="py-10 md:py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs md:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 text-gray-900">
            Expert Property Solutions
          </h2>
        </div>

        {/* Services List */}
        <div className="flex flex-col gap-10 md:gap-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
            >
              {/* Text Side */}
              <div className={`text-left ${index % 2 === 0 ? "md:order-2" : ""}`}>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  <Link href={service.link} className="hover:text-[#e29717] transition-colors">
                    {service.title}
                  </Link>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-3">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-2 text-[15px] font-bold uppercase text-gray-900 hover:text-[#e29717] transition-colors mt-auto"
                >
                  Read More <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Image Side */}
              <div
                className={`relative h-[300px] w-full rounded-2xl overflow-hidden ${index % 2 === 0 ? "md:order-1" : ""
                  }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
