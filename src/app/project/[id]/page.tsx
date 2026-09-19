"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Share2,
  Home,
  Bath,
  BedDouble,
  LandPlot,
  MapPin,
  ExternalLink,
} from "lucide-react";
import PropertyDetail from "@/components/PropertyDetail";

// Safely convert any Google Maps URL or fallback address to an embeddable URL without X-Frame-Options errors
function getGoogleMapsEmbedUrl(
  rawUrl?: string | null,
  fallbackAddress?: string | null
): string | null {
  let url = (rawUrl || "").trim();

  // If user pasted an iframe tag, extract src
  if (url.includes("<iframe")) {
    const srcMatch = url.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      url = srcMatch[1];
    }
  }

  // If already a valid maps embed URL
  if (
    url.includes("google.com/maps/embed") ||
    url.includes("maps.google.com/maps/embed")
  ) {
    return url;
  }

  // Bare google domain
  const isBareGoogle = /^https?:\/\/(www\.)?google\.[a-z.]+(\/maps)?\/?$/i.test(url);
  if (isBareGoogle || !url) {
    if (fallbackAddress && fallbackAddress.trim()) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(
        fallbackAddress.trim()
      )}&output=embed`;
    }
    return null;
  }

  // Standard google maps links
  if (url.includes("google.com/maps") || url.includes("maps.google.com")) {
    if (url.includes("?q=") || url.includes("&q=")) {
      const sep = url.includes("?") ? "&" : "?";
      return url.includes("output=embed") ? url : `${url}${sep}output=embed`;
    }

    const placeMatch = url.match(/maps\/place\/([^\/@?#]+)/i);
    if (placeMatch && placeMatch[1]) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
      return `https://maps.google.com/maps?q=${encodeURIComponent(
        place
      )}&output=embed`;
    }

    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
    }

    if (fallbackAddress && fallbackAddress.trim()) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(
        fallbackAddress.trim()
      )}&output=embed`;
    }

    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}output=embed`;
  }

  // Custom maps / OSM
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (fallbackAddress && fallbackAddress.trim()) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      fallbackAddress.trim()
    )}&output=embed`;
  }

  return null;
}

interface NearbyPlace {
  _id?: string;
  name?: string;
  type?: string;
  distance?: number;
  distance_unit?: string;
}

interface Property {
  _id: string;
  name: string;
  type?: {
    _id?: string;
    name?: string;
    description?: string;
  };
  listing_type?: string;
  description?: string;
  area_size?: number;
  area_unit?: string;
  price?: number;
  price_per_sqft?: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  floor_number?: number;
  total_floors?: number;
  furnishing?: string;
  facing?: string;
  construction_status?: string;
  possession_date?: string;
  property_age?: number;
  parking?: number;
  amenities?: string[];
  nearby_places?: NearbyPlace[];
  image_url?: string[];
  map_url?: string;
  pincode?: string;
  owner_name?: string;
  developer_name?: string;
  project_name?: string;
  status?: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  isDeleted?: boolean;
}

interface ApiResponse {
  result: Property[];
  msg?: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const formatPrice = (price?: number) => {
  if (!price) return "Price on Request";

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }

  return `₹${price.toLocaleString("en-IN")}`;
};

const formatNumber = (value?: number) => {
  if (value === undefined || value === null) return "-";
  return value.toLocaleString("en-IN");
};

