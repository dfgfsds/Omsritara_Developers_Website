"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { MapPin, Ruler } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(
          "https://api.omsritaradevelopers.in/property"
        );
        setProperties(res?.data.result);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1280px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 8 } },
    },
  });

  // Autoplay
  useEffect(() => {
    if (!instanceRef.current) return;
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
          Featured Properties for Sale
        </h2>

        <div ref={sliderRef} className="keen-slider">
          {properties.map((property: any) => (
            <div key={property.id} className="keen-slider__slide p-2 sm:p-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Image */}
                <div className="relative">
                  <Image
                    src={property.image_url[0]}
                    alt={property.title}
                    width={500}
                    height={300}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-red-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full">
                      For Sale
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-center">
                    <Link href={`/properties/${slugify(property.name)}`}>
                      <h3 className="text-base sm:text-lg font-semibold hover:underline">
                        {property.name}
                      </h3>
                    </Link>
                    <p className="text-red-500 font-bold text-sm sm:text-base">
                      ₹{property.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="flex items-center text-xs sm:text-sm text-gray-600 mt-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                    {property.location.address}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-4 text-[11px] sm:text-sm text-gray-700">
                    <div className="flex items-center gap-1">{property.type.name}</div>
                    <div className="flex items-center gap-1">
                      <Ruler className="w-3 h-3 sm:w-4 sm:h-4" /> {property.area_size} Sq Ft
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
