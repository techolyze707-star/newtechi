/** @type {import('next').NextConfig} */
const nextConfig = {
  // Trailing slash configuration - ensures consistent URLs
  trailingSlash: false, // URLs without trailing slashes (e.g., /about instead of /about/)

  // Skip trailing slash redirect for specific paths if needed
  skipTrailingSlashRedirect: false,

  async redirects() {
    return [
      {
        source: '/open/blog/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      },
    ];
  },

  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@floating-ui/react',
    ],
  },

  // Show request/runtime style logs in local development console.
  logging: {
    incomingRequests: process.env.NODE_ENV === 'development',
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
 
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.w3.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mozilla.github.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.adobe.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techolyze.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Configure allowed quality values for images
    qualities: [75, 85],
    // Disable image optimization for external images to prevent 500 errors
    unoptimized: true,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Suppress source map warnings from node_modules (including MongoDB)
    config.ignoreWarnings = [
      { module: /node_modules/ },
      /Failed to parse source map/,
      /sourceMapURL could not be parsed/,
    ];

    return config;
  },
};

export default nextConfig;
