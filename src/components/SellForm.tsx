'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SellForm({ propertyType }: { propertyType: string }) {
  const [formData, setFormData] = useState<any>({
    name: '',
    mobile: '',
    phone: '',
    email: '',
    address: '',
    location: '',
    city: '',
    message: '',
    branch: '',
    verification: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.verification !== '71') {
      setError('❌ Human verification failed.');
      setSuccess(false);
      return;
    }

    setError('');
    setSuccess(true);
    // Optionally send data to API
  };

  return (
    <>
         <div className="relative mt-16 md:mt-20 bg-gray-50 py-12 md:py-16 overflow-hidden">
        {/* Background Illustration */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/3 bg-[url('/assets/sale-banner.png')] bg-contain md:bg-cover bg-right bg-no-repeat opacity-30 md:opacity-40 pointer-events-none"
        ></div>

        {/* Heading */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-[#9b0000]">{propertyType}</span>
            {/* <span className="text-gray-800">Us</span> */}
          </h1>

          {/* Breadcrumb */}
          <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-600 flex flex-wrap justify-center items-center gap-2">
            <Link href="/" className="hover:text-[#9b0000] transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium">{propertyType}</span>
          </div>
        </div>
      </div>


    <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-red-700 mb-8 border-b pb-4">
          Sell – <span className="text-gray-800">{propertyType}</span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Input Fields */}
          {[
            { label: 'Your Name', name: 'name' },
            { label: 'Your Mobile', name: 'mobile' },
            { label: 'Your Phone', name: 'phone' },
            { label: 'Your Email', name: 'email', type: 'email' },
            { label: 'Location', name: 'location' },
            { label: 'City', name: 'city' },
          ].map(({ label, name, type = 'text' }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                   value={formData[name]}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          ))}

          {/* Address */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Branch Dropdown */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Nearest Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="">Select Nearest Branch</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
            </select>
          </div>

          {/* Human Verification */}
          <div className="col-span-1 sm:col-span-2">
            <div className="bg-red-700 text-white p-4 rounded-md shadow-md">
              <label className="block font-semibold text-lg mb-1">Human Verification</label>
              <p className="mb-2 text-sm">Eighty minus Nine =</p>
              <input
                type="text"
                name="verification"
                value={formData.verification}
                onChange={handleChange}
                placeholder="Answer in numbers (e.g., 71)"
                className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="col-span-1 sm:col-span-2">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          {success && (
            <div className="col-span-1 sm:col-span-2">
              <p className="text-green-600 text-sm font-medium">✅ Form submitted successfully!</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 text-right">
             <button
                        type="submit"
                        className="flex justify-center gap-2 items-center shadow-xl text-base sm:text-lg text-amber-50 bg-red-800 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-3 overflow-hidden border-2 rounded-full group"
                      >
                             Send Enquiry
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-100 group-hover:border-none p-1 sm:p-2 rotate-45"
                          viewBox="0 0 16 19"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                            className="fill-gray-100 group-hover:fill-gray-800"
                          />
                        </svg>
                      </button>
           
          </div>
        </form>
      </div>
    </section>
        </>
  );
}
