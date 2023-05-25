/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/auth/register",
            destination: "http://localhost:8080/auth/register",
          },
          {
            source: "/auth/login",
            destination: "http://localhost:8080/auth/login",
          },
          {
            source: "/user/get/:token",
            destination: "http://localhost:8080/user/get/:token",
          },
        ];
      },
}

module.exports = nextConfig
