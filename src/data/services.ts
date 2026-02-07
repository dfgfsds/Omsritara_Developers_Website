import { Building2, Home, Handshake, FileText, LandPlot } from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: any;
  content: string;
}

export const services: Service[] = [
  {
    id: 1,
    title: "Buy/Sell Property",
    description: "At Omsritara Developers, we understand that buying or selling a property is a major decision. Whether you are searching for your dream home, planning a smart investment, or selling your property for the best value, our experienced team provides professional guidance, market insights, and end-to-end support to make the process smooth and stress-free.",
    image: "/assets/land/image-02.webp",
    icon: Handshake,
    content: `
      <section>
        <p>At Omsritara Developers, we understand that buying or selling a property is a major decision. Whether you are searching for your dream home, planning a smart investment, or selling your property for the best value, our experienced team provides professional guidance, market insights, and end-to-end support to make the process smooth and stress-free.</p>
        <p class="mt-3">We are committed to delivering trusted real estate services, ensuring our clients achieve their goals with confidence.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Buying a Property</h3>
        <p>Purchasing a property is more than just a transaction—it’s an investment in your future. At Omsritara Developers, we help buyers:</p>
        <ul class="list-disc pl-6 space-y-2 mt-2 text-gray-700">
          <li><strong>Find the perfect property:</strong> Explore a curated range of residential, commercial, and land properties tailored to your budget and lifestyle.</li>
          <li><strong>Get expert advice:</strong> Our real estate experts provide guidance on pricing, location, legal verification, and investment potential.</li>
          <li><strong>Secure investments:</strong> We verify all documents, titles, and approvals to ensure your purchase is safe and legally sound.</li>
          <li><strong>Customized solutions:</strong> Whether you are buying your first home, a luxury villa, or a commercial property, we recommend options based on your needs and goals.</li>
          <li><strong>Financial guidance:</strong> Assistance in evaluating loans, mortgages, and financing options for a seamless buying experience.</li>
        </ul>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Selling Your Property</h3>
        <p>Selling a property can be a complex and time-sensitive process. Omsritara Developers ensures sellers get maximum value with minimal hassle:</p>
        <ul class="list-disc pl-6 space-y-2 mt-2 text-gray-700">
          <li><strong>Accurate property valuation:</strong> We analyze market trends, property condition, and location to suggest the optimal price.</li>
          <li><strong>Effective marketing:</strong> Using online listings, social media campaigns, and our wide network, we reach potential buyers quickly.</li>
          <li><strong>Smooth legal process:</strong> From agreements to ownership transfer, we manage all documentation for a hassle-free experience.</li>
          <li><strong>Personalized approach:</strong> We work closely with sellers to meet deadlines, negotiate deals, and close transactions efficiently.</li>
        </ul>
        <p class="mt-3">By partnering with us, you can sell your property faster, at the right price, and with complete peace of mind.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Why Choose Omsritara Developers?</h3>
        <ul class="list-disc pl-6 space-y-2 mt-2 text-gray-700">
          <li><strong>Trusted Expertise:</strong> Years of experience in real estate ensures reliable guidance for buying or selling properties.</li>
          <li><strong>Transparent Process:</strong> We maintain complete transparency in pricing, documentation, and transactions.</li>
          <li><strong>Customer-Centric Services:</strong> Every client receives personalized solutions tailored to their goals.</li>
          <li><strong>End-to-End Support:</strong> From property search, pricing, and legal verification to closing the deal, we handle everything.</li>
          <li><strong>Strong Market Knowledge:</strong> We provide insights into property trends, investment opportunities, and neighborhood growth.</li>
        </ul>
        <p class="mt-3">Choosing Omsritara Developers means choosing a trusted partner for all your real estate needs.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Frequently Asked Questions (FAQ)</h3>
        <div class="space-y-4">
          <div>
            <p class="font-semibold text-gray-900">Q1: How do I start buying a property with Omsritara Developers?</p>
            <p class="text-gray-700">A: Simply contact us with your requirements. Our team will present verified property options, guide you through the process, and ensure smooth documentation.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q2: How do you determine the best price for my property?</p>
            <p class="text-gray-700">A: We evaluate current market trends, location, property size, and amenities to suggest an accurate price that maximizes value.
            </p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q3: Can Omsritara Developers help with legal documentation?</p>
            <p class="text-gray-700">A: Yes. Our team assists with title verification, sale agreements, ownership transfer, and approvals, making the process safe and hassle-free.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q4: How quickly can I sell my property?</p>
            <p class="text-gray-700">A: Depending on the market and property type, we aim to connect you with potential buyers within weeks, using strategic marketing and negotiations.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q5: Do you charge a consultation fee?</p>
            <p class="text-gray-700">A: No. Our initial consultation is completely free, and we focus on providing value and guidance to our clients.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q6: Can I buy a property as an investment?</p>
            <p class="text-gray-700">A: Absolutely. We provide investment advice, highlighting high-demand areas, rental income potential, and resale value to help you make smart decisions.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q7: Do you handle both residential and commercial properties?</p>
            <p class="text-gray-700">A: Yes, we deal with residential, commercial, and land properties, helping clients find or sell any type of real estate efficiently.</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Partner with Omsritara Developers Today</h3>
        <p>Buying or selling a property is easier when you have experts by your side. At Omsritara Developers, we combine market knowledge, personalized service, and end-to-end support to help you make confident property decisions.</p>
        <p class="mt-3">Contact us today to explore opportunities in buying and selling properties and take the first step toward a secure and profitable real estate investment.</p>
      </section>
    `,
  },
  {
    id: 2,
    title: "Plotted Development",
    description: "At Omsritara Developers, we specialize in premium plotted development projects, providing well-planned, strategically located plots for residential, commercial, and investment purposes. Our mission is to deliver high-quality plots with modern infrastructure, secure surroundings, and long-term value, helping clients build homes, start businesses, or make profitable investments.",
    image: "/assets/land/image-01.webp",
    icon: LandPlot,
    content: `
      <section>
        <p>At Omsritara Developers, we specialize in premium plotted development projects, providing well-planned, strategically located plots for residential, commercial, and investment purposes. Our mission is to deliver high-quality plots with modern infrastructure, secure surroundings, and long-term value, helping clients build homes, start businesses, or make profitable investments.</p>
        <p class="mt-3">We understand that buying a plot is not just a transaction—it’s an investment in your future. That’s why Omsritara Developers ensures transparent processes, clear legal titles, and fully developed infrastructure, giving buyers complete confidence and peace of mind.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Our Plotted Development Services</h3>
        <p>We offer a comprehensive suite of services to make your plotted development experience seamless and rewarding:</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Residential Plots</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Strategically located plots:</strong> Ideal for building dream homes or gated communities.</li>
          <li><strong>Infrastructure-ready:</strong> With roads, drainage, electricity, and water supply.</li>
          <li><strong>Carefully designed layouts:</strong> Ensuring optimal space utilization and privacy.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Commercial Plots</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>High-demand locations:</strong> Plots located in commercial areas for shops, offices, and businesses.</li>
          <li><strong>Growth potential:</strong> Designed for maximum visibility, accessibility, and commercial growth.</li>
          <li><strong>Compliance:</strong> Fully compliant with local zoning regulations.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Investment Opportunities</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>High appreciation potential:</strong> Plots with high appreciation potential in upcoming neighborhoods.</li>
          <li><strong>Long-term value:</strong> Suitable for long-term capital gains or future construction projects.</li>
          <li><strong>Expert advice:</strong> To help investors choose plots with the best ROI.</li>
        </ul>

         <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Infrastructure & Amenities</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Accessibility:</strong> Well-planned roads and internal streets for easy accessibility.</li>
          <li><strong>Utilities:</strong> Reliable water supply, drainage, and electricity connections.</li>
          <li><strong>Security:</strong> Secure layouts, including gated communities or monitored developments.</li>
           <li><strong>Green spaces:</strong> Green spaces and common areas to enhance lifestyle and value.</li>
        </ul>

         <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Legal & Documentation Assistance</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Transparent titles:</strong> Transparent property titles and approvals to ensure safe transactions.</li>
          <li><strong>Permits & Compliance:</strong> Guidance with government permits, land registration, and legal compliance.</li>
           <li><strong>Expert support:</strong> For a hassle-free buying experience.</li>
        </ul>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Why Choose Omsritara Developers for Plotted Development?</h3>
        <ul class="list-disc pl-6 space-y-2 mt-2 text-gray-700">
          <li><strong>Trusted Expertise:</strong> Years of experience in real estate and plotted developments.</li>
          <li><strong>Prime Locations:</strong> Plots situated in growth-oriented neighborhoods for better future value.</li>
          <li><strong>Quality Infrastructure:</strong> Roads, drainage, utilities, and amenities designed for modern living.</li>
          <li><strong>Transparent Process:</strong> Verified titles, approved layouts, and legal compliance at every step.</li>
          <li><strong>Investment Potential:</strong> Plots selected based on growth projections and ROI.</li>
          <li><strong>Client-Centric Approach:</strong> Personalized guidance to match budget, preferences, and goals.</li>
          <li><strong>Reliable Brand:</strong> Omsritara Developers is synonymous with quality, trust, and timely delivery.</li>
        </ul>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Frequently Asked Questions (FAQ)</h3>
        <div class="space-y-4">
          <div>
            <p class="font-semibold text-gray-900">Q1: What is plotted development?</p>
            <p class="text-gray-700">A: Plotted development involves dividing land into individual plots with proper infrastructure, legal approvals, and amenities for residential, commercial, or investment purposes.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q2: Are your plots ready for construction?</p>
            <p class="text-gray-700">A: Yes, all our plots are infrastructure-ready, including roads, drainage, electricity, and water supply, making them ready for immediate development.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q3: Can I buy a plot for investment purposes?</p>
            <p class="text-gray-700">A: Absolutely. We offer plots in high-growth areas with excellent long-term appreciation potential.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q4: Do you assist with legal documentation?</p>
            <p class="text-gray-700">A: Yes. We ensure clear titles, government approvals, and compliance for safe and hassle-free property ownership.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q5: How do I select the right plot?</p>
            <p class="text-gray-700">A: Our experts guide you based on location, plot size, accessibility, amenities, and investment potential.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q6: Are the plots secure and well-maintained?</p>
            <p class="text-gray-700">A: Yes, we provide gated communities or monitored layouts to ensure safety and regular maintenance.</p>
          </div>
          <div>
             <p class="font-semibold text-gray-900">Q7: Can I customize my plot layout?</p>
            <p class="text-gray-700">A: We offer flexibility within approved development plans, allowing buyers to choose plots that meet their requirements.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q8: What amenities are provided in plotted developments?</p>
            <p class="text-gray-700">A: We provide road networks, street lighting, drainage, water supply, electricity, and green spaces to enhance convenience and lifestyle.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q9: Are there financing options available?</p>
            <p class="text-gray-700">A: Yes, we provide guidance on property loans, financing options, and payment plans to make your purchase easier.</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Partner with Omsritara Developers</h3>
        <p>Whether you are buying your dream home plot, starting a commercial venture, or investing for the future, Omsritara Developers ensures high-quality infrastructure, transparent processes, and maximum value.</p>
        <p class="mt-3">Contact us today to explore our plotted development projects and secure your ideal plot with confidence.</p>
      </section>
    `,
  },
  {
    id: 3,
    title: "Construction",
    description: "At Omsritara Developers, we offer comprehensive construction solutions that transform your ideas into reality. From residential homes and commercial complexes to industrial projects and renovations, our experienced team ensures high-quality, timely, and cost-effective construction.",
    image: "/assets/land/image-04.webp",
    icon: Home,
    content: `
      <section>
        <p>At Omsritara Developers, we offer comprehensive construction solutions that transform your ideas into reality. From residential homes and commercial complexes to industrial projects and renovations, our experienced team ensures high-quality, timely, and cost-effective construction.</p>
        <p class="mt-3">With years of experience in the construction industry, we combine innovative design, skilled workmanship, and sustainable building practices to deliver projects that exceed client expectations. Whether you are planning a new build or upgrading an existing property, Omsritara Developers is your trusted partner for every stage of construction.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Our Construction Services</h3>
        <p>We provide a wide range of construction services to meet every client’s needs:</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Residential Construction</h4>
        <p>We design and build custom homes, apartments, villas, and gated communities with attention to detail and modern architectural trends. Our residential projects focus on durability, aesthetics, and functionality, ensuring a safe and comfortable living environment.</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Commercial Construction</h4>
        <p>From office spaces and retail shops to commercial complexes, we provide professional construction solutions tailored to your business requirements. Our team ensures efficient layouts, modern finishes, and compliance with safety standards.</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Industrial Construction</h4>
        <p>We handle factories, warehouses, and industrial units, prioritizing safety, operational efficiency, and regulatory compliance. Our projects are designed to support long-term functionality and scalability.</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Renovation & Remodeling</h4>
        <p>Our renovation services help clients upgrade, modernize, and enhance existing properties. We specialize in interior and exterior remodeling, structural strengthening, and aesthetic improvements that increase property value.</p>
        
        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Project Management</h4>
        <p>We provide end-to-end project management, from initial planning, material sourcing, and labor management to final execution. Our goal is to deliver projects on time, within budget, and to the highest quality standards.</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Sustainable Construction</h4>
        <p>At Omsritara Developers, we emphasize eco-friendly building practices using sustainable materials and energy-efficient designs. This approach ensures long-lasting, environmentally responsible structures.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Why Choose Omsritara Developers for Your Construction Needs?</h3>
        <ul class="list-disc pl-6 space-y-2 mt-2 text-gray-700">
          <li><strong>Experienced Professionals:</strong> Our team includes engineers, architects, and project managers with years of industry experience.</li>
          <li><strong>Quality Assurance:</strong> We use premium materials, certified labor, and rigorous quality checks to ensure excellent construction.</li>
          <li><strong>Timely Delivery:</strong> We create realistic timelines and monitor progress to deliver projects on schedule.</li>
          <li><strong>Cost-Effective Solutions:</strong> Competitive pricing without compromising on quality or safety.</li>
          <li><strong>Transparent Communication:</strong> Regular updates, consultations, and progress reports keep clients informed at every stage.</li>
          <li><strong>Customized Solutions:</strong> Each project is tailored to meet client specifications, budget, and design preferences.</li>
          <li><strong>Legal Compliance:</strong> Assistance with permits, approvals, and regulatory compliance for smooth project execution.</li>
        </ul>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Frequently Asked Questions (FAQ)</h3>
        <div class="space-y-4">
          <div>
            <p class="font-semibold text-gray-900">Q1: What types of construction projects do you handle?</p>
            <p class="text-gray-700">A: We handle residential, commercial, industrial, and renovation projects, delivering high-quality and efficient results for every client.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q2: How long does a construction project take?</p>
            <p class="text-gray-700">A: Project duration depends on the size and complexity. We provide detailed schedules during planning to ensure realistic timelines.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q3: Do you offer design and architectural services?</p>
            <p class="text-gray-700">A: Yes, we provide comprehensive design and architectural solutions, including structural planning, interior design, and layout optimization.</p>
          </div>
          <div>
             <p class="font-semibold text-gray-900">Q4: How do you maintain construction quality?</p>
            <p class="text-gray-700">A: Quality is ensured through high-grade materials, skilled labor, and regular inspections at every stage of construction.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q5: Can you provide a cost estimate before starting a project?</p>
            <p class="text-gray-700">A: Absolutely. We provide transparent and detailed cost estimates based on your requirements, helping you plan effectively.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q6: Do you handle permits and approvals?</p>
            <p class="text-gray-700">A: Yes, our team manages local permits, approvals, and legal compliance, ensuring your project is fully authorized.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q7: Do you use sustainable building materials?</p>
            <p class="text-gray-700">A: Yes, we prioritize eco-friendly materials and energy-efficient designs to create sustainable and environmentally responsible buildings.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q8: Can you renovate old properties?</p>
            <p class="text-gray-700">A: Yes, we specialize in renovation and remodeling, improving both aesthetics and structural integrity to increase property value.</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Partner with Omsritara Developers</h3>
        <p>Whether you are planning a new build, remodeling an existing structure, or managing a commercial project, Omsritara Developers is your trusted construction partner. We focus on quality, efficiency, safety, and client satisfaction to deliver projects that last a lifetime.</p>
        <p class="mt-3">Contact us today to discuss your construction requirements and start building your dream project with confidence.</p>
      </section>
    `,
  },
  {
    id: 4,
    title: "Liasioning and Approvals",
    description: "At Omsritara Developers, we provide comprehensive liaisoning and approvals services for all real estate, construction, and development projects. Navigating government regulations, permits, and legal approvals can be complex and time-consuming. Our expert team ensures a smooth, compliant, and hassle-free process.",
    image: "https://cdn.prod.website-files.com/676e863e8c931682a197e8a2/684687bf92e867ed8283e099_how-to-get-out-of-a-commercial-lease-business-guide-2025.webp",
    icon: FileText,
    content: `
      <section>
        <p>At Omsritara Developers, we provide comprehensive liaisoning and approvals services for all real estate, construction, and development projects. Navigating government regulations, permits, and legal approvals can be complex and time-consuming. Our expert team ensures a smooth, compliant, and hassle-free process, helping clients focus on building or investing while we handle all regulatory coordination.</p>
        <p class="mt-3">With years of experience in real estate compliance, property approvals, and government liaisoning, we are a trusted partner for residential, commercial, and industrial projects. Our mission is to simplify approvals, reduce legal risks, and save time for our clients.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Our Liaisoning and Approvals Services</h3>
        <p>We provide a wide range of services to ensure your projects meet all legal, regulatory, and safety requirements:</p>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Government Approvals</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Permits & Clearances:</strong> Assistance with permits and clearances from municipal, state, and central authorities.</li>
          <li><strong>Regulatory Coordination:</strong> Coordination with zoning, planning, and regulatory bodies for smooth project approval.</li>
          <li><strong>Compliance:</strong> Ensuring compliance with local laws, construction norms, and environmental regulations.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Building Plan Approvals</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Plan Submission:</strong> Submission, review, and approval of architectural, structural, and civil plans.</li>
          <li><strong>Modifications:</strong> Guidance for modifications, compliance checks, and plan resubmissions as needed.</li>
          <li><strong>Timely Approval:</strong> Expert consultation to ensure timely approval without delays.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Environmental Clearances</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>EIA Support:</strong> Support in environmental impact assessments (EIA) and obtaining necessary certifications.</li>
          <li><strong>Sustainability:</strong> Guidance on eco-friendly and sustainable compliance practices for development projects.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Legal Documentation</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Title Verification:</strong> Verification of property titles, ownership records, and regulatory documents.</li>
          <li><strong>Statutory Filings:</strong> Assistance in registration, agreements, and statutory filings to ensure full legal compliance.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Project Liaisoning</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Authority Coordination:</strong> Coordination with government departments, utility providers, and regulatory authorities.</li>
          <li><strong>Timeline Tracking:</strong> Tracking approval timelines and following up with authorities for prompt clearance.</li>
          <li><strong>Communication:</strong> Ensuring seamless communication between clients and regulatory bodies.</li>
        </ul>

        <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Compliance Management</h4>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Continuous Monitoring:</strong> Continuous monitoring to ensure projects follow building codes, safety norms, and statutory regulations.</li>
          <li><strong>Risk Prevention:</strong> Preventing legal disputes and delays with proper documentation and approvals.</li>
          <li><strong>Peace of Mind:</strong> Providing clients with complete transparency and peace of mind.</li>
        </ul>
        <p class="mt-3">By partnering with Omsritara Developers, you gain a reliable intermediary who handles all liaisoning, ensuring projects move forward without legal or regulatory hurdles.</p>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Why Choose Omsritara Developers for Liaisoning and Approvals?</h3>
        <ul class="list-disc pl-6 space-y-2 mt-2 text-gray-700">
          <li><strong>Experienced Professionals:</strong> Our team is highly skilled in government liaisoning, real estate approvals, and regulatory compliance.</li>
          <li><strong>End-to-End Services:</strong> From documentation to follow-ups and final approvals, we manage the entire process.</li>
          <li><strong>Time-Saving:</strong> By handling all interactions with authorities, we save clients valuable time and reduce delays.</li>
          <li><strong>Legal Assurance:</strong> All approvals and permits are handled in compliance with local laws and government regulations.</li>
          <li><strong>Transparent Communication:</strong> Clients receive regular updates and full clarity on the progress of approvals.</li>
          <li><strong>Trusted Partner:</strong> We have built strong relationships with municipal, planning, and regulatory authorities, ensuring smoother approvals.</li>
          <li><strong>Customized Solutions:</strong> Tailored services for residential, commercial, industrial, and plotted developments.</li>
        </ul>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Frequently Asked Questions (FAQ)</h3>
        <div class="space-y-4">
          <div>
            <p class="font-semibold text-gray-900">Q1: What is liaisoning in real estate and construction?</p>
            <p class="text-gray-700">A: Liaisoning involves coordinating with government authorities and agencies to obtain permits, clearances, and approvals required for construction, development, or property transactions.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q2: Which approvals can Omsritara Developers handle?</p>
            <p class="text-gray-700">A: We handle building plan approvals, environmental clearances, municipal permits, occupancy certificates, utility connections, and all legal compliance documentation.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Q3: Why is professional liaisoning important?</p>
            <p class="text-gray-700">A: Professional liaisoning ensures timely approvals, reduces legal risks, and prevents project delays, making your development process efficient and stress-free.
            </p>
          </div>
          <div>
             <p class="font-semibold text-gray-900">Q4: How long does it take to get approvals?</p>
            <p class="text-gray-700">A: Timelines depend on the project type, location, and authority involved, but our team works efficiently to expedite approvals without unnecessary delays.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q5: Can you assist with legal documentation?</p>
            <p class="text-gray-700">A: Yes, we verify property titles, prepare statutory documents, and manage legal filings to ensure full compliance.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q6: Do you handle approvals for commercial and industrial projects?</p>
            <p class="text-gray-700">A: Absolutely. We provide comprehensive liaisoning and approvals services for residential, commercial, industrial, and plotted development projects.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q7: Are the processes transparent?</p>
            <p class="text-gray-700">A: Yes. We maintain complete transparency with clients, providing regular updates and reports on the status of all approvals.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q8: Can you help with environmental and sustainability compliance?</p>
            <p class="text-gray-700">A: Yes, we assist in environmental clearances, eco-friendly building approvals, and sustainable compliance requirements.</p>
          </div>
           <div>
             <p class="font-semibold text-gray-900">Q9: Do you provide end-to-end liaisoning services?</p>
            <p class="text-gray-700">A: Yes, we manage the entire approval process, from initial documentation to follow-ups and final clearance, ensuring a hassle-free experience.</p>
          </div>
        </div>

        <h3 class="text-xl font-semibold mt-5 mb-3 text-gray-900">Partner with Omsritara Developers</h3>
        <p>Managing liaisoning and approvals can be time-consuming and complex, but with Omsritara Developers, you gain a trusted partner to handle all regulatory interactions professionally. Focus on your project while we ensure timely approvals, full legal compliance, and smooth execution.</p>
        <p class="mt-3">Contact us today to discuss your project and let our experts handle all liaisoning and approvals efficiently.</p>
      </section>
    `,
  },
];
