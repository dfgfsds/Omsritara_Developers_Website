// components/PropertySearch.tsx
"use client";

import { useState } from "react";
import { Search, MapPin, DollarSign, MoreVertical, IndianRupee } from "lucide-react";

export default function PropertySearch() {
  const [tab, setTab] = useState<"buy" | "rent">("buy");

  return (
    <div className="w-full max-w-7xl mx-auto bg-white shadow-md rounded-md p-4">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setTab("buy")}
          className={`px-6 py-2 font-semibold rounded ${
            tab === "buy"
              ? "bg-[#9b0000] text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setTab("rent")}
          className={`px-6 py-2 font-semibold rounded ${
            tab === "rent"
              ? "bg-[#9b0000] text-white"
              : "bg-gray-400 bg-opacity-10"
          }`}
        >
          RENT
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end ">
        {/* Keyword */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Type Your Property
          </label>
          <input
            type="text"
            placeholder="Enter Keyword..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#9b0000]"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Type Your Property
          </label>
          <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:[#9b0000]">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Commercial</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Where’s Located?
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <span className="text-[#9b0000] mr-2">
              <MapPin size={18} />
            </span>
            <input
              type="text"
              placeholder="Melborn ,Australia"
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Type Price Range
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="text"
              placeholder="2910 - 3190"
              className="w-full focus:outline-none"
            />
            <span className="text-[#9b0000] ml-2">
              <IndianRupee size={18} />
            </span>
          </div>
        </div>

        {/* Advance + Dots */}
       <div className="flex items-end justify-center space-x-2">
  <button className="text-gray-600 hover:text-[#9b0000] text-sm pb-1">
    Advance
  </button>

  <MoreVertical size={18} className="text-gray-500 mb-1" />

  <button className="bg-[#9b0000] text-white rounded flex items-center justify-center hover:bg-[#690000] transition w-12 h-12">
    <Search size={20} />
  </button>
</div>

        {/* Search Button */}
       
      </div>
    </div>
  );
}
