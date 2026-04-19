/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["node-pg-migrate"],
  outputFileTracingIncludes: {
    "/api/v1/migrations": ["./infra/migrations/**/*"],
  },
};

module.exports = nextConfig;
