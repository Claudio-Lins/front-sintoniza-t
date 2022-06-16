

/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL_SINTONIZA_T:process.env.API_URL_SINTONIZA_T,
    API_URL_STRAPI:process.env.API_URL_STRAPI,
  },
  images: {
    domains: [
      'api.sintoniza-t.pt',
      'res.cloudinary.com',
      'images.unsplash.com',
      'pixahive.com',
      'i.ytimg.com',
      'develop.sintoniza-t.pt',
      'lh3.googleusercontent.com',
      'admin-sintoniza-t.vercel.app',
      'avatars.githubusercontent.com'
    ],
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
      }
    ]
  }
}

module.exports = nextConfig