"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  ShieldCheck,
  BedDouble,
  Bath,
  Maximize,
  Car,
  CalendarDays,
  Building2,
  Compass,
  Map,
  PlayCircle,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Dumbbell,
  Waves,
  Gamepad2,
  Droplets,
  Trees,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import PropertyGallery from "./PropertyGallery";
import { useParams } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

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

  // Bare google domain (e.g. https://www.google.com/ or https://google.com or https://maps.google.com)
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

// Safely extract YouTube embed URL; returns null if not a valid video to prevent X-Frame-Options errors
function getYouTubeEmbedUrl(url?: string | null): string | null {
  if (!url || typeof url !== "string") return null;
  let trimmed = url.trim();

  // If user pasted iframe tag, extract src
  if (trimmed.includes("<iframe")) {
    const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
    if (srcMatch && srcMatch[1]) {
      trimmed = srcMatch[1];
    }
  }

  // Already an embed url with valid video id
  const embedMatch = trimmed.match(
    /youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/i
  );
  if (embedMatch && embedMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`;
  }

  // Match standard video ID patterns
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/i;
  const match = trimmed.match(regExp);

  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}`;
  }

  return null;
}

interface NearbyPlace {
  _id?: string;
  name: string;
  type: string;
  distance: number | string;
  distance_unit?: string;
}

interface Property {
  _id: string;
  name: string;
  price?: number;
  price_per_sqft?: number;
  description?: string;
  image_url?: string[];
  area_size?: number;
  area_unit?: string;
  listing_type?: string;
  status?: string;
  construction_status?: string;
  possession_date?: string | null;
  property_age?: number;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  floor_number?: number;
  total_floors?: number;
  furnishing?: string;
  facing?: string;
  parking?: number | string;
  owner_name?: string;
  developer_name?: string;
  project_name?: string;
  pincode?: string;
  map_url?: string;
  mape_url?: string;
  media_url?: string | null;
  isFeatured?: boolean;
  isVerified?: boolean;
  type?: {
    _id?: string;
    name?: string;
    description?: string;
  };
  location?: {
    address?: string;
    locality?: string;
    area?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    coordinates?: {
      type?: string;
      coordinates?: number[];
    };
  };
  amenities?: any[];
  amenities_data?: any[];
  amenity_types?: any[];
  nearby_places?: NearbyPlace[];
  created_by?: {
    _id?: string;
    name?: string;
    mobile?: string;
    email?: string;
  } | null;
}

export interface ParsedAmenity {
  id: string;
  name: string;
  description?: string;
  types: string[];
}

export interface ParsedAmenityCategory {
  id: string;
  name: string;
  description?: string;
  amenities: ParsedAmenity[];
}

