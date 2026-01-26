export async function GET() {
  const baseUrl = 'https://horoo.in';

  // Static routes with their metadata
  const staticRoutes = [
    { url: '', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/contact', changefreq: 'monthly', priority: '0.8' },
    { url: '/how-it-works', changefreq: 'monthly', priority: '0.9' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.5' },
    { url: '/terms', changefreq: 'yearly', priority: '0.5' },
    { url: '/owner/guidelines', changefreq: 'monthly', priority: '0.7' },
    { url: '/list-rental', changefreq: 'monthly', priority: '0.9' },
  ];

  // Property category routes
  const propertyCategories = [
    { path: 'rooms', priority: '0.9' },
    { path: 'flats', priority: '0.9' },
    { path: 'house', priority: '0.9' },
    { path: 'hostels', priority: '0.9' },
    { path: 'hotels', priority: '0.9' },
    { path: 'commercials', priority: '0.9' },
  ];

  const categoryRoutes = propertyCategories.map((cat) => ({
    url: `/${cat.path}`,
    changefreq: 'daily',
    priority: cat.priority,
  }));

  // Add map-search routes for each category
  const mapSearchRoutes = propertyCategories.map((cat) => ({
    url: `/${cat.path}/map-search`,
    changefreq: 'weekly',
    priority: '0.7',
  }));

  // Fetch dynamic property listings from API
  let propertyRoutes = [];

  try {
    const propertyTypes = ['rooms', 'flats', 'house', 'hostels', 'hotels', 'commercials'];

    const fetchPromises = propertyTypes.map(async (type) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${type}`, {
          next: { revalidate: 3600 }, // Revalidate every hour
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const properties = data.data || data || [];

          return properties.map((property) => ({
            url: `/${type}/${property.slug || property.horooId}`,
            lastmod: property.updatedAt || property.createdAt || new Date().toISOString(),
            changefreq: 'weekly',
            priority: '0.8',
          }));
        }
        return [];
      } catch (error) {
        console.error(`Error fetching ${type} for sitemap:`, error);
        return [];
      }
    });

    const results = await Promise.all(fetchPromises);
    propertyRoutes = results.flat();
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
  }

  // Combine all routes
  const allRoutes = [
    ...staticRoutes,
    ...categoryRoutes,
    ...mapSearchRoutes,
    ...propertyRoutes,
  ];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : `<lastmod>${new Date().toISOString()}</lastmod>`}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
