// app/blog/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { User, MessageSquare } from "lucide-react";
import Link from "next/link";

// Example blog posts (you can replace with API fetch)
const posts = [
  {
    id: "1",
    title: "Buy and Sell Properties Made Easy",
    author: "Admin",
    comments: 3,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>This is a detailed blog about buying and selling properties easily. 
      Learn the tips and tricks to make your property transactions smooth and profitable.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
      Praesent libero. Sed cursus ante dapibus diam.</p>
    `,
  },
  {
    id: "2",
    title: "Expert Property Buying Consulting",
    author: "Admin",
    comments: 3,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Our expert consultants guide you through the property buying process, 
      helping you make the right investment decisions.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
      Praesent libero. Sed cursus ante dapibus diam.</p>
    `,
  },
  {
    id: "3",
    title: "Flats, Land, Farmhouse, and Agriculture Deals",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>This is a detailed blog about buying and selling properties easily. 
      Learn the tips and tricks to make your property transactions smooth and profitable.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
      Praesent libero. Sed cursus ante dapibus diam.</p>
    `,
  },
  {
    id: "4",
    title: "Licensing Work & Approvals",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>This is a detailed blog about buying and selling properties easily. 
      Learn the tips and tricks to make your property transactions smooth and profitable.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. 
      Praesent libero. Sed cursus ante dapibus diam.</p>
    `,
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // Find post by ID
    const found = posts.find((p) => p.id === params.id);
    if (!found) {
      // Redirect to blog list if not found
      router.push("/blog");
    } else {
      setPost(found);
    }
  }, [params.id]);

  if (!post) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <div className="relative mt-14 md:mt-20 bg-gray-50 py-10 md:py-16 overflow-hidden">
        <div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-40 pointer-events-none"
        ></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#9b0000]">Blog Details </span>
          </h1>

          <div className="mt-3 md:mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
            <Link href="/" className="hover:text-[#9b0000] transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">Blog Details </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-5 md:mb-6 flex gap-2 items-center">
          <Link href="/" className="hover:text-red-800">Home</Link>
          <span>&gt;</span>
          <Link href="/blog" className="hover:text-red-800">Blog</Link>
          <span>&gt;</span>
          <span className="text-gray-800 font-medium">{post.title}</span>
        </div>

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-5">{post.title}</h1>

        {/* Author & Comments */}
        <div className="flex items-center gap-6 text-gray-500 mb-5 md:mb-6 text-sm sm:text-base">
          <span className="flex items-center gap-1">
            <User size={16} /> {post.author}
          </span>
          {/* <span className="flex items-center gap-1">
          <MessageSquare size={16} /> {post.comments} Comments
        </span> */}
        </div>

        {/* Image */}
        <div className="relative w-full h-80 mb-6 md:mb-7">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Back Button */}
        <div className="mt-5 md:mt-6">
          <Link
            href="/blog"
            className="inline-block px-6 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </>
  );
}
