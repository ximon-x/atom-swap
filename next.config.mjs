/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "algorand-wallet-mainnet.b-cdn.net",
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
