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
  // Optimize file watching for macOS - reduce EMFILE errors
  webpack: (config, { isServer }) => {
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

