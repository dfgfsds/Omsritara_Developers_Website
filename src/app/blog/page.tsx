"use client";

import { useState } from "react";
import { User, MessageSquare, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    id: "1",
    title: "Buy and Sell Properties Made Easy",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Expert Property Buying Consulting",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Flats, Land, Farmhouse, and Agriculture Deals",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Licensing Work & Approvals",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BlogPage() {
  const [page, setPage] = useState(1);

  return (
    <>
      {/* Hero Section */}
      <div className="relative mt-20 bg-gray-50 py-16 overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-40 pointer-events-none"
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#9b0000]">Blog </span>
          </h1>

          <div className="mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
            <Link href="/" className="hover:text-[#9b0000] transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">Blog </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-1/2 h-56 md:h-auto">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5 md:w-1/2 flex flex-col justify-between">
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4 mb-2">
                    <span className="flex items-center gap-1">
                      <User size={14} /> By-{post.author}
                    </span>
                    {/* <span className="flex items-center gap-1">
                      <MessageSquare size={14} /> Comments ({post.comments})
                    </span> */}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3">
                    {post.title}
                  </h3>
                  {/* READ MORE Button - Link to blog detail page */}
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-xs sm:text-sm font-medium text-gray-800 flex items-center gap-1 hover:text-red-800"
                  >
                    READ MORE <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
