/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "risingtheme.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "uploads.ftdigitalsolutions.org" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "api.omsritaradevelopers.in" },
      { protocol: "http", hostname: "api.omsritaradevelopers.in" },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
