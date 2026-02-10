"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Play,
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Building2,
  Home as HomeIcon,
  Building,
  Warehouse
} from "lucide-react";
import CountUp from "react-countup";
import Image from "next/image";
import AppointmentModal from "@/components/AppointmentModal";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedPropertiesRent from "@/components/FeaturedPropertiesRent";
import PropertyByType from "@/components/propertyByType";
import PropertySearch from "@/components/PropertySearch";
import ServicesSlider from "@/components/ServicesSlider";
import LatestProperties from "@/components/LatestProperties";
import { useEffect, useState } from "react";
import SuccessArea from "@/components/whychoose";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Counter = ({
  target,
  duration = 2000,
  suffix = "",
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(timer);
        setCount(target);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span className="text-5xl font-bold text-shadow-amber-50">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen md:h-[700px] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/assets/hero1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-5xl mt-20 mx-auto px-4 w-full flex flex-col items-center text-center">
          <h1 className="text-white text-[36px] md:text-[60px] font-bold mb-8 md:mb-6 drop-shadow-2xl">
            Buy. Sell. Build. Manage
            <span className="inline text-yellow-400"> - Your Reliable Partner</span>
          </h1>

          {/*
          <div className="bg-white p-6 md:p-7 rounded-[10px] max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
            <p className="text-gray-600 text-[17px] md:text-[19px] font-normal mb-4 md:mb-5 leading-relaxed">
              Explore our landmark residential developments and high-quality construction projects across Chennai, built with trust and excellence.
            </p>

            <div className="flex justify-center">
              <Link
                href="/properties"
                className="relative inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-2 gap-[10px] group overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 tracking-wider text-[14px] md:text-[16px]">Explore Projects</span>
                <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[34px] h-[34px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5 font-extrabold" />
                </span>
                <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
              </Link>
            </div>
          </div>
          */}
        </div>
      </section>

      {/* About Section */}
      <section className="relative overflow-hidden py-10 md:py-16 bg-white">
        <div className="absolute bottom-0 left-0">
          <img src="https://html.themehour.net/piller/demo/assets/img/icon/about-2-shape.png" alt="shape"
            className="w-32 md:w-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-8 items-center">
            <div className="lg:col-span-6 relative flex flex-col md:flex-row gap-6 h-full self-stretch">
              <div className="flex flex-col md:text-end gap-4 z-10 flex-1">
                <div className="rounded-2xl md:w-44 overflow-hidden flex-1">
                  <img src="https://html.themehour.net/piller/demo/assets/img/about/about-1-left-1.jpg" alt="Image"
                    className="w-full h-full object-cover rounded-2xl" />
                </div>

                <div className="w-32 h-32 md:w-44 md:h-44 ml-auto overflow-hidden rounded-2xl hidden md:block flex-1">
                  <img src="https://html.themehour.net/piller/demo/assets/img/about/about-1-left-2.jpg" alt="Image"
                    className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="relative z-10 mt-4 md:mt-0 flex-1 hidden md:block">
                <img src="https://html.themehour.net/piller/demo/assets/img/about/about-1-middle.jpg" alt="Image"
                  className="w-full h-full object-cover tilt-active rounded-2xl" />
              </div>

              <div className="flex flex-col gap-4 justify-end z-10 mt-4 md:mt-0 hidden md:flex flex-1">
                <div className="w-32 h-32 md:w-44 md:h-44 overflow-hidden rounded-2xl flex-1">
                  <img src="https://html.themehour.net/piller/demo/assets/img/about/about-1-right-1.jpg" alt="Image"
                    className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl h-32 md:h-44 flex-1">
                  <img src="https://html.themehour.net/piller/demo/assets/img/about/about-1-right-2.jpg" alt="Image"
                    className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 z-10 mt-0 text-center lg:text-left">
              <div className="space-y-4">
                <span className="text-xs sm:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 rounded-full inline-block">
                  About Us
                </span>
                <h4 className="text-3xl md:text-4xl font-medium">
                  Your Trusted Partner in Real Estate & Property Solutions
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg text-left md:text-center lg:text-left">
                  Omsritara Developer is a premier real estate company offering expert solutions in property buying, selling, construction, plotted development, property management and approvals. With years of experience, we provide seamless, transparent, and client-focused services tailored for property owners, investors, and developers.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg text-left md:text-center lg:text-left">
                  We guide clients in buying and selling properties with accurate market insights and personalized support. Our construction projects are delivered on time with quality and safety in mind. We also develop well-planned plots with modern infrastructure and handle all regulatory approvals, ensuring hassle-free compliance.
                </p>
              </div>


              <div className="flex flex-row items-center justify-center lg:justify-start sm:gap-6 mt-0 gap-4">
                <Link
                  href="/about"
                  className="relative max-w-[300px] inline-flex items-center justify-center border-1 border-[#9b0000] bg-[#9b0000] text-white hover:text-[#9b0000] font-semibold uppercase rounded-full pl-5 pr-3 py-2 gap-[10px] group overflow-hidden"
                >
                  <span className="relative z-10 tracking-wider text-[14px] md:text-[16px]">More About Us</span>
                  <span className="relative z-10 bg-[#9b0000] border-2 border-white text-white rounded-full w-[34px] h-[34px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 font-extrabold" />
                  </span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <PropertySearch/> */}
      {/* Components */}

      <LatestProperties />
      <ServicesSlider />
      <SuccessArea />

      {/* <FeaturedProperties /> */}
      {/* <FeaturedPropertiesRent /> */}
      {/* <PropertyByType /> */}

      {/*
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[400px] md:h-[600px] flex items-center justify-center"
        style={{ backgroundImage: "url('assets/villa-menari-promo-banner.jpg')" }}
      >
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg group animate-bounce">
          <a
            href="#"
            className="flex items-center justify-center w-full h-full rounded-full bg-[#9b0000] text-white hover:bg-red-700 transition"
          >
            <Play size={40} strokeWidth={2.5} />
          </a>
          <span className="absolute w-full h-full rounded-full border-4 border-red-500 animate-ping"></span>
        </div>
      </section>
      */}

      <section className="py-0 mb-12 md:mb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/*
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 md:mt-10">
              <span className="text-xs sm:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 mb-4 rounded-full">
                Industry Certifications
              </span>
              <h2 className="text-2xl md:text-4xl my-4 md:my-8 font-bold text-gray-800 leading-snug">
                Our Key Achievements Over the Years
              </h2>
            </div>

            <div className="lg:col-span-7">
              <div className="relative w-full h-auto">
                <Image
                  src="/assets/Myans_Luxury_Villas_1.jpg"
                  alt="Luxury Villa"
                  width={800}
                  height={500}
                  className=" shadow-lg"
                />
              </div>
            </div>
          </div>
          */}

          {/* Counters */}
          <div className="max-w-7xl">
            {/*<div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-10 justify-between text-center md:text-start">*/}
            <div className="grid grid-cols-2 md:flex md:flex-row justify-evenly items-center gap-12 text-center md:text-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={14} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Years of Experience</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={120} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Complete Projects</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={30} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Team Members</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={160} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Client Reviews</span>
              </div>
              {/*
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={89} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Winning Awards</span>
              </div>
              */}
            </div>
          </div>
        </div>
      </section >

      {/* <ExperienceSection /> */}

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* <TestimonialsSection />*/}
    </>
  );
}