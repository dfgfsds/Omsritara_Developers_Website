"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/effect-fade";

type FilterType = "all" | "sale" | "rent";

export interface Property {
  _id: string;
  name: string;
  description?: string;
  image_url?: string[];
  listing_type?: string;
  price?: number;
  area_size?: number;
  createdAt?: string;
  isDeleted?: boolean;
  bhk?: string;
  type?: {
    _id?: string;
    name?: string;
  };
  location?: {
    address?: string;
    city?: string;
    state?: string;
  };
}

// Fallback properties to guarantee high visual fidelity when API server is offline
const FALLBACK_PROPERTIES: Property[] = [
  {
    _id: "prop-madison",
    name: "Madison By Omsritara",
    description:
      "Experience the luxury of gated community apartments in Nelson Manickam Road with world-class amenities and premium finishes.",
    image_url: [
      "/assets/about-gallery1.png",
      "/assets/about-gallery2.png",
      "/assets/Myans_Luxury_Villas_1.jpg",
    ],
    listing_type: "sale",
    price: 17100000,
    area_size: 1650,
    bhk: "2 & 3 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Nelson Manickam Road",
      city: "Aminjikarai, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-harrmony",
    name: "Harrmony Residences",
    description:
      "Premium urban residences designed for modern families, featuring signature club amenities and seamless arterial connectivity.",
    image_url: [
      "/assets/about-gallery2.png",
      "/assets/about-gallery3.png",
      "/assets/featured-grid1.jpg",
    ],
    listing_type: "sale",
    price: 13500000,
    area_size: 1420,
    bhk: "2 & 3 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Mount Poonamallee High Road",
      city: "Porur, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-venice",
    name: "Venice Luxury Villas",
    description:
      "Exclusive waterfront contemporary villas along the scenic coastal corridor, crafted with Italian architecture and private decks.",
    image_url: [
      "/assets/Myans_Luxury_Villas_1.jpg",
      "/assets/about-gallery1.png",
      "/assets/about-gallery2.png",
    ],
    listing_type: "sale",
    price: 24500000,
    area_size: 3200,
    bhk: "3 & 4 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Luxury Villa" },
    location: {
      address: "East Coast Road",
      city: "Palavakkam, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-cambridge",
    name: "Cambridge Greens",
    description:
      "Eco-centric high-rise living surrounded by manicured gardens, smart home automation, and rooftop recreation terraces.",
    image_url: [
      "/assets/about-gallery3.png",
      "/assets/featured-grid1.jpg",
      "/assets/about-gallery1.png",
    ],
    listing_type: "sale",
    price: 9800000,
    area_size: 1180,
    bhk: "2 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "Pallavaram - Thoraipakkam Radial Rd",
      city: "Pallavaram, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-balmandaisa",
    name: "Balmandaisa Elite",
    description:
      "Grand signature residences with expansive double-height balconies, infinity rooftop pool, and multi-tier security systems.",
    image_url: [
      "/assets/featured-grid1.jpg",
      "/assets/about-gallery2.png",
      "/assets/Myans_Luxury_Villas_1.jpg",
    ],
    listing_type: "rent",
    price: 65000,
    area_size: 2100,
    bhk: "3 & 4 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Apartments" },
    location: {
      address: "GST Road",
      city: "Tambaram, Chennai",
      state: "Tamil Nadu",
    },
  },
  {
    _id: "prop-luxe",
    name: "Luxe Grand Heights",
    description:
      "A prestigious lifestyle address boasting majestic skyline panoramas, private elevator access, and bespoke clubhouse features.",
    image_url: [
      "/assets/about-gallery1.png",
      "/assets/Myans_Luxury_Villas_1.jpg",
      "/assets/about-gallery3.png",
    ],
    listing_type: "sale",
    price: 28500000,
    area_size: 2850,
    bhk: "3 & 5 BHK",
    createdAt: new Date().toISOString(),
    type: { name: "Penthouse & Flats" },
    location: {
      address: "Arcot Road",
      city: "Vadapalani, Chennai",
      state: "Tamil Nadu",
    },
  },
];

