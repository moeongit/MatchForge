/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/actuator/:path*", destination: "/api/actuator/:path*" },
      { source: "/players", destination: "/api/players" },
      { source: "/queue/:path*", destination: "/api/queue/:path*" },
      { source: "/queues", destination: "/api/queues" },
      { source: "/queues/:path*", destination: "/api/queues/:path*" },
      { source: "/matchmake/:path*", destination: "/api/matchmake/:path*" },
      { source: "/matches/:path*", destination: "/api/matches/:path*" }
    ];
  }
};

module.exports = nextConfig;
