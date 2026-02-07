import { notFound } from "next/navigation";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";

// Example blog posts (you can replace with API fetch)
const posts = [
  {
    id: "1",
    title: "Liaisoning and Approvals – Expert Guidance by Omsritara Developers",
    author: "Admin",
    comments: 3,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>In the real estate and construction industry, liaisoning and approvals play a critical role in ensuring that projects move forward legally, smoothly, and without delays. At Omsritara Developers, we specialize in providing end-to-end liaisoning and approval services that help landowners, builders, and investors navigate complex government procedures with confidence.</p>
      
      <h2>What is Liaisoning and Approvals?</h2>
      <p>Liaisoning refers to the process of coordinating and communicating with various government departments, regulatory bodies, and local authorities to obtain mandatory approvals for real estate and construction projects. These approvals are essential to ensure that a project complies with legal, zoning, environmental, and safety regulations.</p>
      <p>Without proper liaisoning, projects can face unexpected delays, penalties, or even legal disputes. This is where the expertise of Omsritara Developers makes a significant difference.</p>
      
      <h2>Importance of Liaisoning and Approvals in Real Estate</h2>
      <p>Proper liaisoning and approvals are vital for:</p>
      <ul>
        <li>Ensuring legal compliance with government norms</li>
        <li>Avoiding project delays and rejections</li>
        <li>Reducing legal and financial risks</li>
        <li>Improving project credibility and buyer confidence</li>
        <li>Enabling smooth project execution and completion</li>
      </ul>
      <p>At Omsritara Developers, we understand local regulations and approval processes thoroughly, helping our clients save time and effort.</p>
      
      <h2>Our Liaisoning and Approval Services</h2>
      <p>Omsritara Developers offers comprehensive liaisoning services tailored to residential, commercial, and plotted development projects.</p>
      
      <h3>Government Approvals & Clearances</h3>
      <p>We assist in obtaining approvals from relevant authorities, including:</p>
      <ul>
        <li>Local municipal bodies</li>
        <li>Panchayat and corporation approvals</li>
        <li>DTCP / CMDA approvals</li>
        <li>Revenue and land records departments</li>
      </ul>
      
      <h3>Plan Sanctions & Permissions</h3>
      <p>Our team coordinates for:</p>
      <ul>
        <li>Building plan approvals</li>
        <li>Layout approvals</li>
        <li>Land conversion approvals</li>
        <li>Change of land use permissions</li>
      </ul>
      
      <h3>Legal & Documentation Support</h3>
      <p>We ensure accurate handling of:</p>
      <ul>
        <li>Patta, chitta, and land records</li>
        <li>Encumbrance verification</li>
        <li>Legal compliance documentation</li>
        <li>Coordination with survey and registration offices</li>
      </ul>
      
      <h3>End-to-End Liaisoning Support</h3>
      <p>From initial application to final approval, Omsritara Developers manages the complete process, ensuring transparency and efficiency.</p>
      
      <h2>Why Choose Omsritara Developers?</h2>
      <p>✔ Experienced real estate professionals<br>
      ✔ Strong relationships with regulatory authorities<br>
      ✔ Transparent and ethical practices<br>
      ✔ Time-bound approval assistance<br>
      ✔ Customized solutions for every project</p>
      <p>Our expertise allows clients to focus on development and investment while we handle the regulatory complexities.</p>
      
      <h2>Who Can Benefit From Our Services?</h2>
      <ul>
        <li>Individual landowners</li>
        <li>Real estate developers</li>
        <li>Builders and contractors</li>
        <li>Property investors</li>
        <li>Plotted development promoters</li>
      </ul>
      <p>Whether it's a small residential project or a large-scale development, Omsritara Developers provides reliable liaisoning and approval support.</p>
      
      <h2>Conclusion</h2>
      <p>Liaisoning and approvals are the backbone of any successful real estate project. With Omsritara Developers, you gain a trusted partner who ensures your project meets all legal requirements and progresses without unnecessary hurdles.</p>
      <p>If you are planning a real estate or construction project and need expert liaisoning support, Omsritara Developers is here to help you every step of the way.</p>
    `,
  },
  {
    id: "2",
    title: "Buying and Selling Properties – Trusted Real Estate Solutions by Omsritara Developers",
    author: "Admin",
    comments: 3,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Buying or selling a property is one of the most important financial decisions in life. Whether you are investing, upgrading, or selling an existing asset, having the right guidance makes all the difference. Omsritara Developers offers professional, transparent, and result-driven property buying and selling services designed to ensure smooth and secure transactions.</p>
      
      <h2>Expert Property Buying Services</h2>
      <p>At Omsritara Developers, we help clients find the right property that matches their needs, budget, and long-term goals. Our deep market knowledge and customer-centric approach ensure a stress-free buying experience.</p>
      
      <h3>Our Buying Process Includes:</h3>
      <ul>
        <li>Understanding client requirements and preferences</li>
        <li>Identifying verified residential, commercial, and plotted properties</li>
        <li>Market price analysis and investment guidance</li>
        <li>Property site visits and inspections</li>
        <li>Legal verification and documentation support</li>
      </ul>
      <p>We ensure every property purchase is legally compliant, fairly priced, and future-ready.</p>
      
      <h2>Professional Property Selling Services</h2>
      <p>Selling a property requires the right pricing strategy, strong market reach, and expert negotiation. Omsritara Developers helps property owners sell faster while maximizing value.</p>
      
      <h3>Our Selling Services Cover:</h3>
      <ul>
        <li>Accurate property valuation based on market trends</li>
        <li>Professional property listing and promotion</li>
        <li>Connecting with genuine buyers and investors</li>
        <li>Negotiation and deal closure support</li>
        <li>Assistance with legal paperwork and registration</li>
      </ul>
      <p>Our goal is to ensure quick sales with complete transparency and peace of mind.</p>
      
      <h2>Why Choose Omsritara Developers for Buying and Selling?</h2>
      <p>✔ Trusted real estate professionals<br>
      ✔ End-to-end transaction support<br>
      ✔ Clear and transparent dealings<br>
      ✔ Strong local market expertise<br>
      ✔ Client-focused and ethical approach</p>
      <p>With Omsritara Developers, clients benefit from reliable advice and seamless execution at every stage.</p>
      
      <h2>Types of Properties We Handle</h2>
      <ul>
        <li>Residential plots and houses</li>
        <li>Apartments and villas</li>
        <li>Commercial properties</li>
        <li>Investment lands</li>
        <li>Plotted development projects</li>
      </ul>
      <p>We cater to both individual buyers and large-scale investors.</p>
      
      <h2>Importance of Professional Real Estate Support</h2>
      <p>Working with experienced real estate professionals like Omsritara Developers helps:</p>
      <ul>
        <li>Avoid legal risks and documentation issues</li>
        <li>Save time and negotiation effort</li>
        <li>Ensure correct property valuation</li>
        <li>Achieve secure and hassle-free transactions</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Whether you are planning to buy your dream property or sell an existing asset, Omsritara Developers is your trusted partner in real estate buying and selling. Our expertise, transparency, and commitment to quality ensure successful property transactions every time.</p>
      <p>Get in touch with Omsritara Developers today to experience reliable and professional real estate solutions.</p>
    `,
  },
  {
    id: "3",
    title: "Construction Services by Omsritara Developers – Building Quality That Lasts",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>In today's fast-growing real estate landscape, choosing the right construction partner is crucial for long-term value, safety, and peace of mind. Omsritara Developers is a trusted name in the construction industry, delivering high-quality residential, commercial, and plotted development projects with a strong focus on durability, design, and compliance.</p>
      <p>With years of hands-on experience, we transform ideas into well-engineered structures that meet modern standards and client expectations.</p>
      
      <h2>End-to-End Construction Solutions</h2>
      <p>At Omsritara Developers, we provide complete construction services from planning to final handover. Our expert team ensures every stage of the project is executed with precision, transparency, and technical excellence.</p>
      
      <h3>Our Construction Services Include:</h3>
      <ul>
        <li>Residential building construction (individual houses & apartments)</li>
        <li>Commercial building construction</li>
        <li>Structural design & execution</li>
        <li>Renovation & redevelopment works</li>
        <li>Turnkey construction solutions</li>
        <li>Quality material sourcing & project supervision</li>
      </ul>
      <p>We follow industry best practices and use high-grade materials to ensure long-lasting and safe structures.</p>
      
      <h2>Why Choose Omsritara Developers for Construction?</h2>
      <p>Choosing Omsritara Developers means partnering with a construction company that prioritizes quality, timelines, and customer satisfaction.</p>
      
      <h3>Key Advantages:</h3>
      <p><strong>Experienced Construction Team</strong> – Skilled engineers, architects, and supervisors</p>
      <p><strong>Quality Assurance</strong> – Strict quality checks at every stage</p>
      <p><strong>Transparent Process</strong> – Clear costing and regular project updates</p>
      <p><strong>Timely Delivery</strong> – Projects completed as per committed timelines</p>
      <p><strong>Compliance & Safety</strong> – Adherence to local building rules and safety standards</p>
      <p>Our goal is to deliver construction projects that stand strong for generations.</p>
      
      <h2>Quality Materials & Modern Construction Techniques</h2>
      <p>We believe that strong foundations begin with the right materials and modern construction practices. Omsritara Developers uses tested construction materials and advanced techniques to ensure structural strength, energy efficiency, and aesthetic appeal.</p>
      <p>From foundation to finishing, every detail is carefully planned and executed.</p>
      
      <h2>Residential & Commercial Construction Expertise</h2>
      <p>Whether you are planning to build your dream home or a commercial space, Omsritara Developers offers customized construction solutions tailored to your requirements and budget. We work closely with clients to understand their vision and bring it to life with functional and elegant designs.</p>
      
      <h2>Trusted Construction Company in Tamil Nadu</h2>
      <p>With a growing portfolio of successful projects, Omsritara Developers has earned a reputation as a reliable construction company known for integrity, workmanship, and client trust. Our commitment to excellence makes us a preferred choice for property owners, investors, and developers.</p>
      
      <h2>Build with Confidence – Contact Omsritara Developers</h2>
      <p>If you are looking for a dependable construction partner, Omsritara Developers is here to help you build with confidence. From concept to completion, we ensure a smooth, stress-free construction experience.</p>
      <p>Get in touch with Omsritara Developers today to discuss your construction requirements and take the first step toward building a strong future.</p>
    `,
  },
  {
    id: "4",
    title: "Plotted Development Services by Omsritara Developers – Smart Land Investments Made Secure",
    comments: 3,
    author: "Admin",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
    content: `
      <p>Plotted development is one of the most reliable and high-growth real estate investment options today. At Omsritara Developers, we specialize in delivering well-planned, legally approved plotted developments that offer long-term value, safety, and excellent appreciation potential.</p>
      <p>With a strong focus on planning, compliance, and infrastructure, we help investors and home buyers secure land that is ready for the future.</p>
      
      <h2>What Is Plotted Development?</h2>
      <p>Plotted development involves converting large parcels of land into clearly demarcated residential or commercial plots with proper roads, drainage, utilities, and legal approvals. A well-executed plotted development ensures ease of ownership, clear documentation, and hassle-free construction in the future.</p>
      <p>Omsritara Developers follows a structured and transparent approach to create organized and investment-friendly layouts.</p>
      
      <h2>End-to-End Plotted Development Solutions</h2>
      <p>At Omsritara Developers, we manage the entire plotted development process from land acquisition to final layout delivery.</p>
      
      <h3>Our Plotted Development Services Include:</h3>
      <ul>
        <li>Land feasibility study & layout planning</li>
        <li>DTCP / CMDA / Panchayat approvals</li>
        <li>Road development & internal infrastructure</li>
        <li>Drainage, water supply & electrical planning</li>
        <li>Plot demarcation & numbering</li>
        <li>Legal documentation & registration support</li>
      </ul>
      <p>Every project is designed to meet government norms and future growth requirements.</p>
      
      <h2>Why Choose Omsritara Developers for Plotted Development?</h2>
      <p>Selecting the right developer is crucial for a safe and profitable land investment. Omsritara Developers stands out for its commitment to transparency, quality, and legal compliance.</p>
      
      <h3>Key Benefits:</h3>
      <p><strong>Approved Layouts Only</strong> – Clear titles and proper approvals</p>
      <p><strong>Strategic Locations</strong> – High growth and connectivity potential</p>
      <p><strong>Well-Planned Infrastructure</strong> – Roads, drainage & utilities</p>
      <p><strong>Transparent Pricing</strong> – No hidden costs</p>
      <p><strong>Trusted Developer</strong> – Proven experience in plotted projects</p>
      <p>We ensure peace of mind for both investors and end users.</p>
      
      <h2>High-Return Investment Opportunity</h2>
      <p>Plotted developments by Omsritara Developers are designed for strong capital appreciation and long-term returns. With increasing demand for land ownership, our projects offer flexibility, lower maintenance costs, and excellent resale value.</p>
      <p>Whether you plan to build now or invest for the future, plotted development is a smart choice.</p>
      
      <h2>Residential & Commercial Plot Development</h2>
      <p>We offer plotted developments suitable for:</p>
      <ul>
        <li>Residential housing projects</li>
        <li>Villa communities</li>
        <li>Commercial and mixed-use developments</li>
      </ul>
      <p>Each layout is carefully designed to maximize land value while ensuring livability and accessibility.</p>
      
      <h2>Trusted Plotted Development Company in Tamil Nadu</h2>
      <p>Omsritara Developers has built a strong reputation as a reliable plotted development company known for ethical practices, timely delivery, and customer satisfaction. Our projects reflect our commitment to quality planning and sustainable development.</p>
      
      <h2>Invest with Confidence – Contact Omsritara Developers</h2>
      <p>If you are looking for secure, approved, and well-planned plots, Omsritara Developers is your trusted partner. We help you invest in land that grows in value and confidence.</p>
      <p>Contact Omsritara Developers today to explore our plotted development projects and investment opportunities.</p>
    `,
  },
];

// Generate static params for all blog pages at build time
export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="relative mt-14 md:mt-20 bg-gray-50 py-10 md:py-16 overflow-hidden">
        <div
          className="hidden absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-40 pointer-events-none"
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
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Back Button */}
        <div className="mt-5 md:mt-6">
          <BackButton />
        </div>
      </div>
    </>
  );
}