const PropertyCardImage = ({ property }: { property: Property }) => {
  const [swiperInstance, setSwiperInstance] =
    useState<SwiperType | null>(null);

  const images =
    property.image_url && property.image_url.length > 0
      ? property.image_url
      : ["/assets/about-gallery1.png"];

  return (
    <div
      className="relative h-64 w-full overflow-hidden cursor-pointer group/img"
      onMouseEnter={() => {
        if (swiperInstance && swiperInstance.autoplay) {
          swiperInstance.autoplay.start();
        }
      }}
      onMouseLeave={() => {
        if (swiperInstance) {
          swiperInstance.autoplay.stop();
          swiperInstance.slideTo(0);
        }
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        onSwiper={setSwiperInstance}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={images.length > 1}
        nested={true}
        onInit={(swiper) => {
          swiper.autoplay.stop();
        }}
        className="w-full h-full inner-property-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt={`${property.name} - ${index + 1}`}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover/img:scale-108"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Elegant subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-[5]" />

      {/* Top Left: Property Type Badge */}
      <div className="absolute top-3.5 left-3.5 z-10">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-gray-800 shadow-sm backdrop-blur-md flex items-center gap-1">
          <Building2 size={12} className="text-[#9b0000]" />
          {property.type?.name || "Apartment"}
        </span>
      </div>

      {/* Top Right: Status / Listing Badge */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span
          className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${property.listing_type === "rent"
              ? "bg-[#e29717] text-white"
              : "bg-[#9b0000] text-white"
            }`}
        >
          {property.listing_type === "rent" ? "For Rent" : "Ongoing"}
        </span>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 6;

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<"newest" | "low" | "high">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://api.omsritaradevelopers.in/property", {
          timeout: 4000,
        });

        const data = Array.isArray(response?.data?.result)
          ? response.data.result
          : [];

        const activeProperties = [...data].filter(
          (property: Property) => !property?.isDeleted
        );

        if (activeProperties.length > 0) {
          setProperties(activeProperties);
        } else {
          setProperties(FALLBACK_PROPERTIES);
        }
      } catch (error) {
        // Graceful fallback to guarantee page looks stunning even when backend is offline
        setProperties(FALLBACK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  function formatPrice(price?: number, listingType?: string) {
    if (!price) return "Price on Request";
    if (listingType === "rent") {
      return `₹${Number(price).toLocaleString("en-IN")}/mo`;
    }
    if (price >= 10000000) {
      const cr = (price / 10000000).toFixed(2);
      return `Rs. ${cr.replace(/\.00$/, "")}* CR Onwards`;
    }
    if (price >= 100000) {
      const lakhs = (price / 100000).toFixed(1);
      return `Rs. ${lakhs.replace(/\.0$/, "")}* Lakhs`;
    }
    return `₹${Number(price).toLocaleString("en-IN")}`;
  }

  const filteredProperties = useMemo(() => {
    let list =
      activeFilter === "all"
        ? properties
        : properties.filter(
          (p) => p.listing_type?.toLowerCase() === activeFilter
        );

    if (sortBy === "low") {
      list = [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "high") {
      list = [...list].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else {
      list = [...list].sort(
        (a, b) =>
          new Date(b.createdAt || "").getTime() -
          new Date(a.createdAt || "").getTime()
      );
    }
    return list;
  }, [properties, activeFilter, sortBy]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, sortBy]);

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-16 md:py-24">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9b0000]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#e29717]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Ongoing & Premium Homes
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-serif">
            Apartments in <span className="text-[#e29717]">Chennai</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/95 leading-relaxed font-normal">
            Explore premium gated community apartments, luxury flats and
            villas crafted with world-class amenities, prime locations, and
            timeless modern architecture.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="text-yellow-400 font-medium">
              Projects in Chennai
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT (FULL-WIDTH 3-COLUMNS) ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* FILTER & SORT BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200 mb-10">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {[
              { key: "all", label: "All Properties" },
              { key: "sale", label: "Ongoing & Sale" },
              { key: "rent", label: "Rental Homes" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as FilterType)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${activeFilter === tab.key
                    ? "bg-[#9b0000] text-white shadow-md shadow-red-950/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-sm">
            <span className="text-gray-500 text-xs sm:text-sm font-medium">
              Showing{" "}
              <strong className="text-gray-900">
                {filteredProperties.length}
              </strong>{" "}
              properties
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "low" | "high")
              }
              className="bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:border-[#9b0000]"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <div className="h-20 bg-gray-100 animate-pulse" />
                <div className="h-60 bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROPERTIES GRID - DAC DEVELOPERS ARCHITECTURE */}
        {!loading && paginatedProperties.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <Building2 className="w-16 h-16 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-bold text-gray-800">
              No properties found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your filter selection to find available homes.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {paginatedProperties.map((property) => {
              const locationCity =
                property.location?.city ||
                property.location?.address ||
                "Chennai";
              const locationFull = [
                property.location?.address,
                property.location?.city,
              ]
                .filter(Boolean)
                .join(", ");

              const bhkConfig =
                property.bhk ||
                (property.type?.name?.toLowerCase().includes("villa")
                  ? "3 & 4 BHK VILLA"
                  : "2 & 3 BHK APARTMENTS");

              return (
                <article
                  key={property._id}
                  className="minpost_project group bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
                >
                  {/* DAC TOP HEADER: Title & Location */}
                  <div className="projtitle p-5 pb-3.5 border-b border-gray-100/80">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-gray-900 leading-snug group-hover:text-[#9b0000] transition-colors">
                      <Link href={`/property/${slugify(property.name)}`}>
                        {property.name}
                      </Link>
                    </h3>

                    <div className="projlocation flex items-center gap-1.5 text-xs text-gray-500 mt-1 font-medium">
                      <MapPin
                        size={14}
                        className="text-[#e29717] flex-shrink-0"
                      />
                      <span className="truncate">
                        {locationFull || locationCity}
                      </span>
                    </div>
                  </div>

                  {/* DAC MIDDLE: Prominent Image Banner */}
                  <div className="projimage">
                    <PropertyCardImage property={property} />
                  </div>

                  {/* DAC BOTTOM CONTENT: Catchy Tagline + Specs + CTA */}
                  <div className="projcon p-5 pt-4 flex flex-col flex-grow justify-between gap-4">
                    {/* Catchy Subtitle / Intro */}
                    <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed line-clamp-2">
                      Experience the luxury of gated community living in{" "}
                      <strong className="text-gray-950 font-semibold">
                        {locationCity}
                      </strong>
                      . Modern aesthetics, lush green spaces & top amenities.
                    </p>

                    {/* Horizontal Divider / Highlights List (DAC Style) */}
                    <div className="py-2.5 px-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between text-center text-xs font-semibold text-gray-700">
                      <div className="flex-1 truncate uppercase tracking-tight">
                        {bhkConfig}
                      </div>
                      <div className="text-gray-300 px-1 font-normal">|</div>
                      <div className="flex-1 truncate text-[#9b0000] font-bold">
                        {formatPrice(property.price, property.listing_type)}
                      </div>
                      {property.area_size && (
                        <>
                          <div className="text-gray-300 px-1 font-normal">|</div>
                          <div className="flex-1 truncate text-gray-600">
                            {property.area_size} Sq.Ft
                          </div>
                        </>
                      )}
                    </div>

                    {/* DAC Experience the Home CTA Button */}
                    <Link
                      href={`/property/${slugify(property.name)}`}
                      className="w-full relative group/btn overflow-hidden flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#9b0000] hover:bg-[#800000] shadow-sm hover:shadow-md transition-all duration-300 mt-auto"
                    >
                      <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-0.5">
                        Experience the home
                      </span>
                      <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-1">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-14">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${currentPage === i + 1
                    ? "bg-[#9b0000] text-white shadow-md shadow-red-950/20"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}