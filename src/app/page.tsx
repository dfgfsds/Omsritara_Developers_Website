"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Play } from "lucide-react";
import CountUp from "react-countup";
import Image from "next/image";
import AppointmentModal from "@/components/AppointmentModal";
import FeaturedProperties from "@/components/FeaturedProperties";
import FeaturedPropertiesRent from "@/components/FeaturedPropertiesRent";
import PropertyByType from "@/components/propertyByType";
import PropertySearch from "@/components/PropertySearch";
import ServicesSlider from "@/components/ServicesSlider";
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
      {/* Banner Section */}
      <div
        className="banner__one"
        style={{
          backgroundImage: "url('assets/banner-shape-home.webp')",
          backgroundSize: "cover",
          width: "100%",
          // height: "800px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="row">
            <div className="col-xl-12 px-4 md:px-8">
              <div className="banner__one-content  mx-auto">
                <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 animate-fadeIn ">
                  Where Every Plot Tells a Story.
                </h1>
                <div
                  className="banner__one-content-user wow fadeInUp"
                  data-wow-delay=".6s"
                >
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="build_button text-center py-2 px-4"
                  >
                    Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video */}
        <div className="banner__one-image">
          <div className="video-container">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/assets/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* <PropertySearch/> */}
      {/* Components */}
      <ServicesSlider />
      <SuccessArea />




      <FeaturedProperties />
      {/* <FeaturedPropertiesRent /> */}
      {/* <PropertyByType /> */}
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
          {/* Pulse Effect */}
          <span className="absolute w-full h-full rounded-full border-4 border-red-500 animate-ping"></span>
        </div>
      </section>
      <section className="py-16 md:py-0 mb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Text */}
            <div className="lg:col-span-5 md:mt-10">
              <span className="text-xs sm:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 mb-4 rounded-full">
                Industry Certifications
              </span>
              <h2 className="text-2xl md:text-4xl my-4 md:my-8 font-bold text-gray-800 leading-snug">
                Our Key Achievements Over the Years
              </h2>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-7">
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[450px]">
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

          {/* Counters */}
          <div className="max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-10 justify-between text-center md:text-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={678} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Complete Projects</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={120} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Team Members</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={635} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Client Reviews</span>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <CountUp end={89} duration={3} />+
                </h2>
                <span className="block mt-2 text-gray-600">Winning Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ExperienceSection />
      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <TestimonialsSection />

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            About Omsritara Developer
          </h2>
          <p className="mt-4 py-8 text-lg text-gray-600 max-w-7xl mx-auto">
            Omsritara Developer is a trusted name in real estate, dedicated to
            providing expert property solutions that cater to the unique needs
            of our clients. With years of experience in property buying,
            selling, and management, we ensure seamless and transparent services
            for residential and commercial properties. Our team of skilled
            professionals offers personalized consultation, market insights, and
            end-to-end support, making property transactions smooth and
            hassle-free. At Omsritara Developer, we combine innovation,
            integrity, and commitment to deliver the best value for your
            investment, helping you achieve your property goals with confidence.
          </p>
        </div>
      </section>




    </>
  );
}
