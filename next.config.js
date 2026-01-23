/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "risingtheme.com",
      "images.unsplash.com",
      "randomuser.me",
      "uploads.ftdigitalsolutions.org",
      "cdn.prod.website-files.com",
      "example.com", // 👈 add this
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
