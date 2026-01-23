"use client";

import Slider from "react-slick";
import Image from "next/image";
import { MapPin, Bed, Bath, Ruler, Share2, Plus } from "lucide-react";
const properties = [
  {
    id: 1,
    title: "Luxury Family Home",
    price: 13000,
    image: "https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/property/properties2.png",
    address: "45, Anna Nagar, Chennai, Tamil Nadu",
    bedrooms: "3 Beds",
    bathrooms:"3 Baths",
    sqft: 3450,
    agent: "Leslie Alexander",
    agentImg: "https://images.pexels.com/photos/1181416/pexels-photo-1181416.jpeg",
  },
  {
    id: 2,
    title: "Apartment Ocean View",
    price: 12000,
    image: "https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/property/properties2.png",
    address: "12, Marina Beach Road, Chennai, Tamil Nadu",
 bedrooms: "3 Beds",
    bathrooms:"3 Baths",
    sqft: 3450,
    agent: "Leslie Alexander",
    agentImg: "https://images.pexels.com/photos/1181416/pexels-photo-1181416.jpeg",
  },
  {
    id: 3,
    title: "Single Family Home",
    price: 15000,
    image: "https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/property/properties2.png",
    address: "99, Velachery Main Road, Chennai, Tamil Nadu",
   bedrooms: "3 Beds",
    bathrooms:"3 Baths",
    sqft: 3450,
    agent: "Leslie Alexander",
    agentImg: "https://images.pexels.com/photos/1181416/pexels-photo-1181416.jpeg",
  },
  {
    id: 4,
    title: "Luxury Family Home",
    price: 17000,
    image: "https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/property/properties2.png",
    address: "27, T. Nagar, Chennai, Tamil Nadu",
    bedrooms: "3 Beds",
    bathrooms:"3 Baths",
    sqft: 3450,
    agent: "Leslie Alexander",
    agentImg: "https://images.pexels.com/photos/1181416/pexels-photo-1181416.jpeg",
  },
];




const FeaturedPropertiesRent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Properties for Rent</h2>
        <Slider {...settings}>
          {properties.map((property) => (
            <div key={property.id} className="p-3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Image */}
                <div className="relative">
                  <Image
                    src={property.image}
                    alt={property.title}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                      For Rent
                    </span>
                  </div>
                
                </div>

                {/* Content */}
                <div className="p-4">
                    <div className="flex justify-between">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-red-500 font-bold">${property.price}</p>
                  </div>
                  <p className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" /> {property.address}
                  </p>

                  {/* Details */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {property.bedrooms} 
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> {property.bathrooms} 
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="w-4 h-4" /> {property.sqft} Sq Ft
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedPropertiesRent;
