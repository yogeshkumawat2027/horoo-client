/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://horoo.in',
  generateRobotsTxt: false, // We have custom robots.js
  generateIndexSitemap: true, // Generate sitemap index if needed
  exclude: [
    '/api/*',
    '/dashboard/*',
    '/owner-dashboard/*',
    '/profile/*',
    '/complete-profile/*',
    '/auth/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/owner-dashboard/', '/profile/', '/complete-profile/'],
      },
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  // Additional paths can be added here
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/how-it-works'),
    await config.transform(config, '/list-rental'),
  ],
};
