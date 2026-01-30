"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const ProgressBar = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Title & Percentage */}
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-gray-800 text-base sm:text-lg font-medium">{title}</h6>
        <span className="text-gray-800 font-semibold">
          {inView && <CountUp start={0} end={value} duration={2} />}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${value}%` : "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`h-2 rounded-full ${color}`}
        ></motion.div>
      </div>
    </div>
  );
};

export default function SuccessArea() {
  return (
    <div className="success__area py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <div className="lg:w-full">
            <div className="success__area-title text-center">
              <span className="text-xs sm:text-sm uppercase tracking-wide font-semibold border border-gray-300 px-4 py-1 rounded-full">
                Why Choose Om Sritara Developers
              </span>

              <h4 className="img_left_animation text-3xl md:text-4xl font-medium my-6">
                Om Sritara Developers – Your Trusted Real Estate Partner
              </h4>

              <p className="text-gray-600 leading-relaxed text-lg">
                We are your all-in-one destination for premium real estate solutions.
                From <strong>high-quality building construction</strong> and
                architectural excellence to <strong>strategic plotted developments</strong> in
                prime locations, we build with precision. Whether you are
                <strong> buying your dream home or selling a high-value property</strong>,
                we ensure legal transparency and market-leading returns.
                Experience a seamless journey from raw land to a fully constructed reality
                with Om Sritara Developers.
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/contact"
                  className="relative max-w-[300px] inline-flex items-center justify-center bg-[#9b0000] text-white font-semibold uppercase rounded-full pl-6 pr-2 py-2 gap-3 md:gap-4 group overflow-hidden"
                >
                  <span className="relative z-10 text-[14px] md:text-[16px]">GET ADVICES</span>
                  <span className="relative z-10 bg-[#9b0000] border border-white text-white rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 font-extrabold" />
                  </span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-yellow-400 transition-all duration-500 group-hover:left-0 z-0"></span>
                </Link>
              </div>
            </div>
          </div>

          {/*
          <div className="lg:w-1/2 w-full">
            <div className="success__area-right">
              <img
                src="assets/skill.webp"
                alt="image"
                className="shadow-lg w-full  img_top_animation"
              />

              <div className="mt-8 space-y-6">
                <ProgressBar
                  title="Buy & Sell Properties"
                  value={89}
                  color="bg-yellow-400"
                />
                <ProgressBar
                  title="Licensing & Approvals"
                  value={70}
                  color="bg-yellow-400"
                />
                <ProgressBar
                  title="CMDA / DTCP Approvals"
                  value={95}
                  color="bg-yellow-400"
                />
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
