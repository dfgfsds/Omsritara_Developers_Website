
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Logo from '../../public/assets/logo.png'
import Link from "next/link";

import { Facebook, Instagram, Youtube, PhoneCall } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-[#9b0000] overflow-hidden">
      {/* CTA Section */}
      <div className="py-12 sm:py-16 border-b border-gray-700">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">

          {/* Text */}
          <div className="w-full lg:w-2/3 text-center lg:text-left">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Your Dream Project Awaits — Get Started Today!
            </h2>
          </div>

          {/* Button */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
            <a
              href="/contact"
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-yellow-500 text-[#990106] rounded-full text-4xl sm:text-5xl transition-transform duration-300 group-hover:rotate-45"
            >
              <ArrowRight size={36} />
            </a>
          </div>

        </div>
      </div>

      {/* Footer Widgets */}
      <div className="pt-24 pb-32 px-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo Widget */}
        <div className="flex flex-col">
          <Link href="/" className="mb-6">
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              height={50}
            />
          </Link>
          <h5 className="text-white text-xl  lg:text-2xl font-normal">
            We’re Solutions for all construction
          </h5>
        </div>

        {/* Address Widget */}
        <div className="flex flex-col sm:mt-0 mt-8">
          <h4 className="text-white text-2xl mb-4">Address</h4>
          <h6 className="text-gray-100 text-lg mb-2">
            <a
              href="https://www.google.com/maps"
              className="hover:text-yellow-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Second Floor, North Side, 46 Giri Rd, Satyamurthy Nagar, T. Nagar, Chennai, Tamil Nadu, 600001.
            </a>
          </h6>
          <h4>
            <a href="tel:+91000000000" className="text-yellow-600 text-xl underline">
              +91 7779958889
            </a>
          </h4>
        </div>

        {/* Quick Links Widget */}
        <div className="flex flex-col sm:mt-0 mt-8">
          <h4 className="text-white text-2xl mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="about" className="text-gray-100 text-lg hover:text-yellow-600 transition-colors">
                About Us
              </Link>
            </li>
            {/*
            <li>
              <Link href="/properties" className="text-gray-100 text-lg hover:text-yellow-600 transition-colors">
                Properties
              </Link>
            </li>
            */}
            <li>
              <Link href="blog" className="text-gray-100 text-lg hover:text-yellow-600 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="contact" className="text-gray-100 text-lg hover:text-yellow-600 transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Empty Widget */}
        <div className="sm:mt-0 mt-8"></div>
      </div>

      {/* Copyright Area */}
      <div className="bg-[#a80208] py-6">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-gray-100 text-sm">
            ©2025 Omsritara developers | All rights Reserved | Designed by{" "}
            <a
              href="https://ftdigitalsolutions.in"
              target="_blank"
              className="underline hover:text-gray-300"
            >
              Ft Digital Solutions (Agency)
            </a>
          </p>
          <div className="flex space-x-4 mt-4 justify-center">
            {/* Add social icons here */}
          </div>
        </div>
      </div>
      {/*
      <div className="modal-sidebar-scroll">
        <ul className="list-none p-2 shadow-md rounded-l-md bg-[#9b0000]">
          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61574589130777"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-10 h-10 items-center justify-center text-white transition duration-300 hover:opacity-80"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/omsritara_developers/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-10 h-10 items-center justify-center text-white transition duration-300 hover:opacity-80"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@omsritaradevelopers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-10 h-10 items-center justify-center text-white transition duration-300 hover:opacity-80"
            >
              <Youtube className="w-7 h-7" />
            </a>
          </li>
        </ul>
      </div>
      */}

      <div className="modal-sidebar-scroll-1">
        <ul>
          <li className="text-center">
            <a
              href="https://wa.me/917779958889"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#9b0000] hover:bg-red-700 text-white shadow-md"
            >
              <PhoneCall className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>


    </footer>
  );
};

export default Footer;