function getAmenityIcon(name: string) {
  const n = (name || "").toLowerCase();
  if (n.includes("gym") || n.includes("fitness") || n.includes("workout")) {
    return Dumbbell;
  }
  if (n.includes("pool") || n.includes("swim")) {
    return Waves;
  }
  if (
    n.includes("game") ||
    n.includes("playstation") ||
    n.includes("billiards") ||
    n.includes("chess")
  ) {
    return Gamepad2;
  }
  if (
    n.includes("play") ||
    n.includes("kid") ||
    n.includes("child") ||
    n.includes("park") ||
    n.includes("garden")
  ) {
    return Trees;
  }
  if (
    n.includes("water") ||
    n.includes("bore") ||
    n.includes("drinking") ||
    n.includes("metro")
  ) {
    return Droplets;
  }
  if (
    n.includes("security") ||
    n.includes("cctv") ||
    n.includes("guard") ||
    n.includes("safe")
  ) {
    return ShieldCheck;
  }
  if (
    n.includes("power") ||
    n.includes("backup") ||
    n.includes("generator") ||
    n.includes("electric")
  ) {
    return Zap;
  }
  if (n.includes("park") || n.includes("car")) {
    return Car;
  }
  if (n.includes("club") || n.includes("hall") || n.includes("community")) {
    return Building2;
  }
  return Sparkles;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const rawSlug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";
  const decodedSlug = decodeURIComponent(rawSlug || "").trim().toLowerCase();

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState<string>("all");

  const { amenityCategories, allAmenities } = useMemo(() => {
    if (!property) return { amenityCategories: [], allAmenities: [] };

    const categoriesMap: Record<string, ParsedAmenityCategory> = {};
    const amenitiesMap: Record<string, ParsedAmenity> = {};

    const extractStr = (val: any): string => {
      if (!val) return "";
      if (typeof val === "string") return val.trim();
      if (typeof val === "object") {
        return (val.name || val.title || val.label || "").trim();
      }
      return "";
    };

    const extractDesc = (val: any): string => {
      if (!val || typeof val !== "object") return "";
      return (val.description || val.desc || "").trim();
    };

    const extractId = (val: any, fallback: string): string => {
      if (!val) return fallback;
      if (typeof val === "string") return val;
      if (typeof val === "object") return val._id || val.id || fallback;
      return fallback;
    };

    // 1. Process amenities_data
    const rawList = Array.isArray(property.amenities_data) ? property.amenities_data : [];
    rawList.forEach((item: any, idx: number) => {
      const rawAmenity = item.amenities || item.amemities || item.amenity;
      const aName = extractStr(rawAmenity);
      const aDesc = extractDesc(rawAmenity);
      const aId = extractId(rawAmenity, `amenity-${idx}`);

      const rawTypes = item.amenity_types || item.amenitie_tyep || item.amenity_type;
      const typesList = Array.isArray(rawTypes) ? rawTypes : rawTypes ? [rawTypes] : [];

      const parsedTypes: { id: string; name: string; description: string }[] = [];
      typesList.forEach((t: any, tIdx: number) => {
        const tName = extractStr(t);
        const tDesc = extractDesc(t);
        const tId = extractId(t, `type-${tIdx}`);
        if (tName) {
          parsedTypes.push({ id: tId, name: tName, description: tDesc });
          const catKey = tName.toLowerCase();
          if (!categoriesMap[catKey]) {
            categoriesMap[catKey] = {
              id: tId,
              name: tName,
              description: tDesc,
              amenities: [],
            };
          }
        }
      });

      if (aName) {
        const key = aName.toLowerCase();
        let existing = amenitiesMap[key];
        if (!existing) {
          existing = {
            id: aId,
            name: aName,
            description: aDesc,
            types: parsedTypes.map((pt) => pt.name),
          };
          amenitiesMap[key] = existing;
        } else {
          parsedTypes.forEach((pt) => {
            if (!existing!.types.includes(pt.name)) {
              existing!.types.push(pt.name);
            }
          });
          if (!existing.description && aDesc) {
            existing.description = aDesc;
          }
        }

        parsedTypes.forEach((pt) => {
          const cat = categoriesMap[pt.name.toLowerCase()];
          if (cat && !cat.amenities.some((a: ParsedAmenity) => a.name.toLowerCase() === key)) {
            cat.amenities.push(existing!);
          }
        });
      }
    });

    // 2. Direct property.amenities fallback
    if (Array.isArray(property.amenities)) {
      property.amenities.forEach((item: any, idx: number) => {
        const aName = extractStr(item);
        const aDesc = extractDesc(item);
        const aId = extractId(item, `direct-amenity-${idx}`);
        if (aName) {
          const key = aName.toLowerCase();
          if (!amenitiesMap[key]) {
            const newAmenity: ParsedAmenity = {
              id: aId,
              name: aName,
              description: aDesc,
              types: ["General"],
            };
            amenitiesMap[key] = newAmenity;

            if (!categoriesMap["general"]) {
              categoriesMap["general"] = {
                id: "general",
                name: "General",
                description: "Standard features and community amenities",
                amenities: [newAmenity],
              };
            } else {
              categoriesMap["general"].amenities.push(newAmenity);
            }
          }
        }
      });
    }

    // 3. Fallback: Direct property.amenity_types if provided separately
    if (Array.isArray(property.amenity_types)) {
      property.amenity_types.forEach((item: any, idx: number) => {
        const tName = extractStr(item);
        const tDesc = extractDesc(item);
        const tId = extractId(item, `direct-type-${idx}`);
        const catKey = tName.toLowerCase();
        if (tName && !categoriesMap[catKey]) {
          categoriesMap[catKey] = {
            id: tId,
            name: tName,
            description: tDesc,
            amenities: [],
          };
        }
      });
    }

    const allList = Object.values(amenitiesMap);
    allList.forEach((a: ParsedAmenity) => {
      if (a.types.length === 0) {
        a.types.push("General");
        if (!categoriesMap["general"]) {
          categoriesMap["general"] = {
            id: "general",
            name: "General",
            description: "Standard features and community amenities",
            amenities: [a],
          };
        } else {
          categoriesMap["general"].amenities.push(a);
        }
      }
    });

    return {
      amenityCategories: Object.values(categoriesMap),
      allAmenities: allList,
    };
  }, [property]);

  const filteredAmenities = useMemo(() => {
    if (selectedAmenityCategory === "all") {
      return allAmenities;
    }
    const cat = amenityCategories.find(
      (c: ParsedAmenityCategory) => c.name.toLowerCase() === selectedAmenityCategory.toLowerCase()
    );
    return cat ? cat.amenities : allAmenities;
  }, [selectedAmenityCategory, allAmenities, amenityCategories]);

  const formatText = (value?: string | null) =>
    value
      ? value
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase())
      : "-";

  const formatDate = (date?: string | null) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700 border-green-200";
      case "sold":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "under_construction":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  useEffect(() => {
    if (!decodedSlug && !rawSlug) {
      setLoading(false);
      return;
    }

    async function fetchProperty() {
      try {
        const res = await fetch(
          "https://api.omsritaradevelopers.in/property",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();

        const found = (data.result || []).find((item: Property) => {
          if (!item || !item.name) return false;
          const s = slugify(item.name);
          return (
            s === decodedSlug ||
            s === rawSlug.toLowerCase() ||
            item._id === rawSlug ||
            item.name.toLowerCase().trim() === decodedSlug
          );
        });

        setProperty(found || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [decodedSlug, rawSlug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-2 border-gray-200 border-t-[#9b0000]" />
          <p className="text-sm text-gray-500">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <Building2 className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-800">
            Property not found
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            The property may have been removed or is unavailable.
          </p>
          <Link
            href="/properties"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#9b0000] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#7f0000]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const locationPincode = property.location?.pincode || property.pincode;
  const mapUrl = property.map_url || property.mape_url;
  const images = property.image_url || [];

  const propertyAddressText = [
    property.location?.address,
    property.location?.area,
    property.location?.city,
    property.location?.state,
    locationPincode,
  ]
    .filter(Boolean)
    .join(", ");

  const safeMapEmbedUrl = getGoogleMapsEmbedUrl(mapUrl, propertyAddressText);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(property.media_url);

  const detailItems = [
    {
      label: "Property Type",
      value: property.type?.name,
      icon: Building2,
    },
    {
      label: "Area",
      value: property.area_size
        ? `${property.area_size} ${property.area_unit || "sqft"}`
        : "-",
      icon: Maximize,
    },
    {
      label: "Bedrooms",
      value: property.bedrooms,
      icon: BedDouble,
    },
    {
      label: "Bathrooms",
      value: property.bathrooms,
      icon: Bath,
    },
    {
      label: "Balconies",
      value: property.balconies,
      icon: Building2,
    },
    {
      label: "Parking",
      value: property.parking,
      icon: Car,
    },
    {
      label: "Floor",
      value:
        property.floor_number !== undefined
          ? `${property.floor_number} / ${property.total_floors || "-"}`
          : "-",
      icon: Building2,
    },
    {
      label: "Furnishing",
      value: formatText(property.furnishing),
      icon: Building2,
    },
    {
      label: "Facing",
      value: formatText(property.facing),
      icon: Compass,
    },
    {
      label: "Property Age",
      value:
        property.property_age !== undefined
          ? `${property.property_age} years`
          : "-",
      icon: CalendarDays,
    },
    {
      label: "Construction",
      value: formatText(property.construction_status),
      icon: Building2,
    },
    {
      label: "Possession",
      value: formatDate(property.possession_date),
      icon: CalendarDays,
    },
  ];

  return (
    <main className="bg-[#fafafa]">
      <section className="relative mt-20 overflow-hidden bg-[#f5f5f5]">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="transition hover:text-[#9b0000]">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/properties"
              className="transition hover:text-[#9b0000]"
            >
              Properties
            </Link>
            <span>/</span>
            <span className="max-w-[180px] truncate text-gray-800">
              {property.name}
            </span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {property.isFeatured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#9b0000] px-3 py-1 text-[11px] font-semibold text-white">
                  <Star className="h-3 w-3 fill-current" />
                  Featured
                </span>
              )}

              {property.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-[11px] font-semibold text-green-700">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              )}

              {property.status && (
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${getStatusColor(
                    property.status
                  )}`}
                >
                  {formatText(property.status)}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl font-serif">
              {property.name}
            </h1>

            {property.location?.city && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-[#9b0000]" />
                <span>
                  {property.location.city}
                  {property.location.state
                    ? `, ${property.location.state}`
                    : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative">
            <div className="mx-auto max-w-5xl px-3 py-3 sm:px-5">
              <PropertyGallery images={images} />
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
              <div className="p-5 sm:p-7">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                  Property Price
                </p>

                <div className="flex flex-wrap items-end gap-3">
                  <h2 className="text-3xl font-bold text-[#9b0000] sm:text-4xl">
                    ₹ {property.price?.toLocaleString("en-IN") || "-"}
                  </h2>

                  {property.price_per_sqft && (
                    <span className="pb-1 text-sm text-gray-500">
                      ₹{" "}
                      {property.price_per_sqft.toLocaleString("en-IN")} /{" "}
                      {property.area_unit || "sqft"}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {property.listing_type && (
                    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-700">
                      {formatText(property.listing_type)}
                    </span>
                  )}

                  {property.type?.name && (
                    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      {property.type.name}
                    </span>
                  )}

                  {locationPincode && (
                    <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                      PIN {locationPincode}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center border-t border-gray-100 p-5 lg:border-l lg:border-t-0 sm:p-7">
                <div className="rounded-xl bg-[#9b0000]/5 px-5 py-4">
                  <p className="text-xs text-gray-500">Property ID</p>
                  <p className="mt-1 max-w-[170px] truncate text-sm font-semibold text-gray-800">
                    {property._id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
              Property Overview
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Key Details
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {detailItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 transition hover:border-[#9b0000]/20 hover:bg-white"
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#9b0000]/10 text-[#9b0000]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                    {item.label}
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold capitalize text-gray-800">
                    {item.value !== undefined &&
                    item.value !== null &&
                    item.value !== ""
                      ? item.value
                      : "-"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                About Property
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Description
              </h2>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-black">
              {property.description || "No description available."}
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                Project
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Information
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Owner
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {property.owner_name || "-"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Developer
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {property.developer_name || "-"}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  Project
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {property.project_name || "-"}
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
              Location
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900">
              Property Location
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Address", property.location?.address],
              ["Locality", property.location?.locality],
              ["Area", property.location?.area],
              ["City", property.location?.city],
              ["State", property.location?.state],
              ["Country", property.location?.country],
              ["Pincode", locationPincode],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-gray-100 bg-gray-50/70 p-3"
              >
                <p className="text-[10px] uppercase tracking-wide text-gray-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {value || "-"}
                </p>
              </div>
            ))}
          </div>
        </section>

        {property.nearby_places?.length ? (
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                Around Property
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Nearby Places
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {property.nearby_places.map((place) => (
                <div
                  key={place._id || place.name}
                  className="rounded-xl border border-gray-100 bg-gray-50/70 p-4"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#9b0000]/10 text-[#9b0000]">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    {place.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {formatText(place.type)}
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#9b0000]">
                    {place.distance} {place.distance_unit || "km"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {(allAmenities.length > 0 || amenityCategories.length > 0) ? (
          <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            {/* Section Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-gray-100 pb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                  Features & Conveniences
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
                  Amenities Types and Amenities
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  All modern facilities, utilities, and lifestyle conveniences included with this property.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {amenityCategories.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
                    <Layers className="h-3.5 w-3.5 text-gray-500" />
                    {amenityCategories.length} {amenityCategories.length === 1 ? "Amenity Type" : "Amenity Types"}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9b0000]/10 px-3 py-1.5 text-xs font-semibold text-[#9b0000]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {allAmenities.length} {allAmenities.length === 1 ? "Amenity" : "Amenities"}
                </span>
              </div>
            </div>

            {/* Amenity Types Showcase Cards */}
            {amenityCategories.length > 0 && (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Amenity Types / Categories
                  </p>
                  <span className="text-[11px] text-gray-400">
                    Click any category to filter
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {amenityCategories.map((category: ParsedAmenityCategory) => {
                    const isSelected =
                      selectedAmenityCategory.toLowerCase() === category.name.toLowerCase();

                    return (
                      <button
                        key={category.id || category.name}
                        type="button"
                        onClick={() =>
                          setSelectedAmenityCategory(
                            isSelected ? "all" : category.name.toLowerCase()
                          )
                        }
                        className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-[#9b0000] bg-[#9b0000]/5 ring-2 ring-[#9b0000]/20 shadow-xs"
                            : "border-gray-200 bg-gray-50/70 hover:border-[#9b0000]/30 hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                isSelected ? "bg-[#9b0000]" : "bg-gray-400"
                              }`}
                            />
                            {category.name}
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-gray-700 border border-gray-200 shadow-2xs">
                            {category.amenities.length} {category.amenities.length === 1 ? "item" : "items"}
                          </span>
                        </div>

                        {category.description ? (
                          <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {category.description}
                          </p>
                        ) : (
                          <p className="mt-2 text-xs text-gray-400 italic">
                            Category amenities included
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            {amenityCategories.length > 1 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
                <span className="text-xs font-medium text-gray-400 mr-1">Filter:</span>
                <button
                  type="button"
                  onClick={() => setSelectedAmenityCategory("all")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    selectedAmenityCategory === "all"
                      ? "bg-[#9b0000] text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  All Amenities ({allAmenities.length})
                </button>

                {amenityCategories.map((category: ParsedAmenityCategory) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      setSelectedAmenityCategory(category.name.toLowerCase())
                    }
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      selectedAmenityCategory.toLowerCase() === category.name.toLowerCase()
                        ? "bg-[#9b0000] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }`}
                  >
                    {formatText(category.name)} ({category.amenities.length})
                  </button>
                ))}
              </div>
            )}

            {/* Amenities Grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAmenities.map((amenity: ParsedAmenity) => {
                const IconComponent = getAmenityIcon(amenity.name);

                return (
                  <div
                    key={amenity.id || amenity.name}
                    className="group relative rounded-xl border border-gray-100 bg-gray-50/70 p-4 transition-all duration-200 hover:border-[#9b0000]/30 hover:bg-white hover:shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#9b0000]/10 text-[#9b0000] transition-colors duration-200 group-hover:bg-[#9b0000] group-hover:text-white">
                          <IconComponent className="h-5 w-5" />
                        </div>

                        <div className="flex flex-wrap items-center justify-end gap-1.5">
                          {amenity.types &&
                            amenity.types.map((type: string) => (
                              <span
                                key={type}
                                className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600"
                              >
                                {type}
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="mt-3">
                        <h3 className="text-sm font-bold text-gray-900 transition-colors group-hover:text-[#9b0000]">
                          {formatText(amenity.name)}
                        </h3>

                        {amenity.description ? (
                          <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {amenity.description}
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-gray-400 italic">
                            Available with property
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-3.5 flex items-center gap-1.5 border-t border-gray-100/80 pt-2.5 text-[11px] font-medium text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Verified Amenity Available</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredAmenities.length === 0 && (
              <div className="py-8 text-center text-gray-400 text-xs">
                No amenities found in this category.
              </div>
            )}
          </section>
        ) : null}

        {(safeMapEmbedUrl || mapUrl) && (
          <section className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                    Location
                  </p>
                  <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Map className="h-5 w-5 text-[#9b0000]" />
                    Map
                  </h2>
                </div>
                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-[#9b0000] hover:underline"
                  >
                    Open in Google Maps <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {safeMapEmbedUrl ? (
                <iframe
                  src={safeMapEmbedUrl}
                  className="h-64 w-full rounded-xl border-0 sm:h-80"
                  loading="lazy"
                  title="Property Location Map"
                />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 border border-gray-200 p-8 text-center h-64 sm:h-80">
                  <Map className="h-10 w-10 text-gray-400 mb-2 stroke-[1.5]" />
                  <p className="text-sm font-bold text-gray-700">Map Preview Unavailable</p>
                  <p className="text-xs text-gray-500 mt-1 mb-4">
                    {propertyAddressText || "Location details"}
                  </p>
                  {mapUrl && (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9b0000] hover:underline"
                    >
                      Open Google Maps <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {property.media_url && (
          <section className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                    Media
                  </p>
                  <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <PlayCircle className="h-5 w-5 text-[#9b0000]" />
                    Property Video
                  </h2>
                </div>
                <a
                  href={property.media_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-[#9b0000] hover:underline"
                >
                  View Original <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {youtubeEmbedUrl ? (
                <iframe
                  src={youtubeEmbedUrl}
                  className="h-64 w-full rounded-xl sm:h-[420px] border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Property Video Tour"
                />
              ) : property.media_url.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  src={property.media_url}
                  controls
                  className="h-64 w-full rounded-xl bg-black object-contain sm:h-[420px]"
                />
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 border border-gray-200 p-8 text-center sm:h-[300px]">
                  <PlayCircle className="h-12 w-12 text-[#9b0000] mb-3 stroke-[1.5]" />
                  <h3 className="text-base font-bold text-gray-900">Virtual Video Tour</h3>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mb-4">
                    Watch the official video presentation and property walkthrough on YouTube.
                  </p>
                  <a
                    href={property.media_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#9b0000] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90 transition"
                  >
                    Open Video Tour <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          {property.created_by && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                  Contact
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Contact Person
                </h2>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-lg font-bold text-[#9b0000]">
                  {property.created_by.name || "Admin"}
                </p>

                <div className="mt-4 space-y-3">
                  {property.created_by.mobile && (
                    <a
                      href={`tel:${property.created_by.mobile}`}
                      className="flex items-center gap-3 text-sm text-gray-700 transition hover:text-[#9b0000]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Phone className="h-4 w-4 text-[#9b0000]" />
                      </span>
                      {property.created_by.mobile}
                    </a>
                  )}

                  {property.created_by.email && (
                    <a
                      href={`mailto:${property.created_by.email}`}
                      className="flex items-center gap-3 text-sm text-gray-700 transition hover:text-[#9b0000]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Mail className="h-4 w-4 text-[#9b0000]" />
                      </span>
                      {property.created_by.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b0000]">
                Interested?
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                Send an Enquiry
              </h2>
            </div>

            <EnquiryForm dataId={property._id} />
          </div>
        </section>

        <div className="py-6">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-[#9b0000] hover:text-[#9b0000]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </div>
      </div>
    </main>
  );
}