import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  User,
  Sparkles,
  Clock,
  Share2,
  Phone,
  MessageCircle,
  Building2,
  ArrowUpRight,
  CheckCircle2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

interface BlogPost {
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

// Fallback rich articles to ensure seamless reading experience
const FALLBACK_BLOGS: BlogPost[] = [
  {
    _id: "blog-chennai-suburbs-2026",
    title: "Why Investing in Chennai's Suburban Growth Corridors is Surging",
    image: "/assets/about-gallery1.png",
    subtittle:
      "From Porur to Tambaram, Guduvanchery, and the OMR tech belt, massive infrastructure projects and Metro Phase 2 expansion are driving property appreciation.",
    content: `
      <h2>The Infrastructure Revolution Driving Suburban Chennai</h2>
      <p>Chennai's urban boundary is rapidly expanding southwest and southeast. Driven by expanding IT corridors, modern manufacturing hubs, and the ambitious Chennai Metro Phase 2 network, suburban micro-markets that were once considered peripheral are now premier residential hotspots.</p>
      
      <blockquote>"Investors who identified suburban growth nodes 3 to 5 years ago in corridors like Porur-Kundrathur and Pallavaram-Thoraipakkam Radial Road have witnessed 40% to 65% capital appreciation."</blockquote>

      <h2>Top 3 High-Growth Corridors in 2026</h2>
      <p>Here are the corridors witnessing the strongest residential demand and infrastructure investments:</p>
      <ul>
        <li><strong>Porur - Mount Poonamallee Road:</strong> Proximity to major DLF IT Park, Chennai Metro Line 4 connectivity, and excellent international schools.</li>
        <li><strong>Pallavaram - Thoraipakkam Radial Road:</strong> The vital arterial link between GST Road and OMR, surrounded by healthcare hubs and educational universities.</li>
        <li><strong>Guduvanchery - Kilambakkam Bus Terminus Zone:</strong> With the KCBT terminus fully operational, south Chennai connectivity has received an exponential upgrade.</li>
      </ul>

      <h2>Key Checklist for Suburban Land & Flat Buyers</h2>
      <p>Before committing to an investment in emerging suburbs, ensure your chosen development meets these critical parameters:</p>
      <ol>
        <li>Verify CMDA or DTCP planning approvals with unequivocal sanction orders.</li>
        <li>Ensure verified RERA registration status on the official TNRERA portal.</li>
        <li>Check water table sustainability and storm water drainage infrastructure.</li>
        <li>Assess builder track record on timely handover and construction quality.</li>
      </ol>

      <p>At Omsritara Developers, all our ongoing apartment complexes and plotted developments in Chennai are 100% CMDA & DTCP approved with crystal-clear legal documentation and world-class gated community infrastructure.</p>
    `,
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
    content: `
      <h2>The Evolution of Modern Community Living</h2>
      <p>Today's discerning Chennai homeowner prioritizes holistic lifestyle balance. A residential project is no longer evaluated merely by square footage—amenity ecosystem, community spaces, and eco-friendly infrastructure determine long-term satisfaction and property value.</p>
      
      <blockquote>"A well-curated gated community clubhouse and sports infrastructure enhances rental yields by up to 25% and ensures sustained resale demand."</blockquote>

      <h2>Must-Have Amenities in Luxury Developments</h2>
      <ul>
        <li><strong>Integrated Co-Working Spaces:</strong> High-speed Wi-Fi lounges and private meeting pods tailored for hybrid work professionals.</li>
        <li><strong>Wellness Sanctuaries:</strong> Fully-equipped fitness clubs, temperature-regulated swimming pools, and serene yoga meditation decks.</li>
        <li><strong>Children's Development Zones:</strong> Dedicated multi-sport turf courts, skate parks, and safe toddler play spaces.</li>
        <li><strong>Senior Citizen Parks:</strong> Fragrant reflexology pathways, shaded gazebos, and barrier-free wheelchair access.</li>
      </ul>
    `,
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
    content: `
      <h2>Why Statutory Approvals Matter More Than Ever</h2>
      <p>Investing in real estate is one of the largest financial decisions of a lifetime. Ensuring that your property possesses valid statutory sanctions from the Chennai Metropolitan Development Authority (CMDA) or Directorate of Town and Country Planning (DTCP) is non-negotiable.</p>

      <h2>Key Legal Documents to Verify</h2>
      <ul>
        <li><strong>CMDA/DTCP Sanction Plan:</strong> Ensures the building layout strictly complies with Floor Space Index (FSI) and setback norms.</li>
        <li><strong>TNRERA Registration Number:</strong> Guarantees regulatory transparency and builder accountability under the Real Estate Regulation Act.</li>
        <li><strong>Parent Documents & 30-Year Encumbrance Certificate (EC):</strong> Confirms unambiguous, unbroken ownership title free from commercial encumbrances.</li>
        <li><strong>Completion Certificate (CC) & Occupancy Certificate (OC):</strong> Confirms the building was constructed in full compliance with the approved plan.</li>
      </ul>
    `,
    author: "K. Venkatesh",
    category: "Buyer Guide",
    readTime: "6 min read",
    status: "active",
    isDeleted: false,
    createdAt: "2026-02-28T10:00:00.000Z",
    updatedAt: "2026-02-28T10:00:00.000Z",
  },
];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post: BlogPost | null = null;

