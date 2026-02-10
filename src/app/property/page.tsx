"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Ruler, MapPin } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import PropertyImageSlider from "./PropertyImageSlider";

interface Property {
  _id: string;
  name: string;
  description: string;
  price: number;
  area_size: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  image_url: string[];
  type?: string; // in case type is included in property object
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyType, setPropertyType] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pincode, setPincode] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [sqftRange, setSqftRange] = useState({ min: 0, max: 5000 });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 5 },
  });

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("https://api.omsritaradevelopers.in/property");
        setProperties(res?.data.result);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPropertyType = async () => {
      try {
        const res = await axios.get("https://api.omsritaradevelopers.in/type/property");
        setPropertyType(res?.data.result);
      } catch (err) {
        console.error("Error fetching property types:", err);
      }
    };

    fetchProperties();
    fetchPropertyType();
  }, []);

  // Filter logic
  const filteredProperties = properties.filter((p: any) => {
    const matchType =
      selectedTypes.length === 0 || selectedTypes.includes(p.type?._id || "");

    const matchPrice =
      (minPrice === "" || p.price >= Number(minPrice)) &&
      (maxPrice === "" || p.price <= Number(maxPrice));

    const matchPincode =
      !pincode || p?.pincode?.includes(pincode);

    // ✅ Updated to use sqftRange instead of areaRange
    const matchArea =
      p.area_size >= sqftRange.min && p.area_size <= sqftRange.max;

    return matchType && matchPrice && matchPincode && matchArea;
  });


  // Pagination logic
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleFilterClick = () => {
    setCurrentPage(1); // reset to first page when filtering
  };

  const settings = {
    dots: true,            // show dots
    infinite: true,        // loop slides
    speed: 500,            // transition speed
    slidesToShow: 1,       // default for desktop
    slidesToScroll: 1,
    arrows: true,          // show arrows on desktop
    autoplay: true,        // auto-play slides
    responsive: [
      {
        breakpoint: 1024,   // tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,    // small tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,    // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* Banner Section */}
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
            <span className="text-gray-800 font-medium">Property Sales</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid gap-8 
  grid-cols-1 lg:grid-cols-10">
        {/* Sidebar */}
        <aside
          className={`bg-white rounded-lg shadow p-6 space-y-6 
    ${showFilters ? "block" : "hidden"} lg:block lg:col-span-3`}
        >
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Categories */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Property Type</h2>
              <ul className="space-y-3 text-gray-600">
                {propertyType &&
                  propertyType.map((el: any, i: number) => (
                    <li key={i}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedTypes.includes(el._id)}
                        onChange={() => handleTypeChange(el._id)}
                      />
                      {el.name}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Price Filtering */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Price Filtering</h2>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-1/2 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(e.target.value ? Number(e.target.value) : "")
                  }
                  className="w-1/2 p-2 border rounded"
                />
              </div>
              {/* Pincode Filtering */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Pincode</h2>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
              </div>

              {/* Area (Sqft) Filtering */}

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Area (Sqft)</h2>

                {/* Min Sqft */}
                <label className="block text-sm text-gray-600">Min: {sqftRange.min} Sqft</label>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  value={sqftRange.min}
                  onChange={(e) =>
                    setSqftRange((prev) => ({ ...prev, min: Number(e.target.value) }))
                  }
                  className="w-full accent-red-600"
                />

                {/* Max Sqft */}
                <label className="block mt-4 text-sm text-gray-600">
                  Max: {sqftRange.max} Sqft
                </label>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  value={sqftRange.max}
                  onChange={(e) =>
                    setSqftRange((prev) => ({ ...prev, max: Number(e.target.value) }))
                  }
                  className="w-full accent-red-600"
                />

                <p className="mt-2 text-sm text-gray-700">
                  Selected: <span className="font-semibold">{sqftRange.min}</span> –{" "}
                  <span className="font-semibold">{sqftRange.max}</span> Sqft
                </p>
              </div>

              <button
                onClick={handleFilterClick}
                type="submit"
                className="max-w-[300px] flex justify-center gap-2 items-center shadow-xl text-base sm:text-md text-amber-50 bg-red-800 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-lg group cursor-pointer"
              >
                FILTER
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-100 group-hover:border-none p-1 sm:p-2 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-gray-100 group-hover:fill-gray-800"
                  />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Properties Section */}
        <div className="flex-1 lg:col-span-7">

          {/* ✅ Mobile Filter Toggle */}
          <div className="mb-6 lg:hidden">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="w-full py-2 px-4 bg-[#9b0000] text-white rounded-lg shadow"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
          {/* Properties List */}
          <main>
            {loading ? (
              <p className="text-center">Loading properties...</p>
            ) : (
              <div className="space-y-6">
                {currentProperties.map((property) => (
                  <div
                    key={property._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col sm:flex-col md:flex-row items-stretch transition hover:shadow-lg"
                  >
                    {/* Image Section */}
                    <div className="relative  w-full md:w-72 h-56 sm:h-72 md:h-auto flex-shrink-0">
                      <PropertyImageSlider images={property.image_url} name={property.name} />
                      <span className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-md shadow">
                        For Sale
                      </span>
                    </div>


                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between p-5">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {property.name}
                        </h2>
                        <p className="text-[#9b0000] font-bold text-2xl mt-2">
                          ₹{property.price.toLocaleString()}
                        </p>

                        <div className="flex flex-wrap gap-7 text-gray-600 text-lg mt-3">
                          <span className="flex items-center gap-2">
                            <Ruler size={22} /> {property.area_size} Sqft
                          </span>
                        </div>
                      </div>

                      <div className="border-b mt-5 border-gray-400"></div>

                      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="flex items-center gap-2 text-gray-500 text-base">
                          <MapPin size={18} />{" "}
                          {`${property.location.address}, ${property.location.city}, ${property.location.state}`}
                        </p>

                        <Link href={`/properties/${slugify(property.name)}`}>
                          <button
                            type="submit"
                            className="flex justify-center gap-2 items-center shadow-xl text-base sm:text-lg text-amber-50 bg-red-800 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group cursor-pointer"
                          >
                            Land Details
                            <svg
                              className="w-6 h-6 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-100 group-hover:border-none p-1 sm:p-2 rotate-45"
                              viewBox="0 0 16 19"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                className="fill-gray-100 group-hover:fill-gray-800"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1
                          ? "bg-[#9b0000] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
