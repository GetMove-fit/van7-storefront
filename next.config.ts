import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const checkEnvVariables = require("./check-env-variables");

checkEnvVariables();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    // disable a default plugin
                    cleanupIds: false,
                  },
                },
              },
            ],
          },
        },
      },
    });

    return config;
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["admin.van7.com"],
    deviceSizes: [412, 640, 750, 828, 1080, 1200, 1350, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/produkt/van7-7-funktionen-hubbett",
        destination: "/hubbett-kaufen",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