  try {
    const response = await fetch(`https://api.omsritaradevelopers.in/blog/${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.result && data.result.status === "active" && !data.result.isDeleted) {
        post = data.result;
      }
    }
  } catch (error) {
    // Graceful fallback below
  }

  // If not found in API, check local fallback database
  if (!post) {
    post = FALLBACK_BLOGS.find((b) => b._id === id) || null;
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const categoryName = post.category || "Property Insights";
  const readingTime = post.readTime || "5 min read";

  // Related posts for sidebar
  const relatedPosts = FALLBACK_BLOGS.filter((b) => b._id !== post?._id).slice(0, 3);

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
                  <span>{post.author}</span>
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

            {/* Lead Summary Callout */}
            <div className="my-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-red-50/80 via-amber-50/50 to-white border-l-4 border-[#9b0000] text-gray-900 text-lg sm:text-xl leading-relaxed font-medium shadow-xs">
              {post.subtittle}
            </div>

            {/* Featured Image - Balanced Height Constraint */}
            <div className="relative aspect-[16/9] max-h-[440px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md mb-10">
              <Image
                src={post.image || "/assets/about-gallery1.png"}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Article Content with Elevated Typography */}
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

            {/* Author Profile Bio Box */}
            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#9b0000] text-white flex items-center justify-center font-serif text-2xl font-bold flex-shrink-0 shadow-md">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#9b0000]">
                  Published By Author
                </span>
                <h4 className="text-lg font-bold text-gray-900 mt-0.5">
                  {post.author}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  Real Estate Research & Property Advisory Specialist at Omsritara Developers,
                  analyzing Chennai market dynamics, RERA compliance, and urban infrastructure developments.
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

            {/* Widget 2: Trending / Recent Articles */}
            <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <h4 className="text-base font-bold text-gray-900 font-serif uppercase tracking-wider mb-5 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Bookmark size={16} className="text-[#9b0000]" />
                <span>Trending Insights</span>
              </h4>

              <div className="space-y-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related._id}
                    href={`/blog/${related._id}`}
                    className="group flex gap-3.5 items-start"
                  >
                    <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={related.image || "/assets/about-gallery1.png"}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b0000] block mb-1">
                        {related.category || "Property"}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#9b0000] transition-colors">
                        {related.title}
                      </h5>
                      <span className="text-[11px] text-gray-400 mt-1 block">
                        {related.readTime || "4 min read"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

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