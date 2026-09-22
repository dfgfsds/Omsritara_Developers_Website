"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  ArrowRight,
  CalendarDays,
  User,
  Sparkles,
  BookOpen,
  Clock,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { useState, useMemo } from "react";

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  subtittle?: string;
  content: string;
  author: string;
  category?: string;
  readTime?: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

function getSafeImageUrl(url?: string): string {
  if (!url) return "/assets/about-gallery1.png";
  let safe = url.trim();
  if (safe.startsWith("http://api.omsritaradevelopers.in")) {
    safe = safe.replace(
      "http://api.omsritaradevelopers.in",
      "https://api.omsritaradevelopers.in"
    );
  }
  if (safe.includes("localhost:5000")) {
    safe = safe.replace(
      /https?:\/\/localhost:5000/g,
      "https://api.omsritaradevelopers.in"
    );
  }
  return safe;
}

function getReadTime(content?: string, explicitTime?: string): string {
  if (explicitTime && explicitTime.trim()) return explicitTime;
  if (!content) return "3 min read";
  const clean = content.replace(/<[^>]*>?/gm, "").trim();
  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

function getExcerpt(subtittle?: string, content?: string): string {
  if (subtittle && subtittle.trim().length > 0) return subtittle.trim();
  if (!content) return "";
  const clean = content.replace(/<[^>]*>?/gm, "").trim();
  return clean.length > 170 ? `${clean.substring(0, 170)}...` : clean;
}

export default function BlogClient({
  initialBlogs,
}: {
  initialBlogs: BlogPost[];
}) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const refreshBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Clean axios GET with NO custom headers to avoid CORS preflight rejection
      const res = await axios.get("https://api.omsritaradevelopers.in/blog");
      const list: BlogPost[] = Array.isArray(res?.data?.result)
        ? res.data.result
        : [];

      const activeBlogs = list
        .filter(
          (blog) =>
            blog &&
            blog.status === "active" &&
            blog.isDeleted === false &&
            blog.title
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      setBlogs(activeBlogs);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError("Unable to load latest articles. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

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
      if (b.category && b.category.trim().length > 0) {
        set.add(b.category.trim());
      }
    });
    const unique = Array.from(set);
    return unique.length > 0 ? ["all", ...unique] : [];
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

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/95 leading-relaxed font-normal">
            Discover real-time market updates, development news, investment
            analyses, and expert architectural guidance from Omsritara
            Developers.
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
        {/* DYNAMIC CATEGORY FILTER TABS */}
        {categories.length > 1 && (
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#9b0000] text-white shadow-md shadow-red-950/20"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat === "all" ? "All Articles" : cat}
              </button>
            ))}
          </div>
        )}

        {/* LOADING SKELETON */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="h-60 animate-pulse bg-gray-200" />
                <div className="space-y-4 p-6">
                  <div className="flex justify-between">
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
                  </div>
                  <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && blogs.length === 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50/60 p-12 text-center max-w-lg mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-[#9b0000] mb-3">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{error}</h3>
            <p className="mt-1 text-sm text-gray-600 mb-5">
              Click below to retry loading the latest blogs.
            </p>
            <button
              onClick={refreshBlogs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9b0000] text-white text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#800000] transition shadow-sm cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center max-w-lg mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#9b0000]/10 text-[#9b0000] mb-3">
              <BookOpen size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {activeCategory !== "all"
                ? `No articles found under "${activeCategory}"`
                : "No blog articles published yet"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeCategory !== "all"
                ? "Try selecting 'All Articles' or check back soon."
                : "Stay tuned for upcoming news and insights from Omsritara Developers."}
            </p>
            {activeCategory !== "all" ? (
              <button
                onClick={() => setActiveCategory("all")}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9b0000] hover:underline"
              >
                <span>View All Articles</span>
              </button>
            ) : (
              <button
                onClick={refreshBlogs}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9b0000] hover:underline"
              >
                <RefreshCw size={12} />
                <span>Refresh Feed</span>
              </button>
            )}
          </div>
        )}

        {/* DYNAMIC BLOG GRID */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {filteredBlogs.map((blog) => {
              const safeImg = getSafeImageUrl(blog.image);
              const readTime = getReadTime(blog.content, blog.readTime);
              const excerpt = getExcerpt(blog.subtittle, blog.content);
              const categoryBadge = blog.category || "Property Insight";

              return (
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
                      src={safeImg}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Floating Category Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#9b0000] shadow-sm backdrop-blur-md">
                        {categoryBadge}
                      </span>
                    </div>

                    {/* Dynamic Reading Time */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md flex items-center gap-1">
                        <Clock size={12} />
                        {readTime}
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
                      {excerpt && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                          {excerpt}
                        </p>
                      )}
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
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
