/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://politravel.lt',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*', '/404'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/admin/*'],
      },
    ],
    additionalSitemaps: [
      'https://politravel.lt/sitemap.xml',
      'https://politravel.lt/sitemap-0.xml',
      'https://politravel.lt/api/sitemap-dynamic',
    ],
  },
  // Transform function to add dynamic routes
  transform: async (config, path) => {
    // Add dynamic routes based on the path
    if (path === '/keliones') {
      // This will be handled by the additionalPaths function
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    if (path === '/kategorijos') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    if (path === '/straipsniai') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
