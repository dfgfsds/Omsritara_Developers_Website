"use client";
import Link from "next/link";
import "../about/about.css"
import { CheckCircle, Home, Check, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [message, setMessage] = useState("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://api.omsritaradevelopers.in/enquiry", formData);
      toast.success("Message submitted successfully!");
      setFormData({ name: "", email: "", mobile: "" });
      setMessage('')
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Failed to submit message.");
    }
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="relative mt-14 md:mt-20 bg-gray-50 py-10 md:py-16 overflow-hidden">
        {/* Background Illustration */}
        <div
          className="hidden absolute right-0 top-0 bottom-0 w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-40 pointer-events-none"
        ></div>

        {/* Heading */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl gap-2 font-bold">
            <span className="text-[#9b0000]">About </span>
            <span className="text-gray-800">Us</span>
          </h1>

          {/* Breadcrumb */}
          <div className="mt-3 md:mt-4 text-sm text-gray-600 flex justify-center items-center gap-2">
            <Link href="/" className="hover:text-[#9b0000] transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">About Us</span>
          </div>
        </div>
      </div>

      <section className="about__section about__page--section section--padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about__inner d-flex">
            <div className="about__thumbnail ml-0 position-relative" data-aos="fade-up" data-aos-duration="1200"
              data-aos-delay="100">
              <div className="about__thumbnail--list one position-relative">
                <img src="https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/other/about-thumb1.png"
                  alt="about-thumb" />
                <div className="rating__star--text">
                  <svg width="34" height="31" viewBox="0 0 34 31" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 0L22.2959 9.71076L33.168 11.7467L25.569 19.7842L26.9923 30.7533L17 26.01L7.00765 30.7533L8.43098 19.7842L0.832039 11.7467L11.7041 9.71076L17 0Z"
                      fill="#F23B3B" />
                  </svg>
                  <span>5 Star Rating</span>
                </div>
              </div>
              <div className="about__thumbnail--list two">
                <img src="https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/other/about-thumb2.png"
                  alt="about-thumb" />
                <div className="bideo__play">
                  <a className="bideo__play--icon glightbox" href="https://vimeo.com/115041822"
                    data-gallery="video">
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.9358 7.28498C12.5203 7.67662 12.5283 8.53339 11.9512 8.93591L1.99498 15.8809C1.33555 16.3409 0.430441 15.8741 0.422904 15.0701L0.294442 1.36797C0.286904 0.563996 1.1831 0.0802964 1.85104 0.527837L11.9358 7.28498Z"
                        fill="currentColor" />
                    </svg>
                    <span className="visually-hidden"></span>
                  </a>
                </div>
              </div>
            </div>
            <div className="about__content" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
              <div className="section__heading">
                <h3 className=" text-3xl md:text-4xl font-bold text-start text-gray-900 mb-4">
                  <svg width="18" height="18" className="hidden md:block" viewBox="0 0 18 18"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_15_6)">
                      <path
                        d="M9.00021 4.72925L2.5806 10.0215C2.5806 10.029 2.57872 10.04 2.57497 10.055C2.57129 10.0698 2.56934 10.0806 2.56934 10.0883V15.4473C2.56934 15.6408 2.64008 15.8085 2.78152 15.9497C2.92292 16.091 3.09037 16.1621 3.2839 16.1621H7.571V11.8747H10.4295V16.1622H14.7165C14.91 16.1622 15.0777 16.0913 15.2189 15.9497C15.3603 15.8086 15.4313 15.6408 15.4313 15.4473V10.0883C15.4313 10.0586 15.4272 10.0361 15.4201 10.0215L9.00021 4.72925Z"
                        fill="#F23B3B" />
                      <path
                        d="M17.8758 8.81572L15.4309 6.78374V2.2285C15.4309 2.12437 15.3974 2.03872 15.3302 1.9717C15.2636 1.90475 15.178 1.87128 15.0736 1.87128H12.93C12.8258 1.87128 12.7401 1.90475 12.6731 1.9717C12.6062 2.03872 12.5727 2.1244 12.5727 2.2285V4.4056L9.8486 2.12792C9.61069 1.93439 9.3278 1.83765 9.00026 1.83765C8.67275 1.83765 8.3899 1.93439 8.15175 2.12792L0.124063 8.81572C0.0496462 8.87516 0.00885955 8.95517 0.00127316 9.05567C-0.00627412 9.15609 0.0197308 9.2438 0.079366 9.31818L0.771565 10.1444C0.831201 10.2113 0.909254 10.2523 1.00604 10.2673C1.09539 10.2748 1.18475 10.2486 1.27411 10.1891L9.00002 3.74687L16.726 10.1891C16.7857 10.241 16.8637 10.2669 16.9605 10.2669H16.994C17.0907 10.2522 17.1686 10.211 17.2285 10.1442L17.9208 9.31814C17.9803 9.2436 18.0064 9.15605 17.9987 9.05551C17.991 8.95528 17.9501 8.87527 17.8758 8.81572Z"
                        fill="#F23B3B" />
                    </g>
                    <defs>
                      <clipPath>
                        <rect width="18" height="18" fill="white" className="hidden md:block" />
                      </clipPath>
                    </defs>
                  </svg>
                  Trusted Real Estate </h3>
                <h2 className="section__heading--title">Delivering Excellence in Every Development</h2>
                <p className="section__heading--desc">Omsritara Developers is a professionally managed real estate and infrastructure development firm offering end-to-end solutions in property buying and selling, construction, plotted development, property management, and statutory liaisoning & approvals, with a strong commitment to delivering legally compliant, strategically planned, and value-oriented real estate solutions.</p>
              </div>
              <div className="about__content--info flex">
                <div className="about__content--info__list flex items-center">
                  <div className="about__content--info__icon">
                    <img src="	https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/other/about-info-icon.png"
                      alt="icon" />
                  </div>
                  <h3 className="about__content--info__title">Premium Flats & Villas
                  </h3>
                </div>
                <div className="about__content--info__list flex items-center">
                  <div className="about__content--info__icon">
                    <img src="	https://risingtheme.com/html/demo-newvilla/newvilla/assets/img/other/about-info-icon2.png"
                      alt="icon" />
                  </div>
                  <h3 className="about__content--info__title">Dedicated Support Team
                  </h3>
                </div>
              </div>
              <div className="about__content--details flex flex-wrap items-center mt-5 md:mt-4">
                <div className="about__experince">
                  <span className="about__experince--number">14</span>
                  <span className="about__experince--text">Years of Experince</span>
                </div>
                <div className="living__details--content__wrapper">
                  <p className="living__details--content__list flex items-center mb-4 gap-2">
                    <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                    <span>CMDA & DTCP Approved Projects</span>
                  </p>
                  <p className="living__details--content__list flex items-center mb-4 gap-2">
                    <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                    <span>Agricultural & Residential Land Sales</span>
                  </p>
                  <p className="living__details--content__list flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                    <span>Nestled in the Buckhead</span>
                  </p>

                </div>
              </div>
              <div className="about__content--footer flex items-center">
                <Link
                  href="/contact"
                  className="relative mt-4 md:mt-3 max-w-[300px] inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-2 gap-[10px] group overflow-hidden"
                >
                  <span className="relative z-10 tracking-wider text-[14px] md:text-[16px]">GET ADVICES</span>
                  <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[34px] h-[34px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 font-extrabold" />
                  </span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
                </Link>
                {/* <div className="about__video--play ">
							<a className="about__video--icon glightbox" href="https://vimeo.com/115041822"
								data-gallery="video">
								<svg width="13" height="17" viewBox="0 0 13 17" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M11.9358 7.28498C12.5203 7.67662 12.5283 8.53339 11.9512 8.93591L1.99498 15.8809C1.33555 16.3409 0.430441 15.8741 0.422904 15.0701L0.294442 1.36797C0.286904 0.563996 1.1831 0.0802964 1.85104 0.527837L11.9358 7.28498Z"
										fill="currentColor" />
								</svg>
								<span className="visually-hidden "></span>
							</a>
						</div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-10 pb-5 md:pt-16 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 text-[#9b0000] font-bold text-base">
              {/* <Home className="h-5 w-5" /> */}
              OUR BROKERAGE CHARGES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 md:mt-4">
              Clear, Transparent & Structured Charges
            </h2>

            {/* Rental Transactions */}
            <div className="mt-5 md:mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Real Estate, Construction & Development Services</h3>
              <p className="text-gray-600 text-sm italic">
                Property Buying, Selling & Investment Advisory
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Professional advisory and transaction suppor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Documentation and registration assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Legal verification and compliance checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Detailed project estimation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Quality-controlled execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Structured milestone-based delivery</span>
                </li>
              </ul>
            </div>

            {/* Sale Transactions */}
            <div className="mt-7 md:mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Property Management Services</h3>
              <p className="text-gray-600 text-sm italic">
                Construction, Plotted Development & Approvals
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>End-to-end property maintenance and upkeep</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Tenant coordination and rental management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Regular inspections and issue resolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#9b0000] mt-0.5" />
                  <span>Compliance with local regulations and associations</span>
                </li>
                <li className="text-sm text-gray-500">* All statutory taxes and government charges applicable as per prevailing regulations.</li>
              </ul>
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Image
                src="/assets/about-gallery1.png"
                alt="Real Estate Office"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-64 md:h-80"
              />
            </div>
            <Image
              src="/assets/about-gallery2.png"
              alt="Client Meeting"
              width={300}
              height={300}
              className="rounded-xl object-cover w-full h-48 md:h-60"
            />
            <Image
              src="/assets/about-gallery3.png"
              alt="Property Discussion"
              width={300}
              height={300}
              className="rounded-xl object-cover w-full h-48 md:h-60"
            />
          </div>
        </div>
      </section>
      <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Work Process
            </h2>
            <p className="text-gray-600 mt-4">
              Our end-to-end construction, property development, and transaction services are structured to deliver clarity, compliance, and smooth execution at every stage of your project.
            </p>

            {/* Bullet Points */}
            <ul className="mt-5 space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b0000] mt-1" />
                <span className="text-gray-700">
                  <strong>Requirement Assessment:</strong> Understanding client objectives and feasibility.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b0000] mt-1" />
                <span className="text-gray-700">
                  <strong>Planning & Approvals:</strong> Design development and statutory compliance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b0000] mt-1" />
                <span className="text-gray-700">
                  <strong>Execution:</strong> Controlled construction and development management.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b0000] mt-1" />
                <span className="text-gray-700">
                  <strong> Handover:</strong> Timely delivery with complete documentation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b0000] mt-1" />
                <span className="text-gray-700">
                  <strong> Property Management:</strong> Ongoing maintenance, management, and value enhancement.
                </span>
              </li>
            </ul>

            {/* Images */}
            <div className="mt-7 md:mt-6 relative w-full max-w-md">
              <div className="relative">
                <Image
                  src="/assets/featured-grid1.jpg"
                  alt="Property process"
                  width={400}
                  height={250}
                  className="rounded-lg shadow-lg"
                />

              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-gray-50 p-4 md:p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Contact Us</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                required
                value={formData.mobile}
                onChange={handleChange}
                pattern="\d{10}"
                maxLength={10}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
              />


              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                name="description"
                rows={4}
                placeholder="Message"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 outline-none text-sm md:text-base"
              ></textarea>

              <button
                type="submit"
                className="relative inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-2 gap-[10px] group overflow-hidden text-sm md:text-base"
              >
                <span className="relative z-10 tracking-wider text-[14px] md:text-[16px]">GET STARTED</span>
                <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[34px] h-[34px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5 font-extrabold" />
                </span>
                <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
