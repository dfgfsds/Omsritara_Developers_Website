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
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoList = [
    "/assets/video1.mp4",
    "/assets/video2.mp4",
    "/assets/video3.mp4",
    "/assets/video4.mp4"
  ];

  return (
    <>
      {/* Banner Section */}
      <div
        className="banner__one"
        style={{
          //backgroundImage: "url('assets/banner-shape-home.webp')",
          backgroundSize: "cover",
          width: "100%",
          // height: "800px",
        }}
      >
        {/*
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
        */}

        {/* Video */}
        {/*
        <div className="banner__one-image relative w-full h-[500px] md:h-[700px] overflow-hidden">
          {videoList.map((src, index) => (
            <video
              key={src}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideo ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              autoPlay
              muted
              playsInline
              onEnded={() => setCurrentVideo((prev) => (prev + 1) % videoList.length)}
              src={index === currentVideo ? src : undefined}
            />
          ))}
          <div className="absolute inset-0 bg-black/30 z-20"></div>
        </div>
        */}
        <div className="banner__one-image relative w-full min-h-screen md:h-[700px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/vid2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-gray-50 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
                About Omsritara Developer
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Omsritara Developer is a trusted name in real estate, dedicated to
                providing expert property solutions that cater to the unique needs
                of our clients. With years of experience in property buying,
                selling, and management, we ensure seamless and transparent services
                for residential and commercial properties.
              </p>
              <p className="text-lg text-gray-600">
                Our team of skilled professionals offers personalized consultation,
                market insights, and end-to-end support, making property transactions
                smooth and hassle-free. At Omsritara Developer, we combine innovation,
                integrity, and commitment to deliver the best value for your
                investment, helping you achieve your property goals with confidence.
              </p>
            </div>

            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
              <Image
                src="/assets/about-gallery1.png"
                alt="About Omsritara Developer"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* <PropertySearch/> */}
      {/* Components */}

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
                  <CountUp end={10} duration={3} />+
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