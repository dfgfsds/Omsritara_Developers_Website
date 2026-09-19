"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  User,
  Sparkles,
  BookOpen,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  subtittle: string;
  content: string;
  author: string;
  category?: string;
  readTime?: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

const FALLBACK_BLOGS: BlogPost[] = [
  {
    _id: "blog-chennai-suburbs-2026",
    title: "Why Investing in Chennai's Suburban Growth Corridors is Surging",
    image: "/assets/about-gallery1.png",
    subtittle:
      "From Porur to Tambaram and OMR, infrastructure expansion and metro connectivity are turning suburban Chennai into prime real estate gold.",
    content: "Detailed market breakdown of upcoming infrastructure corridors.",
    author: "Rajan Sundaram",
    category: "Market Trends",
    readTime: "4 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-03-12T10:00:00.000Z",
    updatedAt: "2026-03-12T10:00:00.000Z",
  },
  {
    _id: "blog-gated-community-amenities",
    title: "Top Gated Community Amenities Chennai Homebuyers Demand Today",
    image: "/assets/about-gallery2.png",
    subtittle:
      "Modern homebuyers want more than just four walls. Explore the clubhouse innovations, co-working lounges, and wellness sanctuaries shaping luxury projects.",
    content: "Comprehensive look at high-value gated amenities.",
    author: "Priya Lakshmi",
    category: "Luxury Living",
    readTime: "5 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-03-08T10:00:00.000Z",
    updatedAt: "2026-03-08T10:00:00.000Z",
  },
  {
    _id: "blog-cmda-dtcp-approvals-guide",
    title: "Understanding CMDA & DTCP Approvals Before Buying Your Dream Flat",
    image: "/assets/about-gallery3.png",
    subtittle:
      "A step-by-step buyer's checklist to verify planning permits, RERA registrations, encumbrance certificates, and clear title legalities.",
    content: "Essential legal verification tips for Chennai real estate.",
    author: "K. Venkatesh",
    category: "Buyer Guide",
    readTime: "6 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-02-28T10:00:00.000Z",
    updatedAt: "2026-02-28T10:00:00.000Z",
  },
  {
    _id: "blog-ecr-vs-omr-lifestyle",
    title: "East Coast Road vs OMR: Which Chennai Location Fits Your Lifestyle?",
    image: "/assets/Myans_Luxury_Villas_1.jpg",
    subtittle:
      "Comparing the tranquil coastal luxury of ECR with the bustling tech-centric convenience of OMR for your next home investment.",
    content: "Direct neighborhood comparison between ECR and OMR.",
    author: "Anand Natarajan",
    category: "Neighborhoods",
    readTime: "5 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-02-20T10:00:00.000Z",
    updatedAt: "2026-02-20T10:00:00.000Z",
  },
  {
    _id: "blog-interior-natural-light",
    title: "Maximizing Natural Light & Cross Ventilation in Modern Apartments",
    image: "/assets/featured-grid1.jpg",
    subtittle:
      "Discover architectural principles that create healthier, energy-efficient residences with generous ceiling heights and smart window orientation.",
    content: "Design insights on architectural daylighting and airflow.",
    author: "Priya Lakshmi",
    category: "Architecture",
    readTime: "3 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-02-14T10:00:00.000Z",
    updatedAt: "2026-02-14T10:00:00.000Z",
  },
  {
    _id: "blog-first-time-buyer-checklist",
    title: "The Ultimate Checklist for First-Time Homebuyers in Chennai",
    image: "/assets/about-gallery1.png",
    subtittle:
      "From financial budgeting and home loan pre-approvals to inspecting construction quality, here is everything you must know.",
    content: "Complete step-by-step roadmap for new homeowners.",
    author: "Rajan Sundaram",
    category: "Buyer Guide",
    readTime: "7 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-02-05T10:00:00.000Z",
    updatedAt: "2026-02-05T10:00:00.000Z",
  },
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://api.omsritaradevelopers.in/blog", {
          cache: "no-store",
          signal: AbortSignal.timeout(4000),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        const activeBlogs = (data.result || []).filter(
          (blog: BlogPost) =>
            blog.status === "active" && blog.isDeleted === false
        );

        if (activeBlogs.length > 0) {
          setBlogs(activeBlogs);
        } else {
          setBlogs(FALLBACK_BLOGS);
        }
      } catch (error) {
        setBlogs(FALLBACK_BLOGS);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recent";
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["all", ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (activeCategory === "all") return blogs;
    return blogs.filter((b) => b.category === activeCategory);
  }, [blogs, activeCategory]);

  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* ================= HERO BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-16 md:py-24">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9b0000]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#e29717]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            Insights & Real Estate Wisdom
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 font-serif">
            Property <span className="text-[#e29717]">Blog & Insights</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed">
            Discover the latest Chennai real estate market trends, homebuyer
            checklists, architectural inspirations, and expert guidance from
            Omsritara Developers.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-medium">Blog</span>
          </div>
        </div>
      </section>

      {/* ================= MAIN BLOG LISTING ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {["all", "Market Trends", "Buyer Guide", "Luxury Living", "Architecture"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${activeCategory === cat
                    ? "bg-[#9b0000] text-white shadow-md shadow-red-950/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {cat === "all" ? "All Articles" : cat}
              </button>
            )
          )}
        </div>

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="h-60 animate-pulse bg-gray-200" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BLOG GRID */}
        {!loading && filteredBlogs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#9b0000]/10 text-[#9b0000] mb-3">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              No articles found in this category
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Check back soon or select another topic.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {filteredBlogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full"
              >
                {/* Image Section */}
                <Link
                  href={`/blog/${blog._id}`}
                  className="relative block h-60 overflow-hidden bg-gray-100 cursor-pointer"
                >
                  <Image
                    src={blog.image || "/assets/about-gallery1.png"}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Floating Category Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#9b0000] shadow-sm backdrop-blur-md">
                      {blog.category || "Property Insight"}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                      <Clock size={12} />
                      {blog.readTime || "4 min read"}
                    </span>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    {/* Metadata: Date & Author */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={14} className="text-[#9b0000]" />
                        {formatDate(blog.createdAt)}
                      </span>

                      <span className="flex items-center gap-1.5 text-gray-600">
                        <User size={14} className="text-[#e29717]" />
                        {blog.author || "Omsritara"}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl font-bold font-serif text-gray-900 leading-snug line-clamp-2 group-hover:text-[#9b0000] transition-colors mb-2.5">
                      <Link href={`/blog/${blog._id}`}>{blog.title}</Link>
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed line-clamp-3">
                      {blog.subtittle}
                    </p>
                  </div>

                  {/* Read More Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <Link
                      href={`/blog/${blog._id}`}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9b0000] group-hover:text-[#800000] transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                    <span className="w-8 h-8 rounded-full bg-red-50 text-[#9b0000] flex items-center justify-center transition-colors group-hover:bg-[#9b0000] group-hover:text-white">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}