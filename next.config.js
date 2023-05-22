/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/auth/register",
            destination: "http://localhost:8080/auth/register",
          },
        ];
      },
}

module.exports = nextConfig
