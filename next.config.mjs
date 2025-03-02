/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['react-leaflet'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  }
}

export default nextConfig
