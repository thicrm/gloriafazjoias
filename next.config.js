/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize file watching for macOS - reduce EMFILE errors.
  // Disable webpack persistent cache in dev to avoid stale chunk refs (e.g. Cannot find module './196.js').
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/public/**',
        '**/.cursor/**',
        '**/coverage/**',
        '**/*.md',
        '**/encomendas_txt.txt',
      ],
    }
    return config
  },
}

module.exports = nextConfig

