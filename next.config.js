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
          {
            source: "/station/data/:stationId/:year-:month-:day",
            destination: "http://localhost:8080/station/data/:stationId/:year-:month-:day",
          },
          {
            source: "/user/change-infos",
            destination: "http://localhost:8080/user/change-infos",
          },
          {
            source: "/user/change-password",
            destination: "http://localhost:8080/user/change-password",
          },
        ];
      },
}

module.exports = nextConfig
