// components/PropertyByType.jsx
"use client";

import Image from "next/image";
import { Home, Building, Layers } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Multifamily Homes",
    count: 13,
    icon: <Home className="w-16 h-16 text-red-500" />,
  },
  {
    id: 2,
    title: "Duplex Homes",
    count: 15,
    icon: <Layers className="w-16 h-16 text-red-500" />,
  },
  {
    id: 3,
    title: "Commercial House",
    count: 16,
    icon: <Building className="w-16 h-16 text-red-500" />,
  },
  {
    id: 4,
    title: "Sweet Apartments",
    count: 16,
    icon: <Building className="w-16 h-16 text-red-500" />,
  },
];

const PropertyByType = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto  relative">
      {/* Optional decorative background */}
      <div className="absolute top-0 left-0 w-1/4 opacity-5">
        <Image
          src="/assets/img/page/image-03.webp" // background image
          alt="Background"
          width={300}
          height={300}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-16">
          <div>
            <p className="text-red-500 font-semibold flex items-center gap-2">
              <Home /> TRUSTED REAL ESTATE CARE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Property By Type
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-right mt-4 md:mt-0">
            Our company provides a full range of services for the construction
            of private houses and cottages since 19
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center relative hover:shadow-xl transition"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white rounded-full shadow w-8 h-8 flex items-center justify-center text-red-500 font-bold">
                {property.count}
              </div>

              {/* Icon */}
              <div className="mb-4">{property.icon}</div>

              {/* Title */}
              <h3 className="font-semibold text-lg">{property.title}</h3>

              {/* Count */}
              <p className="text-red-500 font-medium mt-2">
                {property.count} Properties
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyByType;
