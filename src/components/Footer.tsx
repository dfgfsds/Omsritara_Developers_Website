
"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Logo from '../../public/assets/logo.png'
import Link from "next/link";

import { Facebook, Instagram, Youtube, PhoneCall, MessageCircle, X } from "lucide-react";


const Footer = () => {
  const pathname = usePathname();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Listen for form state changes
  useEffect(() => {
    const handleFormStateChange = (e: CustomEvent) => {
      setIsFormOpen(e.detail.isOpen);
    };

    window.addEventListener('contactFormStateChange' as any, handleFormStateChange);
    return () => window.removeEventListener('contactFormStateChange' as any, handleFormStateChange);
  }, []);

  const isActive = (path: string) => pathname === path;

  const getLinkClass = (path: string) => {
    return isActive(path)
      ? "text-yellow-400 text-lg hover:text-yellow-500 transition-colors"
      : "text-gray-100 text-lg hover:text-yellow-400 transition-colors";
  };

  return (
    <footer className="bg-[#9b0000] overflow-hidden">
      {/* CTA Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-400">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-0">

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
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500 text-[#990106] rounded-full text-4xl sm:text-5xl transition-transform duration-300 group-hover:rotate-45"
            >
              <ArrowRight size={36} />
            </a>
          </div>

        </div>
      </div>

      {/* Footer Widgets */}
      <div className="pt-14 pb-9 md:py-20 px-4 sm:px-6 lg:px-8 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-0 gap-y-5 md:gap-x-8 md:gap-y-0">
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
          <p className="text-gray-100 text-lg leading-relaxed">
            Omsritara Developer is a trusted name in construction, dedicated to providing expert property solutions that cater to the unique needs of our clients.
          </p>
        </div>

        {/* Quick Links Widget */}
        <div className="flex justify-start md:justify-center">
          <div className="flex flex-col sm:mt-0 mt-8">
            <h4 className="text-white text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className={getLinkClass("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className={getLinkClass("/about")}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-100 text-lg hover:text-yellow-600 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/project" className={getLinkClass("/project")}>
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className={getLinkClass("/blog")}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className={getLinkClass("/contact")}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Address Widget */}
        <div className="flex flex-col sm:mt-0 mt-8">
          <h4 className="text-white text-2xl mb-4">Address</h4>

          <div className="flex items-start gap-3 mb-3">
            <MapPin className="text-yellow-500 w-6 h-6 mt-1 shrink-0" />
            <a
              href="https://www.google.com/maps"
              className="text-gray-100 text-lg hover:text-yellow-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Second Floor, North Side, 46 Giri Rd, Satyamurthy Nagar, T. Nagar, Chennai, Tamil Nadu, 600001.
            </a>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <Phone className="text-yellow-500 w-5 h-5 shrink-0" />
            <a href="tel:+917779958889" className="text-gray-100 text-lg hover:text-yellow-500 transition-colors">
              +91 7779958889
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-yellow-500 w-5 h-5 shrink-0" />
            <a href="mailto:info@omsritaradevelopers.in" className="text-gray-100 text-lg hover:text-yellow-500 transition-colors">
              info@omsritaradevelopers.in
            </a>
          </div>
        </div>

        {/* Empty Widget */}
        <div className="sm:mt-0"></div>
      </div>

      {/* Copyright Area */}
      <div className="bg-[#9b0000] border-t border-gray-400 pt-6 pb-3 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-gray-100 text-sm">
            ©2026 Omsritara developers | All rights Reserved | Designed by{" "}
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
      <div className="modal-sidebar-scroll-2">
        <ul>
          <li className="text-center">
            <button
              onClick={() => {
                const event = new CustomEvent('toggleContactForm');
                window.dispatchEvent(event);
              }}
              className="contact-toggle-btn group relative inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#A5291B] hover:bg-red-700 text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Open contact form"
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </li>
        </ul>
      </div>

      {/* 
      <div className="modal-sidebar-scroll-2">
        <ul>
          <li className="text-center">
            <button
              onClick={() => {
                const event = new CustomEvent('toggleContactForm');
                window.dispatchEvent(event);
              }}
              className="contact-toggle-btn group relative inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#A5291B] hover:bg-red-700 text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label={isFormOpen ? "Close contact form" : "Open contact form"}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isFormOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                  }`}
              >
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
              </div>

              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform ${isFormOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                  }`}
              >
                <X className="w-6 h-6 md:w-7 md:h-7" />
              </div>
            </button>
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
              className="inline-flex items-center justify-center w-12 md:w-14 h-12 md:h-14 rounded-full bg-[#A5291B] hover:bg-red-700 text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
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
