/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    API_URL_SINTONIZA_T:process.env.API_URL_SINTONIZA_T,
    API_URL_STRAPI:process.env.API_URL_STRAPI,
  },
  // reactStrictMode: true,
  images: {
    domains: [
      'api.sintoniza-t.pt',
      'res.cloudinary.com',
      'images.unsplash.com',
      'pixahive.com',
      'i.ytimg.com',
      'develop.sintoniza-t.pt',
    ],
  },
}