export default function ProjectDetailPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://api.omsritaradevelopers.in/property", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }

        const data: ApiResponse = await response.json();

        const currentSlug = slugify(
          window.location.pathname.split("/").filter(Boolean).pop() || ""
        );

        const matchedProperty = data.result?.find(
          (item) =>
            !item.isDeleted &&
            slugify(item.name || "") === currentSlug
        );

        if (!matchedProperty) {
          setNotFound(true);
          return;
        }

        setProperty(matchedProperty);
      } catch (error) {
        console.error("Property fetch error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-600 text-lg">Loading property...</div>
      </div>
    );
  }

  if (notFound || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Property Not Found
        </h1>

        <p className="text-gray-500 mb-5 text-center">
          The property you are looking for is not available.
        </p>

        <Link
          href="/"
          className="bg-[#9b0000] text-white px-5 py-2 rounded-md"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const location = [
    property.project_name,
    property.owner_name,
    property.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  const nearbyPlaces = property.nearby_places || [];

  const features = property.amenities || [];

  return (
    <div className="bg-[#fafafa]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-2">
          <Link
            href="/"
            className="text-[#9b0000] hover:underline"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/project"
            className="text-gray-600 hover:text-gray-900"
          >
            Projects
          </Link>

          <span>/</span>

          <span className="text-gray-900 font-semibold truncate max-w-xs">
            {property.name}
          </span>
        </div>
      </div>

      {/* Property Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-gray-200">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="bg-[#9b0000]/10 text-[#9b0000] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {property.listing_type || property.status || "Property"}
              </span>
              {property.type?.name && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {property.type.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight">
              {property.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#e29717]" />
                {location || "Chennai, Tamil Nadu"}
              </span>

              {property.bedrooms !== undefined && (
                <span className="flex items-center gap-1.5 font-medium">
                  <BedDouble className="w-4 h-4 text-gray-500" />
                  {property.bedrooms} BHK
                </span>
              )}

              {property.bathrooms !== undefined && (
                <span className="flex items-center gap-1.5 font-medium">
                  <Bath className="w-4 h-4 text-gray-500" />
                  {property.bathrooms} Baths
                </span>
              )}

              {property.area_size !== undefined && (
                <span className="flex items-center gap-1.5 font-medium">
                  <LandPlot className="w-4 h-4 text-gray-500" />
                  {formatNumber(property.area_size)} {property.area_unit || "SqFt"}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-3xl sm:text-4xl font-bold font-serif text-[#9b0000]">
              {formatPrice(property.price)}
            </div>

            <button
              type="button"
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.share) {
                  navigator.share({
                    title: property.name,
                    text: property.description || property.name,
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center gap-2 bg-[#9b0000] text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#7e0000] transition shadow-md cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <div className="max-w-7xl mx-auto px-4">
        <PropertyDetail />
      </div>

      {/* Property Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-6">
              Property Overview
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                <Home className="w-6 h-6 text-gray-400" />

                <div>
                  <p className="text-gray-800 font-medium">
                    Type
                  </p>

                  <p className="text-gray-500">
                    {property.type?.name || "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                <Bath className="w-6 h-6 text-gray-400" />

                <div>
                  <p className="text-gray-800 font-medium">
                    Baths
                  </p>

                  <p className="text-gray-500">
                    {property.bathrooms ?? "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                <BedDouble className="w-6 h-6 text-gray-400" />

                <div>
                  <p className="text-gray-800 font-medium">
                    Beds
                  </p>

                  <p className="text-gray-500">
                    {property.bedrooms ?? "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                <LandPlot className="w-6 h-6 text-gray-400" />

                <div>
                  <p className="text-gray-800 font-medium">
                    Area
                  </p>

                  <p className="text-gray-500">
                    {formatNumber(property.area_size)}{" "}
                    {property.area_unit || "SqFt"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Property details
            </h2>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Beds
                  </span>
                  <span className="text-gray-900">
                    {property.bedrooms ?? "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Area
                  </span>
                  <span className="text-gray-900">
                    {formatNumber(property.area_size)}{" "}
                    {property.area_unit || "SqFt"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Type
                  </span>
                  <span className="text-gray-900">
                    {property.type?.name || "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Status
                  </span>
                  <span className="text-gray-900">
                    {property.construction_status ||
                      property.status ||
                      "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Property ID
                  </span>
                  <span className="text-gray-900">
                    {property._id}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Facing
                  </span>
                  <span className="text-gray-900">
                    {property.facing || "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    BHK Type
                  </span>
                  <span className="text-gray-900">
                    {property.bedrooms
                      ? `${property.bedrooms} BHK`
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Price
                  </span>
                  <span className="text-gray-900">
                    {formatPrice(property.price)}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Price / SqFt
                  </span>
                  <span className="text-gray-900">
                    {property.price_per_sqft
                      ? `₹${formatNumber(property.price_per_sqft)}`
                      : "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Balconies
                  </span>
                  <span className="text-gray-900">
                    {property.balconies ?? "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Floor
                  </span>
                  <span className="text-gray-900">
                    {property.floor_number !== undefined
                      ? `${property.floor_number}${property.total_floors
                        ? ` / ${property.total_floors}`
                        : ""
                      }`
                      : "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Furnishing
                  </span>
                  <span className="text-gray-900">
                    {property.furnishing || "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Parking
                  </span>
                  <span className="text-gray-900">
                    {property.parking ?? "-"}
                  </span>
                </div>

                <div className="grid grid-cols-2">
                  <span className="text-gray-600 font-medium">
                    Property Age
                  </span>
                  <span className="text-gray-900">
                    {property.property_age !== undefined
                      ? `${property.property_age} Years`
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">
                Features
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {features.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                      <svg
                        className="w-4 h-4 text-gray-800"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </span>

                    <span className="text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-4">
              Project Description
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {property.description ||
                "No description available for this property."}
            </p>
          </div>

          {/* Address / Map */}
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Address</h2>
              {property.map_url && (
                <a
                  href={property.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-[#9b0000] hover:underline"
                >
                  Open in Maps <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {location || "Location not available"}
            </p>

            {(() => {
              const safeMapEmbedUrl = getGoogleMapsEmbedUrl(property.map_url, location);
              if (safeMapEmbedUrl) {
                return (
                  <iframe
                    className="w-full h-64 rounded border-0"
                    src={safeMapEmbedUrl}
                    loading="lazy"
                    title="Property Location"
                  />
                );
              }
              if (property.map_url) {
                return (
                  <div className="w-full h-64 rounded bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
                    <MapPin className="h-8 w-8 text-[#9b0000] mb-2" />
                    <p className="text-xs font-semibold mb-3">{location || "Location details"}</p>
                    <a
                      href={property.map_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#9b0000] hover:underline"
                    >
                      Open Google Maps <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                );
              }
              return (
                <div className="w-full h-64 rounded bg-gray-100 flex items-center justify-center text-gray-500">
                  Map location not available
                </div>
              );
            })()}
          </div>

          {/* Nearby Places */}
          {nearbyPlaces.length > 0 && (
            <div className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-lg md:text-xl font-semibold mb-4">
                What's nearby?
              </h2>

              <div className="divide-y divide-gray-400">
                {nearbyPlaces.map((place, index) => (
                  <div
                    key={place._id || index}
                    className="flex gap-4 py-4"
                  >
                    <div className="w-14 h-14 bg-[#9b0000] rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {place.type || "Nearby Place"}
                      </p>

                      <p className="text-sm text-gray-600">
                        {place.name || "-"}{" "}
                        {place.distance !== undefined && (
                          <span className="font-medium">
                            {place.distance}{" "}
                            {place.distance_unit || "km"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enquiry */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg shadow sticky top-40">
            <h2 className="text-lg md:text-xl uppercase font-semibold mb-4">
              Enquiry Form
            </h2>

            <form className="space-y-3">
              <input
                className="w-full border border-gray-600 rounded px-3 py-2 text-sm"
                placeholder="Name"
              />

              <input
                className="w-full border border-gray-600 rounded px-3 py-2 text-sm"
                placeholder="Email"
              />

              <input
                className="w-full border border-gray-600 rounded px-3 py-2 text-sm"
                placeholder="WhatsApp Number"
              />

              <textarea
                className="w-full border border-gray-600 rounded px-3 py-2 text-sm"
                rows={4}
                placeholder="Message"
              />

              <button
                type="submit"
                className="relative inline-flex items-center justify-center border border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-1.5 gap-[10px] group overflow-hidden text-sm md:text-base"
              >
                <span className="relative z-10 tracking-wider text-[14px]">
                  GET STARTED
                </span>

                <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5 font-extrabold" />
                </span>

                <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}