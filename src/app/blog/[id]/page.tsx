import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Metadata } from "next";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Sparkles,
  Clock,
  Phone,
  Building2,
  ArrowUpRight,
  Bookmark,
} from "lucide-react";

interface BlogPost {
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

function slugify(text?: string) {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
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

export const dynamic = "force-dynamic";

async function fetchBlogByIdOrSlug(idOrSlug: string): Promise<BlogPost | null> {
  const rawId = typeof idOrSlug === "string" ? idOrSlug : "";
  const decodedId = decodeURIComponent(rawId).trim().toLowerCase();

  // 1. Try direct ID fetch from API
  try {
    const res = await axios.get(
      `https://api.omsritaradevelopers.in/blog/${rawId}`,
      {
        timeout: 10000,
      }
    );
    if (
      res?.data?.result &&
      res.data.result.status === "active" &&
      !res.data.result.isDeleted
    ) {
      return res.data.result;
    }
  } catch (error) {
    // Continue to slug/list search below
  }

  // 2. Search entire blog list by ID, lowercase ID, or title slug
  try {
    const listRes = await axios.get("https://api.omsritaradevelopers.in/blog", {
      timeout: 10000,
    });
    const list: BlogPost[] = Array.isArray(listRes?.data?.result)
      ? listRes.data.result
      : [];

    const matched = list.find(
      (b) =>
        b &&
        b.status === "active" &&
        !b.isDeleted &&
        (b._id === rawId ||
          b._id.toLowerCase() === decodedId ||
          slugify(b.title) === decodedId ||
          slugify(b.title) === rawId.toLowerCase())
    );

    if (matched) return matched;
  } catch (error) {
    console.error("Error fetching blog list fallback:", error);
  }

  return null;
}

async function fetchDynamicRelatedPosts(currentId: string): Promise<BlogPost[]> {
  try {
    const res = await axios.get("https://api.omsritaradevelopers.in/blog", {
      timeout: 10000,
    });
    const list: BlogPost[] = Array.isArray(res?.data?.result)
      ? res.data.result
      : [];

    return list
      .filter(
        (b) =>
          b &&
          b.status === "active" &&
          !b.isDeleted &&
          b._id !== currentId
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogByIdOrSlug(id);

  if (!post) {
    return {
      title: "Blog Article | Omsritara Developers",
    };
  }

  const safeImg = getSafeImageUrl(post.image);

  return {
    title: `${post.title} | Omsritara Developers Blog`,
    description: post.subtittle || post.title,
    openGraph: {
      title: post.title,
      description: post.subtittle || post.title,
      images: [safeImg],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchBlogByIdOrSlug(id);

  if (!post) {
    notFound();
  }

  const displayImage = getSafeImageUrl(post.image);
  const readingTime = getReadTime(post.content, post.readTime);
  const categoryName = post.category || "Property Insights";

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Dynamic related posts from the real API
  const relatedPosts = await fetchDynamicRelatedPosts(post._id);

  // Check if content is HTML or plain text
  const isHtml = /<[a-z][\s\S]*>/i.test(post.content || "");

  // If plain text, break into readable paragraphs
  const plainTextParagraphs = !isHtml
    ? (post.content || "")
        .split(/\n\s*\n|\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : [];

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans">
      {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white py-14 md:py-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9b0000]/25 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#e29717]/15 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles size={14} />
            {categoryName}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-serif max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>

          {/* Breadcrumbs */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition">
              Blog
            </Link>
            <span>/</span>
            <span className="text-yellow-400 font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </div>
        </div>
      </section>

      {/* ================= ARTICLE MAIN BODY ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-[#9b0000] transition group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to All Articles</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT 8 COLUMNS: MAIN ARTICLE */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-100 font-medium text-gray-700">
                  <User size={15} className="text-[#9b0000]" />
                  <span>{post.author || "Omsritara"}</span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-100">
                  <CalendarDays size={15} className="text-[#9b0000]" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Clock size={15} className="text-[#e29717]" />
                <span>{readingTime}</span>
              </div>
            </div>

            {/* Lead Subtitle / Excerpt Callout */}
            {post.subtittle && post.subtittle.trim().length > 0 && (
              <div className="my-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-red-50/80 via-amber-50/50 to-white border-l-4 border-[#9b0000] text-gray-900 text-lg sm:text-xl leading-relaxed font-medium shadow-xs">
                {post.subtittle}
              </div>
            )}

            {/* Featured Image */}
            <div className="relative aspect-[16/9] max-h-[460px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md mb-10">
              <Image
                src={displayImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* Article Content */}
            {isHtml ? (
              <article
                className="
                  blog-content
                  text-[17px]
                  sm:text-[18px]
                  leading-8
                  text-gray-800
                  [&_h2]:text-2xl
                  sm:[&_h2]:text-3xl
                  [&_h2]:font-bold
                  [&_h2]:font-serif
                  [&_h2]:text-gray-900
                  [&_h2]:mt-10
                  [&_h2]:mb-4
                  [&_h2]:pt-2

                  [&_h3]:text-xl
                  sm:[&_h3]:text-2xl
                  [&_h3]:font-bold
                  [&_h3]:text-gray-900
                  [&_h3]:mt-8
                  [&_h3]:mb-3

                  [&_p]:mb-6
                  [&_p]:leading-relaxed

                  [&_strong]:font-bold
                  [&_strong]:text-gray-900

                  [&_ul]:mb-6
                  [&_ul]:space-y-2.5
                  [&_ul]:list-disc
                  [&_ul]:pl-6
                  [&_ul]:text-gray-700

                  [&_ol]:mb-6
                  [&_ol]:space-y-2.5
                  [&_ol]:list-decimal
                  [&_ol]:pl-6
                  [&_ol]:text-gray-700

                  [&_li]:leading-relaxed

                  [&_blockquote]:my-8
                  [&_blockquote]:border-l-4
                  [&_blockquote]:border-[#9b0000]
                  [&_blockquote]:bg-gray-50
                  [&_blockquote]:rounded-r-2xl
                  [&_blockquote]:p-6
                  [&_blockquote]:text-gray-900
                  [&_blockquote]:font-serif
                  [&_blockquote]:text-lg
                  [&_blockquote]:italic
                  [&_blockquote]:leading-relaxed
                "
                dangerouslySetInnerHTML={{
                  __html: post.content || "",
                }}
              />
            ) : (
              <article className="blog-content text-[17px] sm:text-[18px] leading-8 text-gray-800 space-y-6">
                {plainTextParagraphs.map((para, idx) => (
                  <p key={idx} className="leading-relaxed text-gray-800">
                    {para}
                  </p>
                ))}
              </article>
            )}

            {/* Author Profile Bio Box */}
            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#9b0000] text-white flex items-center justify-center font-serif text-2xl font-bold flex-shrink-0 shadow-md">
                {(post.author || "O").charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#9b0000]">
                  Published By
                </span>
                <h4 className="text-lg font-bold text-gray-900 mt-0.5">
                  {post.author || "Omsritara Developers"}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  Real Estate Research & Property Advisory Team at Omsritara Developers,
                  providing Chennai market insights, infrastructure updates, and luxury homebuyer guidance.
                </p>
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-800 hover:bg-gray-100 transition"
              >
                <ArrowLeft size={14} />
                <span>All Blog Articles</span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9b0000] hover:bg-[#800000] text-xs font-bold uppercase tracking-wider text-white shadow-sm transition"
              >
                <span>Consult Our Team</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: STICKY LUXURY SIDEBAR */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            {/* Widget 1: Schedule Site Visit Callout */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#8e0000] to-[#6f0000] text-white shadow-xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles size={12} />
                Exclusive Consultation
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif leading-snug mb-3">
                Planning to Buy a Home in Chennai?
              </h3>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed mb-6">
                Get project brochures, floor plans, and current price lists directly from Omsritara Developers.
              </p>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-yellow-400 to-[#e29717] hover:from-yellow-300 hover:to-yellow-400 text-gray-950 font-bold text-xs uppercase tracking-wider shadow-md transition"
                >
                  <span>Book Free Site Visit</span>
                  <ArrowUpRight size={14} />
                </Link>

                <Link
                  href="tel:+917779958889"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition border border-white/15"
                >
                  <Phone size={13} className="text-yellow-400" />
                  <span>Call +91 77799 58889</span>
                </Link>
              </div>
            </div>

            {/* Widget 2: Dynamic Trending / Recent Articles from API */}
            {relatedPosts.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h4 className="text-base font-bold text-gray-900 font-serif uppercase tracking-wider mb-5 pb-2 border-b border-gray-100 flex items-center gap-2">
                  <Bookmark size={16} className="text-[#9b0000]" />
                  <span>Trending Insights</span>
                </h4>

                <div className="space-y-5">
                  {relatedPosts.map((related) => {
                    const relatedImg = getSafeImageUrl(related.image);
                    const relatedReadTime = getReadTime(
                      related.content,
                      related.readTime
                    );

                    return (
                      <Link
                        key={related._id}
                        href={`/blog/${related._id}`}
                        className="group flex gap-3.5 items-start"
                      >
                        <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={relatedImg}
                            alt={related.title}
                            fill
                            sizes="72px"
                            className="object-cover transition-transform duration-500 group-hover:scale-108"
                          />
                        </div>

                        <div className="flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b0000] block mb-1">
                            {related.category || "Insight"}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#9b0000] transition-colors">
                            {related.title}
                          </h5>
                          <span className="text-[11px] text-gray-400 mt-1 block">
                            {relatedReadTime}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Widget 3: Ongoing Projects Banner */}
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#9b0000]/10 text-[#9b0000] flex items-center justify-center mx-auto mb-3">
                <Building2 size={22} />
              </div>
              <h4 className="text-base font-bold text-gray-900 font-serif mb-1">
                Explore Ongoing Apartments
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Discover 2 & 3 BHK gated community homes across Chennai.
              </p>
              <Link
                href="/properties"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9b0000] hover:text-[#7d0000] transition"
              >
                <span>Browse Properties</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}