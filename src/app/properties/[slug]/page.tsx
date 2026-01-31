"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import PropertyGallery from "./PropertyGallery";
import { useParams } from "next/navigation";

// Utility: convert title → slug
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// Types
interface Property {
  _id: string;
  name: string;
  price: number;
  description: string;
  image_url: string[];
  area_size: number;
  status: string;
  owner_name: string;
  type?: { name: string };
  location?: { address: string; city: string; state: string };
  amenities?: { _id: string; name: string }[];
  mape_url?: string;
  media_url?: string;
  created_by?: { name: string; mobile: string; email: string };
}

export default function PropertyDetailPage() {
  const { slug } = useParams()
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "bg-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold";
      case "sold":
        return "bg-gray-500 text-white rounded-full px-3 py-1 text-xs font-semibold";
      case "under_construction":
        return "bg-yellow-500 text-black rounded-full px-3 py-1 text-xs font-semibold";
      default:
        return "bg-gray-300 text-black rounded-full px-3 py-1 text-xs font-semibold";
    }
  };
  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`https://api.omsritaradevelopers.in/property`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const properties: Property[] = data.result || [];
        const found = properties.find((p) => slugify(p.name) === slug);

        setProperty(found || null);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details");
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Loading property details...</div>;
  }

  if (error || !property) {
    return <div className="text-center py-20 text-red-600">Property not found!</div>;
  }

  return (
    <>
      {/* Banner */}
      <div className="relative mt-20 bg-gray-50 py-16 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-40 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#9b0000]">Property </span>
            <span className="text-gray-800">Sales</span>
          </h1>
          <div className="mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
            <Link href="/" className="hover:text-[#9b0000] transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">{property.name}</span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Hero Image */}
        <div className="mb-6">
          <PropertyGallery images={property.image_url} />
        </div>

        <div className="container bg-white rounded-2xl shadow-xl overflow-hidden  mx-auto mb-6">
          {/* Title + Price */}
          <div className="p-6 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#9b0000] mb-2">
              {property.name}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-gray-800">
              ₹ {property.price?.toLocaleString()}
            </p>
          </div>

          {/* Property Details */}
          <div className="border-t border-gray-200">
            <div className="p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
                Property Details
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm sm:text-base">
                <li><b>Type:</b> {property.type?.name}</li>
                <li><b>Area Size:</b> {property.area_size} sq.ft</li>
                <li className="flex items-center gap-2">
                  <b>Status:</b>
                  <span className={`${getStatusColor(property.status)} capitalize `}>
                    {property.status.replace("_", " ")}
                  </span>
                </li>
                <li><b>Owner:</b> {property.owner_name}</li>
                <li className="sm:col-span-2 md:col-span-3">
                  <b>Location:</b> {property.location?.address}, {property.location?.city}, {property.location?.state}, {property?.pincode}
                </li>
              </ul>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="p-6 bg-gray-50">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
                  Amenities
                </h2>
                <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base space-y-1">
                  {property.amenities.map((a: any) => (
                    <li key={a._id}>
                      <b>{a.name}</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div className="p-6 bg-gray-50">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800">
                Description
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        {property.mape_url && (
          <div className="mb-6">
            <iframe
              src={property.mape_url.replace("maps.app.goo.gl", "www.google.com/maps?q=") + "&output=embed"}
              className="w-full h-72 rounded-2xl shadow"
              loading="lazy"
            />
          </div>
        )}

        {/* Video */}
        {property.media_url && (
          <div className="mb-6">
            {property.media_url.includes("youtu") ? (
              <iframe
                src={(() => {
                  const url = property.media_url;
                  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^#\&\?]+)/i);
                  const videoId = match ? match[1] : null;
                  return videoId
                    ? `https://www.youtube.com/embed/${videoId}`
                    : url;
                })()}
                className="w-full h-[250px] sm:h-[400px] rounded-2xl shadow"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={property.media_url}
                controls
                className="w-full h-[250px] sm:h-[400px] rounded-2xl shadow object-cover"
              />
            )}
          </div>
        )}

        {/* Agent Info + Enquiry Form */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Person */}
          {property.created_by && (
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <span className="w-1 h-5 bg-[#9b0000] rounded"></span>
                Contact Person
              </h2>

              <p className="text-2xl font-bold text-[#9b0000] mb-4">
                {property.created_by.name}
              </p>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <a
                    href={`tel:${property.created_by.mobile}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {property.created_by.mobile}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <a
                    href={`mailto:${property.created_by.email}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {property.created_by.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Enquiry Form */}
          <EnquiryForm dataId={property?._id} />
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link href="/properties">
            <button className="px-6 py-2 bg-[#9b0000] text-white rounded-xl shadow hover:bg-red-700">
              ← Back to Properties
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
