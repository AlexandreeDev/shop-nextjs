/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "s3.amazonaws.com",
        pathname: "/my-bucket/**",
        port: "",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
