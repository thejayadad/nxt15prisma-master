/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vlhp7vnbo3iooptf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "px77utfs1zmtrt9r.public.blob.vercel-storage.com"
      }
    ],
  },
};

export default nextConfig;