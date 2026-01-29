"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useEffect } from "react";

const services = [
  {
    id: 1,
    title: "Multi Store Construction",
    image: "/assets/land/image-03.webp",
    //link: "/services-details",
  },
  {
    id: 2,
    title: "Individual House Construction",
    image: "/assets/land/image-04.webp",
    //link: "/services-details",
  },
  {
    id: 3,
    title: "Plotted Development",
    image: "/assets/land/image-01.webp",
    //link: "/services-details",
  },
  {
    id: 4,
    title: "Buy/Sell Property",
    image: "/assets/land/image-02.webp",
    //link: "/services-details",
  },
  /*
  {
    id: 5,
    title: "Commercial Leasing",
    image:
      "https://cdn.prod.website-files.com/676e863e8c931682a197e8a2/684687bf92e867ed8283e099_how-to-get-out-of-a-commercial-lease-business-guide-2025.webp",
    link: "/services-details",
  },
  */
];

export default function ServicesSlider() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1280px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 768px)": { slides: { perView: 1, spacing: 8 } },
    },
  });

  // ✅ autoplay
  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [instanceRef]);


  return (
    <section className=" md:py-16 bg-white w-full">
      <div className="w-full px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 rounded-full">
            Our Services
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-gray-900">
            Expert Property Solutions
          </h2>
        </div>

        {/* Keen Slider */}
        <div ref={sliderRef} className="keen-slider">
          {services.map((service) => (
            <div key={service.id} className="keen-slider__slide">
              <div className="rounded-2xl overflow-hidden border border-gray-300 transition">
                <div className="relative w-full h-52 md:h-56 lg:h-60">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 text-start">
                  <h4 className="text-lg md:text-xl mb-4 text-gray-900">
                    <a className="hover:text-blue-600">
                      {service.title}
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
