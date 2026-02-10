"use client";

// import { useParams } from "next/navigation";
// import Link from "next/link";
// import PropertyDetail from "@/components/PropertyDetail";
// import {
//   ArrowUpRight,
//   Share2,
//   Home,
//   Bath,
//   BedDouble,
//   LandPlot,
//   MapPin,
// } from "lucide-react";

// export const dynamic = "force-dynamic";

// export default function ProjectDetailPage() {
//   const params = useParams();
//   const slug = params?.slug as string;

//   if (!slug) {
//     return null; // safety for hydration
//   }

//   const title = slug
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (c) => c.toUpperCase());

// console.log(slug,params)

import Link from "next/link";
import PropertyDetail from "@/components/PropertyDetail";
import {
    ArrowUpRight,
    Share2,
    Home,
    Bath,
    BedDouble,
    LandPlot,
    MapPin,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function ProjectDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const id = params.id;

    const title = id
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="bg-white">

            {/* Breadcrumb */}
            <div className="">
                <div className="max-w-7xl mx-auto mt-30   px-4 py-3 md:text-xl font-semibold text-gray-500">
                    <Link href="/" className="text-[#9b0000] md:text-xl font-semibold">Home</Link> /
                    <Link href="/projects" className="mx-1 md:text-xl font-semibold">Projects</Link> /
                    <span className="text-gray-700 ml-1 md:text-xl font-semibold">Luxury Bungalow</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">


                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Luxury Bungalow for sale in Valasaravakkam
                        </h1>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">


                            <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-medium">
                                Buy
                            </span>



                            {/* Location */}
                            <span className="flex items-center gap-1">
                                <span className="w-7 h-7 border rounded-full flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                </span>
                                Valasaravakkam, Chennai, Tamil Nadu, India
                            </span>

                            {/* Beds */}
                            <span className="flex items-center gap-1">
                                <span className="w-7 h-7 border rounded-full flex items-center justify-center">
                                    <BedDouble className="w-4 h-4 text-gray-500" />
                                </span>
                                Beds: 4
                            </span>

                            {/* Baths */}
                            <span className="flex items-center gap-1">
                                <span className="w-7 h-7 border rounded-full flex items-center justify-center">
                                    <Bath className="w-4 h-4 text-gray-500" />
                                </span>
                                Baths: 5
                            </span>

                            {/* Sqft */}
                            <span className="flex items-center gap-1">
                                <span className="w-7 h-7 border rounded-full flex items-center justify-center">
                                    <LandPlot className="w-4 h-4 text-gray-500" />
                                </span>
                                SqFt: 2,400
                            </span>

                        </div>
                    </div>


                    <div className="flex items-center gap-4">


                        <button
                            className="flex items-center gap-2 bg-[#9b0000] text-white 
             px-4 py-2 rounded-md text-sm font-medium 
             hover:bg-[#7e0000] transition"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>

                        <div className="text-2xl font-bold text-gray-900">
                            ₹6.18 Cr
                        </div>

                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto px-4 ">
                {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          <div className="lg:col-span-2 rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" className="w-full h-full object-cover" />
          </div>


          <div className="grid grid-rows-2 gap-4">

            <div className="rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde" className="w-full h-full object-cover" />
              </div>


              <div className="relative rounded-xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    Show all<br />14 Photos
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div> */}
                <PropertyDetail slug={slug} />
            </div>


            <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6">


                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white rounded-lg overflow-hidden shadow">
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" className="w-full h-96 object-cover" />
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Overview</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                            {/* Rooms */}
                            <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                                <Home className="w-6 h-6 text-gray-400" />
                                <div>
                                    <p className="text-gray-800 font-medium">Rooms</p>
                                    <p className="text-gray-500">12</p>
                                </div>
                            </div>

                            {/* Baths */}
                            <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                                <Bath className="w-6 h-6 text-gray-400" />
                                <div>
                                    <p className="text-gray-800 font-medium">Baths</p>
                                    <p className="text-gray-500">5</p>
                                </div>
                            </div>

                            {/* Beds */}
                            <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                                <BedDouble className="w-6 h-6 text-gray-400" />
                                <div>
                                    <p className="text-gray-800 font-medium">Beds</p>
                                    <p className="text-gray-500">4</p>
                                </div>
                            </div>

                            {/* Land Area */}
                            <div className="flex items-center gap-3 border border-gray-600 rounded-lg p-3">
                                <LandPlot className="w-6 h-6 text-gray-400" />
                                <div>
                                    <p className="text-gray-800 font-medium">Land Area</p>
                                    <p className="text-gray-500">2400 Sqft</p>
                                </div>
                            </div>

                        </div>
                    </div>




                    <div className="bg-white p-5 rounded-lg shadow rounded-xl">
                        <h2 className="text-lg font-semibold mb-4">Property details</h2>

                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 text-sm">


                            <div className="space-y-3">
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Beds</span>
                                    <span className="text-gray-900">4</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Land Area</span>
                                    <span className="text-gray-900">2,400 SqFt</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Type</span>
                                    <span className="text-gray-900">Independent Villa</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Status</span>
                                    <span className="text-gray-900">Buy</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Property ID</span>
                                    <span className="text-gray-900">2567</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Facing</span>
                                    <span className="text-gray-900">South</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">BHK Type</span>
                                    <span className="text-gray-900">4 BHK</span>
                                </div>
                            </div>


                            <div className="space-y-3">
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Price</span>
                                    <span className="text-gray-900">₹6.18 Cr</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Build Area</span>
                                    <span className="text-gray-900">5,750 SqFt</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Rooms</span>
                                    <span className="text-gray-900">12</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Baths</span>
                                    <span className="text-gray-900">5</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Dimensions</span>
                                    <span className="text-gray-900">40×30</span>
                                </div>
                                <div className="grid grid-cols-2">
                                    <span className="text-gray-600 font-medium">Road Width</span>
                                    <span className="text-gray-900">30</span>
                                </div>
                            </div>

                        </div>
                    </div>



                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Features</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">


                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Drainage</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Metro Water</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Pooja Room</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Underground EB</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Home Theatre</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Modular Kitchen</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Power Backup</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center border rounded-lg">
                                    <svg className="w-4 h-4 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-700">Car Parking</span>
                            </div>

                        </div>
                    </div>



                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Description</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Land 2400 Sqft, Built up 5750 Sqft, South Facing Independent Villa.
                            Modular kitchen, dining area, pooja room, home theatre, power room,
                            servant toilet, underground EB, metro water and drainage connection.
                            Located just 1.5 KM from Arcot Road.
                        </p>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2">Address</h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Valasaravakkam, Chennai, Tamil Nadu, India
                        </p>
                        <iframe className="w-full h-64 rounded"
                            src="https://maps.google.com/maps?q=valasaravakkam&t=&z=13&ie=UTF8&iwloc=&output=embed">
                        </iframe>
                    </div>


                    <div className="bg-white p-5 rounded-lg shadow">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">What's nearby?</h2>

                        <div className="divide-y divide-gray-400">


                            <div className="flex gap-4 py-4">
                                <div className="w-14 h-14 bg-[#9b0000] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800">Restaurant</p>
                                    <p className="text-sm text-gray-600">
                                        Data Udipi Hotel <span className="font-medium">0.045 miles</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 py-4">
                                <div className="w-14 h-14 bg-[#9b0000] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800">School</p>
                                    <p className="text-sm text-gray-600">
                                        Devi Academy <span className="font-medium">0.068 miles</span>
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        School <span className="font-medium">0.271 miles</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 py-4">
                                <div className="w-14 h-14 bg-[#9b0000] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800">Car Dealership</p>
                                    <p className="text-sm text-gray-600">
                                        Cars India Maruti Suzuki Showroom <span className="font-medium">0.077 miles</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 py-4">
                                <div className="w-14 h-14 bg-[#9b0000] rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="font-semibold text-gray-800">Hospital</p>
                                    <p className="text-sm text-gray-600">
                                        Vasan Eye Care Hospital <span className="font-medium">0.196 miles</span>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>


                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-lg border-gray-700 shadow sticky top-40">
                        <h2 className="text-lg md:text-xl uppercase font-semibold mb-4">Enquiry Form</h2>
                        <form className="space-y-3">
                            <input className="w-full border border-gray-600 rounded px-3 py-2 text-sm" placeholder="Name" />
                            <input className="w-full border border-gray-600 rounded px-3 py-2 text-sm" placeholder="Email" />
                            <input className="w-full border border-gray-600 rounded px-3 py-2 text-sm" placeholder="WhatsApp Number" />
                            <textarea className="w-full border border-gray-600 rounded px-3 py-2 text-sm" rows={4} placeholder="Message" />
                            <button
                                type="submit"
                                className="relative inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-1.5 gap-[10px] group overflow-hidden text-sm md:text-base"
                            >
                                <span className="relative z-10 tracking-wider text-[14px]">GET STARTED</span>
                                <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[30px] h-[30px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                                    <ArrowUpRight className="w-5 h-5 font-extrabold" />
                                </span>
                                <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
                            </button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
}